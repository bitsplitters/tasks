/*
 * Il test dei pezzi dell'interfaccia della demo (piano 2026-11-15-demo-fedele.md, compito 8, nel repo
 * team-tasks-manager): le parti pure, cioè le chiavi dei data-k, il filtro del menu di menzioni, i controlli della
 * modale e l'HTML di ogni pezzo col contratto del §5. Come si comportano ai clic e alla tastiera si prova nella demo,
 * coi compiti 9-13. Si lancia dalla cartella tasks con `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { avvisoIllustrativo, discord } from '../src/components/home/scene-data.ts';
import { COACHES, LEO, MIA, SAM, idRuoloTtm } from '../src/components/home/demo/modello.ts';
import { chiave, senzaAccenti } from '../src/components/home/demo/ui/comune.ts';
import { controllaCampo, htmlDellaModale } from '../src/components/home/demo/ui/modale.ts';
import type { Modale } from '../src/components/home/demo/ui/modale.ts';
import { filtraVoci, htmlDellEtichetta, htmlDellaVoce } from '../src/components/home/demo/ui/menzioni.ts';
import type { Voce } from '../src/components/home/demo/ui/menzioni.ts';
import { htmlDellaScelta } from '../src/components/home/demo/ui/scelta.ts';
import { htmlDellEffimero } from '../src/components/home/demo/ui/effimero.ts';
import { htmlDelDialogo } from '../src/components/home/demo/ui/dialogo.ts';

const VOCI: Voce[] = [
  { id: MIA, ruolo: false, nome: 'Mia', sotto: 'mia_nova', colore: '#eb459e', online: true },
  { id: LEO, ruolo: false, nome: 'Leo', sotto: 'leo_kade', colore: '#23a55a' },
  { id: SAM, ruolo: false, nome: 'Sam', sotto: 'sam_rivers', colore: '#f0b232', online: true },
  { id: COACHES, ruolo: true, nome: 'Coaches', sotto: '3' },
  { id: idRuoloTtm(1), ruolo: true, nome: 'TTM1', sotto: '2' },
];

const nomi = (voci: Voce[]) => voci.map((v) => v.nome);

/** Il tag di apertura dell'elemento con quel data-k, per guardarne gli attributi. */
function tag(html: string, k: string): string {
  const m = new RegExp(`<[a-z]+[^>]* data-k="${k}"[^>]*>`).exec(html);
  assert.ok(m, `manca data-k="${k}"`);
  return m[0];
}

test('le chiavi dei data-k: la prima parola, in minuscolo, senza accenti', () => {
  assert.equal(senzaAccenti('Zoë Ångström'), 'zoe angstrom');
  assert.equal(chiave('Scrim results'), 'scrim');
  assert.equal(chiave('Staff alerts'), 'staff');
  assert.equal(chiave('TTM1'), 'ttm1');
  assert.equal(chiave('Coaches'), 'coaches');
  assert.equal(chiave(' Mia'), 'mia');
  assert.equal(chiave('12'), '12');
  assert.equal(chiave('Zoë'), 'zoe');
});

test('il filtro del menu di menzioni: il nome o lo username che comincia così, senza maiuscole né accenti', () => {
  assert.deepEqual(nomi(filtraVoci(VOCI, '')), ['Mia', 'Leo', 'Sam', 'Coaches', 'TTM1']);
  assert.deepEqual(nomi(filtraVoci(VOCI, 'm')), ['Mia']);
  assert.deepEqual(nomi(filtraVoci(VOCI, 'S')), ['Sam']);
  assert.deepEqual(nomi(filtraVoci(VOCI, 'leo_')), ['Leo']);
  assert.deepEqual(nomi(filtraVoci(VOCI, 'Mí')), ['Mia']);
  assert.deepEqual(nomi(filtraVoci(VOCI, 'co')), ['Coaches']);
  assert.deepEqual(nomi(filtraVoci(VOCI, 'ttm')), ['TTM1']);
  // Per prefisso, non in mezzo; il numero dei membri di un ruolo non è un nome.
  assert.deepEqual(nomi(filtraVoci(VOCI, 'a')), []);
  assert.deepEqual(nomi(filtraVoci(VOCI, '3')), []);
});

