import './style.css';
import { profile, socials, github, projects, education, certifications, contact } from './data.js';
import { ui } from './js/i18n.js';
import { icon, hydrateIcons } from './js/icons.js';
import { fetchGitHub, languageColors } from './js/github.js';
import { observeReveals, createTyper, initParticles } from './js/effects.js';

/* ==========================================================================
   Estado y utilidades
   ========================================================================== */
const root = document.documentElement;
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const state = {
  lang: ['es', 'en'].includes(root.lang) ? root.lang : 'es',
  filter: 'all',
  gh: null, // { profile, repos }
  ghError: false,
  repoQuery: '',
  repoLang: 'all',
  repoSort: 'updated',
  repoLimit: github.perPage,
};

const t = (key) => ui[state.lang][key] ?? ui.es[key] ?? key;
const tr = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? (v[state.lang] ?? v.es) : v);
const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const isExternal = (url) => /^https?:\/\//.test(url);
const linkAttrs = (url) => (isExternal(url) ? 'target="_blank" rel="noopener noreferrer"' : '');

/* ==========================================================================
   Textos estáticos (i18n)
   ========================================================================== */
function renderStatic() {
  root.lang = state.lang;
  document.title = `${profile.name} · ${tr(profile.role)}`;
  $('meta[name="description"]')?.setAttribute('content', t('meta.description'));

  $$('[data-i18n]').forEach((el) => (el.textContent = t(el.dataset.i18n)));
  $$('[data-i18n-placeholder]').forEach((el) => (el.placeholder = t(el.dataset.i18nPlaceholder)));
  $$('[data-i18n-aria-label]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel)));
  $$('[data-i18n-title]').forEach((el) => (el.title = t(el.dataset.i18nTitle)));
  $$('[data-lang-label]').forEach((el) => (el.textContent = state.lang === 'es' ? 'EN' : 'ES'));
  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  const menuOpen = $('#mobile-menu').dataset.open === 'true';
  $('#menu-toggle').setAttribute('aria-label', t(menuOpen ? 'menu.close' : 'menu.open'));
}

/* ==========================================================================
   Perfil, redes y "Sobre mí"
   ========================================================================== */
function renderProfile() {
  const fields = {
    name: profile.name,
    initials: profile.initials,
    role: tr(profile.role),
    tagline: tr(profile.tagline),
    location: tr(profile.location),
  };
  $$('[data-profile]').forEach((el) => (el.textContent = fields[el.dataset.profile] ?? ''));

  $$('[data-email-link]').forEach((el) => {
    el.href = `mailto:${profile.email}`;
    el.textContent = profile.email;
  });

  $$('[data-phone-link]').forEach((el) => {
    el.href = `tel:${profile.phone.replace(/[^\d+]/g, '')}`;
    el.textContent = profile.phone;
  });

  $$('[data-cv-link]').forEach((el) => (el.href = tr(profile.cv)));

  $$('[data-available-dot]').forEach((el) => el.classList.toggle('is-busy', !profile.available));
  $$('[data-available-text]').forEach((el) => (el.textContent = t(profile.available ? 'hero.available' : 'hero.busy')));

  // Avatar o iniciales
  $('[data-avatar]').innerHTML = profile.avatar
    ? `<img src="${esc(profile.avatar)}" alt="${esc(profile.name)}" class="size-full object-cover" width="160" height="160" loading="lazy" />`
    : `<span class="grid size-full place-items-center bg-linear-to-br from-french-blue-600 to-space-indigo-800 font-display text-5xl font-bold text-white">${esc(profile.initials)}</span>`;

  // Redes sociales
  const socialHtml = socials
    .map(
      (s) => `<li><a href="${esc(s.url)}" ${linkAttrs(s.url)} class="icon-btn hover:-translate-y-0.5" aria-label="${esc(s.name)}" title="${esc(s.name)}">${icon(s.icon, 'size-[18px]')}</a></li>`,
    )
    .join('');
  $$('[data-socials]').forEach((el) => (el.innerHTML = socialHtml));

  // Párrafos
  $('[data-about]').innerHTML = tr(profile.about)
    .map((p) => `<p>${esc(p)}</p>`)
    .join('');

  // Estadísticas
  $('[data-stats]').innerHTML = profile.stats
    .map(
      (s) => `
      <div class="card flex flex-col-reverse gap-1 p-4 sm:p-5">
        <dt class="text-xs leading-snug text-muted">${esc(tr(s.label))}</dt>
        <dd class="text-gradient font-display text-3xl font-bold">${esc(s.value)}</dd>
      </div>`,
    )
    .join('');

  // Stack
  $('[data-stack]').innerHTML = profile.stack
    .map(
      (g, i) => `
      <div class="card card-hover reveal p-6" style="--delay:${i * 100}ms">
        <div class="flex items-center gap-3">
          <span class="grid size-10 place-items-center rounded-xl bg-primary/15 text-accent">${icon(g.icon)}</span>
          <h4 class="font-display text-lg font-semibold">${esc(tr(g.group))}</h4>
        </div>
        <ul class="mt-5 flex flex-wrap gap-2">
          ${g.items.map((item) => `<li class="rounded-lg border border-line bg-elevated/40 px-3 py-1.5 text-sm text-fg/90 transition hover:border-accent/50">${esc(item)}</li>`).join('')}
        </ul>
      </div>`,
    )
    .join('');

  renderCode();
}

function renderCode() {
  const s = (v) => `<span class="tok-s">'${esc(v)}'</span>`;
  const p = (k) => `<span class="tok-p">${k}</span>`;
  const pairs = [];
  for (let i = 0; i < profile.heroStack.length; i += 2) pairs.push(profile.heroStack.slice(i, i + 2).map(s).join(', '));

  $('[data-code]').innerHTML = `<span class="tok-c">// ${state.lang === 'es' ? 'Bienvenido a mi portafolio' : 'Welcome to my portfolio'}</span>
<span class="tok-k">const</span> <span class="tok-v">developer</span> = {
  ${p('name')}: ${s(profile.name)},
  ${p('role')}: ${s(tr(profile.role))},
  ${p('location')}: ${s(tr(profile.location))},
  ${p('stack')}: [
${pairs.map((l) => `    ${l},`).join('\n')}
  ],
  ${p('available')}: <span class="tok-b">${profile.available}</span>,
};

<span class="tok-k">export default</span> <span class="tok-v">developer</span>;`;
}

/* ==========================================================================
   Proyectos (filtros + tarjetas + modal)
   ========================================================================== */
const coverGradients = [
  'from-french-blue-500 via-space-indigo-700 to-space-indigo-950',
  'from-space-indigo-400 via-french-blue-700 to-smart-blue-950',
  'from-smart-blue-400 via-space-indigo-600 to-french-blue-950',
  'from-french-blue-400 via-smart-blue-700 to-space-indigo-950',
  'from-graphite-400 via-smart-blue-700 to-space-indigo-950',
  'from-space-indigo-500 via-french-blue-800 to-smart-blue-950',
];

function projectCover(project, large = false) {
  if (project.image) {
    return `<img src="${esc(project.image)}" alt="${esc(project.title)}" loading="lazy" class="size-full object-cover transition duration-700 group-hover:scale-105" />`;
  }
  const g = coverGradients[projects.indexOf(project) % coverGradients.length];
  return `
    <div class="relative size-full bg-linear-to-br ${g} transition duration-700 group-hover:scale-105">
      <div class="dots absolute inset-0 opacity-40"></div>
      <div class="absolute inset-x-6 bottom-0 h-1/3 rounded-t-xl border border-b-0 border-white/15 bg-white/5 backdrop-blur-sm">
        <div class="flex gap-1.5 p-2.5"><span class="size-1.5 rounded-full bg-white/40"></span><span class="size-1.5 rounded-full bg-white/40"></span><span class="size-1.5 rounded-full bg-white/40"></span></div>
      </div>
      <div class="absolute inset-0 grid place-items-center pb-10">
        <span class="font-display ${large ? 'text-5xl sm:text-6xl' : 'text-3xl'} font-bold tracking-tight text-white drop-shadow-lg">${esc(project.title)}</span>
      </div>
    </div>`;
}

function renderFilters() {
  const tags = [...new Set(projects.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b));
  const options = [{ value: 'all', label: t('projects.all') }, ...tags.map((tag) => ({ value: tag, label: tag }))];
  $('[data-filters]').innerHTML = options
    .map(
      (o) => `<button type="button" class="filter-btn" data-filter="${esc(o.value)}" aria-pressed="${state.filter === o.value}">${esc(o.label)}</button>`,
    )
    .join('');
}

function renderProjects() {
  const list = projects
    .filter((p) => state.filter === 'all' || p.tags.includes(state.filter))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year);

  const cards = list.map(
    (p, i) => `
    <article class="card card-hover group reveal relative flex flex-col overflow-hidden" style="--delay:${(i % 3) * 90}ms">
      <div class="relative aspect-[16/10] overflow-hidden border-b border-line">
        ${projectCover(p)}
        ${p.featured ? `<span class="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-space-indigo-950/70 px-2.5 py-1 text-[0.7rem] font-semibold text-french-blue-200 backdrop-blur">${icon('star', 'size-3')} ${t('projects.featured')}</span>` : ''}
      </div>
      <div class="flex flex-1 flex-col p-5 sm:p-6">
        <div class="flex items-center justify-between gap-3 font-mono text-xs text-muted">
          <span>${esc(tr(p.role))}</span><span>${p.year}</span>
        </div>
        <h3 class="mt-2 font-display text-xl font-semibold transition group-hover:text-accent">${esc(p.title)}</h3>
        <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">${esc(tr(p.description))}</p>
        <ul class="mt-4 flex flex-wrap gap-1.5">${p.tags.map((tag) => `<li class="chip">${esc(tag)}</li>`).join('')}</ul>
        <div class="mt-auto flex items-center justify-between gap-3 pt-6">
          <button type="button" class="btn-ghost after:absolute after:inset-0 after:content-['']" data-open-project="${esc(p.id)}">
            ${t('projects.details')} ${icon('arrow-right', 'size-4')}
          </button>
          <div class="relative z-10 flex gap-2">
            ${p.repo ? `<a href="${esc(p.repo)}" ${linkAttrs(p.repo)} class="icon-btn size-9" aria-label="${t('projects.code')} – ${esc(p.title)}">${icon('github', 'size-4')}</a>` : ''}
            ${p.demo ? `<a href="${esc(p.demo)}" ${linkAttrs(p.demo)} class="icon-btn size-9" aria-label="${t('projects.demo')} – ${esc(p.title)}">${icon('external', 'size-4')}</a>` : ''}
          </div>
        </div>
      </div>
    </article>`,
  );

  // Tarjeta final: invita a ver los repositorios
  if (state.filter === 'all') {
    cards.push(`
      <a href="#repositorios" class="group reveal flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-line p-8 text-center transition hover:border-accent/60 hover:bg-surface/40" style="--delay:${(list.length % 3) * 90}ms">
        <span class="grid size-14 place-items-center rounded-2xl bg-primary/15 text-accent transition group-hover:scale-110">${icon('github', 'size-6')}</span>
        <span class="font-display text-lg font-semibold">${t('projects.moreTitle')}</span>
        <span class="max-w-xs text-sm text-muted">${t('projects.moreText')}</span>
        <span class="btn-ghost">${t('projects.moreCta')} ${icon('arrow-right', 'size-4')}</span>
      </a>`);
  }

  $('[data-projects]').innerHTML = cards.join('');
  $('[data-projects-empty]').classList.toggle('hidden', list.length > 0);
  observeReveals($('[data-projects]'));
}

