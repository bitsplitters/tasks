/*
 * Il test del pannello del task nella demo dell'Activity (piano 2026-11-15-demo-fedele.md, compito 11, nel repo
 * team-tasks-manager): il selettore delle persone come PeoplePicker.tsx, la vista dei fusi come ZonePicker.tsx, ciò che
 * l'area mostra per ogni azione come ContentAction, PeopleAction, ReminderAction e WebhookAction della pagina, con
 * Save e Delete accesi o spenti. Si lancia dalla cartella tasks con `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ADESSO, COACHES, LEO, MIA, PROPOSTO, SAM, ZONA, idRuoloTtm, statoIniziale,
} from '../src/components/home/demo/modello.ts';
import type { Stato, Task } from '../src/components/home/demo/modello.ts';
import {
  eliminaTaskConfermato, imparaIlFuso, togliOwnerConfermato,
} from '../src/components/home/demo/regole.ts';
import type { Esito, Menzione } from '../src/components/home/demo/regole.ts';
import {
  aggiungi, cercaPersone, htmlDeiSuggerimenti, htmlDelleScelte, stesseScelte, togli, vistaDellePersone,
} from '../src/components/home/demo/ui/persone.ts';
import { chiaveDellaZona, htmlDelleZone } from '../src/components/home/demo/ui/fusi.ts';
import {
  eliminazione, inRosso, moduloDelPromemoria, primoParagrafo, quandoDi, salvaPromemoria, scelteDelWebhook,
  testoCambiato,
} from '../src/components/home/demo/pannello.ts';
import { istanteDi } from '../src/components/home/demo/quando.ts';

const S0 = statoIniziale();
const persona = (id: string): Menzione => ({ ruolo: false, id });
const ruolo = (id: string): Menzione => ({ ruolo: true, id });
const nomi = (pillole: { nome: string }[]) => pillole.map((p) => p.nome);
const conTasks = (tasks: Task[]): Stato => ({ ...S0, lista: { titolo: 'x', tasks } });
const task = (main: number, testo: string, extra: Partial<Task> = {}): Task =>
  ({ pos: { main, sub: 0 }, testo, fatto: false, ...extra });

/** Lo stato di un esito «fatto»: un altro esito fa fallire il test. */
function statoDi(esito: Esito): Stato {
  assert.equal(esito.tipo, 'fatto', JSON.stringify(esito));
  return (esito as Extract<Esito, { tipo: 'fatto' }>).stato;
}

// Il selettore delle persone (PeoplePicker.tsx)

test('la ricerca del bot: chi ha un nome o uno username che comincia col testo, senza maiuscole né accenti', () => {
  assert.deepEqual(cercaPersone('l').map((p) => p.id), [LEO]);
  assert.deepEqual(cercaPersone('leo_').map((p) => p.id), [LEO]);
  assert.deepEqual(cercaPersone(' MI ').map((p) => p.id), [MIA]);
  assert.deepEqual(cercaPersone('sam_r').map((p) => p.id), [SAM]);
  assert.deepEqual(cercaPersone('ia'), []);
  assert.deepEqual(cercaPersone(''), []);
});

test('senza testo, chi è nell\'Activity e non è già scelto, con «Now in the Activity»', () => {
  const v = vistaDellePersone(S0, 'owner', [persona(MIA)], '', null);
  assert.deepEqual(nomi(v.scelte), ['Mia']);
  assert.deepEqual(nomi(v.suggerite), ['Sam (you)']);
  assert.equal(v.nota, 'Now in the Activity');
  assert.equal(v.pieno, false);
  assert.equal(vistaDellePersone(S0, 'owner', [persona(MIA), persona(SAM)], '', null).nota, null);
});

