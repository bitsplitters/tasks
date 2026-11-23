---
title: "Notas de versão"
description: "As novidades do Team Tasks Manager, da mais recente para a mais antiga."
fonte: 77cbf888899e
---

Toda mudança que você vê no Discord está listada aqui, da mais recente para a mais antiga. Cada item leva à página que o explica.

## 2.6.0 — Seu fuso horário, em todo lugar

Released 2026-11-24

- **Escolha seu fuso horário uma vez só** — **/my timezone**, em qualquer servidor, mostra o seu fuso horário e de onde ele vem. **Escolher** define o seu, e o TTM o propõe em todos os servidores, no canal e na Activity. **Voltar ao automático** volta para o proposto. Veja [/my timezone](/docs/my-timezone/).
- **Um fuso diferente vale só para aquela data** — com um fuso seu, o que você deixa em um lembrete não o substitui mais. Sob o fuso horário do **Quando**, uma linha diz se é o seu ou como escolhê-lo. Veja [/my timezone](/docs/my-timezone/).
- **Na Activity também** — a engrenagem mostra o seu fuso horário em **Para você, em todo lugar**, igual ao `/my timezone`. Sob o fuso horário de um lembrete, a linha leva até lá. Veja [Suas configurações](/docs/activity/#your-settings).

## 2.5.0 — Nomes no lugar de códigos

Released 2026-11-23

- **Pessoas, cargos e canais pelo nome** — **Atualização em bloco** mostra `@Ava`, `@Moderadores` e `#geral` no lugar dos códigos do Discord, e o formulário **Conteúdo** mostra os canais pelo nome. Escreva `@` e um nome para cada cargo e canal, e para quem já está na lista. Adicione alguém novo com **Proprietário** ou **Tag**, ou escreva o código da pessoa. Um nome que o TTM não conhece continua sendo texto, exceto como proprietário: nesse caso o TTM avisa e não salva nada. Veja [Pessoas, cargos e canais pelo nome](/docs/writing-a-list/#people-roles-and-channels-by-name).
- **Conteúdo é só o texto** — o formulário **Conteúdo** não mostra mais as tags da tarefa, como na Activity: elas ficam na tarefa, e **Tag** as muda. Uma tag digitada no formulário é removida, e o TTM avisa. Veja [Conteúdo](/docs/channel-tasks/#content).
- **Datas de lembrete legíveis** — no texto de uma lista, a data de um lembrete é `2026-12-08 18:00`, no seu fuso horário, no lugar de um código. Mude-a e salve, e o lembrete se move. Para manter um horário que alguém passou para você no fuso dele, escreva o fuso depois: `2026-12-08 18:00 America/New_York`. Veja [Lembretes no texto](/docs/writing-a-list/#reminders-in-the-text).
- **O guia a um clique** — sob o texto da **Atualização em bloco** e do `/criar-lista`, uma linha diz como adicionar alguém novo e leva ao guia. Quando um nome ou uma data não pode ser salvo, a mensagem leva à parte do guia que o explica. Veja [Pessoas, cargos e canais pelo nome](/docs/writing-a-list/#people-roles-and-channels-by-name).
- **Na Activity também** — **Editar a lista** mostra os nomes e as datas no seu fuso horário. Sob o texto, **Editar a lista** e **Nova lista** têm a mesma linha, com o link para o guia. Agora os links abrem, no texto de uma tarefa e nas mensagens: o Discord pergunta antes de tirar você de lá. Veja [Editar a lista](/docs/activity-list/#edit-the-list).
- **Os códigos continuam funcionando** — um código que você escreve ou cola é salvo como está, e o arquivo do Download mantém os códigos, então os arquivos de antes são importados como são. Veja [Os códigos por trás dos nomes](/docs/writing-a-list/#the-codes-behind-the-names).

## 2.4.1 — Webhooks e datas, corrigidos

Released 2026-11-21

- **Webhooks com aspas no texto** — uma tarefa, uma variável ou um nome com aspas, uma barra invertida ou uma quebra de linha não quebra mais o corpo da chamada: o TTM escapa o valor, então o serviço recebe um JSON válido. Veja [Tokens](/docs/config-webhook/#tokens).
- **Todo formato de `@time` define o lembrete** — as datas nos estilos `s` e `S` do Discord, a data curta com a hora, agora contam como a data do lembrete. `S` é o primeiro formato do menu `@time`: até agora o TTM não o via, então o lembrete era contado a partir do momento em que você salvava, e a data ficava no texto. Veja [Lembretes no texto](/docs/writing-a-list/#reminders-in-the-text).

## 2.4.0 — A segunda linha mostra o caminho

Released 2026-11-20

- **O vermelho mostra só o que você pode remover** — com **Proprietário**, **Tag**, **Lembrete** ou **Webhook** em vermelho, o seletor de tarefas lista só as tarefas que têm um proprietário, tags, um lembrete ou um webhook a remover. Se nenhuma tem, o seletor fica desligado e diz isso, por exemplo *Nenhum proprietário para remover*, e você recebe uma nota sobre o que fazer em vez disso. Veja [A segunda linha](/docs/channel-tasks/#the-second-row).
- **A Activity também diz isso** — no modo vermelho, o painel de uma tarefa sem nada a remover diz isso no alto, e **Excluir** continua desligado. Veja [O painel de uma tarefa](/docs/activity-list/#the-panel-of-a-task).
- **Conteúdo e Lembrete dizem o que vem a seguir** — aperte **Conteúdo** ou **Lembrete** e uma mensagem que só você vê diz qual tarefa escolher no seletor acima dos botões, com um botão que leva você de volta à lista. Ela para depois que você escolhe uma tarefa desse jeito, em qualquer servidor. Veja [A segunda linha](/docs/channel-tasks/#the-second-row).

## 2.3.0 — As listas novas se anunciam

Released 2026-11-19

- **Uma lista nova se anuncia** — criar, importar ou clonar uma lista posta uma notificação sob ela, com um link para a lista. Ela menciona os proprietários das tarefas, então o Discord os avisa. Com o rastreamento do histórico ativado, o tópico começa com a lista. Veja [Quando uma lista é criada](/docs/configuration/#when-a-list-is-created).
- **Uma explicação por lista** — com as dicas ligadas, a primeira notificação de uma lista nova explica por que o TTM posta notificações e onde configurá-las, uma única vez. Veja [Dicas](/docs/configuration/#tips).
- **`/config app` em uma nova ordem** — as **Dicas** vêm primeiro, com um botão verde ou cinza. **Comportamento** reúne as notificações push legíveis, manter o estado após a seleção e a nova opção **Mencionar os proprietários nas listas novas**, ligada por padrão. Os lembretes recorrentes mostram o emoji do Premium. Veja [/config app](/docs/configuration/).
- **Toda tarefa que muda dispara o webhook dela** — marque a última subtarefa e o grupo também é concluído: agora os dois disparam os webhooks. Marque um grupo e as subtarefas dele disparam os delas. As chamadas saem na ordem da lista, e a marcação inteira conta como um clique. Veja [Quando um webhook dispara](/docs/webhooks/#when-a-webhook-fires).
- **Reabrir tudo dispara os webhooks de reabertura** — das tarefas que ele reabre, no canal e na Activity. Veja [Quando um webhook dispara](/docs/webhooks/#when-a-webhook-fires).
- **Um aviso por webhook** — quando o mesmo webhook está em várias tarefas que mudam juntas e a chamada falha, você recebe um só aviso. Veja [Quando um webhook falha](/docs/webhooks/#when-a-webhook-fails).
- **Os lembretes começam no seu fuso horário** — até você escolher um fuso horário, o formulário **Quando** propõe o do seu idioma do Discord: `America/Sao_Paulo` em português do Brasil, `Europe/Rome` em italiano. Os lembretes que você escreve no texto de uma lista também o usam, no canal e na Activity. Um idioma falado em vários fusos, como o inglês (EUA), mantém o fuso do servidor. Veja [Seu fuso horário](/docs/reminders/#your-time-zone).
- **Convidar pela Activity** — **Convidar**, no alto à direita da página inicial e de cada lista, abre a janela do Discord para convidar amigos ou enviar o convite a um canal. Veja [Entrar com os outros](/docs/activity/#join-the-others).
- **Seu status no Discord mostra a Activity** — enquanto você está nela, o seu perfil diz *Planejando tarefas com a equipe*, no seu idioma, e nada sobre a lista. O Discord pergunta antes: se você disser não, a Activity abre do mesmo jeito. Veja [Seu status no Discord](/docs/activity/#your-status-on-discord).

## 2.2.0 — Pegue uma tarefa

Released 2026-11-18

- **Pegue uma tarefa você mesmo** — clique em **Proprietário** até ficar azul e depois escolha uma tarefa sem escolher ninguém: ela é sua, e o canal mostra quem a pegou. Uma tarefa que já tem proprietário fica como está: para substituí-lo, escolha você mesmo no menu primeiro. Com **Manter o estado após a seleção**, pegue uma tarefa depois da outra sem clicar em **Proprietário** de novo. Veja [Proprietário](/docs/channel-tasks/#owner).
- **Pegue uma tarefa na Activity** — em uma tarefa sem proprietário, **Proprietário** abre com o seu nome já escolhido: **Salvar** a torna sua. Veja [Proprietário](/docs/activity-list/#owner).
- **Quem recebe uma tarefa fica sabendo** — dê uma tarefa a outra pessoa, ou a um cargo, e a notificação no canal menciona quem recebe, então o Discord avisa essa pessoa ou esse cargo. Quando você pega uma tarefa, ninguém é mencionado. Veja [Proprietário](/docs/channel-tasks/#owner).

## 2.1.0 — Novidades no bot

Released 2026-11-17

- **`/news`** — as últimas novidades do Team Tasks Manager, no seu idioma, em uma mensagem que só você vê. Sob cada novidade, **Servidor do Discord** abre o nosso servidor de suporte e **Notas de versão** abre essa versão nesta página. Os botões **Anterior** e **Próxima** vão para as novidades mais antigas e mais novas. Veja [`/news`](/docs/commands/#news).
- **Toda versão no `/news`** — da 1.0.0 em diante, cada uma com o dia em que saiu: volte com **Anterior**. Veja [`/news`](/docs/commands/#news).
- **Uma linha para novidades que ninguém leu** — quando há novidades que ninguém no seu servidor abriu ainda, a última linha dos painéis do bot diz isso até alguém abrir o `/news`: então ela some para todos no servidor. Veja [`/news`](/docs/commands/#news).

## 2.0.1 — Modo Activity no Tutorial

Released 2026-11-16

- **Uma lição sobre o modo Activity** — a lista de prática do Tutorial tem sete lições: antes da última, marque uma tarefa no modo Activity, mais fluido e livre dos limites dos canais de texto. Veja [Primeiros passos](/docs/getting-started/#2-create-your-first-list).

## 2.0.0 — A Activity

Released 2026-11-15

- **A Activity** — uma lista abre em uma janela dentro do Discord, no computador e no celular. Várias pessoas trabalham nela ao mesmo tempo, e todas veem cada mudança na hora em que acontece. Quando a última pessoa sai, a lista volta para o canal dela, com um resumo das mudanças. Veja [A Activity](/docs/activity/).
- **Um novo primeiro botão** — **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> leva a lista para a Activity, em canais de texto e no chat dos canais de voz. Ele exige a permissão *Usar atividades* do Discord no canal. Uma lista que já está nos seus canais o recebe na próxima vez que mudar. Veja [Abrir uma lista na Activity](/docs/activity/#open-a-list-in-the-activity).
- **Clonar lista está em Mais** — acima de **Download**, e ali mesmo com a lista bloqueada. O Guia também diz isso. Veja [O que há dentro de Mais](/docs/the-task-list/#whats-inside-more).
- **Enquanto uma lista está na Activity** — a mensagem dela no canal tem só **Entrar na Activity**, e a lista não pode ser alterada ali. Veja [Entrar com os outros](/docs/activity/#join-the-others).
- **Launch** — o **Iniciador de apps** do Discord, ou o botão de Atividades de uma chamada de voz, abre as listas do canal. Entre em uma, leve outra para a Activity ou crie uma nova. Veja [O início do canal](/docs/activity/#the-home-of-the-channel).
- **`/config lists`** — uma lista na Activity é marcada como *na Activity*. **Excluir** a remove para todos, e **Selar** primeiro a traz de volta para o canal. Veja [O que fica no canal](/docs/activity/#what-stays-in-the-channel).
- **A oferta Founder** — por tempo limitado antes de a beta terminar, todo servidor pode liberar a insígnia Founder; os primeiros 5.000 Founders a comprar ficam com o plano anual a € 20 em vez de € 36, antes dos impostos (VAT). Veja [Founder](/premium/#founder).
- **Lembretes de cargo por DM** — quando o bot não consegue escrever no canal da lista, o aviso que acompanha o lembrete vem no idioma de quem escolheu as pessoas do cargo.

## 1.5.0 — Recorrência por menus

Released 2026-11-07

- **Escolha a recorrência em menus** — **Editar recorrência** abre um formulário com três menus em vez de dois campos para digitar: **Quantas vezes, no total**, **A cada** e **Unidade** (minutos, horas ou dias). Não há intervalo para escrever nem formato para errar, e para quatro avisos você escolhe 4. Veja [Os campos da repetição](/docs/reminders/#the-repetition-fields).
- **O selo conta todos os avisos** — na linha da tarefa, `↻1d ×4` agora significa quatro avisos, um por dia, o primeiro incluído. Antes, o `×` contava as repetições depois do primeiro. Uma lista escrita antes desta versão mostra o número antigo até alguém mudá-la. Veja [Ler um lembrete na tarefa](/docs/reminders/#reading-a-reminder-on-the-task).
- **Até 50 vezes no total** — no Premium, um lembrete chega no máximo 50 vezes, o primeiro incluído, e um lembrete que já tinha mais as mantém. Na **Atualização em bloco**, o trio continua contando as repetições depois do primeiro: no máximo 49. Veja [Limites conhecidos](/docs/known-limits/#reminders).

## 1.4.0 — Tutorial, listas em canais de voz

Released 2026-11-05

- **Um tutorial para a sua primeira lista** — a explicação mostrada pelo `/criar-lista` tem um botão **Tutorial** ao lado de **Crie sua lista**. Ele transforma a explicação em uma lista de prática com seis lições, no seu idioma, e envia o Guia, o mesmo de **Mais** → **Guia**, em uma mensagem que só você vê. A lista de prática é uma lista normal: exclua-a em **Mais** quando terminar. O botão vem com as Dicas ligadas, e o cartão de boas-vindas e o `/help` apontam para ele. Veja [Primeiros passos](/docs/getting-started/#2-create-your-first-list).
- **Os emojis dos botões têm nomes curtos** — na **Atualização em bloco**, no formulário do texto de uma tarefa e no arquivo do Download, os emojis de um botão da lista, como os das lições do Tutorial, aparecem como `:owner:`, `:reminder:`, `:content:` e `:more:` no lugar de um código longo. Escreva um desses nomes em uma tarefa e a lista mostra o emoji. Veja [Emojis dos botões](/docs/writing-a-list/#button-emoji).
- **Listas em canais de voz** — o `/criar-lista` funciona no chat de um canal de voz, e **Clonar lista** também oferece canais de voz. Uma lista ali faz tudo o que faz em um canal de texto, exceto a timeline de atividades, porque o Discord não permite tópicos em canais de voz: quem cria uma recebe uma mensagem curta que explica isso. Em um canal de voz, o TTM precisa de *Conectar* em vez das duas permissões da timeline. Veja [Canais de voz](/docs/known-limits/#voice-channels).

## 1.3.0 — Espaço entre grupos

Released 2026-11-03

- **Espaço entre grupos** — uma nova opção do `/config app`: desligue-a e as suas listas perdem as linhas em branco acima e abaixo das tarefas que têm subtarefas, para uma lista mais compacta. Ligada por padrão: veja [Espaço entre grupos](/docs/configuration/#space-around-groups).
- **A aparência da lista é um só menu suspenso** — **Dicas**, **Tarefas concluídas atenuadas** e **Espaço entre grupos** agora são opções do mesmo menu suspenso no `/config app`: marque as que você quer ligadas. Veja [Dicas e aparência da lista](/docs/configuration/#list-appearance).
- **O Guia diz como marcar uma tarefa** — a primeira página dele e a página dos botões da tarefa agora dizem isso em negrito: para marcar ou desmarcar uma tarefa, todos os botões da segunda linha precisam estar desligados. Veja [O seletor de marcação](/docs/the-task-list/#the-check-selector).
- **Uma lista bloqueada diz quem a está editando** — enquanto alguém edita a lista, a última linha dela diz quem, e como desbloqueá-la se ela continuar bloqueada: **Mais → Desbloquear lista**. Ela ocupa o lugar da linha de Dicas e aparece mesmo com as Dicas ocultas. Veja [Quando a lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).

## 1.2.1 — Marcar uma tarefa

Released 2026-11-01

- **O menu de tarefas diz *Marcar tarefa*** — com todos os botões de tarefa em cinza, o menu acima dos botões diz para que serve, em vez de mostrar o título da lista. Veja [A segunda linha](/docs/channel-tasks/#the-second-row).
- **Os formulários que bloqueiam a lista dizem como desbloqueá-la** — a **Atualização em bloco** e o formulário do texto de uma tarefa terminam com uma linha: fechá-los com **Cancelar** ou com o ✕ deixa a lista bloqueada, e **Mais → Desbloquear lista** a desbloqueia. Veja [Pressionei Cancelar e a lista continua bloqueada](/docs/troubleshooting/#i-pressed-cancel-and-the-list-stays-locked).

## 1.2.0 — Dicas, barra de progresso, lista concluída

Released 2026-11-01

- **O menu de tarefas diz o que vem a seguir** — enquanto um botão de tarefa está azul ou vermelho, o menu acima dos botões mostra a ação, como *Editar tarefa* ou *Excluir tarefa*: escolha a tarefa ali. Com todos os botões em cinza, ele mostra o título da lista de novo. Veja [A segunda linha](/docs/channel-tasks/#the-second-row).
- **Dicas sob cada lista** — uma pequena última linha aponta para o **Guia**, em **Mais**, e para este site. A opção de legenda do `/config app` agora se chama **Dicas** e desliga tanto a linha quanto a explicação mostrada pelo `/criar-lista`: veja [Dicas](/docs/configuration/#tips).
- **Uma barra de progresso** — uma barra verde fina no pé de cada lista, em passos de 5%. Ela só fica cheia quando todas as caixas estão marcadas, e uma lista selada a mantém: veja [Embaixo da lista](/docs/the-task-list/#under-the-list).
- **Lista concluída** — a marcação que conclui uma lista diz isso na notificação e no tópico do histórico: veja [Modo de notificação](/docs/configuration/#notification-mode).
- **O Guia** diz o que fazer depois de apertar um botão de tarefa: escolher a tarefa no menu.
- **Mais** começa com **Guia** e **Download**, depois **Selar lista** e **Excluir lista**. Em uma lista bloqueada, **Desbloquear lista** continua no alto: veja [O que há dentro de Mais](/docs/the-task-list/#whats-inside-more).

## 1.1.0 — Cartão de convite, mensagem de boas-vindas, dicas no status

Released 2026-10-26

- **`/invite`** — um cartão público com o logo, o que o bot faz e como começar (a mesma apresentação da página dele no App Directory) e três botões: adicioná-lo a outro servidor (a página de autorização do Discord, direto do bot), o guia e o servidor de suporte. O mesmo nome em todos os idiomas: veja [Comandos](/docs/commands/).
- **Um cartão de boas-vindas na primeira entrada** — uma vez na vida de um servidor, no canal de sistema dele: o que o bot faz, três passos para começar com o `/criar-lista` e o `/config app`, quais permissões ele pede e por quê: veja [Conceitos básicos](/docs/core-concepts/#the-permissions-ttm-asks-for). Nunca por DM. Nada é enviado quando o servidor não tem canal de sistema, oculta ali as notificações de entrada ou o bot não consegue escrever nele.
- **O `/help` diz quem vê os comandos de configuração** — a página Configuração agora diz que o Discord mostra os três subcomandos do `/config` só a quem tem *Gerenciar servidor*, e onde um admin pode mudar isso.
- **O `/config app` avisa quando o fuso horário ainda é o padrão** — uma linha sob o fuso atual, até você escolher o da sua equipe.
- **Dicas no status do bot** — a linha sob o nome do bot muda a cada dez minutos.
- **O painel Mais** termina com o rodapé, como todas as outras páginas.

## 1.0.1 — Traduções revisadas

Released 2026-10-24

- **Espanhol, português, francês e alemão, revisados por completo** — uma palavra para cada recurso, um só tom do começo ao fim e os nomes das permissões como o Discord os mostra. O espanhol latino-americano agora diz *tú*, não *vos*.
- **Opções do `/config webhook` com acentos** nos idiomas que os usam, como *acción*, *événement* ou *löschen*: veja [/config webhook](/docs/config-webhook/).

## 1.0.0 — Primeira versão pública

Released 2026-10-23

A primeira versão do Team Tasks Manager da **bitsplitters**. O que ela traz:

### Listas

- **Listas de tarefas compartilhadas** — você escreve uma lista como texto simples, com tarefas, subtarefas e grupos de tarefas: veja [Primeiros passos](/docs/getting-started/#2-create-your-first-list).
- **O painel de botões** — uma linha age sobre a lista inteira, uma linha de botões de três estados age sobre uma única tarefa. Veja [A lista no canal](/docs/the-task-list/).
- **Limpar lista** remove as tarefas concluídas, depois de uma confirmação que diz quantas são e o que vai junto: veja [Limpar lista](/docs/the-task-list/#clean-list).
- **Reabrir tudo** traz de volta para pendentes todas as tarefas concluídas e pode mover os lembretes para uma nova data: veja [Reabrir tudo](/docs/the-task-list/#reopen-all).
- **Selar lista** mantém uma lista terminada no canal como registro, sem botões, e **Excluir lista** a remove de vez: veja [O que há dentro de Mais](/docs/the-task-list/#whats-inside-more).
- **Desbloquear lista** — uma lista que ficou bloqueada, porque alguém fechou um formulário com o ✕, é desbloqueada em **Mais**: veja [Quando a lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).
- **Proprietários** — o proprietário de uma tarefa pode ser uma pessoa, um cargo ou várias pessoas que compartilham um cargo que o TTM cria (Premium): veja [Proprietários e tags](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).
- **Só o proprietário marca uma tarefa** — ou um membro do cargo proprietário, ou quem tem *Gerenciar mensagens* no canal. Veja [Quem pode marcar uma tarefa](/docs/core-concepts/#who-can-tick-a-task).
- **Todos os erros da atualização em bloco de uma vez** — quando uma atualização em bloco não pode ser salva, uma mensagem lista todos os problemas. Veja [Quando o texto não pode ser salvo](/docs/writing-a-list/#when-the-text-cant-be-saved).
- **`/config lists`** mostra todas as listas do servidor e regenera, sela ou exclui várias delas de uma vez: veja [/config lists](/docs/config-lists/).

### Download e importação

- **Download** envia a lista para você como um arquivo `.txt`, em uma mensagem que só você vê: veja [O que há dentro de Mais](/docs/the-task-list/#whats-inside-more).
- **Importe uma lista de um arquivo** — a opção `arquivo` do `/criar-lista` reconstrói uma lista a partir desse arquivo, mesmo em outro servidor: veja [`/criar-lista`](/docs/commands/#create-list).

### Lembretes

- **Os lembretes** chegam ao proprietário da tarefa no minuto certo. Uma pessoa recebe uma mensagem direta, um cargo recebe uma menção no canal da lista: veja [Lembretes](/docs/reminders/).
- **Os lembretes recorrentes** (Premium) acrescentam um intervalo e repetições, e um servidor os liga no `/config app`: veja [Lembretes repetidos](/docs/reminders/#repeating-reminders).
- **Salve só o que mudou** — no cartão de resumo de um lembrete existente, **Salvar** liga assim que você muda alguma coisa. Um lembrete salvo sem mudanças não envia notificação: veja [Editando ou removendo](/docs/channel-tasks/#editing-or-removing).
- **Os lembretes ficam até você removê-los** — o TTM nunca remove um lembrete por conta própria. Um cujos avisos já passaram continua na tarefa. Um sem proprietário ou sem data, ou que não pode ser lido, impede de salvar, e a mensagem diz qual tarefa corrigir: veja [Ler um lembrete na tarefa](/docs/reminders/#reading-a-reminder-on-the-task). Remover o proprietário de uma tarefa cujo lembrete ainda não disparou pede confirmação, porque o lembrete vai junto.

### Planos, configuração e webhooks

- **O plano Free e o Premium** — depois da beta, o plano Free tem limites e o Premium os tira: veja [O que o Premium desbloqueia](/docs/premium/). O que você constrói durante a beta: veja [Como a beta funciona](/docs/beta/).
- **Configuração** — o `/config app` define notificações, timeline de atividades, lembretes, fuso horário e permissões do servidor: veja [/config app](/docs/configuration/).
- **Os webhooks** (Premium) enviam uma requisição HTTP que você define quando uma tarefa é concluída ou reaberta. Eles aceitam tokens `{{ }}` e só endereços `https` públicos: veja [/config webhook](/docs/config-webhook/).
- **Avisado onde importa** — quando o TTM não consegue postar no canal de uma lista, ele avisa em particular quem agiu. Um webhook que falha também recebe um aviso: veja [O bot diz que falta uma permissão](/docs/troubleshooting/#the-bot-says-a-permission-is-missing) e [Quando um webhook falha](/docs/webhooks/#when-a-webhook-fails).
- **Interface localizada** — os textos do bot e alguns nomes de comandos aparecem no seu idioma: veja [Nomes dos comandos no seu idioma](/docs/commands/#command-names-in-your-language). Este site funciona com a tradução do seu navegador.

---

<div class="callout"><div class="callout-t">Em breve</div>Uma visão de tarefas só do proprietário e um painel de progresso estão a caminho. Esta página vai acompanhar cada etapa.</div>
