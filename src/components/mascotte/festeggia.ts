/*
 * La mascotte in festa (Festeggia.astro; spec 2026-11-21-mascotte-nel-sito-design.md, §3.4, nel repo
 * team-tasks-manager): sale da dietro il bordo del contenitore la prima volta che lo si vede, e festeggia. Rifà la
 * festa quando il puntatore entra in una qualsiasi carta del contenitore (utente, 2026-11-22: «su qualsiasi delle 6
 * sezioni e non solo su quella dove poggia») o sulla mascotte, e al tocco. Un giro alla volta. Con meno animazioni
 * non fa nulla: lo script inline del componente non l'ha nascosta, e resta ferma coi coriandoli intorno.
 */

/** L'attesa prima della salita quando il contenitore si vede già all'apertura, perché la si veda salire. */
const ATTESA_MS = 400;
/** La salita: mx-salta in mascotte.css. */
const SALITA_MS = 720;
/** La festa: i coriandoli durano 1500 ms, più i 160 di ritardo dell'ultimo. */
const FESTA_MS = 1800;

export function avviaFeste(): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-festa]').forEach(avvia);
}

function avvia(el: HTMLElement): void {
  const contenitore = el.parentElement;
  if (!contenitore) return;
  const festa = () => {
    if (['mx-attesa', 'mx-sale', 'mx-in-festa'].some((c) => el.classList.contains(c))) return;
    el.classList.add('mx-in-festa');
    window.setTimeout(() => el.classList.remove('mx-in-festa'), FESTA_MS);
  };
  sali(el, contenitore, festa);
  contenitore.addEventListener('pointerover', (e) => {
    if (e.pointerType === 'touch') return;
    const carta = e.target instanceof Element ? e.target.closest('li') : null;
    if (carta && !(e.relatedTarget instanceof Node && carta.contains(e.relatedTarget))) festa();
  });
  contenitore.addEventListener('click', (e) => {
    if (e.target instanceof Element && e.target.closest('li')) festa();
  });
  el.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'touch') festa();
  });
  el.addEventListener('click', festa);
}

/** La salita, una volta: quando il contenitore si vede per metà, o per mezzo schermo se è più alto. Poi la festa. */
function sali(el: HTMLElement, contenitore: HTMLElement, poi: () => void): void {
  let prima = true;
  const io = new IntersectionObserver((voci) => {
    const v = voci[voci.length - 1];
    const meta = (v.rootBounds?.height ?? window.innerHeight) / 2;
    if (v.isIntersecting && (v.intersectionRatio >= 0.5 || v.intersectionRect.height >= meta)) {
      io.disconnect();
      window.setTimeout(() => {
        el.classList.replace('mx-attesa', 'mx-sale');
        window.setTimeout(() => {
          el.classList.remove('mx-sale');
          poi();
        }, SALITA_MS);
      }, prima ? ATTESA_MS : 0);
    }
    prima = false;
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
  io.observe(contenitore);
}