test('col testo, le persone note e i ruoli che lo contengono; le altre persone dopo la risposta della ricerca', () => {
  const a = vistaDellePersone(S0, 'tag', [], 'a', null);
  assert.deepEqual(nomi(a.suggerite), ['Sam (you)', 'Mia', '@Coaches']);
  assert.equal(a.nota, null);
  // Leo non è nella lista né nell'Activity: senza la risposta per «l» non c'è ancora. Non si dice nemmeno «nessuno».
  const attesa = vistaDellePersone(S0, 'owner', [], 'l', null);
  assert.deepEqual(attesa.suggerite, []);
  assert.equal(attesa.nota, null);
  const risposta = { testo: 'l', persone: cercaPersone('l') };
  assert.deepEqual(nomi(vistaDellePersone(S0, 'owner', [], 'l', risposta).suggerite), ['Leo']);
  // La risposta per un testo più corto si restringe col nome, finché non arriva la prossima.
  assert.deepEqual(nomi(vistaDellePersone(S0, 'owner', [], 'le', risposta).suggerite), ['Leo']);
  assert.deepEqual(nomi(vistaDellePersone(S0, 'owner', [], 'lu', risposta).suggerite), []);
  // La risposta per questo testo mostra anche chi lo ha nello username.
  const user = { testo: 'leo_', persone: cercaPersone('leo_') };
  assert.deepEqual(nomi(vistaDellePersone(S0, 'owner', [], 'leo_', user).suggerite), ['Leo']);
});

test('nessuno: «Nobody matches» solo con la risposta per quel testo', () => {
  assert.equal(vistaDellePersone(S0, 'owner', [], 'zz', null).nota, null);
  assert.equal(vistaDellePersone(S0, 'owner', [], ' zz ', { testo: 'zz', persone: [] }).nota, 'Nobody matches «zz»');
});

test('i ruoli del server, anche quelli di TTM; i nomi come li scrive la pagina', () => {
  const ttm1 = { id: idRuoloTtm(1), nome: 'TTM1', membri: [MIA, LEO], diTtm: true };
  const s = { ...S0, ruoli: [...S0.ruoli, ttm1] };
  assert.deepEqual(nomi(vistaDellePersone(s, 'owner', [], 't', { testo: 't', persone: [] }).suggerite), ['@TTM1']);
  assert.deepEqual(nomi(vistaDellePersone(s, 'tag', [ruolo(COACHES), persona(SAM)], '', null).scelte),
    ['@Coaches', 'Sam (you)']);
});

test('i tag: al più 25, poi il campo si spegne con «25 tags at most» e niente suggerimenti', () => {
  const venticinque = Array.from({ length: 25 }, (_, i) => ruolo(String(1000 + i)));
  const v = vistaDellePersone(S0, 'tag', venticinque, '', null);
  assert.equal(v.pieno, true);
  assert.equal(v.nota, '25 tags at most: remove one to add another.');
  assert.deepEqual(v.suggerite, []);
  assert.deepEqual(aggiungi('tag', venticinque, persona(SAM)), venticinque);
  assert.equal(vistaDellePersone(S0, 'owner', venticinque, '', null).pieno, false);
});

test('l\'owner: un ruolo prende il posto delle persone, una persona quello del ruolo; i tag si mettono in coda', () => {
  assert.deepEqual(aggiungi('owner', [persona(MIA)], ruolo(COACHES)), [ruolo(COACHES)]);
  assert.deepEqual(aggiungi('owner', [ruolo(COACHES)], persona(MIA)), [persona(MIA)]);
  assert.deepEqual(aggiungi('owner', [persona(MIA)], persona(LEO)), [persona(MIA), persona(LEO)]);
  assert.deepEqual(aggiungi('owner', [persona(MIA)], persona(MIA)), [persona(MIA)]);
  assert.deepEqual(aggiungi('tag', [ruolo(COACHES)], persona(MIA)), [ruolo(COACHES), persona(MIA)]);
  assert.deepEqual(togli([persona(MIA), persona(LEO)], persona(MIA)), [persona(LEO)]);
});

test('le stesse scelte in un altro ordine sono le stesse (sameMentions)', () => {
  assert.ok(stesseScelte([persona(MIA), persona(LEO)], [persona(LEO), persona(MIA)]));
  assert.ok(!stesseScelte([persona(MIA)], [persona(MIA), persona(LEO)]));
  assert.ok(!stesseScelte([persona(MIA)], [ruolo(MIA)]));
});

