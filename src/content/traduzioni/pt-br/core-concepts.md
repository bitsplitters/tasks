---
title: "Conceitos básicos"
description: "Uma lista em dois lugares, o vocabulário do TTM — tarefas, grupos, proprietários, tags, lembretes — e as permissões que ele pede."
fonte: 193335652dfb
---

Alguns termos aparecem em todo o app. Aprenda-os uma vez e o resto se encaixa.

## Uma lista, dois lugares

Uma lista vive em uma mensagem em um canal do Discord, onde todos a encontram. A **Activity** abre a mesma lista em uma janela dentro do Discord, onde várias pessoas trabalham nela juntas e veem cada mudança ao vivo. É a mesma lista, não uma cópia.

Uma lista fica em um lugar de cada vez. Enquanto ela está na Activity, a mensagem dela no canal mantém só **Entrar na Activity**. Quando todos saem, a lista volta para o canal com um resumo do que mudou.

O que uma lista pode fazer é igual nos dois lugares: proprietários, tags, lembretes, webhooks, as configurações do seu servidor e os limites do seu plano. O que muda é como você faz.

No canal você usa os menus e botões sob a mensagem. Na Activity você toca na caixa de uma tarefa, ou no texto dela. Estas páginas são divididas do mesmo jeito:

- **Recursos** — o que cada recurso faz e as regras dele, iguais nos dois lugares.
- **No canal** — a mensagem da lista, os menus e os botões dela.
- **Na Activity** — a janela, as caixas e o painel de cada tarefa.

