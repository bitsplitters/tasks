/*
 * Le schermate della lista di Getting started (public/screens/list-desktop.png e list-mobile.png, che sono anche la
 * scheda d'anteprima della home): l'embed e i componenti sotto, dalla pagina src/video/Schermate.astro.
 *
 * Con astro dev acceso (npx astro dev --host 127.0.0.1 --port 4321), dalla cartella tasks:
 *
 *   node scripts/schermate-lista.cjs                 le due schermate inglesi, in public/screens
 *   node scripts/schermate-lista.cjs --lingua it     le due schermate italiane, in public/screens/it
 *
 * La larga è a 1×, la stretta a 2,5×, con un margine attorno: le misure delle schermate del 20/11 (456 e 803 px di
 * larghezza in inglese). Quando rifarle: a ogni cambio
 * della lista d'esempio di getting-started.md o dell'aspetto della lista nel canale. Servono playwright-core e Chrome,
 * come per scripts/registra-video.cjs (PLAYWRIGHT_CORE, CHROME); URL cambia l'indirizzo della pagina.
 */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');

const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PAGINA = process.env.URL || 'http://127.0.0.1:4321/schermate-lista';
const MISURE = { desktop: { scala: 1, margine: 12 }, mobile: { scala: 2.5, margine: 8 } };

/** Il prefisso della lingua (--lingua), dalle lingue pubblicate di src/i18n/lingue.ts. */
function prefissoDegliArgomenti(argomenti) {
  const i = argomenti.indexOf('--lingua');
  if (i < 0) return '';
  const codice = argomenti[i + 1];
  const sorgente = fs.readFileSync(path.join(__dirname, '..', 'src', 'i18n', 'lingue.ts'), 'utf8');
  const riga = sorgente.split(/\r?\n(?=\s*\{)/).find((r) => r.includes(`codice: '${codice}'`));
  if (!codice || !riga || !/pubblicata: true/.test(riga)) throw new Error(`--lingua vuole una lingua pubblicata, non ${codice}`);
  return /prefisso: '([^']*)'/.exec(riga)[1];
}

(async () => {
  const prefisso = prefissoDegliArgomenti(process.argv.slice(2));
  const uscita = path.join(__dirname, '..', 'public', 'screens', prefisso);
  fs.mkdirSync(uscita, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME });
  try {
    for (const [misura, { scala, margine }] of Object.entries(MISURE)) {
      const page = await browser.newPage({ viewport: { width: 1000, height: 1400 }, deviceScaleFactor: scala });
      page.on('pageerror', (e) => console.error(`${misura}: ${e.message}`));
      await page.goto(`${PAGINA}${prefisso ? `/${prefisso}` : ''}`, { waitUntil: 'load' });
      // L'embed e i componenti sotto, il menu e i pulsanti (i loro contenitori sono larghi quanto il messaggio), col
      // margine attorno.
      const clip = await page.evaluate(async ([m, bordo]) => {
        await document.fonts.ready;
        await Promise.all([...document.images].map((i) => i.decode().catch(() => undefined)));
        const box = document.querySelector(`[data-misura="${m}"]`);
        const pezzi = [box.querySelector('.sc-embed'), box.querySelector('.sc-sel'), ...box.querySelectorAll('.sc-btns > *')];
        const r = pezzi.map((e) => e.getBoundingClientRect());
        const x = Math.min(...r.map((q) => q.left)) - bordo;
        const y = Math.min(...r.map((q) => q.top)) - bordo;
        return {
          x, y,
          width: Math.max(...r.map((q) => q.right)) + bordo - x,
          height: Math.max(...r.map((q) => q.bottom)) + bordo - y,
        };
      }, [misura, margine]);
      const file = path.join(uscita, `list-${misura}.png`);
      await page.screenshot({ path: file, clip, type: 'png' });
      console.log(`${path.relative(process.cwd(), file)}: ${Math.round(clip.width * scala)} × ${Math.round(clip.height * scala)}`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
