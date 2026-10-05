# Revisión técnica — fluye.pro

Revisión de las 4 páginas (`index.html`, `logistica/`, `agencias/`, `turismo/`), `sitemap.xml`,
`robots.txt` y `llms.txt`. Rama: `fix/revision-tecnica`. No se ha tocado copy visible, diseño,
ni se ha añadido ningún framework/build.

## Resumen de hallazgos

| Página / fichero | Problema | Severidad | Corregido | Commit |
|---|---|---|---|---|
| `index.html`, `agencias/index.html` | Las 2 etiquetas `<img>` del sitio (foto de Rober, sección "Quiénes somos") no llevaban `width`/`height`. El navegador no puede reservar el espacio antes de que cargue la imagen → salto de layout (CLS). La imagen ya se renderiza a 140×140px por CSS; se añadieron esos valores como atributos HTML. | Media | Sí | `c93700a` |
| Todas | JSON-LD: `WebPage.isPartOf` apunta al nodo `ProfessionalService` (`#fluye`) en vez de a una entidad `WebSite`. No hay ninguna entidad `WebSite` en el `@graph` de ninguna página. No genera error en los validadores de Google, pero no es el tipo esperado por la propiedad `isPartOf` (que espera `CreativeWork`, y `ProfessionalService`/`Organization` no lo es). Arreglarlo bien implica añadir un nodo `WebSite` nuevo al `@graph` de las 4 páginas, que es un cambio de estructura, no una corrección de una línea. | Baja | No | — |
| `assets/fluye.css` | Selectores CSS sin usar en ninguna de las 4 páginas actuales: `.bandeja*`, `.turismo-grid`, `.turismo-foto`, `.piloto-bloque`, `.pricing-grid`, `.tier*`, `.nota-api` (y sus variantes en media queries). Son restos de un diseño anterior de una sola página. No rompen nada (no se aplican a ningún HTML existente), solo añaden peso al CSS. No los he tocado: podríais querer conservarlos si hay planes de reutilizar esos componentes (p. ej. una futura sección de precios con tiers). | Baja | No | — |

## Categorías revisadas sin problemas (nada que corregir)

- **Enlaces**: no se ha encontrado ningún enlace roto. Todas las rutas internas usan rutas absolutas desde la raíz (`/`, `/logistica/`, `/agencias/`, `/turismo/`, `/assets/...`), por lo que funcionan igual desde cualquier profundidad. Todos los anclajes (`#contenido`, `#que-automatizamos`, `#que-hacemos`, `#que-hace`, `#contacto`, etc.) tienen su `id` correspondiente en la misma página. Los enlaces externos (WhatsApp, `mailto:`, Google Fonts) tienen formato correcto.
- **Metadatos**: `<title>`, meta description, canonical, Open Graph, Twitter Card y `lang="es"` están presentes en las 4 páginas, cada canonical apunta a la URL propia de su página, y no hay duplicados entre páginas (cada página tiene su propio título y descripción).
- **JSON-LD**: el JSON es válido (verificado con parser) en las 4 páginas. Tipos coherentes (`ProfessionalService`, `WebPage`, `FAQPage`, `Service`). El bloque `ProfessionalService` se repite idéntico en las 4 páginas, pero eso es correcto: Google procesa el JSON-LD de cada página por separado y no enlaza `@id` entre páginas distintas, así que repetir la entidad completa (en vez de solo una referencia) es la práctica recomendada. El resto de nodos (`WebPage`, `FAQPage`, `Service`) sí está adaptado por página y no menciona precios ni servicios ausentes del copy visible.
- **sitemap.xml**: incluye las 4 URLs, con barra final coherente con el `canonical` de cada página.
- **robots.txt**: apunta al sitemap y no bloquea nada.
- **llms.txt**: refleja la estructura actual (portada + 3 landings) y no contradice el copy visible ni inventa cifras.
- **Básicos**: un solo `<h1>` por página, jerarquía de encabezados correcta (h1 → h2 → h3 sin saltos), imágenes con `alt` (ya corregido lo de `width`/`height`). Ninguna imagen de `assets/` pesa más de 300 KB (la más pesada es `playa_papagayo.jpg`, 182 KB); no se ha recomprimido ninguna.
- **Móvil**: revisión del CSS (sin navegador, según lo pedido). El nav y los enlaces a las 3 landings están visibles en móvil. Todos los grids con columnas fijas (`.funciones-lista`, `.pasos-grid`, `.quienes-grid`, `.camino`, `.modalidad`, `.ad-fila`) tienen su `@media` que los pasa a una columna antes de que puedan desbordar. No se ha detectado ningún ancho fijo ni `100vw` que pueda provocar scroll horizontal.

## Nota de contenido (no es un bug, solo una observación)

`logistica/` y `turismo/` no tienen sección "Quiénes somos" (sí la tienen `index.html` y `agencias/`), y `turismo/` no tiene FAQ (sí la tienen `logistica/` y `agencias/`). No es un error técnico — puede ser una decisión de contenido — pero lo señalo porque rompe la simetría entre landings. Lo dejo para tu valoración, no he tocado nada de copy ni estructura de secciones.

## Resumen

- **Corregido**: falta de `width`/`height` en las 2 imágenes del sitio (commit `c93700a`), para evitar salto de layout.
- **Revisado y sin problemas**: enlaces (internos y externos), metadatos por página, JSON-LD (válido y coherente), `sitemap.xml`, `robots.txt`, `llms.txt`, un solo `h1` por página, peso de imágenes, y CSS responsive (sin desbordes horizontales detectables por lectura de código).
- **Dejo para tu decisión** (no son errores inequívocos, son juicios de alcance):
  1. El `WebPage.isPartOf` del JSON-LD apunta a la entidad de la empresa en vez de a una entidad `WebSite` — arreglarlo bien requiere añadir un nodo nuevo al `@graph`, no es una corrección de una línea.
  2. CSS sin usar (`.bandeja*`, `.tier*`, `.pricing-grid`, `.turismo-grid/.turismo-foto`, `.piloto-bloque`, `.nota-api`) — no rompe nada, solo pesa de más; podríais querer conservarlo para reutilizar más adelante.
  3. Asimetría de secciones entre landings (Quiénes somos / FAQ presentes en unas páginas y no en otras) — es contenido, no técnica, así que solo lo reporto.

No se ha tocado copy visible, diseño, colores, tipografías ni se ha añadido ninguna dependencia. Solo hay un commit de código (`c93700a`) más este informe.
