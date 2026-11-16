/**
 * ============================================================================
 *  📝 ARCHIVO DE CONFIGURACIÓN DEL PORTAFOLIO
 * ============================================================================
 *  Personalizado para Juan Manuel Acevedo Salazar (@Hinalador).
 *  - Los textos con { es: '...', en: '...' } se adaptan automáticamente al idioma.
 *  - Si quieres agregar tu foto de perfil o capturas de proyectos, guárdalas en
 *    /public y escribe su ruta relativa aquí (ej: avatar: './avatar.jpg').
 * ============================================================================
 */

export const profile = {
  name: 'Juan Manuel Acevedo Salazar',
  initials: 'JM',
  avatar: '',
  email: 'jacevedosalazar@gmail.com',
  phone: '+57 301 218 0621',
  available: true,

  role: {
    es: 'Desarrollador Web Full Stack en formación & Productor Multimedia',
    en: 'Full Stack Web Developer in Training & Multimedia Producer',
  },

  location: {
    es: 'Medellín, Colombia · Presencial / Remoto',
    en: 'Medellín, Colombia · On-site / Remote',
  },

  typing: {
    es: [
      'Desarrollador Web en formación',
      'Productor Multimedia (SENA)',
      'Frontend · React, Svelte & Tailwind',
      'QA Automation con Playwright',
    ],
    en: [
      'Web Developer in Training',
      'Multimedia Producer (SENA)',
      'Frontend · React, Svelte & Tailwind',
      'QA Automation with Playwright',
    ],
  },

  tagline: {
    es: 'Tecnólogo en Producción de Multimedia (SENA) y estudiante de Desarrollo de Software en Riwi. Combino criterio visual, código moderno (JavaScript, TypeScript, React, Svelte, Tailwind) y pruebas E2E con Playwright para crear experiencias web claras, rápidas y confiables.',
    en: 'Multimedia Production Technologist (SENA) and Software Development student at Riwi. I combine visual design thinking, modern web code (JavaScript, TypeScript, React, Svelte, Tailwind) and Playwright E2E testing to build clear, fast and reliable web experiences.',
  },

  cv: {
    es: './cv.pdf',
    en: './cv.pdf',
  },

  about: {
    es: [
      'Soy Tecnólogo en Producción de Multimedia graduado del SENA y actualmente me formo como Desarrollador de Software en Riwi desde Medellín, Colombia. Mi perfil une la producción y el diseño visual digital con el desarrollo web moderno.',
      'En programación trabajo con HTML5, CSS3, JavaScript, TypeScript, Tailwind CSS, Bootstrap, React y Svelte, además de automatización de pruebas End-to-End con Playwright (Page Object Model, fixtures y GitHub Actions). En el ámbito creativo manejo herramientas como Adobe Illustrator, Photoshop, Premiere y Adobe XD.',
      'Me adapto con facilidad a distintos entornos de trabajo y me esfuerzo a diario por aprender y aportar soluciones reales en equipo. Fuera de la pantalla me apasiona la música y toco la guitarra, habiendo participado en varias presentaciones como integrante de una banda.',
    ],
    en: [
      "I'm a Multimedia Production Technologist graduated from SENA and currently training in Software Development at Riwi from Medellín, Colombia. My background bridges visual design and digital production with modern web engineering.",
      'On the engineering side I build with HTML5, CSS3, JavaScript, TypeScript, Tailwind CSS, Bootstrap, React and Svelte, alongside End-to-End test automation in Playwright (Page Object Model, fixtures and GitHub Actions). On the creative side I work with Adobe Illustrator, Photoshop, Premiere and Adobe XD.',
      'I adapt quickly to new work environments and strive every day to learn and contribute practical team solutions. Away from the keyboard I love music and play guitar, having performed at multiple venues with a band.',
    ],
  },

  stats: [
    { value: '30+', label: { es: 'Repositorios públicos', en: 'Public repositories' } },
    { value: '4', label: { es: 'Sitios publicados', en: 'Live web projects' } },
    { value: '12+', label: { es: 'Tecnologías y Adobe', en: 'Tech & Adobe tools' } },
    { value: 'B1', label: { es: 'Nivel de inglés', en: 'English level' } },
  ],

  stack: [
    {
      icon: 'monitor',
      group: { es: 'Desarrollo Frontend', en: 'Frontend Development' },
      items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Svelte', 'Tailwind CSS', 'Bootstrap 5', 'Vite'],
    },
    {
      icon: 'server',
      group: { es: 'QA Automation & Herramientas', en: 'QA Automation & Tooling' },
      items: ['Playwright (E2E)', 'Page Object Model', 'Git & GitHub', 'GitHub Actions', 'Node.js', 'Python', 'ESLint & Prettier'],
    },
    {
      icon: 'layers',
      group: { es: 'Diseño & Producción Multimedia', en: 'Design & Multimedia' },
      items: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe XD', 'Adobe Premiere', 'Diseño Responsive', 'Prototipado UI'],
    },
  ],

  heroStack: ['JavaScript', 'TypeScript', 'React', 'Svelte', 'Tailwind CSS', 'Playwright'],
};

