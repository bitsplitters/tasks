/*
 * Ciò che i due tab della demo si dividono (piano docs/superpowers/plans/2026-11-15-demo-fedele.md, §6, nel repo
 * team-tasks-manager): lo stato della lista, uno solo, con quello che serve a chi lo cambia. Lo crea demo.ts, lo usano
 * canale.ts e activity.ts. Sta in un modulo suo perché i due tab non importino demo.ts, che importa loro.
 */
import { prossimoColore, type Colore, type Modo, type Tasto } from '../scene-data.ts';
import type { Stato } from './modello.ts';

/** Lo stato della demo e ciò che i tab fanno insieme. */
export interface Condiviso {
  /** Lo stato di adesso. */
  stato(): Stato;
  /** Lo stato nuovo: ridisegna i due tab; «Start over» compare se la lista non è più quella di partenza. */
  cambia(stato: Stato): void;
  /** Il fumetto del tab aperto, in HTML (markdown.ts): sopra l'elemento dato (sotto, se sopra non c'è spazio). */
  fumetto(html: string, accanto?: Element): void;
  /** L'altro tab, come se lo avesse scelto chi guarda, col focus sul tab. */
  vaiA(tab: Modo): void;
  /** Il tooltip del pulsante, per il clic su quelli che nella demo non fanno altro. */
  tooltip(pulsante: HTMLElement): void;
}

/** Il pulsante acceso, nella seconda riga del canale o nel pannello: uno alla volta. */
export interface Acceso {
  tasto: Tasto;
  colore: Colore;
}

/** Grigio, blu, rosso, di nuovo grigio; un altro pulsante si accende in blu e spegne il primo. */
export function dopoIlClic(prima: Acceso | null, tasto: Tasto): Acceso | null {
  const colore = prossimoColore(prima?.tasto === tasto ? prima.colore : null);
  return colore ? { tasto, colore } : null;
}

/**
 * Il clic è arrivato da dentro un elemento col selettore dato. Si guarda il percorso dell'evento, non il bersaglio:
 * l'elemento cliccato può essere già fuori dal documento, se il clic ha fatto riscrivere le righe.
 */
export function dentro(e: Event, selettore: string): boolean {
  return e.composedPath().some((n) => n instanceof Element && n.matches(selettore));
}
