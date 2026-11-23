---
title: "Lance seu jogo com a equipe com quem você já conversa"
seoTitle: "Bot de gerenciamento de projetos no Discord para equipes de game dev"
name: "Projetos de game dev"
description: "Três desenvolvedores e seus testers, um marco de cada vez: uma passagem de tarefas quando alguém adoece, a build do playtest iniciada no GitHub Actions por uma marcação e o aviso aos testers no dia do playtest."
highlights: "Um marco por grupo, uma tarefa pega de outra pessoa, um lembrete que acompanha o novo proprietário, um webhook que inicia uma build no GitHub Actions, a reunião semanal na Activity."
intro: |
  A Ava, o Leo e o Sam fazem o **Lantern Keep**, um pequeno roguelike, nas horas livres da noite. A Ava escreve o código, o Leo desenha e o Sam faz a música. Cinco jogadores da comunidade deles testam cada build. A lista mora em #dev desde o começo do projeto; esta é a semana de segunda, 7, a domingo, 13 de dezembro de 2026, com um playtest na sexta.
order: 4
team:
  guild: Lantern Keep
  zone: Europe/Stockholm
  people:
    - { id: "11849044175621001", name: Ava, username: ava.codes, color: "#eb459e", about: "Código. Lidera o projeto." }
    - { id: "11849044175621002", name: Leo, username: leo.draws, color: "#3ba55c", about: "Arte." }
    - { id: "11849044175621003", name: Sam, username: sam.sound, color: "#5865f2", about: "Música e som. Doente esta semana." }
  roles:
    - { id: "11849044175622001", name: Testers, about: "Cinco jogadores da comunidade." }
  channels:
    - { id: "11849044175623001", name: dev, about: "O canal da equipe; os testers podem lê-lo. A lista fica aqui." }
    - { id: "11849044175623002", name: devlog, about: "Onde os jogadores leem as novidades do jogo." }
    - { id: "11849044175623003", name: playtest, about: "Onde os testers reportam bugs." }
