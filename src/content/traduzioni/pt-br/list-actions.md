---
title: "Ações da lista"
description: "Limpar, Reabrir tudo, Clonar, Download, Selar e Excluir: o que cada uma faz com a lista inteira e onde encontrá-la."
fonte: d65f7aaf1e14
---

Estas ações agem sobre a **lista inteira**, nunca sobre uma única tarefa. Duas existem nos dois lugares; as outras, só no canal.

| Ação | No canal | Na Activity |
| :--- | :---: | :---: |
| [Limpar](#clean) | sim | sim |
| [Reabrir tudo](#reopen-all) | sim | sim |
| [Clonar](#clone) | sim | — |
| [Download](#download) | sim | — |
| [Selar](#seal) | sim, e em `/config lists` | só em `/config lists` |
| [Excluir](#delete) | sim, e em `/config lists` | só em `/config lists` |

<div class="howto" id="how-to-do-it"><div class="howto-t">Como fazer</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#row-1--acts-on-the-whole-list"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />No canal</span><span class="howto-d">A primeira linha sob a lista, e Mais para Clonar, Download, Selar e Excluir.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#the-first-row"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Na Activity</span><span class="howto-d">Limpar a lista e Reabrir tudo, no alto da lista.</span></a></div></div>

## Limpar

**Limpar lista** remove todas as tarefas concluídas, subtarefas incluídas, e renumera as tarefas que ficam. Um grupo não concluído fica, mesmo quando algumas das subtarefas dele saem.

Primeiro, uma confirmação diz quantas tarefas vão sair e o que sai com elas. Elas saem **para sempre**, com os lembretes e as tags, se tiverem.

No canal, se a configuração do seu servidor permitir, a notificação no canal da lista ou no tópico dela mostra as tarefas removidas: veja [Modo de notificação](/docs/configuration/#notification-mode). Na Activity, elas vão para o resumo no fim da sessão.

- **Nenhuma tarefa concluída**: não há nada a remover, e o bot avisa na hora.
- **Todas as tarefas concluídas**: Limpar recusa, porque uma lista não pode ficar vazia. Desmarque pelo menos uma tarefa, ou remova a lista inteira com [Excluir](#delete), no canal.

## Reabrir tudo

**Reabrir tudo** devolve para pendente toda tarefa concluída. Texto, proprietários, tags e lembretes continuam como estão. Se nenhuma tarefa estiver concluída, o bot avisa que não há nada a reabrir.

Primeiro, o bot pede que você escolha:

- **Reabrir** — reabre todas as tarefas agora.
- **Nova data** — reabre e move os lembretes das tarefas que você reabre. O primeiro desses lembretes no calendário vai para a data que você escolher, com pelo menos 5 minutos a partir de agora. Os outros mantêm a mesma distância dele.

  Os lembretes das tarefas ainda pendentes continuam como estão. Esta escolha só aparece quando uma tarefa que você reabre tem lembrete.
- **Cancelar** — deixa a lista como está.

Reabrir dispara os **webhooks de reabertura** das tarefas que reabre e ignora os proprietários: quem pode editar a lista pode reabri-la.

## Clonar

**Clonar lista** copia a lista em outro canal, como uma lista nova. Você escolhe:

- o canal: canais de texto e canais de voz. Um clone em um canal de voz não tem a timeline de atividades: veja [Canais de voz](/docs/known-limits/#voice-channels);
- se o clone mantém as marcações;
- se ele mantém os lembretes.

Um clone recebe lembretes novos, então um lembrete recorrente pode ser recusado: veja [Lembretes repetidos](/docs/reminders/#repeating-reminders).

O clone publica a própria notificação no canal novo e pode mencionar os proprietários das tarefas dele: veja [Quando uma lista é criada](/docs/configuration/#when-a-list-is-created). O canal da lista original recebe a notificação de sempre sobre o clone, sem menções.

Um clone é uma lista nova: precisa de uma vaga livre e não pode ter mais tarefas do que o seu plano permite. Veja [O que o Premium desbloqueia](/docs/premium/).

Só no canal, mesmo com a lista bloqueada.

## Download

**Download** entrega um arquivo `.txt` da lista, escrito como explicado em [Editando uma lista à mão](/docs/writing-a-list/) e enviado **só para você**. O arquivo mantém os códigos do Discord no lugar dos nomes: veja [Os códigos por trás dos nomes](/docs/writing-a-list/#the-codes-behind-the-names).

Guarde-o como backup, ou reconstrua a lista a partir dele com `/criar-lista`, até em outro servidor: veja [Reutilize uma lista em qualquer lugar](/docs/tips/#reuse-a-list-anywhere).

Uma mensagem do Discord tem limite de 2000 caracteres, então o Download nunca publica a lista como texto: é sempre um arquivo.

Só no canal.

## Selar

**Selar lista** mantém no canal uma lista concluída como registro, marcada como *Lista selada*, sem botões nem menus. Os lembretes dela param e ela libera uma [vaga do seu plano](/docs/premium/#how-the-three-places-work). O que fica e o que sai: [Selar](/docs/config-lists/#seal).

Selar não pode ser desfeito, e o bot pede que você confirme antes. Se você pode querer reutilizar a lista, faça o download dela antes de selar.

No canal, em **Mais**, selar exige *Gerenciar mensagens* no canal, e uma lista que alguém está editando não pode ser selada. Em [`/config lists`](/docs/config-lists/) valem as permissões de `/config`, e um admin pode selar até uma lista que está na Activity: ela volta antes para o canal.

## Excluir

**Excluir lista** remove a lista **definitivamente**, com as tarefas, os proprietários, as tags e os lembretes dela. A mensagem é removida e, no lugar dela, aparece no canal um recibo curto.

Excluir não pode ser desfeito, e o bot pede que você confirme antes. As permissões são as mesmas de [Selar](#seal). Em `/config lists`, excluir uma lista que está na Activity a remove também para quem está lá dentro.

<div class="callout"><div class="callout-t">Por que excluir em vez de apagar a mensagem?</div>Se você apagar a mensagem à mão, os dados da lista ficam e os lembretes dela continuam chegando. <strong>Excluir lista</strong> leva os lembretes junto. Se a mensagem já sumiu, <a href="/docs/config-lists/"><code>/config lists</code></a> permite limpar o que sobrou ou trazer a lista de volta.</div>
