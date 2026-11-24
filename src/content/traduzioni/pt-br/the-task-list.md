---
title: "A lista no canal"
description: "A mensagem da lista em um canal do Discord: o seletor de marcação, a primeira linha de botões, Mais e o que acontece enquanto alguém a edita."
fonte: 6ef51298ef09
---

Quando uma lista existe, o TTM mostra um **seletor de marcação** e **duas linhas de botões** embaixo dela. Quase nada aqui precisa de um comando: basta clicar. A primeira linha age sobre a lista inteira e é explicada aqui. A segunda age sobre uma única tarefa: veja [Editando uma tarefa no canal](/docs/channel-tasks/).

## Embaixo da lista

A lista termina com uma **barra de progresso** fina: a parcela de caixas marcadas, tarefas e subtarefas juntas, em passos de 5%. Ela se move assim que uma caixa é marcada e só fica cheia quando todas estão. Uma lista selada a mantém, mostrando onde a lista parou.

Acima da barra, uma linha pequena ajuda quem é novo: *Não sabe o que os botões fazem? Mais → Guia*. **Guia**, em [Mais](#whats-inside-more), explica cada botão sem sair do Discord. Se a sua equipe não precisa dela, oculte as **Dicas** em [/config app](/docs/configuration/#tips): a linha some e a barra fica.

Enquanto a lista está bloqueada, a mesma linha diz quem a está editando e como desbloqueá-la, mesmo com as Dicas ocultas: veja [Quando a lista está bloqueada](#when-the-list-is-locked).

Enquanto a lista está na [Activity](/docs/activity/), a linha avisa, e **Entrar na Activity** é o único botão embaixo da lista.

## O seletor de marcação

Acima dos botões fica o **seletor de marcação**: o menu suspenso que mostra o título da lista. Uma lista com mais de 25 tarefas tem dois menus, cada um com o nome da posição da última tarefa dele. Use-o para:

1. **Marcar tarefas como concluídas ou pendentes**: marque uma tarefa para concluí-la e desmarque para reabri-la. A caixa dela mostra <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> ou <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />.
2. **Escolher a tarefa sobre a qual um botão ativo age** (veja [a segunda linha](/docs/channel-tasks/#the-second-row)).

Marcar ou desmarcar um grupo faz o mesmo com as subtarefas dele. Concluir todas as subtarefas conclui o grupo. Uma tarefa com proprietário só pode ser marcada por ele e por quem tem *Gerenciar mensagens* no canal: veja [Quem pode marcar uma tarefa](/docs/core-concepts/#who-can-tick-a-task). Uma recusa chega só a quem escolheu a tarefa.

<div class="callout"><div class="callout-t">Mantenha os botões das tarefas desligados</div>Para marcar ou desmarcar tarefas, <strong>todos os botões da segunda linha precisam estar desligados</strong>. Se algum botão de tarefa estiver ativo (azul ou vermelho), escolher uma tarefa aplica essa ação em vez de marcá-la.</div>

## Linha 1: age sobre a lista inteira

Esses botões nunca tocam em uma única tarefa: eles agem sobre a **lista inteira**. O que cada ação faz, nos dois lugares: [Ações da lista](/docs/list-actions/).

| Botão | O que faz |
| :--- | :--- |
| **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> | Abre a lista na Activity, uma janela dentro do Discord onde vocês trabalham nela juntos. Veja [A Activity](/docs/activity/). |
| **Atualização em bloco** <img class="inline-ic" src="/icons/edit.png" alt="" /> | Edita o título e a lista inteira como texto, em um só formulário. Para uma única tarefa, use a [segunda linha](#row-2--acts-on-a-single-task). Veja [Atualização em bloco](#bulk-update). |
| **Limpar lista** <img class="inline-ic" src="/icons/clean.png" alt="" /> | Remove todas as tarefas concluídas, depois de uma confirmação. |
| **Reabrir tudo** <img class="inline-ic" src="/icons/reopen.png" alt="" /> | Devolve todas as tarefas concluídas para pendentes. Você também pode mover os lembretes delas para uma nova data. |
| **Mais** <img class="inline-ic" src="/icons/other.png" alt="" /> | Abre um painel com as ações de que você precisa menos: o guia dentro do Discord e clonar, baixar, selar ou excluir a lista. Quando a lista está bloqueada, você a desbloqueia por aqui. |

### Atualização em bloco

**Atualização em bloco** abre um formulário com o título e a lista inteira como texto: uma linha por tarefa, no formato explicado em [Editando uma lista à mão](/docs/writing-a-list/). Altere o que precisar e envie.

- Pessoas, cargos e canais aparecem pelo nome, e as datas dos lembretes no seu fuso horário.
- Uma linha embaixo do texto diz como adicionar alguém novo: veja [Pessoas, cargos e canais pelo nome](/docs/writing-a-list/#people-roles-and-channels-by-name).
- Enquanto o formulário está aberto, a lista fica bloqueada para todos os outros: veja [Quando a lista está bloqueada](#when-the-list-is-locked).

Se a lista mudou enquanto você a editava, o TTM pergunta o que fazer antes de salvar: veja [Quando a lista muda enquanto você a edita](#when-the-list-changes-while-you-edit-it). Se o texto não pode ser salvo, o TTM o mostra de volta com todos os problemas: veja [Quando o texto não pode ser salvo](/docs/writing-a-list/#when-the-text-cant-be-saved).

### Limpar lista

Uma janela de confirmação diz quantas tarefas vão embora e o que vai com elas. Envie para confirmar, ou feche a janela para cancelar. O que Limpar remove e o que mantém: [Limpar](/docs/list-actions/#clean).

### Reabrir tudo

O bot pergunta em uma mensagem que só você vê: **Reabrir**, **Nova data** ou **Cancelar**. **Nova data** abre a janela **Quando**, a mesma de um [lembrete](/docs/channel-tasks/#reminder): escolha a data para a qual o primeiro lembrete se move. O que Reabrir tudo altera: [Reabrir tudo](/docs/list-actions/#reopen-all).

Se alguém bloquear ou selar a lista antes de você confirmar, nada muda: veja [Quando a lista está bloqueada](#when-the-list-is-locked).

### O que há dentro de Mais

O Discord permite cinco botões por linha, então as ações de que você precisa menos ficam em um painel que só você vê:

- **Desbloquear lista** <img class="inline-ic" src="/icons/unlock.png" alt="" />: só enquanto a lista está bloqueada. Mostra quem está editando e liga de novo os botões da lista para todos. Veja [Quando a lista está bloqueada](#when-the-list-is-locked).
- **Guia** <img class="inline-ic" src="/icons/doc.png" alt="" />: o guia rápido dentro do Discord, com um link de volta a esta documentação.
- **Clonar lista** <img class="inline-ic" src="/icons/clone.png" alt="" />: clona a lista para outro canal, mesmo com a lista bloqueada. Veja [Opções de clonagem](#clone-options).
- **Download** <img class="inline-ic" src="/icons/download.png" alt="" />: um arquivo `.txt` da lista, enviado **só para você**. Veja [Download](/docs/list-actions/#download).
- **Selar lista** <img class="inline-ic" src="/icons/seal.png" alt="" />: mantém uma lista terminada no canal como registro, sem botões nem menus. Veja [Selar](/docs/list-actions/#seal).
- **Excluir lista** <img class="inline-ic" src="/icons/delete.png" alt="" />: exclui a lista **permanentemente**. Veja [Excluir](/docs/list-actions/#delete).

Selar e excluir não podem ser desfeitos, e o bot pede que você confirme antes. As duas ações exigem *Gerenciar mensagens* no canal: a mesma permissão que permite excluir a mensagem da lista à mão.

Sem ela, essas duas opções não aparecem. Guia, Clonar lista e Download aparecem para todos, e Desbloquear lista também quando a lista está bloqueada.

Enquanto a lista está bloqueada, Selar lista e Excluir lista não aparecem. Quem está editando salvaria em uma lista que não existe mais.

### Opções de clonagem

Quando você pressiona **Clonar lista** em **Mais**, os controles de clonagem substituem a primeira linha embaixo da lista, e o painel leva você até a lista:

- **Criar lista**: inicia a clonagem no canal que você escolheu no menu suspenso.
- **Opção de seleção**: mantém as marcações na cópia, ou não.
- **Opção de lembrete**: mantém os lembretes na cópia, ou não.
- **Sair**: volta ao painel da lista como estava. Se alguém estava editando a lista, ela continua bloqueada.

O menu suspenso oferece canais de texto e canais de voz. O que uma clonagem mantém e os limites do seu plano: [Clonar](/docs/list-actions/#clone).

## Linha 2: age sobre uma única tarefa

A segunda linha tem cinco botões (Conteúdo, Proprietário, Tag, Lembrete e Webhook) e cada um é um interruptor de três estados: desligado, editar ou excluir. Ligue um e depois escolha a tarefa. Cada botão, seus formulários e seus menus: [Editando uma tarefa no canal](/docs/channel-tasks/).

## Quando a lista está bloqueada

O TTM bloqueia a lista enquanto alguém a edita:

- na **Atualização em bloco**;
- no formulário do texto de uma tarefa;
- em um formulário de lembrete.

Para todos os outros, estes ficam desligados: o seletor de marcação, o botão Activity, **Atualização em bloco**, **Limpar lista**, **Reabrir tudo** e os botões das tarefas. **Mais** continua ligado, com **Clonar lista** dentro. **Mais** mostra quem está editando, e uma lista bloqueada não pode ser selada nem excluída por lá.

A última linha da lista também avisa: *🔒 @nome está editando a lista. Ficou bloqueada? Mais → Desbloquear lista*. Ela toma o lugar da linha das Dicas e aparece mesmo quando o seu servidor oculta as Dicas.

A menção mostra o nome e não avisa ninguém. Quando a lista é desbloqueada, a linha das Dicas volta, se o seu servidor a mostra.

Bloquear a lista também desliga **Proprietário**, **Tag** e **Webhook** se algum deles estava ligado: abra-o de novo pelo botão dele quando precisar.

Salvar o formulário desbloqueia a lista. Fechá-lo com **Cancelar** ou com o ✕ não desbloqueia, porque o Discord não avisa o bot: a **Atualização em bloco** e o formulário do texto de uma tarefa avisam isso na última linha. Então qualquer pessoa pode desbloquear a lista: abra **Mais** e pressione **Desbloquear lista** <img class="inline-ic" src="/icons/unlock.png" alt="" />.

Um administrador ainda pode selar, excluir ou regenerar uma lista bloqueada em [`/config lists`](/docs/config-lists/). Se isso acontecer enquanto você edita, a sua alteração não é salva. O bot avisa você e devolve o texto que você escreveu.

### Quando a lista muda enquanto você a edita

Alguém pode ter começado uma ação antes de você bloquear a lista: um lembrete ou o texto de uma tarefa. Quando essa pessoa termina, a alteração dela é aplicada, mas a lista continua bloqueada para você. **Mais** então diz quem a atualizou nesse meio-tempo.

Quando você salva a **Atualização em bloco**, o TTM confere se a lista ainda é a que você abriu. Se ela mudou, nada é salvo ainda. Uma mensagem que só você vê avisa, mostra o texto que você escreveu e oferece três opções:

- **Sobrescrever**: salva o seu texto. As atualizações feitas nesse meio-tempo se perdem.
- **Recarregar**: reabre a **Atualização em bloco** com a lista atualizada. O seu texto continua na mensagem, para você copiar.
- **Cancelar**: mantém a lista como está, com as atualizações, e a desbloqueia.

Se a lista for bloqueada ou selada antes de você confirmar Limpar ou Reabrir, nada muda. O bot avisa: *Agora esta lista não pode ser alterada*

## Para onde ir depois

- [Editando uma tarefa no canal](/docs/channel-tasks/) — a segunda linha: conteúdo, proprietário, tags, lembrete e webhook.
- [A Activity](/docs/activity/) — trabalhem juntos em uma lista, em uma janela dentro do Discord.
- [Editando uma lista à mão](/docs/writing-a-list/) — menções, proprietários, links e lembretes no texto da Atualização em bloco.
- [/config app](/docs/configuration/) — controle notificações, histórico e permissões.
- [FAQ](/docs/troubleshooting/#in-the-channel) — respostas rápidas para os problemas mais comuns.
