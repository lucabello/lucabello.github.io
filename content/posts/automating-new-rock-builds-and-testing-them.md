---
title: Automating new rock builds and testing them
description: Can you guarantee your OCI image is working correctly?
date: 2025-02-17
creationDate: 2025-02-17
modDatetime: 
featured: true
draft: false
tags:
  - how-to
  - development
  - rocks
---
Recently, I've been working a lot with OCI images - specifically with [rocks](https://documentation.ubuntu.com/rockcraft/en/stable/), Canonical's spin on OCI-compliant container images. As part of the Observability team, I'm involved with quite a few rocks for several observability-related projects (e.g., Prometheus, Grafana, and so on).

Being *mildly interested* in automation, I set up our workflows to check for new upstream version of each project, so that new rocks are created automatically: Prometheus has a new release, and our [Prometheus rock](https://github.com/canonical/prometheus-rock) assembles the necessary pieces to build a new rock, finally opening a pull request for the new version.

That's great! 🎉 We can then auto-merge the pull request as soon as the tests pass - **wait, TESTS?!**

## How do I even test an OCI image?

To establish some automation and have some quality guarantees, we need to make sure the new image we're building is actually working. What if the build process doesn't fail, but the binary can't run correctly?

Let's explore a concrete example: the [OpenTelemetry Collector rock](https://github.com/canonical/opentelemetry-collector-rock). I used a combination of [`just`](https://github.com/casey/just) (task runner), [`goss`](https://github.com/goss-org/goss) (server validation), and [`microk8s`](https://microk8s.io/) (Kubernetes cluster, but any other will do) in order to make sure the workload:
- runs well in isolation;
- integrates correctly with other workloads.

If you clone that repository and run `just`, you'll see the available recipes:

```bash
∮ just
Available recipes:
    clean version                           # `rockcraft clean` for a specific version
    pack version                            # Pack a rock of a specific version
    run version=latest_version              # Run a rock and open a shell into it with `kgoss`
    test version=latest_version             # Run all the tests

    [test]
    test-integration version=latest_version # Test the rock integration with other workloads
    test-isolation version=latest_version   # Test the rock with `kgoss`
```

### Running an OCI image 👟

First, we need to be able to locally run a freshly-packed rock. To do so, we can use the local image registry provided by `microk8s` (or `docker`, or your solution of choice). You'll simply need to:

- pack the rock with `rockcraft pack`;
- push it to the local registry with `skopeo` (it comes with the `rockcraft` snap!);
- `kubectl run` a pod using the uploaded image.

Assembling those three steps in a `justfile` should give you something similar to this:

```bash
### Snippet from the `justfile` ###
# Push an OCI image to a local registry
[private]
push-to-registry version:
  echo "Pushing $rock_name $version to local registry"
  rockcraft.skopeo --insecure-policy copy --dest-tls-verify=false \
    "oci-archive:${version}/${rock_name}_${version}_amd64.rock" \
    "docker://localhost:32000/${rock_name}-dev:${version}" >/dev/null

# Pack a rock of a specific version
pack version:
  echo "Packing opentelemetry-collector: $version"
  cd "$version" && rockcraft pack

# Run a rock and open a shell into it with `kgoss`
run version=latest_version: (push-to-registry version)
  kubectl run otel-collector --image localhost:32000/${rock_name}-dev:${version}
```

Now that you can `just run` a rock and conduct your manual explorations, let's move on to testing.

### Testing in isolation 🕺🏻

To test the rock in isolation, we're using [`kgoss`](https://github.com/goss-org/goss/blob/v0.4.9/extras/kgoss/kgoss), a community-maintained `goss`-related utility that does the following:
- run a pod with the provided image;
- execute the checks defined in `goss.yaml` from inside the pod; `kgoss` handles this by:
	- copying the `goss.yaml` file inside the pod;
	- running `goss` via `kubectl exec`.

All we need is some Goss checks:

 ```yaml
 process:
  otelcol:
    running: true

...

port:
  # self-monitoring metrics
  tcp6:8888:
    listening: true
    port: 'tcp6:8888'
    skip: false
 ```

Adding this to our `justfile` is extremely simple:

```bash
# Test the rock with `kgoss`
[group("test")]
test-isolation version=latest_version: (push-to-registry version)
  GOSS_OPTS="--retry-timeout 60s" kgoss run -i localhost:32000/${rock_name}-dev:${version}
```

`just test-isolation` will spin up a pod running the rock you just packed, and will then run `goss` checks, allowing for one minute of "settling time" for the workload to start working.
### Integration testing 👯

Checking the interactions with other workloads can appear trivial, but don't be fooled: there's a lot of pitfalls when trying to conceptualize integration tests for OCI images.

After multiple iterations with the rest of the team, I knew I wanted a `goss`-driven and `docker`-free approach: `goss` is extremely good at server validation, and `docker` is nice, but shouldn't be a requirement. The general idea is:
- deploy all the necessary workloads via `kubectl apply`;
- run `goss` to check whether things are running as intended.

In this example, we want to test OpenTelemetry Collector with Prometheus, to verify we're able to remote-write metrics to it. I introduced a `tests/` folder and structured it as such:
```
d .
└── d tests
    └── d prometheus_integration
        ├── f goss.yaml  # external `goss` checks
        ├── f otel-collector.yaml
        └── f prometheus.yaml
```

Each Kubernetes manifest declares a set of *Deployment*s, *Service*s, and *ConfigMap*s that form the actual deployment, as you can see [here](https://github.com/canonical/opentelemetry-collector-rock/blob/d74173a97927b2689613c9f659a25bdd228c0e53/tests/prometheus_integration/otel-collector.yaml).

Then, we write a `goss` check to verify the Collector's metrics are reaching Prometheus:

```yaml
command:
  remote-write:
    exit-status: 0
    exec: |
      echo "Namespace: {{.Env.NAMESPACE}}"
      # Get Prometheus pod
      PROMETHEUS_IP="$(kubectl get pod -n {{.Env.NAMESPACE}} -l app="prometheus" \
        -o jsonpath='{.items[*].status.podIP}')"
      if [ -z "$PROMETHEUS_IP" ]; then
        echo "Prometheus pod IP not found, maybe the pod isn't ready yet"
        exit 1
      fi
      echo "Prometheus IP: $PROMETHEUS_IP"
      # Check there is a `job` label with value `otel-collector`
      LABELS="$(curl -s "${PROMETHEUS_IP}:9090/api/v1/label/job/values")"
      echo "Prometheus 'job' label values: $LABELS"
      if ! echo "$LABELS" | grep -q "otel-collector"; then
        echo "'job=otel-collector' label not found"
        exit 2
      fi
```

Finally, we add a recipe to our `justfile`:

 ```bash
 # Test the rock integration with other workloads
[group("test")]
test-integration version=latest_version: (push-to-registry version)
  #!/usr/bin/env bash
  # For all the subfolder in tests/
  for test_folder in $(find tests -mindepth 1 -maxdepth 1 -type d | sed 's@tests/@@'); do
    # Create a namespace for the tests to run in
    namespace="test-${rock_name}-rock-${test_folder//_/-}"
    echo "+ Preparing the testing environment"
    kubectl delete all --all -n "$namespace" >/dev/null
    kubectl delete namespace "$namespace" >/dev/null
    kubectl create namespace "$namespace"
    # For each  '.yaml' file (excluding 'goss.yaml')
    for manifest in $(find tests/${test_folder} -type f -name '*.yaml' | grep -v 'goss.yaml'); do
      kubectl apply -f "$manifest" -n "$namespace"  # deploy it in the test namespace
    done
    sleep 15 # Wait for the pods to settle and otel-collector to remote-write
    NAMESPACE="$namespace" goss \
      --gossfile "tests/${test_folder}/goss.yaml" \
      --log-level debug \
      validate \
      --retry-timeout=120s \
      --sleep=5s
    # Cleanup
    echo "+ Cleaning up the testing environment"
    kubectl delete all --all -n "$namespace"
    kubectl delete namespace "$namespace"
  done
 ```

You can now run `just test-integration` and let the magic happen! ✨

### Conclusions 🦆

Testing our rocks is extremely important in order to guarantee a certain level of quality in our work, and to allow our CI to auto-merge pull requests without our direct intervention. 

Hopefully this *mini testing framework* can be useful to others running into the same issues!



