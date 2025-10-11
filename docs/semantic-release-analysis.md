# Análisis de Semantic Release - Monorepo

## 📋 Estado Actual

### Configuración Global

**Ubicación:** `.releaserc.json` (raíz del monorepo)

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "pnpm-lock.yaml", "CHANGELOG.md"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
}
```

### Estructura del Monorepo

```
yacosta-portfolio-monorepo/
├── package.json (sin versión, script "semantic-release")
├── .releaserc.json (configuración global)
├── apps/
│   ├── portfolio/ (version: 0.0.1, tiene deps de semantic-release)
│   └── api/ (version: 0.0.1, sin deps de semantic-release)
└── pnpm-workspace.yaml (packages: 'apps/*')
```

### Versiones en Packages

- **Root**: sin campo `version` (correcto para monorepo privado)
- **apps/portfolio**: `0.0.1` (estática, no actualizada automáticamente)
- **apps/api**: `0.0.1` (estática, no actualizada automáticamente)

### Workflow de CI/CD

**Archivo:** `.github/workflows/deploy.yml`

```yaml
- name: 🚀 Semantic Release
  run: npx semantic-release
  env:
    GITHUB_TOKEN: ${{ env.PBOT_GITHUB_TOKEN }}
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Se ejecuta en:
- Push a `main`
- Workflow manual

## 🔍 Análisis de Problemas

### ❌ Problema 1: Configuración de Monorepo Incompleta

**Estado actual:** La configuración de semantic-release es **global** pero no está adaptada para manejar múltiples paquetes independientes.

**Síntomas:**
- Solo se genera un `CHANGELOG.md` en la raíz
- Solo se commitea `package.json` raíz (que no tiene versión)
- No se actualizan las versiones en `apps/*/package.json`
- No hay releases separados por aplicación

**Impacto:**
- ❌ Los cambios en `apps/api` no generan releases independientes
- ❌ Los cambios en `apps/portfolio` no generan releases independientes
- ❌ No hay CHANGELOGs separados por app
- ❌ Las versiones en los packages son estáticas (0.0.1)

### ❌ Problema 2: Plugin @semantic-release/npm No Configurado

**Estado actual:** El plugin está instalado (presente en `pnpm-lock.yaml`) pero **NO está en `.releaserc.json`**.

**Impacto:**
- ❌ No se actualizan las versiones en `package.json` de las apps
- ❌ No se publican paquetes (aunque sean privados, el plugin actualiza versiones)

### ❌ Problema 3: Falta Estrategia de Versionado Multi-Package

**Opciones no implementadas:**
1. **Versión unificada** (todas las apps comparten versión): requiere plugin `@semantic-release/npm` o `@semantic-release/exec` para actualizar todos los `package.json`
2. **Versiones independientes** (cada app tiene su versión): requiere múltiples ejecuciones de semantic-release con configuraciones específicas

**Estado actual:** Ninguna estrategia implementada

## ✅ Soluciones Propuestas

### Opción 1: Versionado Unificado (Recomendado para este caso)

Todas las apps comparten la misma versión. Cualquier cambio incrementa la versión de todo el monorepo.

**Ventajas:**
- ✅ Simple de mantener
- ✅ Coherencia entre apps
- ✅ Un solo CHANGELOG
- ✅ Ideal para apps que se despliegan juntas

**Implementación:**

