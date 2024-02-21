---
title: How many notifications are too many?
description: Humans aren't made to handle the amount of notifications we receive nowadays. What's the real issue and how can you prevent it?
pubDatetime: 2024-02-21T15:00:00Z
featured: true
draft: false
tags:
  - observability
  - thoughts
creationDatetime: 2024-02-20 22:35
---

One of the main points of Observability is **monitoring**: receiving an alert when something goes down allows you to react timely and keep downtimes to a minimum. However, increasing the amount of notifications and alerts doesn't equate to better awareness: in fact, there's a point where **too many** notifications start becoming counterproductive.

This concept is known as **notification overload** (or _fatigue_), and it's far from being exclusive to Observability. Think about your daily phone usage:

- How many times do you receive a group chat message and just swipe the notification away without reading it?
- How about when you receive work emails outside your working hours?
- What about all the apps constantly trying to grab your attention with push notifications?

Information overload in general is a fascinating topic, and if you're curious to learn more about I can recommend the paper from _Arnold et al_[^overload], which goes through the topic in greater detail.

## Is this a real problem? 🫠

This phenomenon is ubiquitous to multiple environments, but it has a common root: if our brain receives too many notifications, it loses sensitivity to them. Not only this can make you feel stressed and uneasy, but it can also draw your attention away from the few notifications that really matter.

**In IT**, it's pretty common to find situations that are _unusual_, but possibly not _critical_. Say you have some kind of database:

1. you want to make sure the database is always healthy, so you decide to _alert_ (among other things) _when the database load is too high_;
2. however, your users routinely perform resource-intensive queries, producing a _temporary load spike_;
3. you keep receiving those alerts on your phone, but you swipe them away: after all, you _know_ it's just business as usual;
4. after some time, an actual problem happens; you swipe it away without checking, and boom! 💣

---

Even though this is a made-up scenario just to illustrate the concept, the issue is very real and, as mentioned before, transcends multiple fields.

Recently, a study by _Rozenes et al._[^icu] has been conducted on **patients in Intensive Care Units**, which are monitored on lots of parameters: according to the paper, the both the amount and inaccuracy of these alerts can lead to _alert fatigue_, “resulting in errors and inaccurate diagnoses”. Addressing the issue by reducing the alerts and improving their validity is shown to “significantly reduce alarm fatigue, thereby improving the quality of care for ICU patients”.

Whether **notification overload** happens in your daily life, when monitoring your deployments, or anywhere else, it's definitely a problem worth addressing. But how?

## What can I do about it? 🧐

**For your personal life**, my advice is the following: the next time you're about to ignore a notification, **stop for a second**. Ask yourself, _“is this something I often skip over without looking?”_, and if the answer is yes, **disable that notification**. Even though you might think _“I'll just ignore it, what's the big deal”_, it'll build up into making you feel overwhelmed. You have plenty of options:

- The pesky group chat spam? 🔇 Mute the group and check it out manually from time to time.
- Some social media compelling you to check out the latest content you absolutely cannot miss? 🔕 Go into the app and disable those notifications.

There's even a number of applications that will “group up” notifications and deliver them to you in batches, on configurable intervals. Try that out and see how it works for you!

**In Observability**, you should make sure you're not alerting on _non-critical_ issues just because you can. You should re-evaluate what's important, and only keep alerts that actually require you to take action!

---

[^overload]: Arnold M, Goldschmitt M, Rigotti T. Dealing with information overload: a comprehensive review. Front Psychol. 2023 Jun 21;14:1122200. doi: [10.3389/fpsyg.2023.1122200](https://doi.org/10.3389%2Ffpsyg.2023.1122200). PMID: 37416535; PMCID: PMC10322198.
[^icu]: Rozenes, S., Fux, A., Kagan, I. *et al.* Alert-Grouping: Smart Personalization of Monitoring System Thresholds to Help Healthcare Teams Struggle with Alarm Fatigue in Intensive Care. *J Med Syst* **47**, 113 (2023). https://doi.org/10.1007/s10916-023-02010-6
