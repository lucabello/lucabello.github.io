---
title: Why did I change up my blog?
description: Explaining why I migrated my blog from Quartz v3 to Astro.
pubDatetime: 2024-02-17T21:57:00Z
featured: false
draft: false
tags:
  - blog
  - tutorial
  - obsidian
creationDatetime: 2024-02-17 22:13
---

This blog is powered by [Astro](https://astro.build/), and the excellent [satnaing/astro-paper](https://github.com/satnaing/astro-paper) theme.

After using it for a while, I reached the conclusion that [Quartz](https://quartz.jzhao.xyz/), while being an exceptional tool to publish a _“second brain”_, isn't the best for a blog (at least without deep customization). If you need to publish your Obsidian vault, I believe that's an incredibly easy and efficient way to do so: go check it out!

However, after evaluating lots of tools and frameworks, I've settled on **Astro**: I had to partially adapt my requirements from the ones I mentioned in [🖇️ a previous post](/posts/how-i-made-my-previous-website), but I can still write content in Obsidian. 😊

If you want to build and publish an Astro blog, just like this one, getting started is incredibly easy thanks to their great [documentation](https://docs.astro.build/en/getting-started/). But in case you're curious to know what tools I use to make authoring content easier for me, keep reading!

---

## 🖋 Useful Obsidian plugins

After creating and setting up the Astro project, I pushed it to a **git** repository.

I opened the entire repository as a vault in Obsidian, and installed some useful plugins:

- **LanguageTool Integration** is always the first plugin I install on any vault: I self-host LanguageTool on my home server, so hooking up Obsidian to it is a no-brainer;
- **Templater** gives me powerful templates to jump straight into writing; I'll just create a new note, press a shortcut, and ✨magic✨: all the post metadata is filled up automatically;
- **Better Word Count** allows me to easily check how long a post (or individual section) is, so I can better decide how to organize the content.

That's not a huge amount of plugins (and it's a lot less than I use in my main vault), but I'm trying to keep it simple for this one and slowly looking for new ones to try out.

If you have suggestions, feel free to reach out!
