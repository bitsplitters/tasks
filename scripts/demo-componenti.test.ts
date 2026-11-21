/*
 * Il test dei componenti del bot nel canale della demo (piano 2026-11-15-demo-fedele.md, compito 9, nel repo
 * team-tasks-manager): le voci del menu di menzioni, le opzioni dei webhook, le modali del testo, del promemoria e
 * delle domande, come le costruisce il bot. Si lancia dalla cartella tasks con `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  campiDalPromemoria, divisa, modaleDelPromemoria, modaleDelTesto, modaleDellaDomanda, modaleDellaNuovaData,
  modaleDiModificaInBlocco, opzioniDeiWebhook, vociDelMenu,
} from '../src/components/home/demo/componenti.ts';
import { COACHES, LEO, MIA, SAM, idRuoloTtm, statoIniziale } from '../src/components/home/demo/modello.ts';
import type { Stato } from '../src/components/home/demo/modello.ts';
import {
  applicaOwner, applicaTag, campiDellaNuovaData, campiDelPromemoria, testoDellaLista,
} from '../src/components/home/demo/regole.ts';
import type { Campi, Esito } from '../src/components/home/demo/regole.ts';
import type { Campo } from '../src/components/home/demo/ui/modale.ts';
import { AVVISO_ILLUSTRATIVO } from '../src/components/home/scene-data.ts';

/** Lo stato di un esito «fatto»: un altro esito fa fallire il test. */
function statoDi(esito: Esito): Stato {
  assert.equal(esito.tipo, 'fatto', JSON.stringify(esito));
  return (esito as Extract<Esito, { tipo: 'fatto' }>).stato;
}

/** L'HTML di un TextDisplay. */
function testoFisso(campo: Campo | undefined): string {
  assert.equal(campo?.tipo, 'testoFisso');
  return (campo as Extract<Campo, { tipo: 'testoFisso' }>).html;
}

test('vociDelMenu: prima le persone con lo username, poi i ruoli col numero dei membri, i TTM<n> compresi', () => {
  const s0 = statoIniziale();
  assert.deepEqual(vociDelMenu(s0), [
    { id: MIA, ruolo: false, nome: 'Mia', sotto: 'mia_nova', colore: '#eb459e', online: true },
    { id: LEO, ruolo: false, nome: 'Leo', sotto: 'leo_kade', colore: '#23a55a', online: false },
    { id: SAM, ruolo: false, nome: 'Sam', sotto: 'sam_rivers', colore: '#f0b232', online: true },
    { id: COACHES, ruolo: true, nome: 'Coaches', sotto: '2' },
  ]);
  const s1 = statoDi(applicaOwner(s0, '2', [MIA, LEO, SAM], []));
  assert.deepEqual(vociDelMenu(s1).at(-1), { id: idRuoloTtm(1), ruolo: true, nome: 'TTM1', sotto: '3' });
});

test('divisa: la scelta come la riceve il bot, le persone e i ruoli, ognuno nel suo ordine', () => {
  const s0 = statoIniziale();
  assert.deepEqual(divisa([LEO, COACHES, MIA], s0), { persone: [LEO, MIA], ruoli: [COACHES] });
  assert.deepEqual(divisa([], s0), { persone: [], ruoli: [] });
});

test('opzioniDeiWebhook: i webhook già creati, per nome', () => {
  assert.deepEqual(opzioniDeiWebhook(), [
    { valore: 'Scrim results', testo: 'Scrim results' },
    { valore: 'Staff alerts', testo: 'Staff alerts' },
  ]);
});

/**
 * La seconda riga della legenda dei nomi (2.5.0): il fuso del server, perché chi guarda non ne ha scritto uno, domani
 * alle 18:00 in quel fuso e in un altro; poi come si aggiunge qualcuno di nuovo.
 */
const REGOLE = '<span class="sc-subtext">Dates in <strong>Europe/Rome</strong>, the server\'s time zone, like ' +
  '<code>2026-11-16 18:00</code>; in another one: <code>2026-11-16 18:00 America/New_York</code>. Someone new: ' +
  'add them with <strong>Owner</strong> or <strong>Tag</strong>, or write their code, like ' +
  '<code>&lt;@123456789012345678&gt;</code>. To write @ without a mention: <code>\\@</code></span>';

test('modaleDelTesto: la legenda dei nomi, il paragrafo col testo e i tag coi nomi, obbligatorio fino a 4000; la riga del blocco sotto', () => {
  const s0 = statoIniziale();
  const m = modaleDelTesto(s0, '2');
  assert.equal(m.titolo, 'Edit the content of your task');
  assert.equal(m.solaLettura, undefined);
  assert.equal(testoFisso(m.campi[0]), REGOLE);
  assert.deepEqual(m.campi[1], {
    tipo: 'testo', id: 'task', etichetta: 'Mandatory field', valore: 'Lock the scrim block vs. Nova Collective',
    obbligatorio: true, min: 1, max: 4000, paragrafo: true,
  });
  assert.equal(testoFisso(m.campi[2]), '<span class="sc-subtext">Closing this form with <em>Cancel</em> or ✕ leaves ' +
    'the list locked: unlock it from <strong>More → Unlock list</strong>.</span>');
  assert.equal(m.campi.length, 3);
  // I tag ci sono com'è scritto il testo, coi nomi; l'owner no, ha il suo pulsante.
  const conTag = modaleDelTesto(statoDi(applicaTag(s0, '2', [MIA], [COACHES])), '2');
  assert.equal((conTag.campi[1] as { valore: string }).valore, 'Lock the scrim block vs. Nova Collective @Coaches @Mia');
  assert.equal(testoFisso(conTag.campi[0]),
    `<span class="sc-subtext">People: @Mia · Roles: @Coaches</span>${REGOLE}`);
  assert.equal((modaleDelTesto(s0, '3').campi[1] as { valore: string }).valore, 'VOD review: mid rotations, game 3');
  assert.throws(() => modaleDelTesto(s0, '9'));
});

