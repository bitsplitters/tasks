---
title: "Deixe sua guilda pronta para a noite de raid"
seoTitle: "Bot de Discord para gerenciar guildas: noites de raid e tarefas do clã"
name: "Guildas e clãs"
description: "A semana de uma guilda em torno da noite de raid: um lembrete que se repete toda quarta por meses, testes de recrutas feitos em sequência e uma planilha de escalação que se preenche sozinha pelo Make e pelo Google Sheets."
highlights: "Um lembrete recorrente em dias, testes feitos um depois do outro, um webhook para o Make e o Google Sheets, variáveis livres, Reabrir tudo com uma nova data."
intro: |
  A Ava lidera a **Ember Vanguard**, uma guilda de raids com cerca de sessenta jogadores. O Leo lidera os raids, toda quarta às 20h. Os oficiais recrutam, e cada recruta joga um raid de teste antes de entrar. Os membros jogam dos dois lados do Atlântico. Esta é a semana da guilda, de segunda, 7, a domingo, 13 de dezembro de 2026.
order: 5
team:
  guild: Ember Vanguard
  zone: America/Chicago
  people:
    - { id: "11859044175621001", name: Ava, username: ava.ember, color: "#eb459e", about: "Líder da guilda. Escreve a lista." }
    - { id: "11859044175621002", name: Leo, username: leo.raids, color: "#3ba55c", about: "Líder dos raids e oficial." }
    - { id: "11859044175621003", name: Kai, username: kai.ember, color: "#1abc9c", about: "Oficial." }
  roles:
    - { id: "11859044175622001", name: Oficiais, about: "Ava, Leo, Kai e mais dois." }
    - { id: "11859044175622002", name: Raiders, about: "A equipe de raid, cerca de trinta jogadores." }
  channels:
    - { id: "11859044175623001", name: raids, about: "Onde os raiders conversam. A lista fica aqui." }
    - { id: "11859044175623002", name: oficiais, about: "Privado, só para os oficiais." }
list:
  title: "Ember Vanguard: a semana"
  channel: "11859044175623001"
  at: 2026-12-10T22:00
  look: |
    O lembrete do raid mostra `↻7d ×16`: toda quarta até o fim de março. Os três testes levam o nome e a classe do recruta como variáveis livres; o webhook deles não aparece. “Reabastecer o banco da guilda” tem um único lembrete, que muda de data toda semana.
  text: |
    - [] <t:1796866200> [0m,7d,15] <@&11859044175622002>: Noite de raid às 20h: na call de voz até 19h45, com comida e poções
    - [X] <t:1796857200> [0m,0m,0] <@&11859044175622001>: Reabastecer o banco da guilda antes do raid
    - [X] <@11859044175621002>: Publicar a escalação do raid
    - [X] <@&11859044175622001>: Revisar as candidaturas da semana
    - [X] {{wb=Planilha da escalação}} <@11859044175621002>: Raid de teste: Mirel, {{class=healer}} {{recruit=Mirel}}
    - [X] {{wb=Planilha da escalação}} <@11859044175621002>: Raid de teste: Thorn, {{class=tank}} {{recruit=Thorn}}
    - [] {{wb=Planilha da escalação}} <@11859044175621002>: Raid de teste: Vesk, {{class=mage}} {{recruit=Vesk}}
    - [] <@&11859044175622001>: Responder a todos os candidatos, aceitos ou não
    - [] <@11859044175621001>: Planejar o evento de fim de ano da guilda
webhooks:
  - name: Planilha da escalação
    service: make
    trigger: both
    method: POST
    url: https://hook.us1.make.com/<id>
    headers: "Content-Type: application/json"
    body: |
      {"recruit": "{{recruit}}", "class": "{{class}}", "officer": "{{user}}", "state": "{{state}}", "when": "{{when}}", "list": "{{list}}"}
    setup: |
      No Make, a Ava cria um cenário com dois módulos. O primeiro é *Webhooks → Custom webhook*: o Make gera a URL dele, a de cima, e ela a cola em `/config webhook`. O segundo é *Google Sheets → Add a row*, na planilha de escalação da guilda.

      O Make aprende o formato dos dados com uma primeira requisição. A Ava clica em **Run once** no cenário, vincula o webhook a uma tarefa de teste e a marca. Agora os campos `recruit`, `class`, `officer`, `state` e `when` podem ser mapeados para as colunas da planilha. O Make desativa um webhook que fica cinco dias sem cenário, então o cenário vem primeiro.

      Sem um evento, o webhook dispara nos dois sentidos. Um teste marcado por engano e reaberto acrescenta uma segunda linha, com `reopened` na coluna de estado: a planilha guarda as duas.