/* ---------- Modal ---------- */
const modal = $('[data-project-modal]');
let lastFocused = null;

function openProject(id) {
  const p = projects.find((x) => x.id === id);
  if (!p) return;
  lastFocused = document.activeElement;

  const highlights = tr(p.highlights) || [];
  $('[data-modal-content]').innerHTML = `
    <button type="button" class="icon-btn absolute top-4 right-4 z-10 border-white/20 bg-space-indigo-950/60 text-white backdrop-blur hover:text-white" data-close-modal aria-label="${t('projects.close')}">
      ${icon('close', 'size-5')}
    </button>
    <div class="relative aspect-[16/8] overflow-hidden">${projectCover(p, true)}</div>
    <div class="p-6 sm:p-8">
      <div class="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted">
        <span class="inline-flex items-center gap-1.5">${icon('calendar', 'size-3.5')} ${t('projects.year')}: ${p.year}</span>
        <span class="inline-flex items-center gap-1.5">${icon('user', 'size-3.5')} ${t('projects.role')}: ${esc(tr(p.role))}</span>
      </div>
      <h3 id="modal-title" class="mt-3 font-display text-2xl font-bold sm:text-3xl">${esc(p.title)}</h3>
      <p class="mt-4 leading-relaxed text-muted">${esc(tr(p.longDescription) || tr(p.description))}</p>

      ${
        highlights.length
          ? `<h4 class="mt-8 font-display text-lg font-semibold">${t('projects.highlights')}</h4>
             <ul class="mt-4 grid gap-3 sm:grid-cols-2">
               ${highlights.map((h) => `<li class="flex items-start gap-3 text-sm text-muted"><span class="mt-0.5 text-accent">${icon('check-circle', 'size-4')}</span>${esc(h)}</li>`).join('')}
             </ul>`
          : ''
      }

      <h4 class="mt-8 font-display text-lg font-semibold">${t('projects.stack')}</h4>
      <ul class="mt-4 flex flex-wrap gap-2">${p.tags.map((tag) => `<li class="chip px-3 py-1.5 text-xs">${esc(tag)}</li>`).join('')}</ul>

      <div class="mt-10 flex flex-col gap-3 sm:flex-row">
        ${p.demo ? `<a href="${esc(p.demo)}" ${linkAttrs(p.demo)} class="btn btn-primary">${icon('external', 'size-4')} ${t('projects.demo')}</a>` : ''}
        ${p.repo ? `<a href="${esc(p.repo)}" ${linkAttrs(p.repo)} class="btn btn-secondary">${icon('github', 'size-4')} ${t('projects.code')}</a>` : ''}
      </div>
    </div>`;

  modal.classList.remove('is-closing');
  modal.showModal();
  $('.modal-panel', modal).scrollTop = 0;
  $('[data-close-modal]', modal).focus();
}