1. **Actualizar `.releaserc.json`:**

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        "npmPublish": false
      }
    ],
    [
      "@semantic-release/exec",
      {
        "prepareCmd": "pnpm -r exec npm version ${nextRelease.version} --no-git-tag-version"
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": [
          "package.json",
          "apps/*/package.json",
          "pnpm-lock.yaml",
          "CHANGELOG.md"
        ],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    "@semantic-release/github"
  ]
}
```

2. **Instalar dependencias faltantes:**

```bash
cd /Users/acosta/Dev/yacosta738.github.io
pnpm add -D -w @semantic-release/npm @semantic-release/exec @semantic-release/github
```

3. **Agregar versión al `package.json` raíz:**

```json
{
  "name": "yacosta-portfolio-monorepo",
  "version": "0.0.0-development",
  "private": true,
  ...
}
```

### Opción 2: Versiones Independientes (Más Complejo)

Cada app tiene su propia versión y release notes.

**Ventajas:**
- ✅ Releases independientes por app
- ✅ CHANGELOGs separados
- ✅ Versionado semántico por aplicación

**Desventajas:**
- ❌ Más complejo de configurar
- ❌ Requiere múltiples ejecuciones de semantic-release
- ❌ Necesita filtrado de commits por app

**Implementación:**

Requiere:
- Múltiples `.releaserc.json` (uno por app)
- Scripts separados en CI/CD
- Plugin como `@semantic-release/monorepo` o lógica custom
- Conventional commits con scope (ej: `feat(api): ...`, `feat(portfolio): ...`)

### Opción 3: Hybrid (No Recomendado para este Proyecto)

Solo una app usa semantic-release, la otra no.

## 📊 Recomendación

**Para este proyecto: Opción 1 - Versionado Unificado**

**Razones:**
1. Las apps están relacionadas (portfolio + API del portfolio)
2. Se despliegan juntas en el mismo workflow
3. Simplifica mantenimiento
4. Coherencia en versiones

## 🚀 Plan de Implementación

### Fase 1: Configuración Básica

1. ✅ Agregar `@semantic-release/npm` al `.releaserc.json`
2. ✅ Agregar `@semantic-release/exec` para actualizar versiones en apps
3. ✅ Actualizar assets en `@semantic-release/git` para incluir `apps/*/package.json`
4. ✅ Agregar versión inicial al `package.json` raíz

### Fase 2: Testing

1. ✅ Crear un commit de prueba con conventional commit
2. ✅ Ejecutar `npx semantic-release --dry-run` localmente
3. ✅ Verificar que las versiones se actualizan correctamente

### Fase 3: Despliegue

1. ✅ Merge a `main`
2. ✅ Verificar ejecución del workflow
3. ✅ Revisar release generado
4. ✅ Verificar tags y CHANGELOG

## 📝 Comandos Útiles

```bash
# Dry run local (sin commits reales)
npx semantic-release --dry-run

# Ver qué versión se generaría
npx semantic-release --dry-run --no-ci

# Ejecutar semantic-release manualmente
GITHUB_TOKEN=xxx npx semantic-release

# Actualizar versiones manualmente (temporal)
pnpm -r exec npm version 1.0.0 --no-git-tag-version
```

## 🔗 Referencias

- [Semantic Release Docs](https://semantic-release.gitbook.io/)
- [Semantic Release NPM Plugin](https://github.com/semantic-release/npm)
- [Semantic Release Exec Plugin](https://github.com/semantic-release/exec)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [PNPM Workspaces](https://pnpm.io/workspaces)

## 📌 Notas Adicionales

### Convenciones de Commits

Asegúrate de usar conventional commits para que semantic-release funcione:

- `feat:` → minor version bump (0.1.0 → 0.2.0)
- `fix:` → patch version bump (0.1.0 → 0.1.1)
- `feat!:` o `BREAKING CHANGE:` → major version bump (0.1.0 → 1.0.0)

### Configuración en Apps Individuales

Si decides usar versiones independientes más adelante:

**apps/api/.releaserc.json:**
```json
{
  "extends": "../../.releaserc.json",
  "tagFormat": "api-v${version}",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],
    "@semantic-release/npm",
    ["@semantic-release/git", {
      "assets": ["package.json", "CHANGELOG.md"]
    }],
    "@semantic-release/github"
  ]
}
```

**apps/portfolio/.releaserc.json:**
```json
{
  "extends": "../../.releaserc.json",
  "tagFormat": "portfolio-v${version}",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],
    "@semantic-release/npm",
    ["@semantic-release/git", {
      "assets": ["package.json", "CHANGELOG.md"]
    }],
    "@semantic-release/github"
  ]
}
```

Y ejecutar en CI/CD:
```bash
pnpm --filter=api -C apps/api run semantic-release
pnpm --filter=portfolio -C apps/portfolio run semantic-release
```
