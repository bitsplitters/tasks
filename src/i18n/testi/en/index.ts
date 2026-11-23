// Le zone dei testi inglesi, per t.ts. Una zona nuova si aggiunge qui e nell'index.ts di ogni lingua.
import { testi as beta } from './beta.ts';
import { testi as casi } from './casi.ts';
import { testi as comune } from './comune.ts';
import { testi as demo } from './demo.ts';
import { testi as docs } from './docs.ts';
import { testi as home } from './home.ts';
import { testi as premium } from './premium.ts';

export const ZONE = { comune, home, premium, beta, docs, casi, demo };