function closeModal() {
  if (!modal.open || modal.classList.contains('is-closing')) return;
  modal.classList.add('is-closing');
  const done = () => {
    modal.classList.remove('is-closing');
    modal.close();
    lastFocused?.focus?.({ preventScroll: true });
  };
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? done() : setTimeout(done, 240);
}

/* ==========================================================================
   Repositorios de GitHub
   ========================================================================== */
function timeAgo(date) {
  const rtf = new Intl.RelativeTimeFormat(state.lang, { numeric: 'auto' });
  const diff = (new Date(date) - Date.now()) / 1000;
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, secs] of units) {
    if (Math.abs(diff) >= secs || unit === 'minute') return rtf.format(Math.round(diff / secs), unit);
  }
}

const fmt = (n) => new Intl.NumberFormat(state.lang, { notation: 'compact' }).format(n);

function repoSkeletons(n = 6) {
  return Array.from(
    { length: n },
    () => `
    <div class="card animate-pulse p-5">
      <div class="h-4 w-1/2 rounded bg-elevated"></div>
      <div class="mt-4 h-3 w-full rounded bg-elevated/70"></div>
      <div class="mt-2 h-3 w-4/5 rounded bg-elevated/70"></div>
      <div class="mt-6 h-3 w-1/3 rounded bg-elevated/70"></div>
    </div>`,
  ).join('');
}

