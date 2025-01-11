---
title: From Linux to macOS. My opinion
description: Switching from Linux to MacOS has limitations, such as lacking
  basic functions like cutting files and difficulty arranging windows on the
  desktop. But MacOS offers performance, a fully integrated ecosystem, and great
  software variety.
date: 2023-01-19T19:15:02.655Z
cover: https://images.unsplash.com/photo-1619462729253-362aa7eb5db5?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=6000
author: en/yuniel-acosta
tags:
  - en/linux
  - en/macos
categories:
  - en/tools
draft: false
---

![https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80](https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80 'macos')

Several months ago, I started using macOS as my main operating system. To my surprise, the transition from Linux, especially from [Archlinux](https://archlinux.org/), was not as easy as I thought. Before using MacOS, I had the idea that it was easy to use for both expert users and those who don't get along with technology.

My first surprise was that basic operations like cutting files weren't very clear to me. After researching and a friend telling me that this operation was done with cmd + option + v, it was quite frustrating during my first days of using the operating system.

The second problem I quickly faced was that it does not support writing in the Microsoft NTFS file system. This complicated modifying files on my removable hard drives or USB memories, even in the latest versions of the operating system. Various programs implement this feature, but most of them are paid.

Third, the window system does not have the facility to arrange each window to your liking on the desktop, as Windows and all the desktop environments of the different GNU/Linux distros do. Fortunately, there is a tool called [Rectangle](https://rectangleapp.com/) that allows us to arrange the windows in a simple way using shortcuts.

Fourth, it does not allow creating a file from the file explorer. Although I am used to operating from the terminal, I think it is a functionality that all users would benefit from having. This would save us from opening a text editor or creating the file from the console.

Fifth, I understand that this feature does not affect everyone, but as a developer from Linux, it did affect me. The fact that [Docker](https://www.docker.com/) is not native to macOS is a limitation in terms of performance. Before in [Archlinux](https://archlinux.org/), I used many dockerized applications and the resource consumption was imperceptible. There is an alternative called [Colima](https://github.com/abiosoft/colima), but it still uses a virtual machine to run the [Docker](https://www.docker.com/) engine.

Let's talk about the good things because it seems that I only found bad things, but it is not like that. About macOS, I am surprised by the performance, which I already intuited, since the hardware and the software are built by the same company, so understandably, everything works perfectly, since it does not have to take into account the various hardware as in the Linux or Windows distributions. Another remarkable thing is the integrated ecosystem. It is very easy to share the screen with an iPad, and copy files between [Apple](https://www.apple.com/) devices, among many other possibilities. We can also highlight the great variety of software available and the integration with the various development ecosystems that exist today.

Now let's talk about the tools I used in Linux and now use in macOS, as well as my personal opinion about them. Since macOS is based on BSD, my Linux dotfiles served me almost entirely. I only had to make some tweaks and change some tools to adapt them to macOS. The first change in my dotfiles was the location of the fonts since in MacOS the fonts in `~/Library/Fonts` cannot be symbolic links or at least they didn't work for me. I also had to change the location of some programs or folders, but thanks to my dotfiles being managed with [Dotter](https://github.com/SuperCuber/dotter), it was quite easy to generalize them for any operating system.

Lists of tools I use daily:

1. Terminal tools configured in my dotfiles

   1. [`exa`](https://the.exa.website/) a **modern substitute for `ls`.**
   2. [`fzf`](https://github.com/junegunn/fzf) is a general-purpose command-line fuzzy searcher.
   3. `fd` is a program to find entries in your file system. It is a simple, fast, easy-to-use alternative to `find`.
   4. [bat](https://github.com/sharkdp/bat) is an alternative to `cat` that supports syntax highlighting for a large number of programming and markup languages.
   5. `zoxide` is a smarter `cd` command, inspired by `z` and `autojump`.
   6. The [thefuck](https://github.com/nvbn/thefuck) application is great, inspired by a [tweet from @liamosaur](https://twitter.com/liamosaur/status/506975850596536320), which corrects errors in previous console commands.
   7. `prettyping` is a wrapper around the standard `ping` tool to make the output more beautiful, more colorful, more compact, and easier to read.
   8. [`starship`](https://starship.rs/) is a cross-command line. The minimal, fast, and customizable command line for any shell!
   9. [`btop`](https://github.com/aristocratos/btop) resource monitor that shows usage and statistics for the processor, memory, disks, network, and processes.[`du-dust`](https://github.com/bootandy/dust) Una versión más intuitiva de du en rust
   10. `sl` Cure your bad habit of typing badly.
   11. `tldr` helps you summarize any text into concise and easy-to-digest content so you can free yourself from excess information.

2. Software development tools

   1. Integrated Development Environments and Text Editors

      1. The JetBrains family (Intellij and Fleet).
      2. VS Code
      3. Neovim with the theme [NvChad](https://nvchad.com/).

   2. Docker (Colima)
   3. Rust
   4. Java/Kotlin
   5. NodeJs
   6. Postman
   7. Notion
   8. [Sdkman](https://sdkman.io/)
   9. [fnm](https://github.com/Schniz/fnm)

3. The Linux terminal used [Alacritty](https://github.com/alacritty/alacritty), written in Rust, so it can also be used on macOS. However, there is a better alternative called [Warp](https://app.warp.dev/referral/26QGQ6), which, despite being written in Rust, only has support for macOS at the moment. This tool is one of the most impressive terminals of recent years. Its slogan is "the terminal of the 21st century" and it is, as it looks like an IDE, plus it uses Artificial Intelligence to suggest when you have made a mistake or how to execute a command.
4. On Linux, I used [Ulauncher](https://ulauncher.io/) to improve my daily productivity on the computer. Custom extensions and scripts allowed me to be much more efficient. macOS, things changed with the arrival of [Raycast](https://www.raycast.com/), written in Rust, and, for now, only available for macOS. [Raycast](https://www.raycast.com/) far surpasses [Ulauncher](https://ulauncher.io/), offering better performance, as well as extensions for almost everything, with excellent support. Since I started using it, I haven't had any problems, unlike [Ulauncher](https://ulauncher.io/) on Linux, which occasionally presented some incompatibility with some of its extensions.
5. I discovered [Rectangle](https://rectangleapp.com/) for the macOS ecosystem since the window management of macOS is not as good as in other operating systems. This tool meets the needs and deficiencies of MacOS for window management.
6. Rocket is only available for macOS and allows us to use emojis directly when writing using a trigger such as (:check).

### Conclusions

In conclusion, macOS is a very robust operating system, with robust security, excellent performance, and a wide range of tools to meet users' needs. When I switched from Linux to macOS, it wasn't as easy as I expected, but with use and time, I have learned to adapt my dotfiles and to find equivalent tools to perform the same tasks I used to do in Linux. The macOS ecosystem is also full of third-party applications that can help you complete even more tasks, such as audio and video editing, graphic design, web development, etc. These applications ensure that macOS remains a first-class operating system for Mac users.
