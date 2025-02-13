---
title: Light or Dark mode? An analytical approach
description: Does it come down to personal preference, or is there a "correct" choice?
date: 2024-03-12
creationDate: 2024-03-06
featured: false
draft: false
tags:
  - analysis
---

I often find myself caught up in the **light mode vs. dark mode** debate. _“Oh Luca, how can you use light mode?”_ 🙈

Truth is I have lots of thoughts on the topic, but I can't really stop people and start rambling about things for 15 minutes. However I feel like it's an interesting topic, so I'm doing some research, and I'm writing this post about it!

Before diving into pros and cons, I feel it's important to take a look at when, how and why these two modes where created.

## A brief history of display technologies 🖥️

The history of light and dark mode is closely tied to the underlying technology used to display the content.

The first **monochrome CRT monitors** contained lots of _phosphorus dots_; hitting one with an electron beam would cause it to glow (mostly in either green, amber, or white). As a direct consequence, the first computers were technically using _dark mode_.

With the advent of **RGB CRT monitors**, computers were suddenly able to display color. We started using dark text on a white background, mimicking printed text: _light mode_ was born.  
This was a **skeuomorphism**: an object replicating the looks of an older, more familiar one, in order to improve the user experience. This design style has lots of examples: the _floppy disk_ icon 💾 is still used for saving, though you're unlikely to be using those anymore; the same goes for electric candles, note-taking widgets that resemble pieces of paper, and more.

With **LCD screens**, things didn't change. The presence of a backlight meant that displaying black was still shining a lot of light in your face.  
Years later, however, **OLED displays** were born; the mode of text consumption also changed, with smartphones becoming ubiquitous. The pixels in an OLED display can individually produce light: they can turn off completely when they need to be black. As a result, blacks are deeper, and the energy consumption is lower. This caused a resurgence of _dark mode_, especially on mobile devices.

---

After looking at how the developments in display technologies have impacted the usage of light and dark modes, we now have a much better context on the origins of the two.

To better analyze the properties of each one, let's first have a look at how our eyes process light and recognize objects.

## What are your eyes doing? 👀

The way eyes absorb and process light has an enormous impact on the usability and functionality of the different modes. If you're familiar with how cameras work, this section will ring a bell or two.

When your eyes are exposed to lots of light, your pupils are constricted in order to lessen the amount of light they let in, just like changing the aperture of a camera. This in turn makes the images sharper, allowing you to see things more clearly.  
In the darkness, the opposite happens: the pupils dilate to let in more light, at the cost of slightly blurrying the objects you're looking at.  
We see sharper images in the light, and blurrier ones in the dark.

This makes a lot of sense from an evolutionary perspective: humans have been a diurnal species for a long time, and our eyes adapted to better see plants and animals against the extremely bright sky background. However, for this reason bright objects in the dark can draw more attention, even though we can't see them perfectly. This perception of “unclear edges” is a phenomenon called **halation**: a bright object in the dark will appear to glow, and that “light bleed” makes its borders less identifiable. This doesn't matter for bigger objects, but the effect is stronger at a smaller scale, and for near-sighted people.

## The impact on user experience 👓

To reason about the mechanisms of human vision in the context of light and dark mode, we need to better define the type of content they apply to: most of the time it's **text**, whether it's programming on an IDE, reading a book, and so on. The difference between the two modes is expressed scientifically in terms of polarity:

- _positive polarity_ means dark text on a light background (light theme);
- _negative polarity_ means light text on a dark background (dark theme).

Numerous studies have been conducted to investigate how polarity can affect reading: _Piepenbrock et al. (2013)_[^1] conclude that **positive polarity** leads to better visual acuity (and thus reading performance) overall, highlighting how it also helps to contrast the sight-degradation effects of aging. Quoting their paper directly:

> Dark characters on light background lead to better legibility and are strongly recommended independent of observer's age.

Another study[^2] from the same group shows how this is especially true for smaller fonts, and consequently also for smaller displays. Not only that, but according to _Dobres et al. (2017)_[^3] _positive polarity_ is even more helpful in scenarios of low ambient light.

However, legibility isn't the only criteria to consider: a study from _Aleman et al._ (2018)[^4] explores the effects of polarity on myopia. It concludes that _positive polarity_ can stimulate and **accelerate the development of myopia**, while _negative polarity_ could inhibit it.

There's not yet a clear scientific consensus on which polarity is “better overall”, and maybe there won't ever be. Regardless, we now have enough elements to draw some conclusions.

## My conclusions 🌻

Personally, **I prefer light themes**, but I find myself using both for different reasons.

My work environment gets lots of sunlight: using light themes on my desktop allows me have a clearer view of the code I'm writing, and it also reduces the awful glare I get on my monitor. I also perceive light themes to be “less aggressive”, “emptier”, and “more active”, which help me set a better working environment and shifts my focus on productivity.

However, when using my computer in the evening or at night things aren't the same: I find blue-light filters to be less noticeable on dark themes, so the color distortion tends to bother me less; also, tweaking monitor luminosity manually is a hassle, so a darker color scheme helps me avoid being blinded while I'm chilling. Dark mode feels “fuller” and more “laid back”, which is handy when I'm not working.

I do like to switch things up periodically though, and I sometimes change mode and color scheme based on which mood I'm in; so it really depends on the day I guess 🤷🏻

---

So which mode is better? As unsatisfactory as it is, _“the one you prefer”_ is the actual answer here. Try both light and dark mode in different contexts and devices, and see what you like!

If you have thoughts you want to share (or just want to tell me that I'm dumb for using light mode) feel free to reach out!

---

[^1]: Piepenbrock C, Mayr S, Mund I, Buchner A. Positive display polarity is advantageous for both younger and older adults. Ergonomics. 2013;56(7):1116-24. doi: 10.1080/00140139.2013.790485. Epub 2013 May 8. PMID: 23654206. https://doi.org/10.1080/00140139.2013.790485

[^2]: Piepenbrock C, Mayr S, Buchner A. Positive display polarity is particularly advantageous for small character sizes: implications for display design. Hum Factors. 2014 Aug;56(5):942-51. doi: 10.1177/0018720813515509. PMID: 25141597. https://doi.org/10.1177/0018720813515509

[^3]: Dobres, Jonathan & Chahine, Nadine & Reimer, Bryan. (2017). Effects of ambient illumination, contrast polarity, and letter size on text legibility under glance-like reading. Applied Ergonomics. 60. 68-73. 10.1016/j.apergo.2016.11.001. https://doi.org/10.1016/j.apergo.2016.11.001

[^4]: Aleman, A., Wang, M. & Schaeffel, F. Reading and Myopia: Contrast Polarity Matters. *Sci Rep* **8**, 10840 (2018). https://doi.org/10.1038/s41598-018-28904-x