function visibleRepos() {
  if (!state.gh) return [];
  const q = state.repoQuery.trim().toLowerCase();
  const pinned = github.pinned || [];
  return state.gh.repos
    .filter((r) => (github.includeForks || !r.fork) && !github.exclude.includes(r.name))
    .filter((r) => state.repoLang === 'all' || r.language === state.repoLang)
    .filter((r) => !q || r.name.toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q) || r.topics.some((tp) => tp.includes(q)))
    .sort((a, b) => {
      const pa = pinned.indexOf(a.name);
      const pb = pinned.indexOf(b.name);
      if (pa !== pb) return (pa === -1 ? Infinity : pa) - (pb === -1 ? Infinity : pb);
      return state.repoSort === 'stars' ? b.stars - a.stars || new Date(b.updated) - new Date(a.updated) : new Date(b.updated) - new Date(a.updated);
    });
}

function renderGhProfile() {
  const el = $('[data-gh-profile]');
  if (!state.gh) {
    el.innerHTML = '';
    return;
  }
  const u = state.gh.profile;
  const stars = state.gh.repos.reduce((sum, r) => sum + r.stars, 0);
  el.innerHTML = `
    <a href="${esc(u.html_url)}" target="_blank" rel="noopener noreferrer" class="card card-hover flex items-center gap-4 p-4 pr-6">
      <img src="${esc(u.avatar_url)}" alt="" width="56" height="56" loading="lazy" class="size-14 shrink-0 rounded-full border border-line" />
      <div class="min-w-0">
        <p class="flex items-center gap-1.5 font-semibold">${esc(u.name || u.login)} ${icon('external', 'size-3.5 text-muted')}</p>
        <p class="font-mono text-xs text-muted">@${esc(u.login)}</p>
        <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          <span><b class="text-fg">${fmt(u.public_repos)}</b> ${t('repos.repos')}</span>
          <span><b class="text-fg">${fmt(u.followers)}</b> ${t('repos.followers')}</span>
          <span><b class="text-fg">${fmt(stars)}</b> ${t('repos.stars')}</span>
        </div>
      </div>
    </a>`;
}

