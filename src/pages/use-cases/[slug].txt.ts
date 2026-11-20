// Il file di una lista pronta, da importare con l'opzione `file` di /create-list: /use-cases/<slug>.txt (spec
// 2026-11-20-casi-d-uso-sito-design.md, nel repo team-tasks-manager). Il formato è quello del Download del bot.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { file } from '../../lib/lista-pronta';

export async function getStaticPaths() {
  const casi = await getCollection('useCases');
  return casi.map((c) => ({ params: { slug: c.id }, props: { listTitle: c.data.listTitle, list: c.data.list } }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(file(props.listTitle, props.list), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
