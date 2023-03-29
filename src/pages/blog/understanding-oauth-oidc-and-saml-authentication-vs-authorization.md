---
title: "Understanding OAuth, OIDC, and SAML: Authentication vs Authorization"
description: This article explains the distinctions between OAuth, OIDC, and
  SAML, outlining their unique features and applications. By breaking down these
  standards, readers can make informed decisions about which one to use for
  their authentication and authorization needs.
date: 2023-03-29T08:55:38.428Z
lang: en
cover: public/uploads/understanding-oauth-oidc-and-saml.png
author: Yuniel Acosta
layout: ../../components/templates/BlogPostTemplate.astro
tags:
  - Security
categories:
  - Software Development
draft: true
---
![Understanding OAuth, OIDC, and SAML: Authentication vs Authorization](public/uploads/understanding-oauth-oidc-and-saml.png "Understanding OAuth, OIDC, and SAML: Authentication vs Authorization")

If you ever wondered what the difference between OAuth, OIDC, and SAML is, we'll clarify it for you. First, we need to define authentication and authorization. Authentication is the process of verifying the identity of a user or device, while authorization is the process of determining what a user or device is allowed to do, after their identity is established.

In brief:

- OAuth is for allowing access to someone else's resources.
- OIDC is for verifying who you are and allowing access to someone else's resources.
- SAML is for gaining access to different resources from different places with one card.

### OAuth (Open Authorization)

OAuth (2.0) is an open standard for providing and implementing authorization. It provides secure delegated access, allowing an application to act as a user and access endpoints or take action on servers as the user, without requiring the user to log in or share their credentials. This access is temporary and can be used, for example, to access a user's contact list on Facebook.

### OIDC (OpenID Connect)

OpenID Connect is an open standard / open source solution for providing and implementing an authentication process. It's supported by most big tech companies like Google, Microsoft, and GitHub. Users can choose the third-party OpenID provider they want to use to log in to any website that accepts the OpenID standard. OIDC is useful for developers who want to authenticate users but are not willing to take the risk of storing user records on their own due to security aspects. You can see it as SSO for consumer applications.

### SAML (Security Assertion Markup Language)

SAML is an open standard for authentication and authorization and is mostly used in enterprises. It's a framework for single-sign-on (SSO), meaning that if you successfully log in to an application of your organization, you can also access other apps without the need to re-enter your credentials. SAML uses XML to exchange authentication and authorization messages between identity providers to verify user identity and permissions, if access to an application is granted or denied. It can be seen as SSO for enterprise applications.

### In conclusion:

- OAuth allows a third-party application to access a user's resources with their permission and without their login credentials.
- OIDC adds an authentication layer to OAuth, allowing the application to verify the user's identity and obtain basic profile information.
- SAML is used for enterprise single sign-on, allowing users to authenticate with their corporate credentials and access enterprise resources.