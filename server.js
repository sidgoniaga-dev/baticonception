const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

const PLACE_ID = 'ChIJZdIvSuehwQ4R4mGYoc3pHi0';
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Cache 6h
let reviewsCache = { data: null, ts: 0 };

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

app.get('/api/reviews', async (req, res) => {
  const now = Date.now();
  if (reviewsCache.data && now - reviewsCache.ts < 6 * 3600 * 1000) {
    return res.json(reviewsCache.data);
  }
  if (!GOOGLE_API_KEY) {
    return res.status(503).json({ error: 'API key not configured' });
  }
  try {
    const data = await fetchJson(
      `https://places.googleapis.com/v1/places/${PLACE_ID}`,
      {
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
      }
    );
    reviewsCache = { data, ts: now };
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
