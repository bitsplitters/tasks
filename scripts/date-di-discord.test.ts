/*
 * Le date `<t:N:stile>` come le scrive il client Discord in ogni lingua del sito (src/components/home/demo/date-di-discord.ts;
 * spec 2026-11-19-sito-multilingua-design.md, §17, nel repo team-tasks-manager): i formati LT, LLL e LLLL della lingua.
 * Si lancia dalla cartella tasks con `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dataDiDiscord, oraDiDiscord } from '../src/components/home/demo/date-di-discord.ts';
import type { Lingua } from '../src/i18n/lingue.ts';

const ZONA = 'Europe/Rome';
/** Martedì 8 dicembre 2026, 18:00 a Roma. */
const SERA = Date.UTC(2026, 11, 8, 17, 0) / 1000;
/** Lo stesso giorno, 9:05 a Roma. */
const MATTINA = Date.UTC(2026, 11, 8, 8, 5) / 1000;

const ATTESE: Record<Lingua, { f: string; F: string; mattina: string }> = {
  en: { f: 'December 8, 2026 6:00 PM', F: 'Tuesday, December 8, 2026 6:00 PM', mattina: '9:05 AM' },
  it: { f: '8 dicembre 2026 18:00', F: 'martedì 8 dicembre 2026 18:00', mattina: '09:05' },
  fr: { f: '8 décembre 2026 18:00', F: 'mardi 8 décembre 2026 18:00', mattina: '09:05' },
  de: { f: '8. Dezember 2026 18:00', F: 'Dienstag, 8. Dezember 2026 18:00', mattina: '09:05' },
  'es-ES': { f: '8 de diciembre de 2026 18:00', F: 'martes, 8 de diciembre de 2026 18:00', mattina: '9:05' },
  'es-419': { f: '8 de diciembre de 2026 18:00', F: 'martes, 8 de diciembre de 2026 18:00', mattina: '9:05' },
  'pt-BR': { f: '8 de dezembro de 2026 às 18:00', F: 'terça-feira, 8 de dezembro de 2026 às 18:00', mattina: '09:05' },
};

for (const [lingua, attese] of Object.entries(ATTESE) as [Lingua, (typeof ATTESE)[Lingua]][]) {
  test(`le date di Discord in ${lingua}`, () => {
    assert.equal(dataDiDiscord(SERA, 'f', ZONA, lingua), attese.f);
    assert.equal(dataDiDiscord(SERA, 'F', ZONA, lingua), attese.F);
    assert.equal(oraDiDiscord(MATTINA, ZONA, lingua), attese.mattina);
    assert.equal(dataDiDiscord(MATTINA, 't', ZONA, lingua), attese.mattina);
  });
}
