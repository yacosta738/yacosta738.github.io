---
title: 'Tutorial Hibernate: Dialects en Hibernate'
description: Hibernate requiere la configuración de un dialecto SQL para generar
  las declaraciones SQL apropiadas para el tipo de base de datos especificado.
  El paquete org.hibernate.dialect contiene muchas clases Dialect para varios
  RDBMS.
date: 2023-01-12T17:35:05.150Z
lang: es
cover: /uploads/hibernate.webp
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - java
  - sql
  - kotlin
  - orm
categories:
  - Desarrollo de software
draft: false
---

![Your relational data. Objectively. - Hibernate ORM](https://hibernate.org/images/hibernate-logo.svg)

El [dialecto](https://docs.jboss.org/hibernate/orm/3.3/reference/en/html/session-configuration.html#configuration-optional-dialects) especifica el tipo de base de datos utilizada en hibernate para que hibernate genere los tipos de instrucciones SQL apropiadas. Para conectar cualquier aplicación de hibernate con la base de datos, se requiere proporcionar la configuración del dialecto SQL.

> Siempre establezca la propiedad `hibernate.dialect` en la subclase correcta `org.hibernate.dialect.Dialect` para su base de datos. Si especifica un dialecto, Hibernate usará valores predeterminados razonables para algunas de las otras propiedades enumeradas anteriormente. Esto significa que no tendrá que especificarlas manualmente.

## Sintaxis del dialecto SQL

### Lista de dialectos SQL

Hay muchas clases de dialectos definidos para RDBMS en el paquete **org.hibernate.dialect**. Estos son los siguientes:

| RDBMS                | Dialect                                     |
| -------------------- | ------------------------------------------- |
| Oracle (any version) | org.hibernate.dialect.OracleDialect         |
| Oracle9i             | org.hibernate.dialect.Oracle9iDialect       |
| Oracle10g            | org.hibernate.dialect.Oracle10gDialect      |
| MySQL                | org.hibernate.dialect.MySQLDialect          |
| MySQL with InnoDB    | org.hibernate.dialect.MySQLInnoDBDialect    |
| MySQL with MyISAM    | org.hibernate.dialect.MySQLMyISAMDialect    |
| DB2                  | org.hibernate.dialect.DB2Dialect            |
| DB2 AS/400           | org.hibernate.dialect.DB2400Dialect         |
| DB2 OS390            | org.hibernate.dialect.DB2390Dialect         |
| Microsoft SQL Server | org.hibernate.dialect.SQLServerDialect      |
| Sybase               | org.hibernate.dialect.SybaseDialect         |
| Sybase Anywhere      | org.hibernate.dialect.SybaseAnywhereDialect |
| PostgreSQL           | org.hibernate.dialect.PostgreSQLDialect     |
| SAP DB               | org.hibernate.dialect.SAPDBDialect          |
| Informix             | org.hibernate.dialect.InformixDialect       |
| HypersonicSQL        | org.hibernate.dialect.HSQLDialect           |
| Ingres               | org.hibernate.dialect.IngresDialect         |
| Progress             | org.hibernate.dialect.ProgressDialect       |
| Mckoi SQL            | org.hibernate.dialect.MckoiDialect          |
| Interbase            | org.hibernate.dialect.InterbaseDialect      |
| Pointbase            | org.hibernate.dialect.PointbaseDialect      |
| FrontBase            | org.hibernate.dialect.FrontbaseDialect      |
| Firebird             | org.hibernate.dialect.FirebirdDialect       |

## Conclusiones

Configurar el dialecto SQL correcto es esencial para que Hibernate se comunique con la base de datos. Hay múltiples clases Dialect en `org.hibernate.dialect` para elegir en función del tipo de base de datos.
