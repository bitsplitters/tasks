---
title: "Trabalhando em uma lista na Activity"
description: "As caixas, a primeira linha, o painel de uma tarefa (Conteúdo, Proprietário, Tag, Lembrete e Webhook) e quem está editando o quê."
fonte: 39bbd6a8e201
---

Dentro da Activity, a lista é uma página própria: uma caixa na frente de cada tarefa, uma linha de botões no alto e um painel para cada tarefa. As regras são as do canal: proprietários, configurações do servidor, limites do plano. O que cada recurso faz: [Proprietários e tags](/docs/owners-and-tags/), [Lembretes](/docs/reminders/), [Webhooks](/docs/webhooks/), [Ações da lista](/docs/list-actions/).

Embaixo da lista, uma linha ajuda quem é novo: *Não sabe por onde começar? Toque em uma caixa para marcar uma tarefa e no texto dela para o resto.* Ela segue as [Dicas](/docs/configuration/#tips) do servidor, como no canal.

## A primeira linha

Esses botões agem sobre a lista inteira.

| Botão | O que faz |
| :--- | :--- |
| **Guia** <img class="inline-ic" src="/icons/doc.png" alt="" /> | Um guia curto da Activity, em cinco páginas. |
| **Editar a lista** <img class="inline-ic" src="/icons/edit.png" alt="" /> | O título e a lista inteira como texto: veja [Editar a lista](#edit-the-list). |
| **Limpar a lista** <img class="inline-ic" src="/icons/clean.png" alt="" /> | Remove as tarefas concluídas: veja [Limpar a lista e Reabrir tudo](#clean-the-list-and-reopen-all). |
| **Reabrir tudo** <img class="inline-ic" src="/icons/reopen.png" alt="" /> | Devolve as tarefas concluídas para pendentes; **Nova data** move os lembretes delas. |
| **Sair** <img class="inline-ic" src="/icons/back.png" alt="" /> | Leva a lista de volta ao canal: veja [De volta ao canal](/docs/activity/#back-to-the-channel). |

Acima da linha, **Início** leva você ao [início do canal](/docs/activity/#the-home-of-the-channel), e a engrenagem abre [as suas configurações](/docs/activity/#your-settings). Clonar, Download, Selar, Excluir e Desbloquear não estão aqui: eles [ficam no canal](/docs/activity/#what-stays-in-the-channel).

## Marcar uma tarefa

**Toque na caixa** na frente de uma tarefa para marcá-la e toque de novo para reabri-la. Um grupo leva as subtarefas junto e fica marcado quando todas estão, como no canal. Cada tarefa que muda dispara o seu [webhook](#webhook), subtarefas e grupo incluídos, como no canal.

Quando uma marcação é recusada, um balão na caixa diz por quê: uma tarefa com proprietário só pode ser marcada por ele e por quem tem *Gerenciar mensagens* no canal (veja [Quem pode marcar uma tarefa](/docs/core-concepts/#who-can-tick-a-task)). Em uma tarefa que outra pessoa está editando, o balão diz quem.

## O painel de uma tarefa

**Toque no texto de uma tarefa** para abrir o painel dela, com o título *Escolha o que alterar na tarefa …*. Ele tem os cinco botões da segunda linha do canal: **Conteúdo**, **Proprietário**, **Tag**, **Lembrete** e **Webhook**. Cada um alterna entre três cores:

- <span class="c-grey">Cinza</span> — desligado.
- <span class="c-blue">Azul</span> — alterar: o painel mostra os campos e **Salvar**.
- <span class="c-red">Vermelho</span> — excluir: o painel mostra **Excluir**. Em uma tarefa sem nada para excluir, a frase no alto avisa, por exemplo *Nenhum proprietário para remover*, e **Excluir** continua desligado.

Um terceiro toque deixa o botão cinza de novo. Nada acontece até você tocar em **Salvar** ou **Excluir**. Depois de uma ação, o painel continua na mesma tarefa, com os botões cinza, pronto para a próxima alteração. Ele fecha com **Fechar**, com um toque fora dele ou sozinho, depois de 30 segundos sem atividade.

Enquanto o painel está aberto, a tarefa fica bloqueada para os outros: veja [Quem está editando o quê](#who-is-editing-what).

## Conteúdo

**Azul** mostra o texto da tarefa, para alterá-lo, com os canais pelo nome, como `#general`. Proprietários, tags, lembretes e webhooks digitados ali são removidos: eles têm botões próprios. Um proprietário que o TTM não conhece não é salvo: a mensagem leva você até **Proprietário**.

**Vermelho** exclui a tarefa. Excluir um grupo com subtarefas pergunta antes, como no canal. A última tarefa de uma lista não pode ser excluída: uma lista não pode ficar vazia. Para excluir a lista inteira, use o canal.

## Proprietário

**Azul** mostra uma busca entre as pessoas e os cargos do servidor, com quem está na Activity em primeiro lugar. Toque em um nome para adicioná-lo, toque de novo para removê-lo e depois em **Salvar**. Remova todos os nomes e **Salvar** remove o proprietário, como faz o **Vermelho**.

**Para pegar uma tarefa** sem proprietário, pressione **Proprietário** até ficar azul: o seu nome já está escolhido, então **Salvar** deixa a tarefa com você.

Para dá-la a outra pessoa, toque no nome dela: ele toma o lugar do seu. Uma tarefa que já tem proprietário o mostra, e só muda se você escolher alguém.

- Uma pessoa ou um cargo basta em todos os planos.
- Várias pessoas viram um cargo que o TTM cria, no Premium: veja [Os cargos que o TTM cria](/docs/owners-and-tags/#the-roles-ttm-creates). Quando algo falta, **Salvar** continua desligado e o painel diz por quê.

**Vermelho** remove o proprietário, e o lembrete dele também: não sobra ninguém para recebê-lo. Se o lembrete ainda não disparou, o painel pede que você confirme antes.

## Tag

**Azul** mostra as tags que a tarefa tem agora, já escolhidas. Adicione e remova pessoas ou cargos pela busca, até 25, e depois **Salvar**: a tarefa fica exatamente com o conjunto que você vê. Não há modo de sobrescrita nem edição ao vivo: você sempre parte das tags atuais.

Remova todas e **Salvar** remove todas as tags, como faz o **Vermelho**.

**Vermelho** remove todas as tags. De qualquer modo, uma tarefa feita só de tags as mantém, porque sem elas ficaria sem texto.

## Lembrete

**Azul** mostra **Data**, **Hora** e **Fuso horário** juntos, e as repetições quando se aplicam.

- Um lembrete **novo** começa dez minutos a partir de agora, com **Salvar** já ligado.
- Um lembrete **existente** mostra os valores dele. **Salvar** continua desligado até você mudar algo.
- **Salvar** continua desligado para uma data que já passou ou que está a menos de 5 minutos: *A data já passou* diz para escolher uma nova.

Toque em **Fuso horário** para escolhê-lo: pesquise por cidade, país, um nome como `Europe/Rome` ou um deslocamento como `+5:30`.

- *Seus fusos horários* lista os que importam para você: o deste dispositivo, o seu, o do servidor.
- Uma linha embaixo do campo diz de onde vem o fuso: o seu, o deste dispositivo ou o do servidor, com **Configurações** para escolher o seu. Um fuso diferente vale só para aquela data: veja [Seu fuso horário](/docs/reminders/#your-time-zone).
- *Neste dispositivo* mostra o mesmo momento na hora do seu dispositivo, quando o fuso é diferente.

Os três menus de repetição aparecem no Premium, com a opção de [lembretes repetidos](/docs/reminders/#repeating-reminders) ativada, ou quando o lembrete já se repete: veja [Os campos da repetição](/docs/reminders/#the-repetition-fields).

Uma tarefa marcada não pode ter lembrete. Em uma tarefa sem proprietário, o painel avisa que salvar torna você o proprietário dela.

**Vermelho** remove o lembrete.

## Webhook

Os webhooks são um recurso [Premium](/docs/premium/).

**Azul** lista os webhooks do servidor pelo nome, cada um com o momento em que dispara: *na conclusão*, *na reabertura* ou *sempre*. O endereço nunca aparece. Escolha um e depois **Salvar**.

Um webhook que não existe mais aparece no alto, marcado como *não existe mais*, para você escolher outro. Se o servidor não tem nenhum, o painel avisa que eles são criados com [/config webhook](/docs/config-webhook/).

**Vermelho** remove o webhook da tarefa.

## Editar a lista

**Editar a lista** mostra o título e cada tarefa como texto, no formato explicado em [Editando uma lista à mão](/docs/writing-a-list/): o mesmo texto da **Atualização em bloco** do canal, lido pelas mesmas regras: pessoas, cargos e canais pelo nome, datas dos lembretes no seu fuso horário.

Uma linha embaixo do texto diz como adicionar alguém novo e leva a [Editando uma lista à mão](/docs/writing-a-list/#people-roles-and-channels-by-name). Altere o que precisar e salve.

A lista fica bloqueada para os outros desde o momento em que abre até você salvar ou cancelar: **Cancelar**, o ✕ e um toque fora a desbloqueiam. Ela fecha sozinha depois de 30 segundos sem atividade. Se o texto não pode ser salvo, os problemas aparecem embaixo dele: veja [Quando o texto não pode ser salvo](/docs/writing-a-list/#when-the-text-cant-be-saved).

## Limpar a lista e Reabrir tudo

**Limpar a lista** pede que você confirme antes. O resumo no fim da sessão registra quantas tarefas você removeu. Sem nenhuma tarefa concluída, ou com todas concluídas, ela avisa e não muda nada.

**Reabrir tudo** pede confirmação toda vez. **Nova data**, na mesma janela, move os lembretes das tarefas que você reabre. Reabrir dispara os webhooks de reabertura das tarefas que você reabre. O que as duas ações alteram: [Ações da lista](/docs/list-actions/).

## Quem está editando o quê

Duas pessoas nunca alteram a mesma coisa ao mesmo tempo:

- Sua primeira alteração em uma tarefa a bloqueia para os outros. Um toque na caixa avisa quem está editando; as outras tarefas continuam livres.
- Enquanto alguém altera uma tarefa, **Editar a lista**, **Limpar a lista** e **Reabrir tudo** esperam e dizem por quem esperam.
- **Editar a lista** bloqueia a lista inteira: as caixas voltam quando terminar.

Uma edição deixada parada por 20 segundos pergunta *Ainda está aí? A edição fecha em 10 segundos*; aos 30 ela fecha, e o que não foi salvo se perde. A leitura não tem limite de tempo.

Se alguém altera a mesma coisa logo antes de você salvar, você escolhe: **Sobrescrever**, que salva a sua alteração e perde a da outra pessoa; **Recarregar**, com o seu texto mantido abaixo para você copiar; ou **Cancelar**.

## Para onde ir depois

- [A Activity](/docs/activity/) — como entrar, o início do canal e a volta ao canal.
- [Editando uma tarefa no canal](/docs/channel-tasks/) — os mesmos cinco botões, embaixo da lista no canal.
- [FAQ](/docs/troubleshooting/#in-the-activity) — respostas rápidas para os problemas mais comuns.
