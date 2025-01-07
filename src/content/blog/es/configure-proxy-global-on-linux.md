---
title: Configurar proxy global en linux
description: En este artículo comparto algunos consejos para configurar Internet a través de un proxy global en los sistemas operativos GNU/Linux.
date: 2020-12-06
cover: /images/portada-proxy.webp
author: 'Yuniel Acosta'

tags:
  - Proxy
  - Linux
  - VPN
categories:
  - OS & Tools
draft: false
---

![background](/images/portada-proxy.webp)

En los sistemas operativos GNU/Linux cuando estamos detrás de un servidor proxy, puede resultar un poco engorroso usar programas que no tienen su propia configuración de proxy o comandos como **apt-get**, o simplemente queremos configurar el proxy global para que toda la computadora use internet. Muchas de las distribuciones GNU/Linux utilizan diferentes administradores de paquetes que se configuran de diferentes formas, además hay muchos programas que necesitan sus especificaciones para configurar la salida de Internet a través de un servidor proxy. Todo este proceso se vuelve muy engorroso de hacer en entornos donde usas un proxy con autenticación y cambia de vez en cuando o usas un portátil donde constantemente puedes configurar un proxy global en los sistemas operativos GNU/Linux conectarte a redes donde está el proxy no utilizado. Imagina cambiar todas las configuraciones cada vez que cambias de red.

![Proxy schema](/images/proxy-schema.webp 'Configure proxy global on linux')

A continuación veremos como configurar un proxy en algunas de las distros GNU/Linux

![Proxy global](/images/proxy-global.webp)

## Configurar proxy en la terminal

Si queremos usar un proxy en la terminal de forma temporal, podemos ejecutar el siguiente comando:

```shell
    export http_proxy=http://username:password@proxyserver:puerto
    export https_proxy=$http_proxy
```

## Configurar variables de entorno para la familia de distribución Debian|Ubuntu:

Editar el archivo `/etc/environment` con tu editor de texto favorito.

```shell
    sudo vim /etc/environment
```

Agregamos las siguientes líneas al archivo, necesitamos duplicar las líneas en mayúsculos y minúsculas porque (desgraciadamente) algunos programas solo buscan por una forma u otra:

```text
    http_proxy http://username:password@proxyserver:puerto
    https_proxy http://username:password@proxyserver:puerto
    ftp_proxy http://username:password@proxyserver:puerto
    no_proxy localhost,127.0.0.1,localaddress,.localdomain.com
    #Duplicadas en mayúsculas
    HTTP_PROXY http://username:password@proxyserver:puerto
    HTTPS_PROXY http://username:password@proxyserver:puerto
    FTP_PROXY http://username:password@proxyserver:puerto
    NO_PROXY localhost,127.0.0.1,localaddress,.localdomain.com
```

## Configurar variables de entorno para distribuciones GNU/linux de la familia RedHat|Fedora|Centos:

```shell
    sudo vim /etc/profile.d/proxy.sh
```

Modificamos los parámetros necesarios según corresponda:

```text
    export http_proxy="http://username:password@proxyserver:puerto/"
    export https_proxy="http://username:password@proxyserver:puerto/"
    export ftp_proxy="http://username:password@proxyserver:puerto/"
```

## Configurar proxy para apt-get, apt y aptitude:

Creamos o editamos el archivo `/etc/apt/apt.conf`

```shell
    sudo vim /etc/apt/apt.conf
```

Agregamos las siguientes líneas:

```text
    Acquire::http::Proxy "http://username:password@proxyserver:puerto";
    Acquire::https::Proxy "http://username:password@proxyserver:puerto";
    Acquire::ftp::Proxy "http://username:password@proxyserver:puerto";
    #En caso de tener un repo local para el que no necesitemos proxy
    Acquire::http::Proxy {
    repositorio.localdomain.com DIRECT;
    repositorio2.localdomain.com DIRECT;
    };
```

## Configurar proxy para yum:

Editar archivo `/etc/yum.conf`

```text
    # proxy server address and port
    proxy=http://proxyserver:puerto
    # user and password
    proxy_username=usuario
    proxy_password=contraseña
```

## Configurar proxy para pacman:

Editamos el fichero `/etc/pacman.conf` y debemos descomentar `XferCommand` de la siguiente manera:

```text
    XferCommand = /usr/bin/wget --passive-ftp -c -O %o %u
```

![pacman.conf.webp](/images/pacman.conf.webp)

Guardamos los cambios y procedemos a editar el fichero de configuración para `wget`, herramienta utilizada para la descarga de paquetes.

```shell
    sudo vim /etc/wgetrc
```

Editamos el archivo de configuración `/etc/wgetrc` buscamos las siguientes líneas y las descomentamos o agregamos al final del archivo.

```shell
    https_proxy = http://username:password@proxyserver:puerto
    http_proxy = http://username:password@proxyserver:puerto
    ftp_proxy = http://username:password@proxyserver:puerto
    use_proxy = on
```

## Configuración de proxy para nodejs(npm)

```shell
    npm config set proxy http://username:password@proxyserver:puerto
    npm config set https-proxy http://username:password@proxyserver:puerto
```

## Configurar proxy para Git

```shell
    git config --global http.proxy http//proxyserver:puerto
    git config --global https.proxy https//proxyserver:puerto
    # En caso de tener conexión directa y necesitemos quitarle la configuración de proxy a git
    git config --global --unset http.proxy
    git config --global --unset https.proxy
```

Como se puede apreciar es muy complejo mantener constantemente la configuración de un proxy en tu pc, pero por suerte existen otras opciones que te permiten configurar un proxy de forma global a todo el sistema operativo. En sistemas como Windows o MacOS existen herramientas como Proxifier, ProxyCap entre otras que facilitan la salida a internet a través de un proxy por otra parte sistemas operativos GNU/Linux tenemos alternativas a estos programas como las listadas a continuación.

# Redsock