function renderLangOptions() {
  const select = $('[data-repo-lang]');
  const langs = state.gh ? [...new Set(state.gh.repos.map((r) => r.language).filter(Boolean))].sort() : [];
  select.innerHTML = [`<option value="all">${t('repos.allLangs')}</option>`, ...langs.map((l) => `<option value="${esc(l)}">${esc(l)}</option>`)].join('');
  select.value = langs.includes(state.repoLang) ? state.repoLang : 'all';
}

function renderRepos() {
  const grid = $('[data-repos]');
  const more = $('[data-repos-more]');
  const count = $('[data-repos-count]');

  if (state.ghError) {
    grid.innerHTML = `
      <div class="card col-span-full flex flex-col items-center gap-4 p-10 text-center">
        <span class="text-accent">${icon('alert', 'size-8')}</span>
        <p class="text-muted">${t('repos.error')}</p>
        <div class="flex flex-wrap justify-center gap-3">
          <button type="button" class="btn btn-secondary" data-repos-retry>${t('repos.retry')}</button>
          <a href="https://github.com/${esc(github.username)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${icon('github', 'size-4')} ${t('repos.viewProfile')}</a>
        </div>
      </div>`;
    more.classList.add('hidden');
    count.textContent = '';
    return;
  }

  if (!state.gh) {
    grid.innerHTML = repoSkeletons(github.perPage);
    return;
  }

  const all = visibleRepos();
  const list = all.slice(0, state.repoLimit);

  grid.innerHTML = list.length
    ? list
        .map(
          (r, i) => `
      <a href="${esc(r.html_url)}" target="_blank" rel="noopener noreferrer" class="card card-hover group reveal flex flex-col p-5" style="--delay:${(i % 3) * 70}ms">
        <div class="flex items-start justify-between gap-3">
          <span class="flex min-w-0 items-center gap-2 text-accent">
            ${icon('repo', 'size-4 shrink-0')}
            <h3 class="truncate font-mono text-sm font-semibold">${esc(r.name)}</h3>
          </span>
          <span class="text-muted opacity-0 transition group-hover:opacity-100">${icon('arrow-up-right', 'size-4')}</span>
        </div>
        <p class="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">${esc(r.description || t('repos.noDesc'))}</p>
        ${r.topics.length ? `<ul class="mt-4 flex flex-wrap gap-1.5">${r.topics.slice(0, 3).map((tp) => `<li class="chip">${esc(tp)}</li>`).join('')}</ul>` : ''}
        <div class="mt-5 flex items-center gap-4 font-mono text-xs text-muted">
          ${r.language ? `<span class="inline-flex items-center gap-1.5"><span class="size-2.5 rounded-full" style="background:${languageColors[r.language] || '#8d9dd8'}"></span>${esc(r.language)}</span>` : ''}
          <span class="inline-flex items-center gap-1">${icon('star', 'size-3.5')} ${fmt(r.stars)}</span>
          <span class="inline-flex items-center gap-1">${icon('fork', 'size-3.5')} ${fmt(r.forks)}</span>
          <span class="ml-auto truncate">${timeAgo(r.updated)}</span>
        </div>
      </a>`,
        )
        .join('')
    : `<p class="col-span-full rounded-2xl border border-dashed border-line p-8 text-center text-muted">${t('repos.empty')}</p>`;

  count.textContent = all.length ? t('repos.showing').replace('{n}', list.length).replace('{total}', all.length) : '';
  more.classList.toggle('hidden', list.length >= all.length);
  observeReveals(grid);
}

