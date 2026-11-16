/*
 * Registra i video della home (spec 2026-11-15-home-video-e-demo-design.md, §2 e §4.7, nel repo team-tasks-manager)
 * col metodo del video di ottobre (team-tasks-manager/docs/brand/record_video_app_directory.cjs): per ogni
 * fotogramma chiama render(t) nella pagina /registrazione-video di astro dev, fa uno screenshot e lo passa a ffmpeg
 * da stdin. Nessun file intermedio, e il risultato non dipende da quanto è veloce la macchina.
 *
 * Con astro dev acceso (npx astro dev --host 127.0.0.1 --port 4321), dalla cartella tasks:
 *
 *   node scripts/registra-video.cjs                                  i quattro video e le quattro immagini ferme
 *   node scripts/registra-video.cjs channel wide                     uno solo
 *   node scripts/registra-video.cjs channel wide <cartella> 2.6 8.3  solo quei fotogrammi, in PNG
 *
 * Escono in public/video: {channel,activity}-{wide,narrow}.mp4 e, con lo stesso nome, il .webp dell'ultimo
 * fotogramma: l'immagine ferma di HeroVideo.astro (il suo <picture>), che resta anche senza JavaScript.
 *
 * Servono playwright-core (PLAYWRIGHT_CORE=<cartella del pacchetto>, dove non è installato nel progetto), Chrome
 * (CHROME=<chrome.exe>, di default quello installato su Windows) e ffmpeg con libx264 e libwebp (FFMPEG=<ffmpeg.exe>,
 * di default quello nel PATH). URL cambia l'indirizzo della pagina; CRF la qualità del video (20 di default: più
 * alto è più leggero).
 */
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');

const FPS = 30;
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const PAGINA = process.env.URL || 'http://127.0.0.1:4321/registrazione-video';
const CRF = process.env.CRF || '20';
// Le misure CSS della scena; i fotogrammi sono il doppio (deviceScaleFactor 2): 1440 × 960 e 780 × 1040.
const MISURE = { wide: { width: 720, height: 480 }, narrow: { width: 390, height: 520 } };
const MODI = ['channel', 'activity'];
const USCITA = path.join(__dirname, '..', 'public', 'video');

/** ffmpeg con l'ingresso da stdin; fine si risolve quando esce senza errori. */
function avviaFfmpeg(argomenti) {
  const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', ...argomenti], { stdio: ['pipe', 'inherit', 'inherit'] });
  const fine = new Promise((ok, ko) => ff.on('close', (c) => (c === 0 ? ok() : ko(new Error(`ffmpeg: uscita ${c}`)))));
  return { ff, fine };
}

async function apri(browser, modo, misura) {
  const page = await browser.newPage({ viewport: MISURE[misura], deviceScaleFactor: 2, locale: 'en-US' });
  page.on('pageerror', (e) => console.error(`${modo}-${misura}: ${e.message}`));
  await page.goto(`${PAGINA}?modo=${modo}&misura=${misura}`);
  await page.waitForFunction(() => window.PRONTA === true || document.title.startsWith('ERRORE'), null,
    { timeout: 60000 });
  const titolo = await page.title();
  if (titolo.startsWith('ERRORE')) throw new Error(`${modo}-${misura}: ${titolo}`);
  const durata = await page.evaluate(() => window.DURATA);
  const fotogramma = async (t) => {
    await page.evaluate((x) => window.render(x), t);
    return page.screenshot({ type: 'png' });
  };
  return { page, durata, fotogramma };
}

async function registra(browser, modo, misura) {
  const nome = `${modo}-${misura}`;
  const { page, durata, fotogramma } = await apri(browser, modo, misura);
  const mp4 = path.join(USCITA, `${nome}.mp4`);
  const video = avviaFfmpeg(['-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264',
    '-preset', 'slow', '-crf', CRF, '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-r', String(FPS),
    '-movflags', '+faststart', mp4]);
  const totale = Math.round(durata * FPS);
  for (let i = 0; i < totale; i++) {
    const png = await fotogramma(i / FPS);
    if (!video.ff.stdin.write(png)) await new Promise((ok) => video.ff.stdin.once('drain', ok));
    if (i % FPS === 0) process.stdout.write(`\r${nome}: ${Math.round(i / FPS)}/${durata} s`);
  }
  video.ff.stdin.end();
  await video.fine;
  // L'immagine ferma è l'ultimo fotogramma del video.
  const webp = path.join(USCITA, `${nome}.webp`);
  const ferma = avviaFfmpeg(['-f', 'png_pipe', '-i', '-', '-c:v', 'libwebp', '-quality', '82', '-frames:v', '1',
    webp]);
  ferma.ff.stdin.end(await fotogramma((totale - 1) / FPS));
  await ferma.fine;
  await page.close();
  const kb = (f) => Math.round(fs.statSync(f).size / 1024);
  process.stdout.write(`\r${nome}: ${durata} s, ${kb(mp4)} KB il video, ${kb(webp)} KB l'immagine\n`);
}

(async () => {
  const [modo, misura, cartella, ...istanti] = process.argv.slice(2);
  if (modo && !MODI.includes(modo)) throw new Error(`il modo è ${MODI.join(' o ')}`);
  if (misura && !MISURE[misura]) throw new Error(`la misura è ${Object.keys(MISURE).join(' o ')}`);
  if (cartella && (!modo || !misura || istanti.length === 0)) {
    throw new Error('per i fotogrammi: modo misura cartella t…');
  }
  // I campi nativi di data e ora (il promemoria dell'Activity) seguono la lingua del browser, non il locale della
  // pagina (apri): con --lang sono in inglese come il resto del video, invece che nella lingua di chi registra.
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--lang=en-US'] });
  try {
    if (cartella) {
      fs.mkdirSync(cartella, { recursive: true });
      const { fotogramma } = await apri(browser, modo, misura);
      for (const t of istanti) {
        fs.writeFileSync(path.join(cartella, `${modo}-${misura}-t${t}.png`), await fotogramma(parseFloat(t)));
      }
    } else {
      fs.mkdirSync(USCITA, { recursive: true });
      for (const m of modo ? [modo] : MODI) {
        for (const s of misura ? [misura] : Object.keys(MISURE)) await registra(browser, m, s);
      }
    }
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
