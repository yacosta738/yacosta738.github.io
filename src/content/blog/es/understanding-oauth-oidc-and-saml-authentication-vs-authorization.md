---
title: 'Comprendiendo OAuth, OIDC y SAML: Autenticación vs Autorización'
description: Este artículo explica las diferencias entre OAuth, OIDC y SAML,
  describiendo sus características y aplicaciones únicas. Al desglosar estos
  estándares, los lectores pueden tomar decisiones informadas sobre cuál usar
  para sus necesidades de autenticación y autorización.
date: 2023-03-29T08:59:08.027Z
cover: /images/understanding-oauth-oidc-and-saml.png
author: es/yuniel-acosta
tags:
  - Seguridad
categories:
  - Software Development
draft: false
---

![Comprendiendo OAuth, OIDC y SAML: Autenticación vs Autorización](/images/understanding-oauth-oidc-and-saml.png 'Comprendiendo OAuth, OIDC y SAML: Autenticación vs Autorización')

Si alguna vez te has preguntado cuál es la diferencia entre OAuth, OIDC y SAML, te lo aclararemos. Primero, necesitamos definir autenticación y autorización. La autenticación es el proceso de verificar la identidad de un usuario o dispositivo, mientras que la autorización es el proceso de determinar lo que un usuario o dispositivo está autorizado a hacer, después de que se establece su identidad.

En resumen:

- OAuth sirve para permitir acceso a los recursos de otra persona.
- OIDC es para verificar quién eres y permitir el acceso a los recursos de otra persona.
- SAML es para obtener acceso a diferentes recursos desde diferentes lugares con una sola tarjeta.

### OAuth (Autorización Abierta)

OAuth (2.0) es un estándar abierto para proporcionar e implementar autorización. Proporciona acceso delegado seguro, permitiendo que una aplicación actúe como un usuario y acceda a puntos finales o tome acciones en servidores como el usuario, sin requerir que el usuario inicie sesión o comparta sus credenciales. Este acceso es temporal y puede ser utilizado, por ejemplo, para acceder a la lista de contactos de un usuario en Facebook.

### OIDC (OpenID Connect)

OpenID Connect es una solución de estándar / código abierto para proporcionar e implementar un proceso de autenticación. Es compatible con la mayoría de las grandes empresas de tecnología como Google, Microsoft y GitHub. Los usuarios pueden elegir el proveedor de OpenID de terceros que deseen utilizar para iniciar sesión en cualquier sitio web que acepte el estándar OpenID. OIDC es útil para los desarrolladores que desean autenticar a los usuarios pero no están dispuestos a correr el riesgo de almacenar los registros de usuarios por su cuenta debido a aspectos de seguridad. Se puede ver como SSO para aplicaciones de consumo.

### SAML (Lenguaje de Marcado de Afirmación de Seguridad)

SAML es un estándar abierto para autenticación y autorización y se utiliza principalmente en empresas. Es un marco para inicio de sesión único (SSO), lo que significa que si inicia sesión correctamente en una aplicación de su organización, también puede acceder a otras aplicaciones sin necesidad de volver a ingresar sus credenciales. SAML utiliza XML para intercambiar mensajes de autenticación y autorización entre proveedores de identidad para verificar la identidad y los permisos del usuario, si el acceso a una aplicación se otorga o deniega. Se puede ver como SSO para aplicaciones empresariales.

### En conclusión:

- OAuth permite a una aplicación de terceros acceder a los recursos de un usuario con su permiso y sin sus credenciales de inicio de sesión.
- OIDC agrega una capa de autenticación a OAuth, lo que permite que la aplicación verifique la identidad del usuario y obtenga información básica de perfil.
- SAML se utiliza para inicio de sesión único empresarial, permitiendo que los usuarios se autentiquen con sus credenciales corporativas y accedan a los recursos empresariales.
