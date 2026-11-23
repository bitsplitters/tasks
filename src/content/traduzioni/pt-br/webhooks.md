---
title: "Webhooks"
description: "Dispare uma chamada HTTP quando uma tarefa é concluída ou reaberta: conecte o TTM a qualquer coisa."
fonte: 1b865a3d554e
---

Os webhooks permitem que uma tarefa fale com o mundo externo. Vincule um a uma tarefa: quando essa tarefa for **concluída** ou **reaberta**, o TTM envia uma requisição HTTP. Ela pode ir para um sistema de CI, um chat, uma automação de planilhas ou qualquer outra coisa que aceite uma chamada.

Quem gerencia o servidor cria os webhooks com [/config webhook](/docs/config-webhook/): o endereço, o método, o que a chamada envia. Depois você os vincula às tarefas com o botão **Webhook**.

Os webhooks são um recurso [Premium](/docs/premium/).

<div class="howto" id="how-to-do-it"><div class="howto-t">Como fazer</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />No canal</span><span class="howto-d">Webhook, na segunda linha sob a lista: escolha o webhook e depois a tarefa.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Na Activity</span><span class="howto-d">Webhook, no painel de uma tarefa: os webhooks do servidor, pelo nome.</span></a></div></div>

## Vinculando um webhook a uma tarefa

Um webhook novo ainda não está vinculado a nada. Você o vincula a uma tarefa com **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />: em azul para vincular, em vermelho para remover.

A partir daí, concluir ou reabrir essa tarefa dispara a chamada.

## Quando um webhook dispara

Um webhook dispara quando a tarefa dele é **concluída ou reaberta**, por uma marcação ou por **Reabrir tudo**. No canal você marca com o seletor de marcação, o menu suspenso sob a lista. Na Activity você marca a caixa da tarefa.

- **Toda tarefa que muda** dispara o próprio webhook: a que você escolheu e as que mudam junto com ela. São as subtarefas marcadas em cascata, ou um grupo concluído pela última subtarefa. Uma subtarefa que já estava marcada não muda, então não dispara.
- As chamadas saem **uma depois da outra**, na ordem da lista. A marcação inteira conta como **um único clique**, não importa quantas tarefas ela muda.
- **Reabrir tudo** dispara os webhooks de reabertura das tarefas que reabre.
- **Atualização em bloco** e **Editar a lista** mudam muitas tarefas de uma vez e **não** disparam nenhum webhook.
- **A lista precisa estar em uso**, ocupando uma das vagas do seu plano: veja [Como funcionam as três vagas](/docs/premium/#how-the-three-places-work).

Uma lista criada durante a beta é a exceção: as tarefas dela ainda podem ser marcadas sem contar no limite de três listas. Enquanto a lista não se tornar uma das três em uso, os webhooks delas ficam em silêncio, e o TTM avisa você em particular.

## Quando um webhook falha

Se a chamada não chega ao destino, o TTM escreve um aviso no canal da lista. Ele cita o webhook e a tarefa e explica o erro em uma frase. Também diz o que conferir: o endereço, os headers, o método ou o servidor que você está chamando.

Quando o mesmo webhook está em várias tarefas que mudam juntas, você recebe um único aviso, não um por tarefa.

Se as notificações estão desativadas no servidor, ou o TTM não pode escrever nesse canal, o aviso chega só a quem marcou a tarefa. Na Activity, o aviso chega a quem marcou a tarefa, em um balão sobre a caixa dela.

## O webhook no texto

O vínculo fica na própria tarefa, como o token reservado `{{wb=…}}`. Você o vê em **Atualização em bloco** e em **Editar a lista**: veja [Webhooks no texto](/docs/writing-a-list/#webhooks-in-the-text).

O formulário **Conteúdo** de uma única tarefa não mostra o token e remove um que você digitar ali, avisando você.

O texto de uma tarefa também pode levar **variáveis livres**: escreva `{{chave=valor}}` em qualquer ponto dele, e o webhook pode usar `{{chave}}`. Assim, um mesmo webhook pode enviar valores diferentes para cada tarefa. Veja [Tokens](/docs/config-webhook/#tokens).