test('le pillole: le scelte con la ×, i suggerimenti col +, coi data-k del contratto', () => {
  const v = vistaDellePersone(S0, 'tag', [persona(MIA), ruolo(COACHES)], '', null);
  const sopra = htmlDelleScelte(v);
  assert.match(sopra, /^<ul class="sc-pills" data-kind="chosen">/);
  assert.match(sopra, /<button type="button" class="sc-pill" data-chosen data-k="pc-mia" data-m="p:\d+"/);
  assert.match(sopra, /data-k="pc-mia" data-m="p:\d+" aria-label="Remove Mia">/);
  assert.match(sopra, /<span class="sc-av" style="--av: #eb459e" aria-hidden="true">M<\/span><span class="sc-pname">/);
  assert.match(sopra, /M<\/span><span class="sc-pname">Mia<\/span>/);
  assert.match(sopra, /data-chosen data-role data-k="pc-coaches"[^>]*aria-label="Remove @Coaches"/);
  assert.match(sopra, /<span class="sc-pmark" aria-hidden="true">×<\/span><\/button><\/li>/);
  const sotto = htmlDeiSuggerimenti(v);
  assert.match(sotto, /^<div class="sc-pnote">Now in the Activity<\/div><ul class="sc-pills" data-kind="suggested">/);
  assert.match(sotto, /data-k="pk-sam" data-m="p:\d+" aria-label="Add Sam \(you\)">/);
  assert.match(sotto, /aria-label="Add Sam \(you\)"><span class="sc-pmark" aria-hidden="true">\+<\/span>/);
  assert.equal(htmlDelleScelte(vistaDellePersone(S0, 'tag', [], '', null)), '');
  assert.equal(htmlDeiSuggerimenti(vistaDellePersone(S0, 'tag', [], 'zz', null)), '');
});

// La vista dei fusi (ZonePicker.tsx)

test('il data-k di una zona: il nome IANA in minuscolo, con - al posto di / e _', () => {
  assert.equal(chiaveDellaZona('Europe/Rome'), 'z-europe-rome');
  assert.equal(chiaveDellaZona('America/Argentina/Buenos_Aires'), 'z-america-argentina-buenos-aires');
});

test('senza testo, «Your time zones» coi motivi; la zona del campo è quella segnata', () => {
  const roma = htmlDelleZone('', ZONA, undefined, ADESSO);
  assert.match(roma, /^<div class="sc-pnote">Your time zones<\/div><ul class="sc-zlist">/);
  assert.match(roma, /<button type="button" class="sc-zrow" data-k="z-europe-rome" data-zona="Europe\/Rome"/);
  assert.match(roma, /data-zona="Europe\/Rome" aria-current="true">/);
  assert.match(roma, /<span class="sc-zrcity">Rome<\/span><span class="sc-zrcountry">Italy<\/span>/);
  assert.match(roma, /<span class="sc-zrreasons">this device · the server<\/span>/);
  assert.match(roma, /<span class="sc-zrnow">18:04<\/span><span class="sc-zroffset">UTC\+1<\/span>/);
  const tokyo = htmlDelleZone('', 'Asia/Tokyo', 'Asia/Tokyo', ADESSO);
  assert.match(tokyo, /data-k="z-europe-rome" data-zona="Europe\/Rome">/);
  assert.match(tokyo, /data-k="z-asia-tokyo" data-zona="Asia\/Tokyo" aria-current="true">/);
  assert.match(tokyo, /<span class="sc-zrreasons">last used<\/span>/);
});

test('col testo, le zone trovate senza motivi; nessuna: «No time zone matches»', () => {
  const parigi = htmlDelleZone(' paris ', ZONA, undefined, ADESSO);
  assert.match(parigi, /^<ul class="sc-zlist"><li><button type="button" class="sc-zrow" data-k="z-europe-paris"/);
  assert.doesNotMatch(parigi, /sc-zrreasons|sc-pnote/);
  assert.equal(htmlDelleZone('atlantis', ZONA, undefined, ADESSO),
    '<div class="sc-pnote">No time zone matches «atlantis»</div><ul class="sc-zlist"></ul>');
});

// Le azioni in rosso (Delete)

test('Delete del contenuto: l\'ultimo task non si elimina; un gruppo chiede sopra Delete; gli altri vanno', () => {
  const ultimo = inRosso(conTasks([task(1, 'Solo')]), '1', 'content');
  assert.deepEqual(ultimo, {
    avviso: '<:tip:0> This is the last task of the list, and a list can\'t be left empty. To delete the whole list, '
      + 'use the channel.',
    pronto: false,
  });
  assert.deepEqual(inRosso(S0, '2', 'content'), {
    domanda: '<:task_blue:0> Task **2** has subtasks. If you delete it, its subtasks stay where they are and become '
      + 'subtasks of task **1**, the group right above.',
    pronto: true,
  });
  assert.deepEqual(inRosso(S0, '4', 'content'), { pronto: true });
  assert.deepEqual(statoDi(eliminazione(S0, '2', 'content')), eliminaTaskConfermato(S0, '2'));
});

