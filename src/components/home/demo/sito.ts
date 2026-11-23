/*
 * I testi della demo che non sono del bot (src/i18n/testi/<lingua>/demo.ts), nella lingua della demo (lingua.ts): i
 * tooltip, il client Discord, l'avviso della sola lettura, la lista e i nomi del server. Si leggono da qui e non da
 * t.ts, che porterebbe nel browser i testi di tutto il sito.
 */
import type { Lingua } from '../../../i18n/lingue.ts';
import { testi as EN } from '../../../i18n/testi/en/demo.ts';
import { testi as DE } from '../../../i18n/testi/de/demo.ts';
import { testi as ES } from '../../../i18n/testi/es/demo.ts';
import { testi as LATAM } from '../../../i18n/testi/es-419/demo.ts';
import { testi as FR } from '../../../i18n/testi/fr/demo.ts';
import { testi as IT } from '../../../i18n/testi/it/demo.ts';
import { testi as PT } from '../../../i18n/testi/pt-br/demo.ts';
import { linguaDellaDemo } from './lingua.ts';

type Chiave = keyof typeof EN;

const TESTI: Partial<Record<Lingua, Readonly<Record<Chiave, string>>>> = {
  en: EN, it: IT, de: DE, fr: FR, 'es-ES': ES, 'es-419': LATAM, 'pt-BR': PT,
};

/** Il testo di una chiave nella lingua della demo, coi segnaposto `{nome}` al loro posto. */
export function delSito(chiave: Chiave, valori: Readonly<Record<string, string | number>> = {}): string {
  const lingua = linguaDellaDemo();
  const valore = TESTI[lingua]?.[chiave];
  if (valore === undefined) throw new Error(`La demo non ha il testo «${chiave}» in ${lingua}`);
  return valore.replace(/\{(\w+)\}/g, (tutto, nome: string) => (Object.hasOwn(valori, nome) ? String(valori[nome]) : tutto));
}