settings:
  - setting: Manter o estado após a seleção
    choice: Ativado
    why: "O Leo faz três testes seguidos: **Proprietário** continua azul depois de cada um."
  - setting: Modo de notificação
    choice: Excluir todas as notificações exceto as duas últimas
    why: "#raids é movimentado. As duas últimas notificações ficam sob a lista, e as mais antigas saem."
  - setting: Fuso horário
    choice: America/Chicago
    why: "O raid é às 20h, no horário de Chicago. O Discord mostra a hora no fuso de cada leitor, então um raider em Lisboa lê 2h da manhã."
  - setting: Lembretes recorrentes
    choice: Recorrentes ativados
    premium: true
    why: "Um lembrete para cada raid até o fim de março, em vez de um novo a cada semana."
week:
  - at: 2026-12-07T20:00
    text: "A Ava acrescenta três testes com **Atualização em bloco** <img class=\"inline-ic\" src=\"/icons/edit.png\" alt=\"\" />, uma tarefa por recruta, com o nome e a classe como variáveis livres: `{{recruit=…}}` e `{{class=…}}`. Depois vincula cada teste a Planilha da escalação com **Webhook**."
  - at: 2026-12-08T19:00
    text: "O Leo **pega** os três testes. Ele clica em **Proprietário** até ficar azul e depois escolhe o primeiro teste, o segundo e o terceiro, sem escolher ninguém. Com *Manter o estado após a seleção*, **Proprietário** continua azul entre eles, e cada tarefa passa a ser dele."
    card: { kind: notice, type: claimed, by: "11859044175621002", task: "7" }
  - at: 2026-12-09T17:00
    text: "O lembrete dos oficiais menciona @Oficiais em #raids. O Kai reabastece o banco da guilda e marca a tarefa."
  - at: 2026-12-09T19:30
    text: "O lembrete do raid menciona @Raiders em #raids, como resposta à lista. Ele virá toda quarta às 19h30 até o fim de março."
    card: { kind: reminder, task: "1" }
  - at: 2026-12-09T22:40
    text: "O teste da Mirel foi bem. O Leo marca a tarefa dela, e o webhook envia ao Make a linha da planilha de escalação."
    card: { kind: webhook, webhook: Planilha da escalação, task: "5", by: "11859044175621002" }
  - at: 2026-12-10T21:30
    text: "O Thorn joga um segundo teste na quinta, com um grupo menor. O Leo o marca: mais uma linha na planilha."
fonte: 0d0a1a51d2e4
---

## Na próxima vez

Toda segunda, a Ava primeiro troca os testes concluídos pelos recrutas novos, com **Atualização em bloco**, que não dispara nenhum webhook. Depois clica em **Reabrir tudo** <img class="inline-ic" src="/icons/reopen.png" alt="" /> e escolhe **Nova data**, com a próxima quarta às 17h: o lembrete do banco vai para lá. **Reabrir tudo** dispara os webhooks das tarefas que reabre: com os testes concluídos ainda ali, a planilha receberia uma linha “reopened” para cada um.

Ninguém marca o raid: marcar uma tarefa interrompe o lembrete dela. O lembrete do raid volta sozinho toda quarta. Veja [Reabrir tudo](/docs/list-actions/#reopen-all).

## O que o TTM não faz aqui

O TTM não lê o jogo. Não tem inscrições de raid, presença, controle de loot nem calendário com confirmações: um bot de planejamento de raids faz isso. O TTM guarda o trabalho da guilda, avisa a equipe do raid na hora certa e envia para a planilha o que os oficiais decidem.

## Perguntas

### Por que dias e não horas?

Em 14 de março de 2027 os relógios de Chicago avançam uma hora. A Ava escolheu **dias** no menu **Unidade**, então o lembrete continua às 19h30 depois da mudança. Com **horas**, ele chegaria às 20h30, quando o raid já começou. Veja [Os campos da repetição](/docs/reminders/#the-repetition-fields).

### Como envio à planilha o proprietário da tarefa?

`{{user}}` é quem marca a tarefa, que aqui é o Leo. Para enviar o proprietário mesmo quando outro oficial marcar, escreva-o na tarefa como variável livre, `{{owner=Leo}}`, e use `{{owner}}` no body. `{{task}}` leva o proprietário só como um código do Discord, `<@id>`, que uma planilha não consegue ler. Veja [Personalize webhooks com variáveis livres](/docs/tips/#personalize-webhooks-with-free-variables).

### Um raider pode marcar um teste?

Não: cada teste pertence ao Leo. Um raider que tentar recebe uma recusa que só ele vê. Os oficiais que gerenciam as mensagens do canal podem, com *Gerenciar mensagens*. Veja [Quem pode marcar uma tarefa](/docs/core-concepts/#who-can-tick-a-task).