test('Delete dell\'owner: senza owner l\'avviso; col promemoria che deve partire la domanda', () => {
  assert.deepEqual(inRosso(S0, '4', 'owner'), { avviso: '<:tip:0> The selected task has no owner.', pronto: false });
  assert.deepEqual(inRosso(S0, '3', 'owner'), {
    domanda: '<:owner_blue:0> Task **3** has a reminder: without an owner it would reach no one, so the reminder is '
      + 'removed too.',
    pronto: true,
  });
  assert.deepEqual(statoDi(eliminazione(S0, '3', 'owner')), togliOwnerConfermato(S0, '3'));
});

test('Delete dei tag: senza tag, o di un task di soli tag, l\'avviso e Delete spento', () => {
  assert.deepEqual(inRosso(S0, '4', 'tag'),
    { avviso: '<:tip:0> There are no tags in the selected task.', pronto: false });
  const soliTag = conTasks([task(1, `<@${MIA}>`), task(2, `Brief <@${LEO}>`)]);
  assert.deepEqual(inRosso(soliTag, '1', 'tag'), {
    avviso: '<:tip:0> The task contains only tags: removing them would leave it without text, so they stay.',
    pronto: false,
  });
  assert.deepEqual(inRosso(soliTag, '2', 'tag'), { pronto: true });
  assert.equal(statoDi(eliminazione(soliTag, '2', 'tag')).lista.tasks[1].testo, 'Brief');
});

test('Delete del promemoria e del webhook: senza, l\'avviso e Delete spento', () => {
  assert.deepEqual(inRosso(S0, '4', 'reminder'),
    { avviso: '<:tip:0> There is no reminder in the selected task.', pronto: false });
  assert.deepEqual(inRosso(S0, '3', 'reminder'), { pronto: true });
  assert.equal(statoDi(eliminazione(S0, '3', 'reminder')).lista.tasks[3].promemoria, undefined);
  assert.deepEqual(inRosso(S0, '4', 'webhook'),
    { avviso: '<:tip:0> There is no webhook in the selected task.', pronto: false });
  const conWebhook = conTasks([task(1, 'A', { webhook: 'Scrim results' }), task(2, 'B')]);
  assert.deepEqual(inRosso(conWebhook, '1', 'webhook'), { pronto: true });
  assert.equal(statoDi(eliminazione(conWebhook, '1', 'webhook')).lista.tasks[0].webhook, undefined);
});

// Le azioni in blu

test('il contenuto cambia quando il testo è un altro, a meno degli spazi', () => {
  const t = S0.lista.tasks[4];
  assert.ok(!testoCambiato(S0, t, 'Publish the match-day graphic'));
  assert.ok(!testoCambiato(S0, t, '  Publish the   match-day\ngraphic '));
  assert.ok(testoCambiato(S0, t, 'Publish the graphic'));
  assert.ok(testoCambiato(S0, t, ''));
});

test('il promemoria: quello del task nel suo fuso, o quello proposto nel fuso di chi guarda', () => {
  assert.deepEqual(quandoDi(S0, '3'), { data: '2026-11-15', ora: '18:14', zona: ZONA, toccata: false });
  assert.deepEqual(quandoDi(S0, '4'), { data: '2026-11-15', ora: '18:14', zona: ZONA, toccata: false });
  const kolkata = imparaIlFuso(S0, 'Asia/Kolkata');
  assert.deepEqual(quandoDi(kolkata, '4'), { data: '2026-11-15', ora: '22:44', zona: 'Asia/Kolkata', toccata: false });
  assert.deepEqual(quandoDi(kolkata, '3'), { data: '2026-11-15', ora: '18:14', zona: ZONA, toccata: false });
});

test('l\'istante dei campi, null finché la data o l\'ora non sono intere', () => {
  const q = quandoDi(S0, '4');
  assert.equal(istanteDi(q), PROPOSTO);
  assert.equal(istanteDi({ ...q, data: '' }), null);
  assert.equal(istanteDi({ ...q, ora: '' }), null);
  assert.equal(istanteDi({ ...q, zona: 'Asia/Tokyo', data: '2026-11-16' }), Date.UTC(2026, 10, 16, 9, 14) / 1000);
});