test('i controlli della modale prima di mandare: obbligo, poi lunghezza minima (§1.2.12)', () => {
  assert.equal(controllaCampo({ obbligatorio: true }, ''), 'This field is required.');
  assert.equal(controllaCampo({ obbligatorio: true, min: 4 }, ''), 'This field is required.');
  assert.equal(controllaCampo({}, ''), null);
  assert.equal(controllaCampo({ min: 4 }, ''), null);
  assert.equal(controllaCampo({ min: 5, max: 5 }, '6:14'), 'Must be at least 5 characters long.');
  assert.equal(controllaCampo({ min: 4 }, '2026'), null);
  // Gli spazi passano: un testo che resta vuoto lo rifiuta il bot (tasklist.modal.task.blank.error).
  assert.equal(controllaCampo({ obbligatorio: true }, '  '), null);
});

test('i testi di Discord e l\'avviso della sola lettura stanno in scene-data (§1.2.14)', () => {
  assert.equal(discord().almeno(4), 'Must be at least 4 characters long.');
  assert.equal(discord().annulla, 'Cancel');
  assert.equal(discord().invia, 'Submit');
  assert.equal(discord().soloTu, 'Only you can see this');
  assert.equal(discord().dismiss, 'Dismiss message');
  assert.equal(avvisoIllustrativo(), 'For illustration only: this demo doesn\'t fully replicate how TTM works.');
});

const PROMEMORIA: Modale = {
  titolo: 'Set reminder for task <3>',
  campi: [
    { tipo: 'testo', id: 'day', etichetta: 'Day', valore: '15', obbligatorio: true, min: 1, max: 2 },
    {
      tipo: 'scelta', id: 'month', etichetta: 'Month', opzioni: [{ valore: '11', testo: 'November' }], scelto: '11',
      obbligatorio: true,
    },
    { tipo: 'testo', id: 'zone', etichetta: 'Time zone', valore: 'a "b" <c>', segnaposto: 'Europe/Rome' },
    { tipo: 'testoFisso', html: '<p class="x">🔒 lock</p>' },
    { tipo: 'testo', id: 'text', etichetta: 'Mandatory field', valore: 'Riga', obbligatorio: true, paragrafo: true },
  ],
};

test('la modale: dialogo con il titolo, i campi coi loro data-k, Cancel e Submit', () => {
  const html = htmlDellaModale(PROMEMORIA, 7);
  const box = tag(html, 'modal');
  assert.match(box, /role="dialog"/);
  assert.match(box, /aria-modal="true"/);
  assert.match(box, /aria-labelledby="ui-mt-7"/);
  assert.match(html, /id="ui-mt-7">Set reminder for task &lt;3&gt;</);
  assert.match(tag(html, 'm-x'), /aria-label="Close"/);
  assert.match(tag(html, 'm-cancel'), /^<button/);
  assert.match(html, />Cancel</);
  assert.match(html, />Submit</);
  assert.doesNotMatch(tag(html, 'm-submit'), /disabled/);
  const day = tag(html, 'm-day');
  assert.match(day, /^<input/);
  assert.match(day, /value="15"/);
  assert.match(day, /maxlength="2"/);
  assert.doesNotMatch(day, /readonly/);
  assert.match(tag(html, 'm-zone'), /value="a &quot;b&quot; &lt;c&gt;"/);
  assert.match(tag(html, 'm-zone'), /placeholder="Europe\/Rome"/);
  assert.match(tag(html, 'm-text'), /^<textarea/);
  assert.match(tag(html, 'm-month'), /class="ui-mscelta"/);
  assert.match(html, /<p class="x">🔒 lock<\/p>/);
  // L'asterisco rosso dei campi obbligatori: due, Day e il testo.
  assert.equal(html.match(/class="ui-mreq"/g)?.length, 3);
  // Il menu del mese è obbligatorio come nel bot (in Discord un menu in una modale lo è di default).
  assert.match(html, /id="ui-m7-month-lab">Month<span class="ui-mreq" aria-hidden="true">\*<\/span><\/p>/);
  assert.doesNotMatch(html, /ui-avviso/);
});

