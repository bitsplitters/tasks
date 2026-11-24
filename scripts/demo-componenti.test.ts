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
import { avvisoIllustrativo } from '../src/components/home/scene-data.ts';

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
 * La legenda dei nomi (2.5.0): una riga, come si aggiunge una persona nuova e il link alla sezione della guida (scelta
 * dell'utente del 2026-11-22). Niente fuso.
 */
const REGOLE = '<span class="sc-subtext">Someone new: add them with <strong>Owner</strong> or ' +
  '<strong>Tag</strong>. <a href="https://tasks.bitsplitters.app/docs/writing-a-list/#people-roles-and-channels-by-name" ' +
  'target="_blank" rel="noopener">How to write the list</a></span>';

test('modaleDelTesto: senza legenda né tag, il paragrafo col testo, obbligatorio fino a 4000; la riga del blocco sotto', () => {
  const s0 = statoIniziale();
  const m = modaleDelTesto(s0, '2');
  assert.equal(m.titolo, 'Edit the content of your task');
  assert.equal(m.solaLettura, undefined);
  // Il Contenuto cambia solo il testo del task (SegnapostoDellaModale.apriSenzaLegenda): le persone si aggiungono con
  // Owner e Tag, e la modale non ha legenda.
  assert.deepEqual(m.campi[0], {
    tipo: 'testo', id: 'task', etichetta: 'Mandatory field', valore: 'Lock the scrim block vs. Nova Collective',
    obbligatorio: true, min: 1, max: 4000, paragrafo: true,
  });
  assert.equal(testoFisso(m.campi[1]), '<span class="sc-subtext">Closing this form with <em>Cancel</em> or ✕ leaves ' +
    'the list locked: unlock it from <strong>More → Unlock list</strong>.</span>');
  assert.equal(m.campi.length, 2);
  // I tag no, come l'owner: hanno il loro menu, come nel Contenuto dell'Activity (TaskLogic.testoDellaModale).
  const conTag = modaleDelTesto(statoDi(applicaTag(s0, '2', [MIA], [COACHES])), '2');
  assert.equal((conTag.campi[0] as { valore: string }).valore, 'Lock the scrim block vs. Nova Collective');
  assert.equal(conTag.campi.length, 2);
  assert.equal((modaleDelTesto(s0, '3').campi[0] as { valore: string }).valore, 'VOD review: mid rotations, game 3');
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

test('modaleDiModificaInBlocco: in sola lettura, il titolo, la legenda con le sole regole e la lista coi nomi nel formato del bot; niente blocco', () => {
  const s0 = statoIniziale();
  const m = modaleDiModificaInBlocco(s0);
  assert.equal(m.titolo, 'Edit your activities list');
  assert.equal(m.solaLettura, avvisoIllustrativo());
  assert.match(testoDellaLista(s0.lista), new RegExp(`<t:\\d+> \\[0m,0m,0\\] <@${MIA}>: VOD review`));
  assert.deepEqual(m.campi, [
    {
      tipo: 'testo', id: 'title', etichetta: 'List title', valore: 'Roster & scrims — week 12', obbligatorio: true,
      min: 1, max: 90,
    },
    // Niente elenco dei nomi: si leggono già nel testo (LegendaDeiNomi).
    { tipo: 'testoFisso', html: REGOLE },
    {
      tipo: 'testo', id: 'list', etichetta: 'List of activities',
      valore: testoDellaLista(s0.lista).replace(/<t:\d+> \[0m,0m,0\] <@\d+>/, '2026-11-15 18:14 [0m,0m,0] @Mia'),
      obbligatorio: true, min: 1, max: 4000, paragrafo: true,
    },
  ]);
});

test('modaleDellaNuovaData: i campi del promemoria, le 18:14 proposte, col titolo della riapertura', () => {
  const campi = campiDellaNuovaData();
  const m = modaleDellaNuovaData(campi);
  assert.equal(m.titolo, 'New date for the reminders');
  assert.deepEqual(m.campi, modaleDelPromemoria('3', campi).campi);
  assert.equal(campi.ora, '18:14');
});
