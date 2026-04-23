# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing website for **ExportClima S.A.** — empresa chilena de ingeniería HVAC y Facility Management industrial. Desplegado en GitHub Pages en `https://juanjorquerai.github.io/exportclima-2026/`.

Sin framework, sin bundler, sin package.json. HTML + CSS + JS vanilla puro.

## Desarrollo local

```bash
# Servir localmente (cualquier opción sirve)
python3 -m http.server 8080
# o
npx serve .
```

No hay paso de build. Los cambios son inmediatos al recargar el browser.

## Despliegue

Push directo a `main` → GitHub Pages publica automáticamente (puede tardar 1–10 min en propagarse).

## Arquitectura

### Páginas

Cada página es un archivo HTML independiente con su propio `<head>` y navegación repetida:

| Archivo | Sección |
|---|---|
| `index.html` | Home / Hero |
| `nosotros.html` | Quiénes somos |
| `servicios.html` | Servicios técnicos |
| `industrias.html` | Industrias atendidas |
| `proyectos.html` | Casos y proyectos |
| `infraestructura.html` | Taller, flota, bodega |
| `contacto.html` | Cotización / Contacto |

La nav activa se marca con clase `active` en el `<a>` correspondiente a cada página.

### CSS (`assets/css/style.css`, ~300 líneas)

Un único archivo con design tokens en `:root`, sin preprocesador. Estructura interna:
1. Design tokens (`--navy`, `--bone`, `--font-serif`, `--space-*`, etc.)
2. Reset mínimo
3. Tipografía: `.eyebrow`, `.h1`–`.h3`, `.lede`, `.mono`
4. Header/nav con comportamiento sticky + backdrop blur
5. Componentes por sección: `.hero`, `.btn`, `.svc-grid`, `.strip`, etc.
6. Animaciones de entrada vía `.reveal` + `.in` (ver JS)

### JS (`assets/js/main.js`, ~60 líneas)

Vanilla JS, sin dependencias externas. Tres responsabilidades:
- **Nav toggle móvil**: toggle clase `.open` en `.nav-list`
- **Scroll reveal**: `IntersectionObserver` sobre elementos `.reveal` → agrega clase `.in`
- **Contadores animados**: `IntersectionObserver` sobre `[data-count]` con easing cúbico
- **Form demo**: feedback visual en `form.quote` (sin backend real)

### Assets

- `assets/img/` — imágenes optimizadas para producción
- `assets/logo.svg` / `assets/logo-white.svg` — logo en SVG
- `uploads/` — originales sin procesar (no se sirven en producción directamente)
- `assets/partials/head-common.html` — fragmento de referencia, no se usa vía include real

## Convenciones CSS

- Colores: siempre usar tokens (`--navy`, `--bone`, `--ink`, `--steel-*`)
- Espaciado: tokens `--space-1` a `--space-10`
- Tipografía: `--font-sans` (Inter), `--font-serif` (Source Serif 4), `--font-mono` (JetBrains Mono)
- Border-radius: `2px` en toda la UI (intencional, estilo técnico/industrial)
- Animaciones: solo `transform`, `opacity`, `clip-path` (compositor-friendly)
- Media queries breakpoints: `900px` (tablet) y `640px` (mobile)

## Identidad visual

Paleta dominante navy (`#14265a`) + bone (`#f6f4ef`). Tipografía serif para headings, mono para etiquetas técnicas. Estilo editorial técnico-industrial — sin gradientes decorativos, sin sombras exageradas.