test('il modulo del promemoria: Save acceso per uno nuovo o cambiato; gli avvisi sopra', () => {
  const owner = '<:tip:0> The task has no owner: saving the reminder makes you its owner automatically.';
  const fermo = moduloDelPromemoria(S0, '3', quandoDi(S0, '3'));
  assert.deepEqual(fermo, { at: PROPOSTO, avvisi: [], pronto: false, dispositivo: null });
  assert.equal(moduloDelPromemoria(S0, '3', { ...quandoDi(S0, '3'), ora: '19:00' }).pronto, true);
  assert.deepEqual(moduloDelPromemoria(S0, '4', quandoDi(S0, '4')),
    { at: PROPOSTO, avvisi: [owner], pronto: true, dispositivo: null });
  const presto = moduloDelPromemoria(S0, '4', { ...quandoDi(S0, '4'), ora: '18:08' });
  assert.deepEqual(presto.avvisi,
    ['<:tip:0> **Invalid reminder**. Reminder must be at least 5 minutes away from now.', owner]);
  assert.equal(presto.pronto, false);
  const passato = moduloDelPromemoria(S0, '3', { ...quandoDi(S0, '3'), ora: '18:04' });
  assert.deepEqual(passato.avvisi, ['<:tip:0> **The date has already passed.** Choose a new one to save.']);
  assert.equal(passato.pronto, false);
  assert.deepEqual(moduloDelPromemoria(S0, '4', { ...quandoDi(S0, '4'), data: '' }),
    { at: null, avvisi: [owner], pronto: false, dispositivo: null });
});

test('in un altro fuso, sotto i campi l\'ora del dispositivo; lo stesso istante in un altro fuso cambia', () => {
  const tokyo = { data: '2026-11-16', ora: '18:14', zona: 'Asia/Tokyo', toccata: true };
  const m = moduloDelPromemoria(S0, '3', tokyo);
  assert.equal(m.dispositivo, 'On this device: Mon 16 Nov, 10:14');
  assert.equal(m.pronto, true);
  const stessoIstante = { data: '2026-11-16', ora: '02:14', zona: 'Asia/Tokyo', toccata: true };
  assert.equal(moduloDelPromemoria(S0, '3', stessoIstante).at, PROPOSTO);
  assert.equal(moduloDelPromemoria(S0, '3', stessoIstante).pronto, true);
});

test('Save del promemoria: il fuso s\'impara solo se chi guarda l\'ha toccato', () => {
  const kolkata = imparaIlFuso(S0, 'Asia/Kolkata');
  const nonToccato = statoDi(salvaPromemoria(kolkata, '3', { ...quandoDi(kolkata, '3'), ora: '19:00' }));
  assert.equal(nonToccato.fuso, 'Asia/Kolkata');
  assert.deepEqual(nonToccato.lista.tasks[3].promemoria, { at: PROPOSTO + 2760, zona: ZONA });
  const toccato = statoDi(salvaPromemoria(kolkata, '3', { ...quandoDi(kolkata, '3'), ora: '19:00', toccata: true }));
  assert.equal(toccato.fuso, ZONA);
  const nuovo = statoDi(salvaPromemoria(S0, '4', quandoDi(S0, '4')));
  assert.deepEqual(nuovo.lista.tasks[4].owner, { tipo: 'persona', id: SAM });
});

test('le scelte del webhook: quelli del server con quando scattano; uno che non esiste più in cima', () => {
  assert.deepEqual(scelteDelWebhook(S0.lista.tasks[4]), [
    { nome: 'Scrim results', meta: 'on completion', manca: false },
    { nome: 'Staff alerts', meta: 'always', manca: false },
  ]);
  assert.deepEqual(scelteDelWebhook(task(1, 'A', { webhook: 'Old hook' }))[0],
    { nome: 'Old hook', meta: 'no longer exists', manca: true });
});

test('il primo paragrafo, come firstParagraph', () => {
  assert.equal(primoParagrafo('a\n\nb\n\nc'), 'a');
  assert.equal(primoParagrafo('a\nb'), 'a\nb');
});