list:
  title: "Lantern Keep: 0.4 e 0.5"
  channel: "11849044175623001"
  at: 2026-12-10T19:00
  spaced: true
  look: |
    Cada marco é um grupo, com uma linha em branco em volta. O que está pronto esmaece, então o que resta da 0.4 se destaca: o playtest. “Mixar a música do trailer” agora é da Ava, com o lembrete dela. O webhook de “Gerar a versão do playtest” não aparece; `{{version=0.4.0}}` aparece, e a build o leu.
  text: |
    - [] Marco 0.4: o playtest
     - [X] <@11849044175621001>: Pesca: lançar, esperar, puxar
     - [X] <@11849044175621002>: Sprites dos seis peixes
     - [X] <@11849044175621001>: Corrigir os bugs do último playtest, no [relatório dos testers](https://discord.com/channels/1184904417562000000/11849044175623003/1184904417562399001)
     - [X] {{wb=Build do playtest}} <@11849044175621001>: Gerar a versão do playtest {{version=0.4.0}}
     - [] <t:1797008400> [0m,0m,0] <@&11849044175622001>: Playtest às 18h, depois reportar em <#11849044175623003>
    - [] Marco 0.5: o trailer
     - [] <t:1797073200> [0m,0m,0] <@11849044175621001>: Mixar a música do trailer
     - [] <@11849044175621002>: Capturar os clipes de gameplay
     - [] <@11849044175621003>: Efeitos sonoros da pesca
     - [] <@11849044175621002>: Editar o trailer, 45 segundos
    - [] <@11849044175621001>: Planejar o marco 0.6 no [documento de design](https://docs.google.com/document/d/1lantern-keep-design/edit)
    - [] <@11849044175621001>: Publicar o devlog em <#11849044175623002>
webhooks:
  - name: Build do playtest
    service: github
    trigger: completion
    method: POST
    url: https://api.github.com/repos/lantern-keep/game/actions/workflows/playtest.yml/dispatches
    headers: |
      Accept: application/vnd.github+json
      Authorization: Bearer <your token>
      X-GitHub-Api-Version: 2026-03-10
      Content-Type: application/json
    body: |
      {"ref": "main", "inputs": {"version": "{{version}}", "requested_by": "{{user}}"}}
    setup: |
      O workflow que gera o jogo começa com `workflow_dispatch` e declara os dois inputs que o body envia. Ele precisa estar na branch padrão do repositório:

      ```yaml
      on:
        workflow_dispatch:
          inputs:
            version:
              required: true
            requested_by:
              required: false
      ```

      Os passos então leem `${{ inputs.version }}`. O token vai no header `Authorization`. A Ava cria um personal access token *fine-grained* em *GitHub → Settings → Developer settings*, limitado a este repositório, só com a permissão *Actions*, de leitura e escrita. Um token vazado pode iniciar uma build e nada mais.

      O evento é só a conclusão: reabrir a tarefa por engano não inicia uma segunda build.
settings:
  - setting: Tarefas concluídas atenuadas
    choice: Ativado
    why: "As partes prontas de um marco esmaecem, e o que resta se destaca."
  - setting: Espaço entre grupos
    choice: Ativado
    why: "Cada marco é um grupo: uma linha em branco mostra onde um termina e o próximo começa."
week:
  - at: 2026-12-07T20:00
    text: "A Ava acrescenta o marco 0.5 com **Atualização em bloco** <img class=\"inline-ic\" src=\"/icons/edit.png\" alt=\"\" />: o trailer, em quatro tarefas. Depois dá a cada uma o proprietário com **Proprietário**, e à música o prazo dela com **Lembrete**."
  - at: 2026-12-08T09:15
    text: "O Sam está doente a semana toda, e a música do trailer vence no sábado. A Ava **pega** “Mixar a música do trailer” dele: clica em **Proprietário**, escolhe a si mesma no menu, confirma e depois escolhe a tarefa. Escolher só a tarefa não bastaria: trocar um proprietário exige uma escolha explícita. A notificação cita o Sam e não menciona ninguém, porque a Ava já sabe. O lembrete da tarefa agora vai para ela."
    card: { kind: notice, type: updated, by: "11849044175621001", from: "11849044175621003", task: "2.1" }
  - at: 2026-12-09T20:00
    text: "A reunião semanal, em uma chamada de voz. A Ava abre a lista com **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, e o Leo entra com **Entrar na Activity**. Com **Editar a lista** eles passam as correções de bugs para antes da build e acrescentam o link do relatório dos testers. Enquanto ela edita, a lista inteira fica bloqueada para o Leo: as caixas voltam quando ela salva."
  - at: 2026-12-10T18:30
    text: "Os bugs estão corrigidos. A Ava marca “Gerar a versão do playtest”, e o webhook inicia a build no GitHub Actions, com a versão escrita na tarefa."
    card: { kind: webhook, webhook: Build do playtest, task: "1.4", by: "11849044175621001" }
  - at: 2026-12-11T18:00
    text: "O lembrete dos testers chega em #dev, como resposta à lista, e menciona @Testers. Qualquer um deles pode marcar o playtest depois de jogar e reportar."
    card: { kind: reminder, task: "1.5" }
  - at: 2026-12-12T12:00
    text: "O lembrete da música do trailer chega à Ava por mensagem direta, não ao Sam: um lembrete acompanha o proprietário da tarefa."
    card: { kind: reminder, task: "2.1" }
fonte: e78bad9b590a
---

## Na próxima vez

Quando a 0.4 estiver pronta, a Ava clica em **Limpar lista**: o marco concluído sai, com as subtarefas, e a 0.5 sobe. Com **Atualização em bloco** ela escreve a 0.6 embaixo, a partir do documento de design. O webhook continua no servidor: ela o vincula à próxima tarefa de build com **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" /> e escreve `{{version=0.5.0}}` no texto dela com **Conteúdo**. Veja [Limpar](/docs/list-actions/#clean).

## O que o TTM não faz aqui

O TTM não é um issue tracker. Não lê o seu repositório, não fecha issues nem mostra um burndown: o GitHub, o GitLab e o Jira fazem isso. Ele inicia a build e não espera o resultado. Se a equipe quiser o resultado no Discord, o workflow pode publicá-lo em um canal com um webhook do Discord próprio.

## Perguntas

### Por que a Ava não escolheu simplesmente a tarefa para pegá-la?

Escolher uma tarefa sem nada selecionado só a pega quando ela está livre. Uma tarefa de outra pessoa continua sendo dela, e o TTM explica por quê. Para trocar um proprietário, você escolhe primeiro o novo no menu. Veja [Proprietário](/docs/channel-tasks/#owner).

### Reabrir a tarefa inicia outra build?

Não. O webhook foi criado com `evento:conclusão`, então só a conclusão o dispara. Sem um evento, ele dispararia nos dois. Veja [Quando um webhook dispara](/docs/webhooks/#when-a-webhook-fires).

### Um tester pode marcar o playtest?

Pode: a tarefa pertence a @Testers, então qualquer membro do cargo pode marcá-la. A Ava também pode, com *Gerenciar mensagens* no canal. Veja [Quem pode marcar uma tarefa](/docs/core-concepts/#who-can-tick-a-task).