Algumas ações existem só no canal: Clonar, Download, Selar, Excluir, Desbloquear e a importação de um arquivo. Veja [O que fica no canal](/docs/activity/#what-stays-in-the-channel).

## Tarefas, subtarefas e grupos

| Termo | O que é |
| :--- | :--- |
| **Tarefa** | Uma atividade única — nem subtarefa nem grupo. |
| **Subtarefa** | Uma atividade que pertence a uma maior. |
| **Grupo de tarefas** | Uma tarefa feita de subtarefas. |

Você nunca escolhe esses tipos em um menu: o TTM os deduz de como você escreve a lista. Uma linha que começa com `-` é uma tarefa. Espaços antes do traço a transformam em uma subtarefa da linha de cima. Uma tarefa com subtarefas vira automaticamente um **grupo**. Como escrevê-las: [Crie sua primeira lista](/docs/getting-started/#2-create-your-first-list).

Os grupos se comportam como uma unidade: marcar um grupo marca as subtarefas dele também, e marcar todas as subtarefas marca o grupo como concluído.

## Estado da tarefa

Toda tarefa está **aberta** ou **concluída**, mostrado pela caixa dela:

- **Aberta** <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> — ainda por fazer.
- **Concluída** <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" /> — feita.

No canal você marca ou desmarca uma tarefa no [seletor de marcação](/docs/the-task-list/#the-check-selector), o menu sob a lista. Na Activity você toca na [caixa](/docs/activity-list/#tick-a-task) dela. Concluir ou reabrir uma tarefa é o que pode disparar notificações e webhooks.

### Quem pode marcar uma tarefa

**Uma tarefa com proprietário só pode ser marcada ou desmarcada por:**

- o proprietário, ou os membros do cargo proprietário;
- quem tem *Gerenciar mensagens* no canal.

Qualquer outra pessoa recebe uma recusa que só ela vê, e nada muda. A regra vale também para subtarefas: você não pode marcar nem desmarcar um grupo se isso mudar uma subtarefa que pertence a outra pessoa. Qualquer pessoa que possa usar a lista pode marcar uma tarefa sem proprietário.

## Proprietário vs. tag

Parecem iguais, mas têm funções diferentes:

- **Proprietário** <img class="inline-ic" src="/icons/owner.png" alt="" /> — a pessoa ou o cargo *responsável* pela tarefa. Uma tarefa tem um proprietário, e no Premium podem ser várias pessoas: o TTM cria um cargo para elas (veja [Os cargos que o TTM cria](/docs/owners-and-tags/#the-roles-ttm-creates)).
- **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" /> — um ou mais usuários ou cargos *mencionados* na tarefa, por exemplo as pessoas a avisar quando ela for concluída.

As regras dos dois: [Proprietários e tags](/docs/owners-and-tags/).

## Lembretes

Um **lembrete** <img class="inline-ic" src="/icons/alertW.png" alt="" /> prende um horário a uma tarefa: uma data, uma hora e um fuso horário. Quando chega a hora, o TTM lembra o **proprietário** da tarefa, e ninguém precisa ficar conferindo. Uma pessoa recebe uma mensagem direta, e um cargo recebe uma menção no canal da lista.

Um único aviso é o padrão, e no plano Free é o único tipo. Os lembretes recorrentes acrescentam um intervalo e um número de repetições. Eles são um recurso Premium que um servidor ativa em [/config app](/docs/configuration/#recurring-reminders). Detalhes completos em [Lembretes](/docs/reminders/).

## Notificações e histórico

Quando uma lista é criada, ou uma tarefa é marcada ou desmarcada, o TTM pode publicar uma notificação e — se você ativar — registrar cada ação em um **tópico de histórico** dedicado. A notificação de uma lista nova pode mencionar os proprietários das tarefas, para que eles saibam dela.

As mudanças feitas na Activity chegam como um único resumo, quando a lista volta para o canal. Quanto barulho você quer é inteiramente escolha sua: veja [/config app](/docs/configuration/).

## Quem pode usar listas e comandos

Por padrão, os comandos do app seguem as regras de visibilidade do próprio Discord (Configurações do servidor → Integrações). Os botões e as listas, porém, continuam usáveis por qualquer pessoa, a menos que você **sincronize as permissões**: depois disso a lista fica somente leitura para quem não tem permissão, no canal e na Activity. Isso também fica em [/config app](/docs/configuration/#sync-permissions).

O `/config` tem uma regra própria: por padrão só os membros com *Gerenciar servidor* o veem. Um administrador pode mudar isso em *Configurações do servidor → Integrações*. Veja [Quem pode abrir o /config](/docs/config/#who-can-open-config).

Algumas ações têm uma regra própria:

- uma tarefa com proprietário só pode ser marcada pelo proprietário ou por quem tem *Gerenciar mensagens*: veja [Quem pode marcar uma tarefa](#who-can-tick-a-task);
- selar ou excluir uma lista pelo painel *Mais*, no canal, exige *Gerenciar mensagens* no canal. Pelo `/config lists`, valem as permissões do `/config`;
- abrir uma lista na Activity exige a permissão *Usar atividades* do Discord no canal: veja [Quando a lista não abre](/docs/activity/#when-the-list-doesnt-open).

## As permissões que o TTM pede

Quando você convida o bot, o Discord mostra as permissões que ele pede. Para que serve cada uma:

| Permissão | Por que ela é necessária |
| :--- | :--- |
| Ver canal | Ver o canal onde a lista vive |
| Enviar mensagens | Publicar e atualizar a lista |
| Incorporar links | Mostrar a lista como um embed rico |
| Gerenciar mensagens | Limpar as notificações antigas do próprio bot, para o canal continuar legível |
| Criar tópicos públicos | Criar o tópico opcional da timeline, em canais de texto |
| Gerenciar webhooks | Escrever no tópico da timeline, em canais de texto |
| Conectar | Publicar a lista no chat de um canal de voz |
| Anexar arquivos | Fornecer o download da lista |
| Ler o histórico de mensagens | Manter a lista sincronizada |
| Mencionar @everyone, @here e todos os cargos | Avisar as pessoas que você marca com tag em uma tarefa, e o cargo proprietário de uma tarefa quando o lembrete dela vence |
| Gerenciar cargos | Criar o cargo que torna várias pessoas proprietárias de uma tarefa (Premium) |
| Usar emojis externos | Mostrar os ícones do próprio bot em botões e listas |

**Em um canal de voz** a lista vive no chat do canal, que não tem timeline, e o TTM precisa de *Conectar* para publicar lá: veja [Canais de voz](/docs/known-limits/#voice-channels).

<div class="callout"><div class="callout-t">Bom saber</div>Você pode conceder essas permissões depois, em <em>Configurações do servidor → Cargos → Team Tasks Manager</em>, ou por canal, nas configurações de permissão do canal. <em>Gerenciar cargos</em> é a exceção: funciona só no cargo do bot, não por canal.</div>