// Redes y canales de contacto directo (icon: github | linkedin | phone | mail | x | globe)
export const socials = [
  { name: 'GitHub', url: 'https://github.com/Hinalador', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/manuelsalaz7', icon: 'linkedin' },
  { name: 'WhatsApp', url: 'https://wa.me/573012180621', icon: 'phone' },
  { name: 'Email', url: 'mailto:jacevedosalazar@gmail.com', icon: 'mail' },
];

// Repositorios cargados automáticamente desde la API pública de GitHub
export const github = {
  username: 'Hinalador',
  perPage: 6,
  includeForks: false, // Oculta forks como hello-git-manuel
  // Repositorios destacados siempre al inicio
  pinned: ['Playwright-Practice', 'akira-motors', 'desastres', 'rueda-libre', 'Svelte_project', 'Entregables-Riwi'],
  // Oculta repositorios pequeños de práctica inicial o duplicados antiguos
  exclude: [
    'Hinalador',
    'Variables-operaciones-y-condicionales',
    'Mockup-1',
    'MockUp_Bootstrap1',
    'Cards',
    'vite-project',
    'Wiqaya_page',
    'wiqaya-page',
    'pag_Wiqaya_final',
    'Pagina_hermes',
    'ReactApp',
    'Tarjets_React',
    'wireact',
    'Wibootstrap',
    'gltf',
    'escenarios',
    'Actividad-escenarios-Js',
  ],
};

/**
 * PROYECTOS DESTACADOS
 */
export const projects = [
  {
    id: 'akira-motors',
    title: 'Akira Motors',
    year: 2026,
    featured: true,
    image: '',
    role: { es: 'Frontend & UI', en: 'Frontend & UI' },
    description: {
      es: 'Catálogo interactivo de motocicletas (Sport, Naked, Adventure y Urban) con animaciones fluidas, calculadora de ruta y sonidos reales de motor.',
      en: 'Interactive motorcycle catalog (Sport, Naked, Adventure and Urban) featuring smooth animations, route calculator and real engine sounds.',
    },
    longDescription: {
      es: 'Aplicación web interactiva construida con React, TypeScript y Tailwind CSS para explorar la AKR 1390 y el catálogo de Akira Motors por categorías. Integra transiciones con GSAP y Motion, telemetría y calculadora de rutas con Google Maps, y reproducción de sonidos reales de motor.',
      en: 'Interactive web application built with React, TypeScript and Tailwind CSS to explore the AKR 1390 and the Akira Motors lineup by category. Integrates GSAP and Motion animations, route/telemetry calculator with Google Maps, and real engine sound previews.',
    },
    highlights: {
      es: [
        'Interfaz moderna en React 19 + TypeScript',
        'Animaciones fluidas con GSAP y Motion',
        'Calculadora de ruta y telemetría con Google Maps',
        'Despliegue continuo en GitHub Pages',
      ],
      en: [
        'Modern UI built with React 19 + TypeScript',
        'Smooth animations powered by GSAP and Motion',
        'Route and telemetry calculator via Google Maps',
        'Continuous deployment on GitHub Pages',
      ],
    },
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    demo: 'https://hinalador.github.io/akira-motors/',
    repo: 'https://github.com/Hinalador/akira-motors',
  },
  {
    id: 'playwright-practice',
    title: 'Playwright E2E Master Suite',
    year: 2026,
    featured: true,
    image: '',
    role: { es: 'QA Automation', en: 'QA Automation' },
    description: {
      es: 'Suite escalable de pruebas automatizadas E2E con Page Object Model, Custom Fixtures, 28 casos en 3 navegadores y pipeline CI/CD.',
      en: 'Scalable E2E test automation suite using Page Object Model, Custom Fixtures, 28 cases across 3 browsers and a CI/CD pipeline.',
    },
    longDescription: {
      es: 'Proyecto de automatización de pruebas End-to-End con Playwright sobre Sauce Demo. Implementa arquitectura Page Object Model (POM), inyección con Custom Fixtures, proyectos multiusuario (standard, problem, glitch) con storageState, intercepción de red, ESLint/Prettier y ejecución automática en GitHub Actions.',
      en: 'End-to-End test automation project built with Playwright against Sauce Demo. Implements Page Object Model (POM), Custom Fixtures injection, multi-user projects via storageState, network interception, ESLint/Prettier and automated execution on GitHub Actions.',
    },
    highlights: {
      es: [
        '28 casos de prueba en Chromium, Firefox y WebKit',
        'Page Object Model y Custom Fixtures (test.extend)',
        'Autenticación multiusuario con storageState e intercepción de red',
        'Pipeline CI/CD en GitHub Actions con reportes HTML',
      ],
      en: [
        '28 test cases across Chromium, Firefox and WebKit',
        'Page Object Model and Custom Fixtures (test.extend)',
        'Multi-user auth via storageState and network mocking',
        'GitHub Actions CI/CD pipeline with HTML reports',
      ],
    },
    tags: ['Playwright', 'JavaScript', 'GitHub Actions', 'ESLint'],
    demo: '',
    repo: 'https://github.com/Hinalador/Playwright-Practice',
  },
  {
    id: 'desastres',
    title: 'Desastres Naturales',
    year: 2026,
    featured: true,
    image: '',
    role: { es: 'Frontend & Diseño', en: 'Frontend & Design' },
    description: {
      es: 'Sitio educativo responsive en español para aprender sobre fenómenos naturales, casos históricos y prevención con mapa interactivo en Leaflet.',
      en: 'Responsive educational website in Spanish exploring natural disasters, historical events and prevention with an interactive Leaflet map.',
    },
    longDescription: {
      es: 'Plataforma web informativa construida con Vite y Tailwind CSS v4. Permite explorar tipos de desastres naturales, consultar antecedentes históricos y recomendaciones de prevención, alternar entre tema claro/oscuro e interactuar con una demostración de formulario conectada a un mapa en Leaflet.',
      en: 'Informative web platform built with Vite and Tailwind CSS v4. Users can explore natural phenomena, review historical examples and prevention guides, toggle between light and dark themes, and interact with a demo form integrated with a Leaflet map.',
    },
    highlights: {
      es: [
        'Mapa interactivo integrado con Leaflet',
        'Diseño responsive con Tailwind CSS v4 y modo claro/oscuro',
        'Navegación multipágina clara y accesible',
        'Publicado en GitHub Pages',
      ],
      en: [
        'Interactive map powered by Leaflet',
        'Responsive Tailwind CSS v4 layout with light/dark mode',
        'Clean multi-page navigation and accessibility',
        'Live deployment on GitHub Pages',
      ],
    },
    tags: ['Tailwind CSS', 'Vite', 'JavaScript', 'Leaflet'],
    demo: 'https://hinalador.github.io/desastres/',
    repo: 'https://github.com/Hinalador/desastres',
  },
  {
    id: 'rueda-libre',
    title: 'Rueda Libre',
    year: 2026,
    featured: false,
    image: '',
    role: { es: 'Frontend', en: 'Frontend' },
    description: {
      es: 'Sitio web responsive para conocer flota, tarifas y reservar bicicletas en Medellín, con carrusel fotográfico y validación visual.',
      en: 'Responsive website to browse bike fleet, check pricing and book bicycles in Medellín, featuring a photo carousel and visual validation.',
    },
    longDescription: {
      es: 'Sitio web multipágina para el servicio de bicicletas Rueda Libre en Medellín. Su versión 2.0 unifica variables de marca sobre Bootstrap 5.3, clases personalizadas, carrusel fotográfico en portada y formulario de reservas en JavaScript con validación visual y modal de resumen.',
      en: 'Multi-page website for the Rueda Libre bicycle service in Medellín. Version 2.0 introduces shared brand variables over Bootstrap 5.3, custom utility classes, a hero photo carousel and a JavaScript booking form with visual validation and summary modal.',
    },
    highlights: {
      es: [
        'Tema personalizado sobre Bootstrap 5.3 y Bootstrap Icons',
        'Secciones de Inicio, Tarifas y Reservas',
        'Validación de formulario en JS con modal de resumen',
        'Publicado en GitHub Pages',
      ],
      en: [
        'Custom brand theme built on Bootstrap 5.3 and Icons',
        'Home, Pricing and Booking pages',
        'JavaScript form validation with booking summary modal',
        'Live deployment on GitHub Pages',
      ],
    },
    tags: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript'],
    demo: 'https://hinalador.github.io/rueda-libre/',
    repo: 'https://github.com/Hinalador/rueda-libre',
  },
  {
    id: 'habit-tracker',
    title: 'Habit Tracker',
    year: 2026,
    featured: false,
    image: '',
    role: { es: 'Frontend', en: 'Frontend' },
    description: {
      es: 'Aplicación web reactiva construida con Svelte y Vite para el seguimiento de hábitos diarios con barra de progreso y alertas dinámicas.',
      en: 'Reactive web app built with Svelte and Vite to track daily habits with a progress bar and dynamic milestone alerts.',
    },
    longDescription: {
      es: 'Aplicación ligera para gestionar rutinas diarias (como correr, leer o meditar). Aprovecha la reactividad nativa de Svelte para actualizar en tiempo real la barra de porcentaje, el conteo de hábitos completados, mensajes de estado según el avance y un botón de reinicio diario.',
      en: 'Lightweight app to manage daily routines (such as running, reading or meditating). Leverages Svelte native reactivity to update the completion percentage bar, finished habit counter, dynamic progress alerts and a daily reset action.',
    },
    highlights: {
      es: [
        'Reactividad de estado en tiempo real con Svelte',
        'Barra de porcentaje y conteo de hábitos completados',
        'Mensajes dinámicos de inicio, progreso y meta cumplida',
      ],
      en: [
        'Real-time reactive state built with Svelte',
        'Dynamic percentage progress bar and completion counter',
        'Contextual progress and completion alerts',
      ],
    },
    tags: ['Svelte', 'Vite', 'JavaScript'],
    demo: '',
    repo: 'https://github.com/Hinalador/Svelte_project',
  },
];

// EDUCACIÓN (de la más reciente a la más antigua)
export const education = [
  {
    title: { es: 'Formación en Desarrollo de Software', en: 'Software Development Training' },
    institution: 'Riwi · Medellín',
    period: { es: '2026 — Actualidad', en: '2026 — Present' },
    description: {
      es: 'Formación práctica en algoritmia, desarrollo web frontend y backend, TypeScript, control de versiones con Git y trabajo colaborativo en proyectos.',
      en: 'Hands-on training in algorithms, frontend and backend web development, TypeScript, Git version control and collaborative software projects.',
    },
  },
  {
    title: { es: 'Tecnología en Producción de Multimedia', en: 'Technologist in Multimedia Production' },
    institution: 'Servicio Nacional de Aprendizaje (SENA)',
    period: { es: 'Graduado en abril de 2024', en: 'Graduated April 2024' },
    description: {
      es: 'Formación tecnológica integral en diseño gráfico, producción audiovisual, diseño web, prototipado con herramientas Adobe y fundamentos de programación.',
      en: 'Comprehensive technological degree in graphic design, audiovisual production, web design, prototyping with Adobe tools and programming fundamentals.',
    },
  },
  {
    title: { es: 'Inglés Niveles A1, A2 y B1', en: 'English Levels A1, A2 & B1' },
    institution: 'Academia LCN Idiomas',
    period: '2023',
    description: {
      es: 'Programa progresivo de formación en inglés hasta alcanzar nivel intermedio B1 para lectura técnica y comunicación profesional.',
      en: 'Progressive English training program up to intermediate B1 proficiency for technical reading and professional communication.',
    },
  },
  {
    title: {
      es: 'Bachiller Académico & Media Técnica en Diseño e Integración de Multimedia',
      en: 'High School & SENA Technical Track in Multimedia Design and Integration',
    },
    institution: 'Institución Educativa Compartir',
    period: '2021',
    description: {
      es: 'Educación media académica articulada con el programa SENA en diseño visual, composición digital e integración de contenidos multimedia.',
      en: 'Academic high school degree paired with the SENA technical track in visual design, digital composition and multimedia integration.',
    },
  },
];

// CERTIFICACIONES Y CREDENCIALES
export const certifications = [
  {
    name: {
      es: 'Título de Tecnólogo en Producción de Multimedia',
      en: 'Multimedia Production Technologist Degree',
    },
    issuer: 'SENA · Regional Antioquia',
    date: '2024',
    url: 'https://drive.google.com/file/d/1V9VRUnyl85SSnG1XqrQowfuzmrDGHbuV/view?usp=drivesdk',
  },
  {
    name: {
      es: 'Acta de Grado — Producción de Multimedia',
      en: 'Graduation Certificate — Multimedia Production',
    },
    issuer: 'SENA · Regional Antioquia',
    date: '2024',
    url: 'https://drive.google.com/file/d/1oagknsY4tRHen4C1HimeYh0C5ZBkxURX/view?usp=drivesdk',
  },
  {
    name: {
      es: 'Curso de Programación Básica (29 horas)',
      en: 'Basic Programming Course (29 hours)',
    },
    issuer: 'Platzi · Cód. c56bcd13',
    date: { es: 'Dic 2024', en: 'Dec 2024' },
    url: 'https://platzi.com/@jacevedosalazar/',
  },
  {
    name: {
      es: 'Inglés Niveles A1, A2 y B1',
      en: 'English Levels A1, A2 & B1',
    },
    issuer: 'Academia LCN Idiomas',
    date: '2023',
    url: '',
  },
  {
    name: {
      es: 'Curso English Dot Works Beginner',
      en: 'English Dot Works Beginner Course',
    },
    issuer: 'Servicio Nacional de Aprendizaje (SENA)',
    date: '',
    url: '',
  },
];

/**
 * FORMULARIO DE CONTACTO
 * Con formEndpoint vacío, envía abriendo el cliente de correo (mailto:).
 */
export const contact = {
  formEndpoint: '',
};
