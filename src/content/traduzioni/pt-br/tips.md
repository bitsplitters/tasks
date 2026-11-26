---
title: "Dicas e truques"
description: "Pequenos hábitos que deixam o TTM mais rápido e mais silencioso, no canal e na Activity."
fonte: 901e2ac519ca
---

A maioria funciona onde quer que a lista esteja. As que existem em um único lugar dizem isso sob o título.

## Reutilize uma lista em qualquer lugar

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />No canal</p>

Abra **Mais** <img class="inline-ic" src="/icons/other.png" alt="" /> e escolha **Download** <img class="inline-ic" src="/icons/download.png" alt="" />: a lista chega como um arquivo `.txt` que só você vê. Depois use `/criar-lista` em qualquer servidor e anexe esse arquivo à opção `arquivo`.

Tarefas, estados de conclusão, proprietários, tags, lembretes e webhooks voltam como estavam. Funciona bem para checklists que você repete, como releases, onboarding ou eventos.

Se algo no arquivo não combinar com o servidor novo, o TTM não cria nada e lista todos os problemas de uma vez. O que ele confere: veja [`/criar-lista`](/docs/commands/#create-list).

## Esconda as dicas

Se a sua equipe já sabe onde clicar, esconda as **Dicas** em [/config app](/docs/configuration/#tips): sem Tutorial no `/criar-lista`, sem linha de ajuda sob as listas.

## Clone em vez de refazer

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />No canal</p>

Mantém a mesma lista em vários canais? **Clonar lista** <img class="inline-ic" src="/icons/clone.png" alt="" />, no painel **Mais** da lista, a copia em um passo — e deixa você decidir se leva junto as marcações e os lembretes.

## Aplique uma ação a várias tarefas

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />No canal</p>

Marque **Manter o estado após a seleção** no menu **Comportamento** de [/config app](/docs/configuration/#keep-the-state-after-a-selection). O botão ativo (proprietário, tag ou lembrete) continua ligado depois de cada tarefa, e assim você põe tag em cinco tarefas com cinco cliques em vez de quinze.

## Pergunte quem topa

Escreva a pergunta como uma tarefa, por exemplo *Quem topa um 1v1 hoje à noite?*, e se adicione às tags dela: no canal, [**Tag**](/docs/channel-tasks/#tag) azul e a tarefa, com o menu vazio; na Activity, [**Tag**](/docs/activity-list/#tag) e **Salvar**. Quem topar marca a tarefa, e a notificação menciona você. Serve para um scrim, uma vaga na raid, um lugar no carro. A tarefa fecha na primeira resposta: quem responde em segundo a reabre, e a reabertura também menciona você.

## Mantenha o canal silencioso

Se as notificações de tarefas parecerem barulhentas, defina o **Modo de notificação** em [/config app](/docs/configuration/#notification-mode) para manter só a última, ou desative-as: a lista continua atualizada de qualquer jeito.

## Lembretes que sobrevivem à mudança de horário

Em um lembrete recorrente, escolha **dias** no menu **Unidade** para o mesmo horário do dia, ou **horas** para um intervalo exato: na mudança de horário de verão, os dois diferem em uma hora. Veja [Os campos da repetição](/docs/reminders/#the-repetition-fields).

## Um lembrete em dois cliques

O lembrete começa dez minutos a partir de agora, então para “me lembre daqui a pouco” basta salvá-lo como está, com **Quando** no canal ou **Salvar** na Activity.

## Personalize webhooks com variáveis livres

Coloque `{{owner=alex}}` (ou qualquer `{{chave=valor}}`) no texto de uma tarefa e use `{{owner}}` no body do seu webhook. É um jeito leve de passar dados específicos da tarefa sem fixá-los no código. Veja [Webhooks no texto](/docs/writing-a-list/#webhooks-in-the-text).

## Deixe as listas só para leitura para os convidados

Sincronize as permissões em [/config app](/docs/configuration/#sync-permissions) para que só a sua equipe possa editar uma lista, enquanto todos os outros ainda podem lê-la. O botão **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> segue as mesmas regras.