async function loadRepos() {
  state.ghError = false;
  state.gh = null;
  renderRepos();
  try {
    state.gh = await fetchGitHub(github.username);
  } catch (err) {
    console.warn('[GitHub]', err);
    state.ghError = true;
  }
  renderGhProfile();
  renderLangOptions();
  renderRepos();
}

/* ==========================================================================
   Formación
   ========================================================================== */
function renderEducation() {
  $('[data-education]').innerHTML = education
    .map(
      (e, i) => `
      <li class="reveal relative pl-8" style="--delay:${i * 100}ms">
        <span class="absolute top-1 -left-[9px] grid size-[17px] place-items-center rounded-full bg-bg ring-2 ring-accent"><span class="size-1.5 rounded-full bg-accent"></span></span>
        <p class="font-mono text-xs text-accent">${esc(tr(e.period))}</p>
        <h4 class="mt-1.5 font-display text-lg font-semibold">${esc(tr(e.title))}</h4>
        <p class="text-sm font-medium text-fg/80">${esc(e.institution)}</p>
        <p class="mt-2 text-sm leading-relaxed text-muted">${esc(tr(e.description))}</p>
      </li>`,
    )
    .join('');

  $('[data-certs]').innerHTML = certifications
    .map(
      (c, i) => `
      <li class="reveal" style="--delay:${i * 80}ms">
        <div class="card card-hover flex items-center gap-4 p-4 sm:p-5">
          <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-elevated text-accent">${icon('award')}</span>
          <div class="min-w-0 flex-1">
            <h4 class="font-semibold leading-snug">${esc(tr(c.name))}</h4>
            <p class="mt-0.5 text-sm text-muted">${esc(c.issuer)}${c.date ? ` · ${esc(tr(c.date))}` : ''}</p>
          </div>
          ${c.url ? `<a href="${esc(c.url)}" ${linkAttrs(c.url)} class="icon-btn" aria-label="${t('edu.credential')} – ${esc(tr(c.name))}" title="${t('edu.credential')}">${icon('arrow-up-right', 'size-4')}</a>` : ''}
        </div>
      </li>`,
    )
    .join('');
}

