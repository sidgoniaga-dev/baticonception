const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Cache 6h reviews
let reviewsCache = { data: null, ts: 0 };
// Place ID discovered dynamically (text search → correct listing)
let resolvedPlaceId = null;

function fetchJson(url, headers) {
  return new Promise((resolve, reject) => {
    const opts = new URL(url);
    https.get({ hostname: opts.hostname, path: opts.pathname + opts.search, headers }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => { try { resolve(JSON.parse(body)); } catch (e) { reject(e); } });
    }).on('error', reject);
  });
}

// POST helper for Places API text search
function fetchJsonPost(hostname, path, headers, body) {
  return new Promise((resolve, reject) => {
    const buf = Buffer.from(body);
    const req = https.request(
      { hostname, path, method: 'POST', headers: { ...headers, 'Content-Length': buf.length } },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
      }
    );
    req.on('error', reject);
    req.write(buf);
    req.end();
  });
}

// Discover the correct Place ID via text search (avoids hardcoded wrong ID)
async function getPlaceId(apiKey) {
  if (resolvedPlaceId) return resolvedPlaceId;
  try {
    const result = await fetchJsonPost(
      'places.googleapis.com',
      '/v1/places:searchText',
      {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName',
        'Content-Type': 'application/json',
      },
      JSON.stringify({ textQuery: 'Bati Conception Entreprise générale de rénovation Bruxelles Belgique' })
    );
    if (result.places && result.places.length > 0) {
      // API returns "places/ChIJXXX" — strip the prefix
      const id = result.places[0].id.replace(/^places\//, '');
      resolvedPlaceId = id;
      console.log(`Place ID résolu : ${id} (${result.places[0].displayName?.text || '?'})`);
      return id;
    }
  } catch (e) {
    console.error('Impossible de résoudre le Place ID :', e.message);
  }
  return null;
}

// ─── SEO metadata per route ──────────────────────────────────────────────────

const BASE_URL = 'https://baticonception.be';

const PAGE_META = {
  '/': {
    title: 'BatiConception — Entreprise de rénovation à Bruxelles & Belgique',
    description: 'BatiConception est une entreprise de rénovation en Belgique. Salle de bain, toiture, façade, isolation thermique et aménagement intérieur. Devis gratuit. TVA BE 1030.623.416.',
    h1: 'Votre partenaire rénovation de la cave au grenier.',
    body: `<p>Entreprise de rénovation en Belgique. De la salle de bain à la rénovation complète, nous coordonnons chaque corps de métier sous un seul interlocuteur — pour un chantier maîtrisé et un résultat soigné.</p>
<p>6 domaines d'expertise : Salle de bain · Toiture · Façade · Isolation · Aménagement intérieur · Rénovation complète.</p>
<p>Un seul interlocuteur du devis aux finitions. Devis gratuit. Intervention en Belgique. TVA BE 1030.623.416.</p>`,
  },
  '/services': {
    title: 'Nos services — BatiConception | Rénovation Belgique',
    description: 'Découvrez nos 6 expertises en rénovation : salle de bain, toiture, façade, isolation, aménagement intérieur et rénovation complète. Devis gratuit en Belgique.',
    h1: 'Nos services de rénovation en Belgique',
    body: `<p>De la salle de bain à la rénovation complète, nous coordonnons chaque corps de métier sous un seul interlocuteur.</p>
<ul>
  <li>Rénovation de salle de bain — pose de carrelage, faïence, douche, sanitaires, plomberie</li>
  <li>Rénovation de toiture — remplacement, réparation, étanchéité, isolation</li>
  <li>Rénovation de façade — ravalement, ITE, bardage, crépi</li>
  <li>Isolation thermique — toiture, façade, plancher, laine minérale, EPS</li>
  <li>Aménagement intérieur — cloisons, finitions, peinture, revêtements de sol</li>
  <li>Rénovation complète — coordination de A à Z, clé en main</li>
</ul>`,
  },
  '/realisations': {
    title: 'Réalisations — BatiConception | Chantiers de rénovation',
    description: '14 projets de rénovation réalisés en Belgique : salles de bain, toitures, façades, isolations. Photos avant/après de nos chantiers à Bruxelles et alentours.',
    h1: 'Nos réalisations de rénovation',
    body: `<p>14 chantiers réalisés à Bruxelles et en Belgique. Photos avant, pendant et après travaux.</p>
<ul>
  <li>Salle de bain zellige bleu & sol chevron — Bruxelles</li>
  <li>Salle de bain effet marbre de Carrare — Bruxelles</li>
  <li>Isolation et aménagement de combles — Bruxelles</li>
  <li>Toiture plate étanche & terrasse bois composite — Bruxelles</li>
  <li>Bardage cèdre rouge façade arrière — Bruxelles</li>
  <li>Isolation de façade côté rue — Uccle</li>
  <li>Carrelage grand format entrée extérieure — Périphérie bruxelloise</li>
  <li>Salle de bain grand format gris & paroi vitrée — Bruxelles</li>
  <li>Ravalement et ITE façade arrière 5 niveaux — Schaerbeek</li>
  <li>Isolation acoustique chambre mitoyenne — Bruxelles</li>
  <li>Crépi façade d'extension — Belgique</li>
  <li>ITE façade arrière multi-étages — Ixelles</li>
  <li>Isolation thermique par l'extérieur 4 niveaux — Bruxelles</li>
  <li>Carrelage grand format devant de maison — Bruxelles</li>
</ul>`,
  },
  '/contact': {
    title: 'Contact & Devis gratuit — BatiConception',
    description: 'Contactez BatiConception pour votre projet de rénovation en Belgique. Devis gratuit et sans engagement. Réponse rapide. +32 470 86 63 59.',
    h1: 'Contact & Devis gratuit',
    body: `<p>Demandez votre devis gratuit pour votre projet de rénovation en Belgique.</p>
<p>Téléphone : +32 470 86 63 59</p>
<p>Email : baticonception@outlook.com</p>
<p>Zone d'intervention : Bruxelles et toute la Belgique.</p>`,
  },
  '/salle-de-bain': {
    title: 'Rénovation de salle de bain — BatiConception Belgique',
    description: 'Rénovation complète ou partielle de salle de bain en Belgique : carrelage, douche italienne, baignoire, sanitaires, plomberie. Devis gratuit. BatiConception.',
    h1: 'Rénovation de salle de bain',
    body: `<p>Transformez votre espace en un lieu moderne, confortable et fonctionnel.</p>
<p>La salle de bain est une pièce essentielle de votre habitation. Avec le temps, elle peut devenir moins pratique, moins esthétique ou ne plus correspondre à vos besoins. Nous vous accompagnons dans la rénovation complète ou partielle, avec des solutions adaptées à votre espace, vos envies et votre budget.</p>
<h2>Nos prestations salle de bain</h2>
<ul>
  <li>Démolition de l'existant</li>
  <li>Réaménagement complet de la pièce</li>
  <li>Création de salle de bain dans un nouvel espace</li>
  <li>Pose de carrelage et faïence</li>
  <li>Installation de douche, baignoire et sanitaires</li>
  <li>Pose de meubles de salle de bain</li>
  <li>Travaux de plomberie</li>
  <li>Travaux d'électricité (via partenaires qualifiés)</li>
  <li>Finitions et mise en service</li>
</ul>`,
  },
  '/toiture': {
    title: 'Rénovation de toiture — BatiConception Belgique',
    description: 'Rénovation de toiture en Belgique : remplacement de couverture, étanchéité, isolation, réparation. Un seul interlocuteur pour vos travaux de toiture. Devis gratuit.',
    h1: 'Rénovation de toiture',
    body: `<p>Protégez durablement votre habitation.</p>
<p>La toiture est l'un des éléments les plus importants de votre habitation. Elle protège votre maison des intempéries, assure l'isolation et contribue à la durabilité du bâtiment.</p>
<h2>Nos prestations toiture</h2>
<ul>
  <li>Remplacement de la couverture</li>
  <li>Réparation de toiture</li>
  <li>Travaux d'étanchéité</li>
  <li>Isolation de toiture</li>
  <li>Traitement contre l'humidité</li>
  <li>Réfection des éléments de finition (corniches, rives, etc.)</li>
</ul>`,
  },
  '/facade': {
    title: 'Rénovation de façade — BatiConception Belgique',
    description: 'Rénovation de façade en Belgique : ravalement, ITE, isolation par l\'extérieur, bardage, crépi, peinture façade. Devis gratuit. BatiConception.',
    h1: 'Rénovation de façade',
    body: `<p>Protégez et embellissez l'enveloppe de votre bâtiment.</p>
<p>La façade est le premier élément visible de votre habitation. Une façade rénovée améliore l'isolation thermique, protège la structure et augmente la valeur de votre bien.</p>
<h2>Nos prestations façade</h2>
<ul>
  <li>Ravalement de façade</li>
  <li>Isolation thermique par l'extérieur (ITE)</li>
  <li>Bardage bois et composite</li>
  <li>Application de crépi</li>
  <li>Peinture façade</li>
  <li>Traitement des fissures et infiltrations</li>
</ul>`,
  },
  '/amenagement': {
    title: 'Aménagement intérieur — BatiConception Belgique',
    description: 'Aménagement intérieur en Belgique : cloisons, revêtements de sol, peinture, menuiseries intérieures, optimisation d\'espace. Devis gratuit. BatiConception.',
    h1: 'Aménagement intérieur',
    body: `<p>Optimisez et personnalisez votre espace de vie.</p>
<p>Que vous souhaitiez redistribuer vos espaces, moderniser vos finitions ou aménager une nouvelle pièce, nous vous accompagnons de la conception à la réalisation.</p>
<h2>Nos prestations aménagement intérieur</h2>
<ul>
  <li>Création et suppression de cloisons</li>
  <li>Pose de revêtements de sol (carrelage, parquet)</li>
  <li>Travaux de peinture intérieure</li>
  <li>Pose de menuiseries intérieures</li>
  <li>Optimisation et redistribution des espaces</li>
  <li>Finitions générales</li>
</ul>`,
  },
  '/isolation': {
    title: 'Isolation thermique — BatiConception Belgique',
    description: 'Isolation thermique en Belgique : isolation de toiture, façade, plancher, combles. Laine minérale, EPS, ITE. Réduisez vos factures d\'énergie. Devis gratuit.',
    h1: 'Isolation thermique',
    body: `<p>Améliorez le confort et réduisez vos consommations d'énergie.</p>
<p>Une bonne isolation est la meilleure façon de réduire durablement vos factures d'énergie. Nous réalisons l'isolation de votre toiture, façade, plancher ou combles selon les normes en vigueur.</p>
<h2>Nos prestations isolation</h2>
<ul>
  <li>Isolation de toiture par l'intérieur et l'extérieur</li>
  <li>Isolation de façade par l'extérieur (ITE)</li>
  <li>Isolation de plancher</li>
  <li>Isolation de combles perdus ou aménageables</li>
  <li>Laine minérale, EPS, laine de verre</li>
  <li>Doublage intérieur sur ossature métallique</li>
</ul>`,
  },
  '/renovation-complete': {
    title: 'Rénovation complète — BatiConception Belgique',
    description: 'Rénovation complète de maison ou appartement en Belgique. Coordination de A à Z : salle de bain, cuisine, peinture, carrelage, isolation. Clé en main. Devis gratuit.',
    h1: 'Rénovation complète de votre habitation',
    body: `<p>Un accompagnement de A à Z pour tous vos projets de rénovation.</p>
<p>Vous souhaitez rénover entièrement votre maison ou votre appartement ? Nous prenons en charge votre projet de rénovation complète, de la conception jusqu'à la réalisation finale. Nous coordonnons l'ensemble des travaux afin de vous offrir un chantier maîtrisé, organisé et sans stress.</p>
<h2>Ce que comprend la rénovation complète</h2>
<ul>
  <li>Rénovation de salle de bain</li>
  <li>Rénovation de cuisine</li>
  <li>Travaux de peinture</li>
  <li>Pose de carrelage ou parquet</li>
  <li>Aménagement intérieur</li>
  <li>Isolation thermique</li>
  <li>Cloisonnement et redistribution des espaces</li>
  <li>Finitions générales</li>
</ul>
<p>Planification du chantier · Coordination des corps de métier · Suivi rigoureux · Livraison clé en main.</p>`,
  },
};

// ─── Build HTML with injected SEO metadata ───────────────────────────────────

const htmlTemplatePath = path.join(__dirname, 'index.html');
let htmlTemplate = '';

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildHtml(reqPath) {
  const meta = PAGE_META[reqPath] || PAGE_META['/'];
  const canonical = BASE_URL + (reqPath === '/' ? '' : reqPath);

  let html = htmlTemplate;

  // Title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  // Meta description
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`
  );

  // Canonical
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${canonical}" />`
  );

  // OG url
  html = html.replace(
    /(<meta property="og:url" content=")[^"]*(")/,
    `$1${canonical}$2`
  );

  // OG title
  html = html.replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${escapeHtml(meta.title)}$2`
  );

  // OG description
  html = html.replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${escapeHtml(meta.description)}$2`
  );

  // Twitter title
  html = html.replace(
    /(<meta name="twitter:title" content=")[^"]*(")/,
    `$1${escapeHtml(meta.title)}$2`
  );

  // Twitter description
  html = html.replace(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${escapeHtml(meta.description)}$2`
  );

  // Pre-render content into #root so crawlers see real content before JS loads
  const staticRoot = `<div id="root"><div style="padding:2rem;font-family:sans-serif;max-width:900px;margin:0 auto"><h1 style="font-size:2rem;font-weight:700;margin-bottom:1rem">${escapeHtml(meta.h1)}</h1>${meta.body}</div></div>`;
  html = html.replace('<div id="root"></div>', staticRoot);

  return html;
}

// Pre-build all routes at startup
function loadHtmlCache() {
  try {
    htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf-8');
  } catch (e) {
    console.error('Could not read index.html:', e.message);
    htmlTemplate = '<!doctype html><html><body>BatiConception</body></html>';
  }

  const cache = {};
  for (const p of Object.keys(PAGE_META)) {
    cache[p] = buildHtml(p);
  }
  return cache;
}

let htmlCache = loadHtmlCache();

// Reload cache when index.html changes (dev convenience)
fs.watch(htmlTemplatePath, () => {
  console.log('index.html changed — rebuilding HTML cache');
  htmlCache = loadHtmlCache();
});

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self' https: data: blob:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://unpkg.com https://fonts.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com https://cdn.tailwindcss.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://placehold.co https://lh3.googleusercontent.com",
      "media-src 'self' blob:",
      "connect-src 'self' https://formspree.io",
    ].join('; ')
  );
  next();
});

// ─── API: Google Reviews ──────────────────────────────────────────────────────

// Debug endpoint — appel frais + réponse brute (pas de cache)
app.get('/api/reviews/debug', async (req, res) => {
  if (!GOOGLE_API_KEY) return res.json({ error: 'API key not configured' });
  try {
    const placeId = await getPlaceId(GOOGLE_API_KEY);
    // Test avec rating seul (Basic), puis avec reviews (Advanced)
    const rawBasic = await fetchJson(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=fr`,
      {
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'rating,userRatingCount',
      }
    );
    const rawAdvanced = await fetchJson(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=fr`,
      {
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
      }
    );
    res.json({ placeId, basic: rawBasic, advanced: rawAdvanced });
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.get('/api/reviews', async (req, res) => {
  const now = Date.now();
  // Paramètre ?force=1 pour vider le cache et forcer un appel frais
  const force = req.query.force === '1';
  if (!force && reviewsCache.data && now - reviewsCache.ts < 6 * 3600 * 1000) {
    return res.json(reviewsCache.data);
  }
  if (!GOOGLE_API_KEY) {
    return res.status(503).json({ error: 'API key not configured' });
  }
  try {
    const placeId = await getPlaceId(GOOGLE_API_KEY);
    if (!placeId) {
      return res.status(503).json({ error: 'Place ID not found' });
    }

    // Places API (New) — les avis textuels nécessitent le tier "Advanced"
    // La clé API doit avoir "Places API (New)" activée dans Google Cloud Console
    const raw = await fetchJson(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
      }
    );

    if (raw.error) {
      return res.status(502).json({ error: `Google API error: ${raw.error.message || JSON.stringify(raw.error)}` });
    }

    // Places API (New) retourne déjà le format attendu par le frontend
    const data = {
      rating: raw.rating,
      userRatingCount: raw.userRatingCount,
      reviews: raw.reviews || [],
    };

    reviewsCache = { data, ts: now };
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// ─── Static assets ────────────────────────────────────────────────────────────

app.use(express.static(path.join(__dirname)));

// ─── SPA catch-all — serve route-specific HTML ───────────────────────────────

app.get('*', (req, res) => {
  // Serve route-specific HTML (with correct meta + pre-rendered content)
  const html = htmlCache[req.path] || htmlCache['/'];
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
