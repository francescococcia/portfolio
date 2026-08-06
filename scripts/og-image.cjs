// Regenerates public/og-image.png (1200x630 social share card).
// Run: node scripts/og-image.cjs
// Style matches the "clean & modern" site: white ground, ink text, one
// green accent, hairline rails. Word gaps between differently-colored
// tspans use dx offsets — librsvg collapses regular spaces there.
const path = require('path');
const sharp = require('sharp');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#ffffff"/>

  <!-- editorial hairline rails -->
  <line x1="70" y1="0" x2="70" y2="630" stroke="#e9e9ec" stroke-width="1"/>
  <line x1="600" y1="0" x2="600" y2="630" stroke="#e9e9ec" stroke-width="1" opacity=".5"/>
  <line x1="1130" y1="0" x2="1130" y2="630" stroke="#e9e9ec" stroke-width="1"/>

  <!-- wordmark -->
  <text x="110" y="108" font-family="'Segoe UI', sans-serif" font-size="30" font-weight="700" fill="#16181d">Francesco<tspan fill="#0b7d55">.</tspan></text>

  <!-- kicker -->
  <text x="110" y="240" font-family="Consolas, monospace" font-size="24" fill="#0b7d55">CYBER SECURITY ANALYST<tspan fill="#565a63" dx="14">—</tspan><tspan fill="#565a63" dx="14">LONDON, UK</tspan></text>

  <!-- headline -->
  <text x="106" y="330" font-family="'Segoe UI', sans-serif" font-size="76" font-weight="700" fill="#16181d" letter-spacing="-2">Security you can</text>
  <text x="106" y="412" font-family="'Segoe UI', sans-serif" font-size="76" font-weight="700" fill="#565a63" letter-spacing="-2">actually ship.</text>

  <!-- accent bar -->
  <rect x="110" y="448" width="110" height="4" fill="#0b7d55"/>

  <!-- proof line -->
  <text x="110" y="512" font-family="Consolas, monospace" font-size="21" fill="#565a63">4 yrs enterprise<tspan dx="12" fill="#0b7d55">·</tspan><tspan dx="12">~90% injection surface removed</tspan><tspan dx="12" fill="#0b7d55">·</tspan><tspan dx="12">NCSC MSc</tspan></text>

  <!-- site url -->
  <text x="110" y="570" font-family="Consolas, monospace" font-size="18" fill="#9a9ea8">francescococcia.vercel.app</text>
</svg>`;

const out = path.join(__dirname, '..', 'public', 'og-image.png');

sharp(Buffer.from(svg))
  .png()
  .toFile(out)
  .then((info) => console.log(`OK ${info.width}x${info.height} ${info.size} bytes -> ${out}`))
  .catch((e) => { console.error(e); process.exit(1); });
