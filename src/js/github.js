// Carga de perfil y repositorios desde la API pública de GitHub (con caché local).
const TTL = 1000 * 60 * 60; // 1 hora

export const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#663399',
  SCSS: '#c6538c',
  Python: '#3572A5',
  Java: '#b07219',
  'C#': '#178600',
  'C++': '#f34b7d',
  C: '#555555',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Astro: '#ff5a03',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  'Jupyter Notebook': '#DA5B0B',
};

async function cachedFetch(key, url, transform = (d) => d) {
  let stale = null;
  try {
    const cached = JSON.parse(localStorage.getItem(key));
    if (cached) {
      stale = cached.d;
      if (Date.now() - cached.t < TTL) return cached.d;
    }
  } catch {
    /* caché corrupta: se ignora */
  }

  try {
    const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const data = transform(await res.json());
    try {
      localStorage.setItem(key, JSON.stringify({ t: Date.now(), d: data }));
    } catch {
      /* almacenamiento lleno */
    }
    return data;
  } catch (err) {
    if (stale) return stale; // Si falla (ej. límite de peticiones), usa la caché anterior
    throw err;
  }
}

export async function fetchGitHub(username) {
  const user = encodeURIComponent(username);
  const [profile, repos] = await Promise.all([
    cachedFetch(`gh:user:${username}`, `https://api.github.com/users/${user}`, (u) => ({
      login: u.login,
      name: u.name,
      avatar_url: u.avatar_url,
      html_url: u.html_url,
      bio: u.bio,
      public_repos: u.public_repos,
      followers: u.followers,
    })),
    cachedFetch(`gh:repos:${username}`, `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`, (list) =>
      list.map((r) => ({
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        homepage: r.homepage,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updated: r.pushed_at || r.updated_at,
        fork: r.fork,
        archived: r.archived,
        topics: r.topics || [],
      })),
    ),
  ]);
  return { profile, repos };
}
