---
title: "/config app"
description: "Personalize notificações, histórico, lembretes, fuso horário e permissões com /config app."
fonte: 449f5cc3050a
---

Execute o comando:

```
/config app
```

O TTM abre um painel privado com um resumo das suas configurações atuais: primeiro o botão **Dicas**, depois cinco menus suspensos e mais dois botões. Nada aqui é definitivo: mude quando as necessidades da sua equipe mudarem.

Por padrão, só os membros com a permissão *Gerenciar servidor* podem usar `/config app`, como no resto do `/config`. Veja [Quem pode abrir o /config](/docs/config/#who-can-open-config).

As configurações valem para as listas no canal e na [Activity](/docs/activity/). Quando uma configuração vale em um só lugar, ou funciona de modo diferente nos dois, a seção dela avisa.

## Dicas

O primeiro grupo do painel é um botão que mostra se as dicas estão ativadas: verde com **Ativadas** quando estão, cinza com **Desativadas** quando não estão. Clique nele para alternar. As dicas valem no canal e na Activity.

As dicas ajudam quem é novo no TTM, em quatro lugares:

- quando alguém executa `/criar-lista`, uma explicação curta de como escrever uma lista e um convite para experimentar o modo Activity, com os botões **Crie sua lista** e **Tutorial**: a lista nova ocupa o lugar da explicação;
- embaixo de cada lista no canal, uma linha pequena que aponta para o guia no Discord: *Não sabe o que os botões fazem? Mais → Guia*, com um link para [A lista no canal](/docs/the-task-list/);
- embaixo da lista na Activity, uma linha que diz onde tocar: *Não sabe por onde começar? Toque em uma caixa para marcar uma tarefa e no texto dela para o resto.* Veja [Trabalhando em uma lista na Activity](/docs/activity-list/);
- em uma lista nova, a primeira notificação no canal termina com uma explicação curta: por que o TTM publica notificações, o que é o tópico do histórico e onde configurá-los. Ela aparece uma vez por lista: veja [Quando uma lista é criada](#when-a-list-is-created).

Ativadas por padrão: úteis enquanto a equipe aprende os botões, fáceis de desativar quando todos já os conhecem. Com as dicas ocultas:

- `/criar-lista` abre o formulário de criação direto, sem o botão **Tutorial**: veja [Primeiros passos](/docs/getting-started/#2-create-your-first-list);
- as listas terminam sem a linha de ajuda;
- as listas novas publicam a primeira notificação sem a explicação.

Uma lista assume a mudança na próxima vez que for atualizada. De qualquer modo, a [barra de progresso](/docs/the-task-list/#under-the-list) continua, e uma lista bloqueada ainda termina com a linha que diz quem a está editando: veja [Quando a lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).

## Modo de notificação

Controla quanto ruído de notificações o bot deixa no canal quando as tarefas são selecionadas:

| Opção | Comportamento |
| :--- | :--- |
| Excluir todas as notificações exceto a última | Exclui todas as notificações, menos a mais recente. |
| Excluir todas as notificações exceto as duas últimas | Exclui todas, menos as duas últimas. |
| Não excluir nenhuma notificação | Nunca exclui as notificações. |
| Notificações desativadas | Não publica nenhuma notificação de seleção de tarefas. |

Quando uma marcação conclui a lista inteira, a notificação dela diz **Lista concluída** embaixo de quem marcou, e o [tópico do histórico](#history-tracking) também.

Na Activity, as marcações não publicam notificação uma a uma: quando a lista volta ao canal, o resumo da sessão segue esta configuração. Veja [De volta ao canal](/docs/activity/#back-to-the-channel).

### Quando uma lista é criada

Uma lista nova publica a própria notificação embaixo dela: *criei a lista*, com um link para a lista. Ela vem de `/criar-lista`, do Tutorial, de uma importação de arquivo, de uma clonagem e de **Nova lista** na Activity. Uma clonagem a publica no canal novo, e o canal da lista original recebe a notificação habitual da clonagem. Com o modo **Notificações desativadas**, nada é publicado no canal, mas o tópico do histórico ainda registra a criação.

Com [Mencionar os proprietários nas listas novas](#mention-owners-in-new-lists) ativado, a notificação menciona os proprietários das tarefas, e o Discord os avisa. Uma lista criada na Activity menciona os proprietários no resumo que a acompanha de volta ao canal.

Com as [Dicas](#tips) ativadas, a primeira notificação de uma lista nova termina com uma explicação: por que o TTM publica notificações e, com o rastreamento do histórico ativado, o que é o tópico. Ela aparece uma vez por lista, e só se as dicas e as notificações estavam ativadas quando a lista foi criada: uma equipe que desativou uma das duas já sabe se virar. As listas criadas antes de essa explicação existir não a mostram.

## Rastreamento do histórico

Quando ativado, **cada ação nas suas listas é registrada em um tópico dedicado**, o que dá uma trilha de auditoria de quem fez o quê e quando. Ativado por padrão. O tópico começa com a lista: a primeira linha dele diz quem a criou. As listas em canais de voz não têm tópico de histórico, porque o Discord não permite tópicos lá: veja [Canais de voz](/docs/known-limits/#voice-channels). Uma sessão na Activity entra no tópico por inteiro, uma linha por alteração, quando a lista volta ao canal.

## Comportamento

Um menu suspenso com três opções: **Notificações push legíveis**, **Manter o estado após a seleção** e **Mencionar os proprietários nas listas novas**. Elas decidem o que o TTM faz quando alguém age em uma lista. Marque as que você quer ativadas: pode marcar as três, algumas ou nenhuma.

### Notificações push legíveis

Quando ativada, o TTM acrescenta texto simples junto dos embeds, para que suas **notificações push no celular** sejam legíveis de relance. Só com embeds, elas muitas vezes aparecem vazias na tela de bloqueio. Ativada por padrão. Desativá-la nunca impede um lembrete: ele chega só com o cartão ou, no caso de um cargo, só com a menção. As menções aos proprietários continuam saindo, por conta própria, mesmo com ela desativada.

### Manter o estado após a seleção

Só no canal. Depois de usar **Proprietário**, **Tag** ou **Lembrete** na segunda linha embaixo da lista, isto decide se o botão volta ao cinza ou **mantém** o modo ativo. Desativada por padrão: o botão volta ao cinza. Ative quando você aplica a mesma ação a várias tarefas seguidas.

Ela também muda o que **Tag** e **Proprietário** podem fazer. Com ela desativada, a sua escolha sempre sobrescreve. Com ela ativada, você também edita ao vivo as tags ou o proprietário que a tarefa já tem. Veja [Tag](/docs/channel-tasks/#tag) para o detalhamento completo.

Na Activity, o painel de uma tarefa sempre funciona do mesmo jeito: depois de uma ação, ele continua na tarefa, com os botões cinza. Veja [O painel de uma tarefa](/docs/activity-list/#the-panel-of-a-task).

### Mencionar os proprietários nas listas novas

Quando alguém cria, importa ou clona uma lista, a primeira notificação dela menciona os proprietários das tarefas: pessoas e cargos, cada um uma vez, na ordem da lista. As menções vão no texto simples da notificação, então o Discord avisa os proprietários. Quem criou a lista não é mencionado: já sabe. O @everyone também não, mesmo quando é proprietário de uma tarefa: uma lista nova não avisa o servidor inteiro.

Ativada por padrão, inclusive nos servidores que adicionaram o TTM antes de essa opção existir. Uma lista criada dentro de uma sessão da Activity menciona os proprietários no resumo, quando volta ao canal. Veja [Quando uma lista é criada](#when-a-list-is-created).

## Aparência das listas

Um menu suspenso com duas opções: **Tarefas concluídas atenuadas** e **Espaço entre grupos**. Elas decidem como as tarefas aparecem nas listas. Marque as que você quer ativadas: as duas, uma ou nenhuma. Uma lista que já está em um canal assume a mudança na próxima vez que for atualizada, por exemplo quando alguém marca uma tarefa.

As duas mudam a lista no canal. Na Activity, cada pessoa define o próprio visual com a engrenagem: veja [Suas configurações](/docs/activity/#your-settings).

### Tarefas concluídas atenuadas

Mostra cada tarefa concluída no texto menor e cinza do Discord, para que o que ainda falta fazer se destaque. Ativada por padrão; desative para mostrar as tarefas concluídas como todas as outras. Uma lista assume a mudança na próxima vez que for atualizada.

### Espaço entre grupos

Coloca uma linha vazia acima e abaixo de cada tarefa que tem subtarefas, para que cada grupo fique separado do resto da lista. Desativada por padrão, para uma lista mais compacta: os servidores que adicionaram o TTM antes da versão 2.0.0 a têm ativada até um administrador desativá-la. Ela muda só a lista em si: as notificações ficam como estão. O Discord não tem uma linha vazia mais fina para uma lista, então a escolha é entre uma linha inteira e nenhuma.

## Lembretes recorrentes

Desativados por padrão. Quando estão desativados, cada lembrete é um **evento único**: criar ou editar um é um **fluxo de um passo**: você escolhe a data e a hora, e mais nada. Mais simples e rápido para equipes que só precisam de um aviso pontual.

**Ative** para liberar **repetições e intervalos**. No canal, a criação de lembretes passa a usar o fluxo de dois passos: um [cartão de resumo](/docs/channel-tasks/#the-summary-card) mais uma janela de repetição. Na Activity, os menus de repetição se juntam à data no [painel do lembrete](/docs/activity-list/#reminder). Veja [Os campos da repetição](/docs/reminders/#the-repetition-fields).

Os lembretes recorrentes são um recurso [Premium](/docs/premium/). No plano Free, este menu suspenso aparece, mas desligado, e a nota dele avisa. A sua escolha não se perde: no Premium, o menu volta configurado como você o deixou.

O emoji Premium no título do grupo aparece em todos os servidores, Premium inclusive: ele marca um recurso Premium, não um recurso que falta.

Um lembrete que *já* é recorrente continua disparando mesmo com a opção desativada ou no plano Free. O que ainda dá para mudar: veja [Lembretes repetidos](/docs/reminders/#repeating-reminders).

## Fuso horário

Define o fuso horário em que a sua equipe trabalha. Os membros ainda podem usar o próprio nos lembretes: até escolherem um, o TTM propõe o fuso do idioma do Discord deles, e este aqui só quando o idioma é falado em vários fusos, como o inglês (EUA). Veja [Seu fuso horário](/docs/reminders/#your-time-zone). Clique no botão e cole o nome oficial de um fuso: procure-o no **[mapa de fusos horários](https://timezones.bitsplitters.app)**.

## Sincronizar permissões

Por padrão, as permissões de integração do Discord só escondem os *comandos*: os botões e as listas gerados continuam utilizáveis por todos. Clique em **Carregar permissões** para estender as suas regras de permissão a esses componentes também. Depois de sincronizar, **os usuários sem permissão veem a lista como somente leitura**.

Defina as regras em *Configurações do servidor → Integrações → Team Tasks Manager* e depois sincronize. As restrições de canal também são respeitadas: se um canal está fora dos limites para um usuário, as listas que moram nele são somente leitura para ele. O botão **Activity** embaixo da lista segue as mesmas regras: veja [Quando a lista não abre](/docs/activity/#when-the-list-doesnt-open).

<div class="callout"><div class="callout-t">Os webhooks têm o próprio comando</div>Os webhooks não são configurados neste painel: use <a href="/docs/config-webhook/"><code>/config webhook</code></a>. O que eles fazem: veja <a href="/docs/webhooks/">Webhooks</a>.</div>

<div class="callout"><div class="callout-t">Procurando as suas listas?</div>Este painel guarda <em>configurações</em>: como o bot se comporta. Para ver as listas que este servidor tem e para excluir, selar ou regenerar uma, use <code>/config lists</code>: veja <a href="/docs/config-lists/">/config lists</a>.</div>