test('la modale in sola lettura: l\'avviso in cima, i campi non si scrivono, Submit spento (§8.3)', () => {
  const html = htmlDellaModale({ ...PROMEMORIA, solaLettura: avvisoIllustrativo() }, 8);
  assert.match(html, /<div class="ui-avviso" role="note">For illustration only: this demo doesn't fully replicate/);
  assert.ok(html.indexOf('ui-avviso') < html.indexOf('data-k="m-day"'));
  for (const k of ['m-day', 'm-zone', 'm-text']) assert.match(tag(html, k), / readonly/);
  assert.match(tag(html, 'm-submit'), / disabled/);
  assert.doesNotMatch(tag(html, 'm-cancel'), /disabled/);
});

test('il menu di menzioni: la riga con la casella, lo username, lo scudo e i membri di un ruolo', () => {
  const mia = htmlDellaVoce(VOCI[0], true, 'ui-mz1-0');
  assert.match(tag(mia, 'sub-mia'), /role="option"/);
  assert.match(tag(mia, 'sub-mia'), /aria-selected="true"/);
  assert.match(tag(mia, 'sub-mia'), /id="ui-mz1-0"/);
  assert.match(mia, /--av:#eb459e/);
  assert.match(mia, /class="ui-stato" data-on/);
  assert.match(mia, />Mia</);
  assert.match(mia, />mia_nova</);
  assert.match(mia, /class="ui-cb"/);
  const leo = htmlDellaVoce(VOCI[1], false, 'ui-mz1-1');
  assert.match(tag(leo, 'sub-leo'), /aria-selected="false"/);
  assert.match(leo, /class="ui-stato">/);
  const coaches = htmlDellaVoce(VOCI[3], false, 'ui-mz1-3');
  assert.match(tag(coaches, 'sub-coaches'), /role="option"/);
  assert.match(coaches, /class="ui-scudo"/);
  assert.match(coaches, /class="ui-omino"[^]*> 3</);
  assert.doesNotMatch(coaches, /sc-av/);
  assert.match(tag(htmlDellaVoce(VOCI[4], false, 'x'), 'sub-ttm1'), /role="option"/);
});

test('il menu di menzioni: l\'etichetta di una scelta, con la × che la toglie', () => {
  const mia = htmlDellEtichetta(VOCI[0]);
  assert.match(tag(mia, 'tag-mia'), /class="ui-mztag"/);
  assert.match(tag(mia, 'tagx-mia'), /^<button type="button"/);
  assert.match(tag(mia, 'tagx-mia'), /aria-label="Remove Mia"/);
  assert.match(mia, /--av:#eb459e/);
  const coaches = htmlDellEtichetta(VOCI[3]);
  assert.match(coaches, /class="ui-scudo"/);
  assert.match(tag(coaches, 'tagx-coaches'), /aria-label="Remove Coaches"/);
});

test('il menu a scelta singola: il campo col segnaposto o la scelta, le voci senza caselle', () => {
  const opzioni = [
    { valore: 'Scrim results', testo: 'Scrim results' }, { valore: 'Staff alerts', testo: 'Staff alerts' },
  ];
  const vuoto = htmlDellaScelta('wb', opzioni, 'Choose the webhook to associate', null, 3);
  const campo = tag(vuoto, 'wb-sel');
  assert.match(campo, /role="combobox"/);
  assert.match(campo, /aria-expanded="false"/);
  assert.match(campo, /aria-controls="ui-sc-3"/);
  assert.doesNotMatch(campo, /data-scelto/);
  assert.match(vuoto, />Choose the webhook to associate</);
  assert.match(tag(vuoto, 'wb-scrim'), /aria-selected="false"/);
  assert.match(tag(vuoto, 'wb-staff'), /role="option"/);
  assert.doesNotMatch(vuoto, /ui-cb|sc-cb|<input/);
  const scelto = htmlDellaScelta('wb', opzioni, 'Choose the webhook to associate', 'Staff alerts', 4);
  assert.match(tag(scelto, 'wb-sel'), /data-scelto/);
  assert.match(tag(scelto, 'wb-staff'), /aria-selected="true"/);
  assert.match(tag(scelto, 'wb-scrim'), /aria-selected="false"/);
  assert.doesNotMatch(scelto, />Choose the webhook to associate</);
});

test('il messaggio effimero: da TTM, il contenuto com\'è, «Only you can see this • Dismiss message»', () => {
  const html = htmlDellEffimero('<p class="q">Reopen?</p><button data-k="e-reopen">Reopen</button>');
  assert.match(html, />Team Tasks Manager</);
  assert.match(html, />APP</);
  assert.match(html, />6:04 PM</);
  assert.match(html, /<p class="q">Reopen\?<\/p><button data-k="e-reopen">Reopen<\/button>/);
  assert.match(html, />Only you can see this</);
  assert.match(tag(html, 'eph-dismiss'), /^<button type="button"/);
  assert.match(html, />Dismiss message</);
});

test('il dialogo dell\'Activity: il titolo con la ✕, il corpo, i pulsanti coi loro stili', () => {
  const html = htmlDelDialogo({
    titolo: 'Exit <the> Activity',
    corpo: '<p>Mia is here.</p>',
    piede: [
      { id: 'me', testo: 'Leave on your own', stile: 'grigio' },
      { id: 'all', testo: 'Bring back', stile: 'blu', spento: true },
      { id: 'clean', testo: 'Clean', stile: 'rosso' },
    ],
  }, 4);
  assert.match(html, /^<div class="ui-dlg" role="dialog"/);
  assert.match(html, /data-k="d-me"><span class="ui-dlgbtesto">Leave on your own<\/span>/);
  assert.ok(html.includes('Leave on your own</span><span class="ui-dlgpunti" aria-hidden="true">' +
    '<i></i><i></i><i></i></span></button>'));
  assert.match(html, /role="dialog"/);
  assert.match(html, /aria-modal="true"/);
  assert.match(html, /aria-labelledby="ui-dt-4"/);
  assert.match(html, /id="ui-dt-4">Exit &lt;the&gt; Activity</);
  assert.match(tag(html, 'd-x'), /aria-label="Close"/);
  assert.match(html, /<p>Mia is here.<\/p>/);
  assert.match(tag(html, 'd-me'), /class="sc-abtn sc-raised"/);
  assert.doesNotMatch(tag(html, 'd-me'), /disabled/);
  assert.match(tag(html, 'd-all'), /class="sc-abtn sc-blue"/);
  assert.match(tag(html, 'd-all'), / disabled/);
  assert.match(tag(html, 'd-clean'), /class="sc-abtn sc-red"/);
  assert.ok(html.indexOf('data-k="d-me"') < html.indexOf('data-k="d-all"'));
});

test('il dialogo largo di Edit the list; il piede già in HTML, come le frecce della guida', () => {
  const piede = '<div class="g">‹ ›</div>';
  const html = htmlDelDialogo({ titolo: 'Guide', corpo: '<p>1</p>', piede, largo: true }, 5);
  assert.match(html, /^<div class="ui-dlg" data-wide role="dialog"/);
  assert.ok(html.endsWith('<div class="ui-dlgpiede"><div class="g">‹ ›</div></div></div>'));
  assert.doesNotMatch(htmlDelDialogo({ titolo: 'x', corpo: '', piede: [] }, 6), /ui-dlgpiede/);
});