[Redsock](https://github.com/darkk/redsocks) es una herramienta que permite redirigir cualquier conexión TCP a SOCKS o proxy HTTPS usando su firewall, por lo que la redirección puede ser en todo el sistema o en toda la red. Esta herramienta es muy útil porque nos permite con un solo archivo de configuración poder usar la conexión a través del proxy en todo el sistema operativo.

## Paquetes para las distintas distribuciones linux

---

- Archlinux/Manjaro: [redsocks-git](https://aur.archlinux.org/packages/redsocks-git)
- Debian: [redsocks](http://packages.debian.org/search?searchon=names&keywords=redsocks)
- Gentoo (zugaina overlay): [redsocks](http://gpo.zugaina.org/net-proxy/redsocks)
- Gentoo: [redsocks](https://packages.gentoo.org/packages/net-proxy/redsocks)
- Ubuntu: [redsocks](https://packages.ubuntu.com/search?searchon=names&keywords=redsocks)

## Compilación manual de redsock

Para compilar redsock necesitamos clonar su repositorio en GitHub <https://github.com/darkk/redsocks> y seguir las instrucciones en el **README.md**. Es necesario que en nuestro sistema esté instalado **[libevent-2.0.x](http://libevent.org/)**, al igual que los compiladores `gcc` y `clang`. La compilación es tan fácil como ejecutar `make` en el directorio raíz del proyecto.

## Ejecutar redsock

Ejecutar redsock depende mucho de la distribución que estés usando y de la forma en la que el paquete instaló redsock. El programa
tiene las siguientes opciones de línea de comando:

- **\-c** especifica el camino al archivo de configuración (`./redsocks.conf` es el usado por defecto)
- **\-t** esta opción verifica la sintaxis del archivo de configuración.
- **\-p** establece un archivo para escribir el `getpid()` donde se especifican las siguientes señales: `SIGUSR1` vuelca la lista de clientes conectados al registro, `SIGTERM` y `SIGINT` terminan el demonio, se cierran todas las conexiones activas.

Puedes ver un ejemplo del archivo de configuración en [redsocks.conf.example](https://github.com/darkk/redsocks/blob/master/redsocks.conf.example).

### Ejemplo de iptables

Tienes que construir iptables con seguimiento de conexión y objetivo `REDIRECT`.

```text
  # Create new chain
  root# iptables -t nat -N REDSOCKS

  # Ignore LANs and some other reserved addresses.
  # See http://en.wikipedia.org/wiki/Reserved_IP_addresses#Reserved_IPv4_addresses
  # and http://tools.ietf.org/html/rfc5735 for full list of reserved networks.
  root# iptables -t nat -A REDSOCKS -d 0.0.0.0/8 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 10.0.0.0/8 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 100.64.0.0/10 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 127.0.0.0/8 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 169.254.0.0/16 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 172.16.0.0/12 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 192.168.0.0/16 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 198.18.0.0/15 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 224.0.0.0/4 -j RETURN
  root# iptables -t nat -A REDSOCKS -d 240.0.0.0/4 -j RETURN

  # Anything else should be redirected to port 12345
  root# iptables -t nat -A REDSOCKS -p tcp -j REDIRECT --to-ports 12345

  # Any tcp connection made by `luser' should be redirected.
  root# iptables -t nat -A OUTPUT -p tcp -m owner --uid-owner luser -j REDSOCKS

  # You can also control that in more precise way using `gid-owner` from
  # iptables.
  root# groupadd socksified
  root# usermod --append --groups socksified luser
  root# iptables -t nat -A OUTPUT -p tcp -m owner --gid-owner socksified -j REDSOCKS

  # Now you can launch your specific application with GID `socksified` and it
  # will be... socksified. See following commands (numbers may vary).
  # Note: you may have to relogin to apply `usermod` changes.
  luser$ id
  uid=1000(luser) gid=1000(luser) groups=1000(luser),1001(socksified)
  luser$ sg socksified -c id
  uid=1000(luser) gid=1001(socksified) groups=1000(luser),1001(socksified)
  luser$ sg socksified -c "firefox"

  # If you want to configure socksifying router, you should look at
  # doc/iptables-packet-flow.png, doc/iptables-packet-flow-ng.png and
  # https://en.wikipedia.org/wiki/File:Netfilter-packet-flow.svg
  # Note, you should have proper `local_ip' value to get external packets with
  # redsocks, default 127.0.0.1 will not go. See iptables(8) manpage regarding
  # REDIRECT target for details.
  # Depending on your network configuration iptables conf. may be as easy as:
  root# iptables -t nat -A PREROUTING --in-interface eth_int -p tcp -j REDSOCKS
```

Redsock es una de mis herramientas favoritas para configurar todo mi tráfico a internet a través de un proxy usando el protocolo TCP. A continuación les muestro otra alternativa más reciente que resulta muy interesante y de fácil configuración.

# Proxifier-For-Linux

Proxifier-For-Linux es una herramienta que actúa como un intermediario entre el servidor proxy y los programas clientes que necesiten acceso a internet. Proxifier trabaja a través de los servidores proxy en nombre de los otros programas. Proxifier actúa como un punto global para configurar las reglas de proxy, que se aplicarán a todos los programas del sistema. Como mencioné anteriormente es un proyecto nuevo por lo que actualmente solo tiene soporte para proxies http.

Como se explica en el repositorio oficial de [Proxifier-for-linux](https://github.com/m0hithreddy/Proxifier-For-Linux) nuestro sistema operativo debe contar con las siguientes dependencias.

## Dependencias

A continuación se muestra la lista de dependencias requeridas para compilar y ejecutar Proxifier, asi como la posible instalación en dependencia del sistema operativo que uses.

### Instalar las dependencias

Para comprobar si tienes ya las dependencias instaladas puedes usar el comando `which <nombre del paquete>`. Ejemplo `which autoconf` y si te devuelve la ruta es que ya esa dependencia está instalada.

- [autoconf](https://github.com/autotools-mirror/autoconf) \[sudo apt install autoconf]
- [automake](https://github.com/autotools-mirror/automake) \[sudo apt install automake]
- [libtool](https://github.com/autotools-mirror/libtool) \[sudo apt install libtool]
- [txt2man](https://github.com/mvertes/txt2man) \[sudo apt install txt2man]

## Descargar Proxifier

Obtén la última versión estable de Proxifier clonando el repositorio de GitHub.

```shell
  git clone https://github.com/m0hithreddy/Proxifier-For-Linux.git && cd Proxifier-For-Linux
```

## Construir e Instalar

Después de instalar todas las dependencias, obtén el código fuente de Proxifier y dentro del directorio donde está el código ejecuta los siguientes comandos:

```shell
autoreconf -vfi
./configure
make all
sudo make uninstall
sudo make install
```

## Como usar Proxifier

El servicio de Proxifier se puede habilitar ejecutando el comando:

```shell
sudo systemctl daemon-reload # Reload the service units
sudo systemctl start proxifier
```

Para más información de Proxifier puedes consultar la ayuda ejecutando el comando `man proxifier`. El archivo de configuración se puede encontrar en la ruta `/usr/local/etc/proxifier.conf` donde puedes especificar la configuración de tu proxy.

La siguiente herramienta que te quiero mostrar es Proxychains

# Proxychains

[Proxychains-ng](https://github.com/haad/proxychains) es un servidor proxy que soporta los protocolos de internet HTTPs, SOCKS4 y SOCKS5 y funciona en plataformas basadas en Unix. Permite que cualquier conexión TCP hecha por un programa siga una serie de proxies(de los protocolos antes mencionados) hasta su destino. La lista de proxies así como la estrategia de selección de los proxies se definen con anterioridad.

## Instalar proxychains

Proxychains está disponible con [pkgsrc](https://github.com/haad/proxychains) para todos los que lo usen en Linux, NetBSD, FreeBSD, OpenBSD, DragonFlyBSD o Mac OS X. Solo necesita instalar pkgsrc-wip y ejecutar `make install` en un el directorio `wip/proxychains`

### Instalar proxychains desde el código fuente

Clonar el código fuente de GitHub y ejecutar los siguientes comando:

```shell
 git clone https://github.com/haad/proxychains.git && cd proxychains
 # se necesita un compilador de C, preferiblemente gcc
 ./configure
 make
 sudo make install
```

### Paquetes para las distintas distribuciones linux

---

- Archlinux/Manjaro: [proxychains-ng/](https://archlinux.org/packages/?sort=&q=proxychains-ng&maintainer=&flagged=)
- Debian: [proxychains](https://packages.debian.org/search?keywords=proxychains)
- Gentoo: [proxychains](https://packages.gentoo.org/packages/net-misc/proxychains)
- Fedora: [proxychains-ng](https://pkgs.org/download/proxychains-ng)
- Ubuntu: [proxychains](http://packages.ubuntu.com/search?searchon=names&keywords=proxychains)

## Configuración

Proxychains busca la configuración en el siguiente orden:

- Puerto proxy SOCKS5 en la variable de entorno **${PROXYCHAINS_SOCKS5}** (si se establece, no se buscarán más configuraciones)
- Archivo listado en la variable de entorno **${PROXYCHAINS_CONF_FILE}** o proporcionado como un argumento -f para el script o binario de proxychains.
- ./proxychains.conf
- $(HOME)/.proxychains/proxychains.conf
- /etc/proxychains.conf

Ver más de la configuración en el archivo `/etc/proxychains.conf`

### Ejemplo de como configurar varios proxies

Al final del fichero `/etc/proxychains.conf` se encuentra la lista donde podemos agregar nuestros proxies. Las estrategias de selección de proxies varían entre `dynamic_chain, strict_chain, round_robin_chain, random_chain` y solo uno puede estar descomentado.

- dynamic_chain: Dinámico: cada conexión se realizará a través de proxies encadenados, todos los proxies encadenados en el orden en que aparecen en la lista, al menos un proxy debe estar en línea para jugar en cadena (se omiten los proxies muertos) de lo contrario, EINTR se devuelve a la aplicación

- strict_chain: Estricto: cada conexión se realizará a través de proxies encadenados, todos los proxies encadenados en el orden en que aparecen en la lista, todos los proxies deben estar en línea para jugar en cadena; de lo contrario, EINTR se devuelve a la aplicación

- round_robin_chain: Round Robin: cada conexión se realizará a través de proxies encadenados de longitud `chain_len`, todos los proxies encadenados en el orden en que aparecen en la lista, al menos un proxy debe estar en línea para jugar en cadena (se omiten los proxies muertos). el inicio de la cadena de proxy actual es el proxy después del último proxy en la cadena de proxy invocada anteriormente. Si se alcanza el final de la cadena de proxy mientras se buscan proxies, comience de nuevo desde el principio. De lo contrario, EINTR se devuelve a la aplicación. Esta semántica no está garantizada en un entorno multiproceso.

- random_chain: Aleatorio: cada conexión se realizará mediante un proxy aleatorio (o una cadena de proxy, consulte `chain_len`) de la lista.

```text
 [ProxyList]
 # add proxy here ...
 # meanwile
 # defaults set to "tor"
 socks4  127.0.0.1 9050
 #psiphon proxy
 http 127.0.0.1 52525
 socks5 127.0.0.1 42552
 #Otro Proxy
 http 192.168.1.11 8080 user password
 #Mobile proxy
 http 192.168.44.244 3128 user password
```

## Ejemplos de uso

Ejecutar `proxychains <programa a ejecutar a través de un proxy>`

```shell
proxychains telnet targethost.com
```

En este ejemplo se ejecuta el programa **telnet** a través de un proxy ( o una cadena de proxies ) especificada por **proxychains.conf**

Proxychains nos da una gran ventaja al poder encadenar muchos proxies a la vez lo que se usa mucho en ciberseguridad para ocultar la identidad de las peticiones realizadas. Una de las desventajas que tiene proxychains es que se ejecuta en la consola lo cual resulta incómodo cuando usamos programas con interfaz gráfica.

El siguiente en la lista es uno de mis favoritos pues es una VPN que permite configurar un proxy global para todo el sistema operativo así como montar un firewall en la pc.

# Windscribe

[Windscribe](https://windscribe.com/?friend=abhyp2zr) es un conjunto de herramientas que permiten bloquear los seguidores de anuncios y los beacons web, restaurar el acceso a contenido bloqueado y ayudarle a proteger su privacidad en línea. Hay dos componentes:

La aplicación de escritorio VPN (Windows, MacOS y Linux) y la extensión del navegador (Chrome, Edge, Firefox, Safari, ...)

La aplicación de escritorio es un cliente VPN (Virtual Private Network). Crea un túnel encriptado desde tu computadora a los servidores de [winscribe](https://windscribe.com/?affid=abhyp2zr), y toda tu actividad se envía a través del túnel. Esto tiene dos ventajas:

1. La dirección IP de su proveedor de servicios de Internet (ISP) está enmascarada, por lo que cualquier sitio web que visite o cualquier aplicación que utilice (Skype, proveedores de correo electrónico, BitTorrent, etc.) verá nuestra dirección IP compartida por miles de personas.
2. Su proveedor de servicios de Internet no puede ver lo que hace en línea. Esto es mucho más importante de lo que piensas.

Lo primero que se tiene que hacer es crear una cuenta en [Windscribe](https://windscribe.com/?friend=abhyp2zr) registrándose [aquí](https://windscribe.com/?friend=abhyp2zr). Windscribe nos da 2GB de consumo mensual gratis, pero si confirmamos nuestro correo electrónico este aumenta 5GB, además puedes aumentar hasta 15GB mensuales si creas un post en twitter dando en el botón _**Tweet4Data**_ en la configuración de tu cuenta.

![More data](/images/more-data.webp)

## Instalar Windscribe

Después de registrarse se descarga el cliente de escritorio o la extensión para su navegador favorito en la sesión de [Descargas](https://windscribe.com/?friend=abhyp2zr). Seguir las instrucciones del enlace de descarga en dependencia del sistema operativo que uses.

## Configuración del cliente de Windscribe para Linux

Lo primero que tenemos que hacer es arrancar el servicio de windscribe para ello ejecutamos el comando:

```shell
    sudo systemctl start windscribe
```

Una vez este corriendo el servicio de windscribe debemos configurar el proxy ejecutando el comando `windscribe proxy --host <direccion del proxy> --port <puerto> --user <usuario> --password <contraseña>`:

```shell
windscribe proxy --host 19.18.4.54 --port 3128 --user acosta --password "super password"
windscribe proxy on
```

Con los comandos anteriores configuramos y activamos windscribe para que use nuestro proxy. Ahora cuando para conectar toda las aplicaciones salgan a internet a través de Windscribe ejecutamos el comando:

```shell
windscribe connect best # Nos conecta al servidor de windscribe con mejor rendimiento
```

Para consultar la ayuda de windscribe podemos ejecutar el comando `windscribe --help`

![Windscribe Help](/images/windscribe-help.webp)

Estas son algunas de las opciones que existen para configurar la salida a internet a través de un proxy en sistemas operativos GNU/Linux. De todas las variantes mostradas en este artículo mi favorita sin dudas es windscribe por todas las facilidades que ofrece.

Espero que les sirva de ayuda en caso que quieran tener configurado de forma global un proxy en linux.
