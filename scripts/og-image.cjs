// Regenerates public/og-image.png (1200x630 social share card).
// Run: node scripts/og-image.cjs
// Word gaps between differently-colored tspans use dx offsets — librsvg
// collapses regular spaces and &#160; entities at tspan boundaries.
const path = require('path');
const sharp = require('sharp');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(0,255,157,0.07)"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#0a0a0f"/>
  <rect width="1200" height="630" fill="url(#dots)"/>

  <text x="90" y="118" font-family="Consolas, monospace" font-size="30" font-weight="bold">
    <tspan fill="#00ff9d">[</tspan><tspan fill="#e8e8f0">FC</tspan><tspan fill="#00ff9d">]</tspan>
  </text>

  <text x="90" y="252" font-family="Consolas, monospace" font-size="26">
    <tspan fill="#6b6b80">root@kali:~$</tspan><tspan fill="#00ff9d" dx="16">whoami</tspan>
  </text>

  <text x="86" y="348" font-family="Consolas, monospace" font-size="82" font-weight="bold" fill="#e8e8f0" letter-spacing="-2">Francesco Coccia</text>

  <rect x="90" y="386" width="120" height="5" fill="#00ff9d"/>

  <text x="90" y="452" font-family="Consolas, monospace" font-size="30">
    <tspan fill="#6b6b80">//</tspan><tspan fill="#00ff9d" dx="18">Cyber Security Analyst · Penetration Tester</tspan>
  </text>

  <text x="90" y="552" font-family="Consolas, monospace" font-size="22" fill="#6b6b80">Think like an attacker. Build like an engineer.</text>

  <rect x="1064" y="530" width="14" height="26" fill="#00ff9d"/>
</svg>`;

const out = path.join(__dirname, '..', 'public', 'og-image.png');

sharp(Buffer.from(svg))
  .png()
  .toFile(out)
  .then((info) => console.log(`OK ${info.width}x${info.height} ${info.size} bytes -> ${out}`))
  .catch((e) => { console.error(e); process.exit(1); });
