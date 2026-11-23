/*
 * Registra i video della home (spec 2026-11-15-home-video-e-demo-design.md, §2 e §4.7, nel repo
 * team-tasks-manager) e il video di Esplora sull'Activity (spec 2026-11-17-video-activity-esplora-design.md, §8)
 * col metodo del video di ottobre (team-tasks-manager/docs/brand/record_video_app_directory.cjs): per ogni
 * fotogramma chiama render(t) nella pagina di astro dev, fa uno screenshot e lo passa a ffmpeg da stdin. Nessun file
 * intermedio, e il risultato non dipende da quanto è veloce la macchina.
 *
 * Con astro dev acceso (npx astro dev --host 127.0.0.1 --port 4321), dalla cartella tasks:
 *
 *   node scripts/registra-video.cjs                                  i quattro video e le quattro immagini ferme
 *   node scripts/registra-video.cjs --lingua it                      gli stessi in italiano, in public/video/it
 *   node scripts/registra-video.cjs channel wide                     uno solo
 *   node scripts/registra-video.cjs channel wide <cartella> 2.6 8.3  solo quei fotogrammi, in PNG
 *   node scripts/registra-video.cjs esplora <uscita.mp4>             il video di Esplora, muto
 *   node scripts/registra-video.cjs esplora <cartella> 4.9 11.5      solo quei fotogrammi, in PNG
 *
 * I video della home escono in public/video: {channel,activity}-{wide,narrow}.mp4 e, con lo stesso nome, il .webp
 * dell'ultimo fotogramma, l'immagine ferma di HeroVideo.astro (il suo <picture>), che resta anche senza JavaScript.
 * Con --lingua <codice> (una lingua pubblicata di src/i18n/lingue.ts, fuori dall'inglese) la pagina disegna testi e
 * lista in quella lingua, il browser la parla (i campi nativi di data e ora) e i file vanno in public/video/<prefisso>,
 * dove HeroVideo.astro li cerca per le pagine di quella lingua (spec 2026-11-19-sito-multilingua-design.md, §10).
 * Il video di Esplora non è del sito: va dove gli si dice, a 1920 × 1080 e CRF 16 come il primo video.
 *
 * Quando rifarli: i video della home a ogni cambio dell'interfaccia del canale o dell'Activity che si vede nei video
 * (fino al 2026-11-20 lo diceva il tracker). Le date del promemoria vengono da src/components/home/demo/modello.ts
 * (ADESSO, PROPOSTO, ZONA). Le scene sono quelle di un server coi Tips spenti (tips={false} in src/video/Registrazione.astro
 * e RegistrazioneEsplora.astro): con la riga dei Tips il messaggio del canale non starebbe nell'inquadratura.
 *
 * La musica del video di Esplora si monta dopo, sul video muto, come per il primo: è «Positive Fuse» di French
 * Fuse, e l'MP3 nel repository non entra. I numeri sono quelli di MONTAGGIO in src/video/esplora-tempi.ts: il brano
 * fino a 27,633 s, 5 ms prima dell'attacco della battuta 17; poi da 2:07,050 a 2:11,442, l'ultima battuta di accordi,
 * l'arresto e l'eco; 25 ms di dissolvenza fra i due pezzi. -1,5 dB perché i picchi del brano superano lo 0, la
 * sfumatura nell'ultimo mezzo secondo. Il filtro va su una riga sola:
 *
 *   ffmpeg -i <video.mp4> -i <brano.mp3> -filter_complex "[1:a]asplit=2[x][y];
 *     [x]atrim=start=0:end=27.633,asetpts=PTS-STARTPTS[a];[y]atrim=start=127.050:end=131.442,asetpts=PTS-STARTPTS[b];
 *     [a][b]acrossfade=d=0.025,afade=t=in:st=0:d=0.005,afade=t=out:st=31.5:d=0.5,volume=-1.5dB[m]"
 *     -map 0:v:0 -map "[m]" -c:v copy -c:a aac -b:a 256k -movflags +faststart <uscita.mp4>
 *
 * Servono playwright-core (PLAYWRIGHT_CORE=<cartella del pacchetto>, dove non è installato nel progetto), Chrome
 * (CHROME=<chrome.exe>, di default quello installato su Windows) e ffmpeg con libx264 e libwebp (FFMPEG=<ffmpeg.exe>,
 * di default quello nel PATH). URL cambia l'indirizzo della pagina dei video della home: quella di Esplora sta sullo
 * stesso server. CRF cambia la qualità (20 di default per la home, 16 per Esplora: più alto è più leggero).
 */
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');

