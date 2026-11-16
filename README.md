# Portafolio Web — Juan Manuel Acevedo Salazar

Portafolio profesional **mobile-first**, interactivo y bilingüe (**ES / EN**), construido con **Tailwind CSS v4**, **Vite** y JavaScript modular.

Sitio publicado (GitHub Pages): <https://hinalador.github.io/Portafolio/>

## Características

- **Tema oscuro por defecto + modo claro** persistido en `localStorage` con paleta personalizada (`space-indigo`, `french-blue`, `smart-blue`, `graphite`, `white-smoke`).
- **Bilingüe (`ES` / `EN`)** con cambio dinámico de interfaz, proyectos, educación y certificaciones.
- **Proyectos destacados** con filtros por tecnología y modal accesible (`<dialog>`) con detalles y enlaces a demo/código.
- **Sincronización con GitHub API** (`@Hinalador`): perfil en vivo, buscador, filtro por lenguaje, ordenamiento y caché local.
- **Animaciones e interactividad**: *typing effect*, fondo animado con cuadrícula y partículas en `<canvas>`, barra de progreso de lectura y *scroll reveal*.
- **Contacto directo y CV**: copiado rápido de correo y teléfono, enlaces a redes y descarga de hoja de vida en PDF.

## Estructura del proyecto

```text
.
├── .github/workflows/deploy.yml   # Despliegue automático a GitHub Pages
├── public/
│   ├── cv.pdf                     # Hoja de vida descargable
│   └── favicon.svg
├── src/
│   ├── js/
│   │   ├── effects.js             # Reveal on scroll, typing y partículas
│   │   ├── github.js              # Consumo y caché de la API de GitHub
│   │   ├── i18n.js                # Textos ES / EN
│   │   └── icons.js               # Iconos SVG
│   ├── data.js                    # Configuración central del contenido
│   ├── main.js                    # Lógica principal e interactividad
│   └── style.css                  # Tokens de diseño y estilos Tailwind CSS v4
├── index.html
└── vite.config.js
```

## Ejecución local

```bash
npm install
npm run dev
```

Para generar el build de producción:

```bash
npm run build
npm run preview
```
