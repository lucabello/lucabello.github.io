import { execFileSync } from "node:child_process";
import type { Element } from "hast";
import type { HastPluginDefinition } from "satteri";

const LANG_CLASS = "language-d2";

/**
 * Renders ```d2 fenced code blocks to static SVG at build time by shelling out to the `d2`
 * CLI (https://d2lang.com) — the project's existing pattern for build-time asset generation
 * (see Pagefind's postbuild step). `execFileSync` (not the async `execFile`, whose API has no
 * `input` option) pipes the diagram source to `d2`'s stdin.
 *
 * Runs at the HAST stage (on the already-parsed `<pre><code class="language-d2">` produced by
 * the normal, untouched code-block conversion), not the MDAST stage: satteri's MDAST `raw`
 * escape hatch re-parses its string as Markdown, which corrupts a document this large and
 * attribute-heavy (most shape/text elements silently lose their coordinates). HAST has a
 * native `raw` node type instead, so the compiled SVG is spliced in without any reparsing.
 */
export function satteriD2Plugin(): HastPluginDefinition {
	return {
		name: "cactus-d2-diagram",
		element: {
			filter: ["pre"],
			visit(node, ctx) {
				const code = node.children.find(
					(child): child is Element => child.type === "element" && child.tagName === "code",
				);
				const className = code?.properties?.className;
				const classes = Array.isArray(className) ? className : [];
				if (!classes.includes(LANG_CLASS)) return;

				const source = ctx.textContent(node);
				const svg = execFileSync("d2", ["--theme", "0", "-", "-"], {
					input: source,
					maxBuffer: 10 * 1024 * 1024,
					encoding: "utf-8",
				});

				return { type: "raw", value: `<div class="d2-diagram">${svg}</div>` };
			},
		},
	};
}
