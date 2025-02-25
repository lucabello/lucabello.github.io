---
title: How I made my previous website
description: My step-by-step guide on how to publish your Obsidian vault through Quartz v3.
date: 2023-08-05
creationDate: 2023-08-05
featured: false
draft: false
tags:
  - obsidian
  - tutorial
  - blog
---

Before moving to [Astro](https://astro.build/) (which powers this blog) I was using [Quartz](https://quartz.jzhao.xyz/) **v3** to directly publish notes from my Obsidian vault. The project has since moved on to **v4**, with major changes to its architecture.

If you want to use **Quartz v4**, I'd encourage you check out [this video](https://www.youtube.com/watch?v=6s6DT1yN4dw&t=227s) from _Nicole van der Hoeven_ on how to set it up! 😊

---

I love to take notes on things. When I found out about [Obsidian](https://obsdian.md) I knew it was going to change my entire Personal Knowledge Management (PKM) system.

While there are countless articles on how to **publish a blog** (or _digital garden_) **for free with Obsidian**, none of them met my specific requirements. This post aims at summarizing the steps I took for that blog to come online, so that you can easily replicate the process! 💪🏻

## 📝 My requirements

Let's go through what I wanted to achieve from this setup:

- **Seamlessly publish from my main Obsidian vault**
  Many solutions require you to either modify your vault's configuration or create a separate one; I write everything in my main vault, and _I really wanted the publishing solution to be transparent to my daily Obsidian use_.
- **Use GitHub Pages as a backend and frontend**
  Netlify or Vercel are very common choices; however, adding an extra tool means adding complexity; I wanted this solution to be _as simple as possible_.
- **Use a declarative approach to choose which notes to share**
  Having the published notes in my main vault means I can form meaningful connection with my private notes; however, _I don't want to run the risk of accidentally uploading my private notes to GitHub_. I should be able to pick which notes to publish _through their YAML front matter_.
- **Easily extend and customize the site**
  Even though I currently simply post stuff I like to write about, _I want to be able to add more complex components in the future (e.g., comments on my posts)_. I also like to switch up the color scheme from time to time. 🤷🏻

## 🎉 The solution

To achieve my desired setup, I ended up using:

- 🪴 [Quartz](https://quartz.jzhao.xyz/);
- 🗞️ the [GitHub Publisher plugin](https://github.com/ObsidianPublisher/obsidian-github-publisher).

**Quartz** does the heavy lifting by converting Obsidian notes to a beautiful static site, and its [setup](https://quartz.jzhao.xyz/notes/setup/) is pretty straightforward. _However_, the project recommends using the entire `content/` folder as a vault; this makes things easier for a novice user, but it clashes with my requirements. 💢

The **GitHub Publisher community plugin** can be installed and configured directly from Obsidian. It allows me to obtain the _declarative approach_ I mentioned before, by only publishing the notes that have `share: true` in their YAML front matter. This tool also comes with good [documentation](https://obsidian-publisher.netlify.app/plugin/) and it's easy to setup.

Sounds like everything's good to go, _right_?
**Wrong.**

## 👣 Step-by-step and workarounds

There's still a couple things to tweak for this setup to work correctly. Rather than providing a simple list, I'll incorporate them in a step-by-step guide and I'll **highlight** them as I go. 👏🏻

### 🪴 Setup Quartz

Create a new repository by [using jackyzha0/quartz as a template](https://github.com/new?template_name=quartz&template_owner=jackyzha0). Remember to _Include all branches_: you'll add your notes in the `hugo` branch, while the generated site will be automatically published to the `master` branch. Now you can configure the site's title, icon, and more by following [the relevant docs](https://quartz.jzhao.xyz/notes/config).

The site's homepage is the `content/_index.md` file, while your notes should go in the `content/notes/` folder. Feel free to remove everything in that folder (except for the `content/notes/images` directory).

### 🪨 Setup Obsidian

Create a folder for your digital garden: let's say it's `Garden`. Create the `Garden/notes` subfolder, and also create `Garden/notes/images` right after. **This structure aims to mimic the one of the `content/` folder on your repository.**

The images you use in your notes should be put in the `Garden/notes/images` folder; your notes can be saved either in the `Garden/notes` folder directly, or in any subfolder inside that (if you want to divide notes per category, such as `Garden/notes/food` and `Garden/notes/travel`).

**The important part is to make sure to properly link things while you write your note, by starting the paths from the `notes` folder.**

As an example, Obsidian's default setting uses Wikilinks with the shortest path; you'll simply write `[[My note]]` and the link will appear. **To be compatible with Quartz however, you should write your link as `[[notes/My note]]` (assuming the note is in the `notes` folder).**

Note that **Wikilinks to images do not work; your links to images should be written as `![alt-text](notes/images/Pasted Image 20230101121020)`**.

Now you only need your notes to get to GitHub!

### 🗞️ Setup GitHub Publisher

Install the community plugin from Obsidian and open its configuration.

Enter the name of your repository, your GitHub username, and a GitHub token (generate one [here](https://github.com/settings/tokens/new?scopes=repo,workflow)). Input `hugo` as the main branch, and enable the automatic merge of pull requests.

Navigate to the _Upload Configuration_ tab, and **configure both the “Default Folder” and “Root Folder” as `content/notes`.** Now open the _Embed_ tab, **enable “Transfer Attachments” and set the “Default attachment folder” to `content/notes/images`**.

Explore the other settings to customize the plugin to your liking (I recommend enabling “Markdown hard line break” and “Inline Tags”).

Congratulations, you're done! 🥳

## 🖋️ How to use it

Just write notes in Obsidian under the `Garden/notes` folder, add `share: true` and a good `title: A great title!` in the YAML front matter. After you're done, hit `Ctrl+P` to bring up the Command Palette, and run `Upload all the shared notes`; you will see a small notification telling you that the upload was successful.

Give it a minute, navigate to `<your-username>.github.io/<your-repo>` , and 💫 voilà 💫 – there's your digital garden!

## 🦆 Final Notes

If you found this useful, or you're having issues with some steps, get in touch with me on [Mastodon](https://mastodon.social/@lucabello)!

Happy writing! 🌈
