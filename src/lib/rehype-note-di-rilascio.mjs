// Le note di rilascio a riquadri (spec 2026-11-19-iva-e-note-di-rilascio-design.md, §4, nel repo team-tasks-manager).
//
// Chi scrive le note continua a scrivere Markdown: un `## X.Y.Z — Titolo`, sotto la riga `Released AAAA-MM-GG`, poi
// l'elenco delle voci, ognuna col suo grassetto iniziale. Il plugin fa di ogni release una sezione col titolo, la data
// e un <details> che si apre: chiuso mostra i grassetti delle prime tre voci e quante altre ce ne sono. L'importanza
// la decide l'ordine in cui si scrivono le voci.
//
// Lavora solo sulle pagine con `releases: true` nel frontmatter. Il titolo resta un h2 fuori dal riquadro e il suo
// testo non cambia: Astro gli dà l'id dopo questo plugin, e le news di /news linkano quegli id dal database.
//
// La prima riga `---` chiude le release: sparisce, e quello che segue (il riquadro «Coming soon») resta fuori.

const DATA = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const ANTEPRIMA = 3;

const el = (tagName, properties, children) => ({ type: 'element', tagName, properties, children });
const testo = (value) => ({ type: 'text', value });
const eTag = (n, tag) => n?.type === 'element' && n.tagName === tag;
const vuoto = (n) => n.type === 'text' && !n.value.trim();
const testoDi = (n) => (n.type === 'text' ? n.value : (n.children ?? []).map(testoDi).join(''));
const plurale = (n, una, tante) => `${n} ${n === 1 ? una : tante}`;

/** Una copia del nodo senza i link, come elenco di nodi: di un link resta il testo. */
const senzaLink = (n) => {
  if (eTag(n, 'a')) return n.children.flatMap(senzaLink);
  if (n.type !== 'element') return [{ ...n }];
  return [{ ...n, properties: { ...n.properties }, children: n.children.flatMap(senzaLink) }];
};

/** La data della riga `Released AAAA-MM-GG`, se è una data vera. */
const leggiData = (riga, titolo) => {
  const m = eTag(riga, 'p') && /^Released (\S+)$/.exec(testoDi(riga).trim());
  if (!m) throw new Error(`note di rilascio: sotto «${titolo}» manca la riga «Released AAAA-MM-GG»`);
  const giorno = m[1];
  const d = new Date(`${giorno}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(giorno) || Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== giorno) {
    throw new Error(`note di rilascio: in «${titolo}» la data «${giorno}» non è una data AAAA-MM-GG valida`);
  }
  return { giorno, scritta: DATA.format(d) };
};

/** Il grassetto con cui comincia la voce: in un elenco largo sta dentro un paragrafo. */
const grassetto = (li, titolo) => {
  let figli = li.children.filter((f) => !vuoto(f));
  if (eTag(figli[0], 'p')) figli = figli[0].children.filter((f) => !vuoto(f));
  if (!eTag(figli[0], 'strong')) {
    throw new Error(`note di rilascio: in «${titolo}» la voce «${testoDi(li).trim().slice(0, 60)}» non comincia col grassetto`);
  }
  return figli[0];
};

const separatore = () => el('span', { className: ['rel-sep'] }, [testo(' · ')]);

function sezione(h2, contenuto, aperta) {
  const titolo = testoDi(h2).trim();
  const primo = contenuto.findIndex((n) => !vuoto(n));
  const { giorno, scritta } = leggiData(contenuto[primo], titolo);
  const corpo = contenuto.filter((_, i) => i !== primo);

  // Le voci sono quelle degli elenchi della release, non quelle annidate dentro una voce.
  const voci = corpo
    .filter((n) => eTag(n, 'ul') || eTag(n, 'ol'))
    .flatMap((lista) => lista.children.filter((f) => eTag(f, 'li')));
  if (!voci.length) throw new Error(`note di rilascio: «${titolo}» non ha voci`);
  const grassetti = voci.map((li) => grassetto(li, titolo));

  const anteprima = grassetti
    .slice(0, ANTEPRIMA)
    .flatMap((g, i) => [...(i ? [separatore()] : []), ...g.children.flatMap(senzaLink)]);
  const altre = voci.length - ANTEPRIMA;
  const sommario = [
    el('span', { className: ['rel-preview'] }, anteprima),
    ...(altre > 0 ? [el('span', { className: ['rel-more'] }, [separatore(), testo(`${altre} more`)])] : []),
    el('span', { className: ['rel-all'] }, [testo(plurale(voci.length, 'change', 'changes'))]),
  ];

  return el('section', { className: ['rel'] }, [
    h2,
    el('p', { className: ['rel-date'] }, [el('time', { dateTime: giorno }, [testo(scritta)])]),
    el('details', { className: ['rel-box'], open: aperta }, [
      // Il sommario ripete i grassetti che stanno già nell'elenco: la ricerca non lo indicizza.
      el('summary', { dataPagefindIgnore: true }, sommario),
      el('div', { className: ['rel-body'] }, corpo),
    ]),
  ]);
}

export default function rehypeNoteDiRilascio() {
  return (tree, file) => {
    if (!file.data?.astro?.frontmatter?.releases) return;
    const figli = [];
    let i = 0;
    let chiuse = false;
    let prima = true;
    while (i < tree.children.length) {
      const n = tree.children[i];
      if (chiuse || !eTag(n, 'h2')) {
        figli.push(n);
        i++;
        continue;
      }
      const contenuto = [];
      for (i++; i < tree.children.length && !eTag(tree.children[i], 'h2') && !eTag(tree.children[i], 'hr'); i++) {
        contenuto.push(tree.children[i]);
      }
      if (eTag(tree.children[i], 'hr')) {
        chiuse = true;
        i++;
      }
      figli.push(sezione(n, contenuto, prima));
      prima = false;
    }
    tree.children = figli;
  };
}