/* ==========================================================================
   Contacto
   ========================================================================== */
let toastTimer;
function toast(message) {
  const el = $('[data-toast]');
  $('[data-toast-text]', el).textContent = message;
  el.dataset.show = 'true';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.dataset.show = 'false'), 2600);
}

function initContactForm() {
  const form = $('[data-contact-form]');
  const status = $('[data-form-status]');
  const submit = $('[data-submit]');

  const validators = {
    name: (v) => (!v.trim() ? t('contact.required') : ''),
    email: (v) => (!v.trim() ? t('contact.required') : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? t('contact.invalidEmail') : ''),
    message: (v) => (!v.trim() ? t('contact.required') : v.trim().length < 10 ? t('contact.short') : ''),
  };

  const validateField = (name) => {
    const field = form.elements[name];
    const error = validators[name](field.value);
    field.setAttribute('aria-invalid', error ? 'true' : 'false');
    $(`[data-error-for="${name}"]`, form).textContent = error;
    return !error;
  };

  Object.keys(validators).forEach((name) => {
    const field = form.elements[name];
    field.addEventListener('blur', () => field.value && validateField(name));
    field.addEventListener('input', () => field.getAttribute('aria-invalid') === 'true' && validateField(name));
  });

  const showStatus = (type, msg) => {
    status.className = `mt-4 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
      type === 'ok' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'border-red-400/40 bg-red-400/10 text-red-400'
    }`;
    status.innerHTML = `${icon(type === 'ok' ? 'check-circle' : 'alert', 'size-4 mt-0.5 shrink-0')}<span>${esc(msg)}</span>`;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const valid = Object.keys(validators).map(validateField).every(Boolean);
    if (!valid) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    if (form.elements._gotcha.value) return; // bot

    const data = Object.fromEntries(new FormData(form));
    delete data._gotcha;

    // Sin endpoint: abre el cliente de correo
    if (!contact.formEndpoint) {
      const subject = data.subject || `${t('nav.contact')} – ${data.name}`;
      const body = `${data.message}\n\n— ${data.name} (${data.email})`;
      showStatus('ok', t('contact.mailto'));
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    submit.disabled = true;
    submit.classList.add('opacity-70');
    $('[data-submit-label]', submit).textContent = t('contact.sending');
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      showStatus('ok', t('contact.success'));
    } catch {
      showStatus('error', t('contact.error'));
    } finally {
      submit.disabled = false;
      submit.classList.remove('opacity-70');
      $('[data-submit-label]', submit).textContent = t('contact.send');
    }
  });
}

/* ==========================================================================
   Navegación, tema, idioma y scroll
   ========================================================================== */
function setMenu(open) {
  const menu = $('#mobile-menu');
  const btn = $('#menu-toggle');
  menu.dataset.open = String(open);
  btn.setAttribute('aria-expanded', String(open));
  btn.setAttribute('aria-label', t(open ? 'menu.close' : 'menu.open'));
  const iconEl = $('[data-menu-icon]', btn);
  iconEl.dataset.icon = open ? 'close' : 'menu';
  iconEl.innerHTML = icon(iconEl.dataset.icon, 'size-5');
  root.classList.toggle('menu-open', open);
  $('#header').classList.toggle('is-scrolled', open || window.scrollY > 10);
}