const FPS = 30;
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const PAGINA = process.env.URL || 'http://127.0.0.1:4321/registrazione-video';
const ESPLORA = new URL('/registrazione-esplora', PAGINA).href;
// Le misure CSS della scena; i fotogrammi sono il doppio (deviceScaleFactor 2): 1440 × 960 e 780 × 1040.
const MISURE = { wide: { width: 720, height: 480 }, narrow: { width: 390, height: 520 } };
const MODI = ['channel', 'activity'];

/**
 * La lingua dei video della home (--lingua): il codice per la pagina, il locale del browser e la cartella d'uscita. Le
 * lingue sono quelle pubblicate di src/i18n/lingue.ts (il .cjs non importa il .ts: si leggono dal sorgente).
 */
function linguaDegliArgomenti(argomenti) {
  const i = argomenti.indexOf('--lingua');
  if (i < 0) return { codice: 'en', locale: 'en-US', prefisso: '' };
  const codice = argomenti[i + 1];
  argomenti.splice(i, 2);
  const sorgente = fs.readFileSync(path.join(__dirname, '..', 'src', 'i18n', 'lingue.ts'), 'utf8');
  const riga = sorgente.split(/\r?\n(?=\s*\{)/).find((r) => r.includes(`codice: '${codice}'`));
  if (!codice || !riga || !/pubblicata: true/.test(riga)) throw new Error(`--lingua vuole una lingua pubblicata, non ${codice}`);
  const prefisso = /prefisso: '([^']*)'/.exec(riga)[1];
  const intl = /intl: '([^']*)'/.exec(riga)[1];
  return { codice, locale: intl.includes('-') ? intl : `${intl}-${intl.toUpperCase()}`, prefisso };
}

const ARGOMENTI = process.argv.slice(2);
const LINGUA = linguaDegliArgomenti(ARGOMENTI);
const USCITA = path.join(__dirname, '..', 'public', 'video', LINGUA.prefisso);

/** ffmpeg con l'ingresso da stdin; fine si risolve quando esce senza errori. */
function avviaFfmpeg(argomenti) {
  const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', ...argomenti], { stdio: ['pipe', 'inherit', 'inherit'] });
  const fine = new Promise((ok, ko) => ff.on('close', (c) => (c === 0 ? ok() : ko(new Error(`ffmpeg: uscita ${c}`)))));
  return { ff, fine };
}

/** La pagina pronta (PRONTA, o l'errore nel titolo), con la sua durata e il fotogramma dell'istante t in PNG. */
async function apri(browser, nome, indirizzo, viewport, scala) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: scala, locale: LINGUA.locale });
  page.on('pageerror', (e) => console.error(`${nome}: ${e.message}`));
  await page.goto(indirizzo);
  await page.waitForFunction(() => window.PRONTA === true || document.title.startsWith('ERRORE'), null,
    { timeout: 60000 });
  const titolo = await page.title();
  if (titolo.startsWith('ERRORE')) throw new Error(`${nome}: ${titolo}`);
  const durata = await page.evaluate(() => window.DURATA);
  const fotogramma = async (t) => {
    await page.evaluate((x) => window.render(x), t);
    return page.screenshot({ type: 'png' });
  };
  return { page, durata, fotogramma };
}

const apriLaHome = (browser, modo, misura) =>
  apri(browser, `${modo}-${misura}`, `${PAGINA}${LINGUA.prefisso ? `/${LINGUA.prefisso}` : ''}?modo=${modo}&misura=${misura}`,
    MISURE[misura], 2);
const apriEsplora = (browser) => apri(browser, 'esplora', ESPLORA, { width: 1920, height: 1080 }, 1);

/** I fotogrammi da 0 a durata, in H.264 nel file mp4; restituisce quanti sono. */
async function scriviIlVideo(nome, durata, fotogramma, mp4, crf) {
  const video = avviaFfmpeg(['-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264',
    '-preset', 'slow', '-crf', crf, '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-r', String(FPS),
    '-movflags', '+faststart', mp4]);
  const totale = Math.round(durata * FPS);
  for (let i = 0; i < totale; i++) {
    const png = await fotogramma(i / FPS);
    if (!video.ff.stdin.write(png)) await new Promise((ok) => video.ff.stdin.once('drain', ok));
    if (i % FPS === 0) process.stdout.write(`\r${nome}: ${Math.round(i / FPS)}/${durata} s`);
  }
  video.ff.stdin.end();
  await video.fine;
  return totale;
}