test('modaleDelPromemoria: Day, Month, Year, Time e il fuso, coi limiti e i valori di WhenModalFields', () => {
  const campi = campiDelPromemoria(statoIniziale(), '2') as Campi;
  const m = modaleDelPromemoria('2', campi);
  assert.equal(m.titolo, 'Set reminder for task 2');
  assert.equal(m.campi.length, 5);
  assert.deepEqual(m.campi[0], { tipo: 'testo', id: 'day', etichetta: 'Day', valore: '15', obbligatorio: true, min: 1,
    max: 2 });
  const mese = m.campi[1] as Extract<Campo, { tipo: 'scelta' }>;
  assert.equal(mese.tipo, 'scelta');
  assert.equal(mese.id, 'month');
  assert.equal(mese.etichetta, 'Month');
  assert.equal(mese.scelto, '11');
  assert.equal(mese.obbligatorio, true);
  assert.equal(mese.opzioni.length, 12);
  assert.deepEqual(mese.opzioni[0], { valore: '1', testo: 'January' });
  assert.deepEqual(mese.opzioni[10], { valore: '11', testo: 'November' });
  assert.deepEqual(mese.opzioni[11], { valore: '12', testo: 'December' });
  assert.deepEqual(m.campi[2], { tipo: 'testo', id: 'year', etichetta: 'Year (yyyy)', valore: '2026',
    obbligatorio: true, min: 4, max: 4 });
  assert.deepEqual(m.campi[3], { tipo: 'testo', id: 'time', etichetta: 'Time (HH:mm)', valore: '18:14',
    obbligatorio: true, min: 5, max: 5 });
  assert.deepEqual(m.campi[4], {
    tipo: 'testo', id: 'zone', etichetta: 'Time zone at: timezones.bitsplitters.app', valore: 'Europe/Rome',
    segnaposto: 'Example: Europe/Rome', obbligatorio: true, min: 1, max: 4000,
  });
});

test('campiDalPromemoria: i valori della modale per id, come li legge TaskListMdlWhen; uno che manca è vuoto', () => {
  assert.deepEqual(campiDalPromemoria({ day: '16', month: '11', year: '2026', time: '09:00', zone: 'Europe/Rome' }),
    { giorno: '16', mese: '11', anno: '2026', ora: '09:00', zona: 'Europe/Rome' });
  assert.deepEqual(campiDalPromemoria({}), { giorno: '', mese: '', anno: '', ora: '', zona: '' });
});

test('modaleDellaDomanda: il titolo della domanda e il suo testo, senza campi da scrivere', () => {
  const s0 = statoIniziale();
  const owner = modaleDellaDomanda({ tipo: 'togliOwner', pos: '3' }, s0);
  assert.equal(owner.titolo, 'Remove the owner?');
  assert.equal(owner.campi.length, 1);
  const domanda = testoFisso(owner.campi[0]);
  assert.ok(domanda.startsWith('<img class="sc-emoji" src="/icons/owner_blue.png" alt=""> Task <strong>3</strong>'));
  assert.match(domanda, / has a reminder: .*<br><br>Submit/);
  const gruppo = modaleDellaDomanda({ tipo: 'eliminaGruppo', pos: '2', sopra: 1 }, s0);
  assert.equal(gruppo.titolo, 'Delete the group?');
  assert.match(testoFisso(gruppo.campi[0]), /become subtasks of task <strong>1<\/strong>, the group right above\./);
  const pulisci = modaleDellaDomanda({ tipo: 'pulisci', completati: 1, avvertenza: 'plain' }, s0);
  assert.equal(pulisci.titolo, 'Clean the list');
  assert.match(testoFisso(pulisci.campi[0]), /<strong>Roster &amp; scrims — week 12<\/strong>/);
});

test('modaleDiModificaInBlocco: in sola lettura, il titolo, la legenda e la lista coi nomi nel formato del bot; niente blocco', () => {
  const s0 = statoIniziale();
  const m = modaleDiModificaInBlocco(s0);
  assert.equal(m.titolo, 'Edit your activities list');
  assert.equal(m.solaLettura, AVVISO_ILLUSTRATIVO);
  assert.match(testoDellaLista(s0.lista), new RegExp(`<t:\\d+> \\[0m,0m,0\\] <@${MIA}>: VOD review`));
  assert.deepEqual(m.campi, [
    {
      tipo: 'testo', id: 'title', etichetta: 'List title', valore: 'Roster & scrims — week 12', obbligatorio: true,
      min: 1, max: 90,
    },
    { tipo: 'testoFisso', html: `<span class="sc-subtext">People: @Mia</span>${REGOLE}` },
    {
      tipo: 'testo', id: 'list', etichetta: 'List of activities',
      valore: testoDellaLista(s0.lista).replace(/<t:\d+> \[0m,0m,0\] <@\d+>/, '2026-11-15 18:14 [0m,0m,0] @Mia'),
      obbligatorio: true, min: 1, max: 4000, paragrafo: true,
    },
  ]);
});

test('modaleDellaNuovaData: i campi del promemoria, le 18:14 proposte, col titolo della riapertura', () => {
  const s0 = statoIniziale();
  const campi = campiDellaNuovaData(s0);
  const m = modaleDellaNuovaData(campi);
  assert.equal(m.titolo, 'New date for the reminders');
  assert.deepEqual(m.campi, modaleDelPromemoria('3', campi).campi);
  assert.equal(campi.ora, '18:14');
});