function initNavigation() {
  const menuBtn = $('#menu-toggle');
  menuBtn.addEventListener('click', () => setMenu($('#mobile-menu').dataset.open !== 'true'));
  $$('#mobile-menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && setMenu(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $('#mobile-menu').dataset.open === 'true') {
      setMenu(false);
      menuBtn.focus();
    }
  });

  // Header con fondo, barra de progreso, sección activa y botón volver arriba
  const header = $('#header');
  const progress = $('[data-scroll-progress]');
  const backTop = $('[data-back-to-top]');
  const links = $$('[data-nav]');
  const sections = $$('main section[id]');

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10 || $('#mobile-menu').dataset.open === 'true');
    backTop.dataset.show = String(y > 700);

    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (progress) {
      progress.style.transform = `scaleX(${Math.min(1, Math.max(0, y / maxScroll))})`;
    }

    const trigger = window.innerHeight * 0.35;
    let current = sections[0]?.id || 'inicio';
    if (y + window.innerHeight >= document.documentElement.scrollHeight - 24) {
      current = sections[sections.length - 1]?.id || current;
    } else {
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top <= trigger) current = sec.id;
      }
    }
    links.forEach((l) => l.setAttribute('aria-current', String(l.dataset.nav === current)));
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true },
  );
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

function initTheme() {
  const meta = $('meta[name="theme-color"]');
  const sync = () => meta.setAttribute('content', root.classList.contains('dark') ? '#090d1b' : '#f3f1f3');
  sync();
  $('#theme-toggle').addEventListener('click', () => {
    const dark = root.classList.toggle('dark');
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      /* modo privado */
    }
    sync();
  });
}

let typer;
function renderAll() {
  renderStatic();
  renderProfile();
  renderFilters();
  renderProjects();
  renderEducation();
  renderGhProfile();
  renderLangOptions();
  renderRepos();
  hydrateIcons();
  observeReveals();
}

function initLanguage() {
  $('#lang-toggle').addEventListener('click', () => {
    state.lang = state.lang === 'es' ? 'en' : 'es';
    try {
      localStorage.setItem('lang', state.lang);
    } catch {
      /* modo privado */
    }
    renderAll();
    typer?.restart();
    if (modal.open) closeModal();
  });
}

/* ==========================================================================
   Eventos delegados
   ========================================================================== */
function initEvents() {
  document.addEventListener('click', (e) => {
    const filterBtn = e.target.closest('[data-filter]');
    if (filterBtn) {
      state.filter = filterBtn.dataset.filter;
      $$('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === filterBtn)));
      renderProjects();
      return;
    }

    const openBtn = e.target.closest('[data-open-project]');
    if (openBtn) return openProject(openBtn.dataset.openProject);

    if (e.target.closest('[data-close-modal]')) return closeModal();

    if (e.target.closest('[data-repos-more]')) {
      state.repoLimit += github.perPage;
      renderRepos();
      return;
    }

    if (e.target.closest('[data-repos-retry]')) {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('gh:'))
        .forEach((k) => localStorage.removeItem(k));
      loadRepos();
      return;
    }

    if (e.target.closest('[data-copy-email]')) {
      navigator.clipboard?.writeText(profile.email).then(
        () => toast(t('contact.copied')),
        () => toast(profile.email),
      );
      return;
    }

    if (e.target.closest('[data-copy-phone]')) {
      navigator.clipboard?.writeText(profile.phone).then(
        () => toast(t('contact.copiedPhone')),
        () => toast(profile.phone),
      );
    }
  });

  // Cerrar modal al hacer clic en el fondo o con Escape (con animación)
  modal.addEventListener('click', (e) => e.target === modal && closeModal());
  modal.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeModal();
  });

  // Filtros de repositorios
  let searchTimer;
  $('[data-repo-search]').addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.repoQuery = e.target.value;
      state.repoLimit = github.perPage;
      renderRepos();
    }, 180);
  });
  $('[data-repo-lang]').addEventListener('change', (e) => {
    state.repoLang = e.target.value;
    state.repoLimit = github.perPage;
    renderRepos();
  });
  $('[data-repo-sort]').addEventListener('change', (e) => {
    state.repoSort = e.target.value;
    renderRepos();
  });
}

/* ==========================================================================
   Inicio
   ========================================================================== */
renderAll();
initNavigation();
initTheme();
initLanguage();
initEvents();
initContactForm();
initParticles($('#particles'));

typer = createTyper($('#typing'), () => tr(profile.typing));
typer.restart();

loadRepos();