const kb = (f) => Math.round(fs.statSync(f).size / 1024);

async function registra(browser, modo, misura) {
  const nome = `${modo}-${misura}`;
  const { page, durata, fotogramma } = await apriLaHome(browser, modo, misura);
  const mp4 = path.join(USCITA, `${nome}.mp4`);
  const totale = await scriviIlVideo(nome, durata, fotogramma, mp4, process.env.CRF || '20');
  // L'immagine ferma è l'ultimo fotogramma del video.
  const webp = path.join(USCITA, `${nome}.webp`);
  const ferma = avviaFfmpeg(['-f', 'png_pipe', '-i', '-', '-c:v', 'libwebp', '-quality', '82', '-frames:v', '1',
    webp]);
  ferma.ff.stdin.end(await fotogramma((totale - 1) / FPS));
  await ferma.fine;
  await page.close();
  process.stdout.write(`\r${nome}: ${durata} s, ${kb(mp4)} KB il video, ${kb(webp)} KB l'immagine\n`);
}

/** I video della home (tutti, o quelli del modo e della misura), o i fotogrammi degli istanti nella cartella. */
async function laHome(browser, modo, misura, cartella, istanti) {
  if (cartella) {
    fs.mkdirSync(cartella, { recursive: true });
    const { fotogramma } = await apriLaHome(browser, modo, misura);
    for (const t of istanti) {
      fs.writeFileSync(path.join(cartella, `${modo}-${misura}-t${t}.png`), await fotogramma(parseFloat(t)));
    }
    return;
  }
  fs.mkdirSync(USCITA, { recursive: true });
  for (const m of modo ? [modo] : MODI) {
    for (const s of misura ? [misura] : Object.keys(MISURE)) await registra(browser, m, s);
  }
}

/** Il video di Esplora, muto, nel file mp4; o, con gli istanti, i loro fotogrammi nella cartella. */
async function esplora(browser, uscita, istanti) {
  const { page, durata, fotogramma } = await apriEsplora(browser);
  if (istanti.length > 0) {
    fs.mkdirSync(uscita, { recursive: true });
    for (const t of istanti) {
      fs.writeFileSync(path.join(uscita, `esplora-t${t}.png`), await fotogramma(parseFloat(t)));
    }
  } else {
    if (!uscita.endsWith('.mp4')) throw new Error(`il video di Esplora va in un .mp4, non in ${uscita}`);
    fs.mkdirSync(path.dirname(uscita), { recursive: true });
    await scriviIlVideo('esplora', durata, fotogramma, uscita, process.env.CRF || '16');
    process.stdout.write(`\resplora: ${durata} s, ${kb(uscita)} KB\n`);
  }
  await page.close();
}

(async () => {
  const [modo, ...resto] = ARGOMENTI;
  if (modo === 'esplora' && LINGUA.codice !== 'en') throw new Error('il video di Esplora è solo in inglese');
  let lavoro;
  if (modo === 'esplora') {
    const [uscita, ...istanti] = resto;
    if (!uscita) throw new Error('per Esplora: esplora <uscita.mp4>, oppure esplora <cartella> t…');
    lavoro = (browser) => esplora(browser, uscita, istanti);
  } else {
    const [misura, cartella, ...istanti] = resto;
    if (modo && !MODI.includes(modo)) throw new Error(`il modo è ${MODI.join(', ')} o esplora`);
    if (misura && !MISURE[misura]) throw new Error(`la misura è ${Object.keys(MISURE).join(' o ')}`);
    if (cartella && (!modo || !misura || istanti.length === 0)) {
      throw new Error('per i fotogrammi: modo misura cartella t…');
    }
    lavoro = (browser) => laHome(browser, modo, misura, cartella, istanti);
  }
  // I campi nativi di data e ora (il promemoria dell'Activity) seguono la lingua del browser, non il locale della
  // pagina (apri): con --lang sono nella lingua del video, invece che in quella di chi registra.
  const browser = await chromium.launch({ executablePath: CHROME, args: [`--lang=${LINGUA.locale}`] });
  try {
    await lavoro(browser);
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
