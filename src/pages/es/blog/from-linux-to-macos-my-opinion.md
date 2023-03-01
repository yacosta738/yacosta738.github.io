---
title: De Linux a macOS. Mi opinión
description: Después de pasar de Linux a MacOS, me encontré con algunas
  limitaciones como la falta de funciones básicas como cortar archivos, la
  imposibilidad de escribir en el sistema de archivos NTFS, la dificultad para
  acomodar a gusto cada ventana en el escritorio, la imposibilidad de crear un
  fichero desde el explorador de archivos y la ausencia de Docker nativo en
  MacOS. Sin embargo, se destaca el rendimiento, el ecosistema totalmente
  integrado, la gran variedad de software disponible y la integración con los
  diversos ecosistemas de desarrollo.
date: 2023-01-19T17:48:28.127Z
lang: es
cover: https://images.unsplash.com/photo-1619462729253-362aa7eb5db5?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=4800
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - Linux
  - macOS
categories:
  - Sistemas operativos y herramientas
draft: false
---
![macos](https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80 'macos')

Hace varios meses, comencé a usar MacOS como mi sistema operativo principal. Para mi sorpresa, la transición desde Linux, especialmente desde [Archlinux](https://archlinux.org/), no fue tan sencilla como pensaba. Antes de usar MacOS, tenía la idea de que era fácil de usar para usuarios expertos y aquellos que no se llevan bien con la tecnología.

Mi primera sorpresa fue que las operaciones básicas como cortar archivos no eran muy claras para mí. Después de investigar y de que un amigo me dijo que esta operación se hacía con `cmd + option + v`, fue bastante frustrante durante mis primeros días de usar el sistema operativo.

El segundo problema al que me enfrenté rápidamente fue que no soporta la escritura en sistema de archivos NTFS de Microsoft. Esto complicaba modificar archivos en mis discos duros extraíbles o memorias USB, incluso en las últimas versiones del sistema operativo. Existen diversos programas que implementan esta característica, pero la mayoría son de pago.

Tercero, el sistema de ventanas no tiene la facilidad para acomodar a gusto cada ventana en el escritorio, como sí tiene Windows y todos los entornos de escritorio de las distintas distros GNU/Linux. Afortunadamente, existe una herramienta llamada [Rectangle](https://rectangleapp.com/) que nos permite acomodar las ventanas de forma simple mediante atajos.

Cuarto, no permite crear un fichero desde el explorador de archivos. Aunque estoy acostumbrado a operar desde la terminal, me parece una funcionalidad que todos los usuarios sacaríamos provecho de tener. Esto nos evitaría abrir un editor de texto o crear el archivo por consola.

Quinto, esta característica entiendo que no afecta a todos, pero a mí como desarrollador que vengo de Linux, sí me afectó. El hecho de que [Docker](https://www.docker.com/) no es nativo en MacOS es una limitante en cuanto a rendimiento. Antes, en [Archlinux](https://archlinux.org/), usaba muchas aplicaciones dockerizadas y el consumo de recursos era imperceptible. Existe una alternativa llamada [Colima](https://github.com/abiosoft/colima), pero sigue usando una máquina virtual para ejecutar el motor de [Docker](https://www.docker.com/).

Hablemos de las cosas buenas, pues parece que solo le encontré cosas malas, pero no es así. De MacOS, me sorprende el rendimiento, lo cual ya intuía, ya que el hardware y el software están construidos por la misma empresa, por lo que es entendible que todo funcione a la perfección, debido a que no tiene que tener en cuenta los diversos hardwares como en las distribuciones Linux o Windows. Otra cosa destacable es el ecosistema totalmente integrado. Es muy fácil compartir pantalla con un iPad, copiar archivos entre dispositivos de [apple](https://www.apple.com/), entre muchas otras posibilidades. También podemos destacar la gran variedad de software disponible y la integración con los diversos ecosistemas de desarrollo existentes en la actualidad.

Ahora hablemos de las herramientas que usaba en Linux y ahora uso en MacOS, así como mi opinión personal sobre ellas. Como MacOS está basado en BSD, mis dotfiles de Linux me sirvieron casi en su totalidad. Solo tuve que hacer algunos retoques y cambiar algunas herramientas para adaptarlas a MacOS. El primer cambio en mis dotfiles fue la ubicación de las fuentes, ya que en MacOS las fuentes en `~/Library/Fonts` no pueden ser enlaces simbólicos o por lo menos a mi no me funcionaron. También tuve que cambiar la ubicación de algunos programas o carpetas, pero gracias a que mis dotfiles están gestionados con [Dotter](https://github.com/SuperCuber/dotter), fue bastante sencillo generalizarlos para cualquier sistema operativo.

Listas de herramientas que utilizo en mi día a día:

1. Herramientas de terminal configuradas en mis dotfiles

   1. [`exa`](https://the.exa.website/) u**na sustitución moderna para `ls`.**
   2. [`fzf`](https://github.com/junegunn/fzf) es un buscador difuso de línea de comandos de uso general.
   3. `fd` es un programa para encontrar entradas en su sistema de archivos. Es una alternativa simple, rápida y fácil de usar a `find`
   4. [bat](https://github.com/sharkdp/bat) alternativa a `cat` que soporta el resaltado de sintaxis para un gran número de lenguajes de programación y de marcado.
   5. `zoxide` es un comando `cd` más inteligente, inspirado por `z` y `autojump`.
   6. La aplicación [thefuck](https://github.com/nvbn/thefuck) es magnífica, inspirada en un [tuit de @liamosaur](https://twitter.com/liamosaur/status/506975850596536320), que corrige errores en los comandos de la consola anteriores.
   7. `prettyping` es un envoltorio alrededor de la herramienta estándar `ping` con el objetivo de hacer la salida más bonita, más colorida, más compacta y más fácil de leer.
   8. [`starship`](https://starship.rs/) es una línea de comandos cruzada. ¡La línea de comandos mínima, rápida y personalizable para cualquier shell!
   9. [`btop`](https://github.com/aristocratos/btop) monitor de recursos que muestra el uso y estadísticas para el procesador, memoria, discos, red y procesos.
   10. [`du-dust`](https://github.com/bootandy/dust) Una versión más intuitiva de du en rust
   11. `sl` Cura tu mal hábito de tipear mal.
   12. `tldr` Esto te ayuda a resumir cualquier texto en contenido conciso y fácil de digerir para que te liberes del exceso de información.
2. Herramientas para el desarrollo de software

   1. IDEs y Editores de texto

      1. La familia de JetBrains (Intellij y Fleet)
      2. VS Code
      3. Neovim con el tema [NvChad](https://nvchad.com/)
   2. Docker (Colima)
   3. Rust
   4. Java/Kotlin
   5. NodeJs
   6. Postman
   7. Notion
   8. [Sdkman](https://sdkman.io/)
   9. [fnm](https://github.com/Schniz/fnm)
3. La terminal en Linux usaba [Alacritty](https://github.com/alacritty/alacritty), que está escrita en Rust, por lo que en MacOS también se puede usar. Sin embargo, existe una mejor alternativa llamada [Warp](https://app.warp.dev/referral/26QGQ6), que a pesar de estar escrita en Rust, solo tiene soporte para MacOS por el momento. Esta herramienta es una de las que más me ha llamado la atención de las terminales de los últimos años. Su eslogan es "la terminal del siglo XXI" y literalmente es así, pues parece un IDE, además de que usa Inteligencia Artificial para sugerirte cuándo te has equivocado o cómo ejecutar un comando.
4. En Linux, usaba [Ulauncher](https://ulauncher.io/) para mejorar mi productividad diaria frente al ordenador. Las extensiones y scripts personalizados me permitían ser mucho más eficiente. Con MacOS, la cosa cambió con la llegada de [Raycast](https://www.raycast.com/), escrito en Rust y, por ahora, solo disponible para MacOS. [Raycast](https://www.raycast.com/) supera con creces a [Ulauncher](https://ulauncher.io/), ofreciendo un mejor rendimiento, así como extensiones para casi todo, con un excelente soporte. Desde que lo uso, no he tenido ningún problema, a diferencia de [Ulauncher](https://ulauncher.io/) en Linux, que, de vez en cuando, presentaba alguna incompatibilidad con algunas de sus extensiones.
5. Descubrí [Rectangle](https://rectangleapp.com/) para el ecosistema de MacOS, ya que la gestión de ventanas de MacOS no es tan buena como en otros sistemas operativos. Esta herramienta satisface las necesidades y deficiencias de MacOS para la gestión de ventanas.
6. [Rocket](https://matthewpalmer.net/rocket/) solo está disponible para macOS y nos permite usar emojis directamente al escribir usando un desencadenador como (:check).

### Conclusiones

En conclusión, macOS es un sistema operativo muy robusto, con una robusta seguridad, excelente rendimiento y una amplia gama de herramientas para satisfacer las necesidades de los usuarios. Cuando me cambié de Linux a macOS, no fue tan sencillo como esperaba, pero con el uso y el tiempo he aprendido a adaptar mis dotfiles y a encontrar herramientas equivalentes para realizar las mismas tareas que solía hacer en Linux. El ecosistema de macOS también está lleno de aplicaciones de terceros que pueden ayudarlo a completar aún más tareas, como edición de audio y vídeo, diseño gráfico, desarrollo web, etc. Estas aplicaciones aseguran que macOS siga siendo un sistema operativo de primera clase para los usuarios de Mac.