---
title: 'Hibernate Tutorial: Dialects in Hibernate'
description: Hibernate requires the configuration of a SQL dialect in order to
  generate appropriate SQL statements for the specified database type. The
  org.hibernate.dialect package contains many Dialect classes for various RDBMS.
date: 2023-01-12T17:20:31.160Z
lang: en
cover: public/uploads/hibernate.webp
author: Yuniel Acosta
layout: ../../components/templates/BlogPostTemplate.astro
tags:
  - java
  - sql
  - kotlin
  - orm
categories:
  - development
  - backend
draft: false
---

![Your relational data. Objectively. - Hibernate ORM](https://hibernate.org/images/hibernate-logo.svg)

The [dialect](<(https://docs.jboss.org/hibernate/orm/3.3/reference/en/html/session-configuration.html#configuration-optional-dialects)>) specifies the type of database used in hibernate so that hibernate generates the appropriate type of SQL statements. For connecting any hibernate application with the database, it is required to provide the configuration of SQL dialect.

> Always set the `hibernate.dialect` property to the correct `org.hibernate.dialect.Dialect` subclass for your database. If you specify a dialect, Hibernate will use sensible defaults for some of the other properties listed above. This means that you will not have to specify them manually.

## Syntax of SQL Dialect

### List of SQL Dialects

There are many Dialects classes defined for RDBMS in the **org.hibernate.dialect** package. They are as follows:

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

## Conclusions

Configuring the correct SQL dialect is essential for Hibernate to communicate with the database. There are multiple Dialect classes in `org.hibernate.dialect` to choose from based on the type of database
