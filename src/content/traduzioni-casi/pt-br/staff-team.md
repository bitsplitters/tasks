---
title: "Mantenha sua equipe de moderação alinhada"
seoTitle: "Bot de gestão de staff no Discord: tarefas para a sua equipe de moderação"
name: "Staff e equipe de moderação"
description: "A semana de uma equipe de moderação em uma lista: com um cargo como proprietário, um lembrete de reunião que se repete, dois ajudantes novos dividindo uma tarefa e um anúncio quando as regras mudam."
highlights: "Um cargo como proprietário, a recusa para quem não o tem, um cargo que o TTM cria para duas pessoas, um lembrete recorrente, um webhook com uma variável livre, o tópico do histórico."
intro: |
  A Ava lidera os moderadores do **Lumen Lounge**, um servidor com cerca de 4.000 membros. As tarefas do staff se repetem toda semana, e dois ajudantes novos, o Kai e a Zoe, começam na segunda. Esta é a primeira semana da equipe com o TTM, de segunda, 7, a domingo, 13 de dezembro de 2026.
order: 2
team:
  guild: Lumen Lounge
  zone: America/New_York
  people:
    - { id: "11829044175621001", name: Ava, username: ava.lumen, color: "#eb459e", about: "Chefe dos moderadores e também moderadora." }
    - { id: "11829044175621002", name: Leo, username: leo.lumen, color: "#3ba55c", about: "Moderador." }
    - { id: "11829044175621003", name: Noa, username: noa.lumen, color: "#e67e22", about: "Ajudante." }
    - { id: "11829044175621004", name: Kai, username: kai.lumen, color: "#1abc9c", about: "Ajudante novo, desde segunda." }
    - { id: "11829044175621005", name: Zoe, username: zoe.lumen, color: "#9b59b6", about: "Ajudante nova, desde segunda." }
  roles:
    - { id: "11829044175622001", name: Moderadores, about: "Ava, Leo e mais três." }
    - { id: "11829044175622002", name: Ajudantes, about: "Noa e, desde segunda, Kai e Zoe." }
    - { id: "11829044175622003", name: Admins, about: "Os donos do servidor." }
    - { id: "11829044175622004", name: TTM1, about: "Criado pelo TTM para uma tarefa de duas pessoas.", members: ["11829044175621004", "11829044175621005"], ttm: true }
  channels:
    - { id: "11829044175623001", name: staff, about: "Privado, só para o staff. A lista fica aqui." }
    - { id: "11829044175623002", name: regras, about: "As regras do servidor." }
    - { id: "11829044175623003", name: anúncios, about: "Onde todos os membros leem as novidades." }
list:
  title: "Equipe de moderação: semana 50"
  channel: "11829044175623001"
  at: 2026-12-09T21:00
  look: |
    Quase toda tarefa pertence a @Moderadores: qualquer moderador pode marcá-la. “Acompanhar um moderador por um dia” pertence a @TTM1, o cargo que o TTM criou para o Kai e a Zoe. O lembrete da reunião mostra `↻7d ×4`: a cada 7 dias, 4 vezes no total.
  text: |
    - [X] <@&11829044175622001>: Revisar as denúncias abertas
    - [] <@&11829044175622001>: Esvaziar a fila de moderação
    - [X] <@&11829044175622001>: Conferir o log do AutoMod
    - [] <t:1796688000> [0m,7d,3] <@&11829044175622001>: Reunião do staff, segunda às 19h no canal de voz do Staff
    - [X] {{wb=Regras alteradas}} <@&11829044175622001>: Atualizar as regras em <#11829044175623002> {{change=Spoilers ficam nos canais de spoiler por duas semanas depois de um lançamento}} <@&11829044175622003>
    - [X] <@&11829044175622004>: Acompanhar um moderador por um dia
    - [] <@11829044175621001>: Dar as boas-vindas aos ajudantes novos
     - [X] Dar o cargo de Ajudante ao Kai e à Zoe
     - [] Mostrar a eles as ferramentas de moderação
    - [] <@&11829044175622001>: Publicar as notas da reunião para quem faltou
    - [] <@&11829044175622001>: Planejar o evento da comunidade da semana que vem
    - [] <@&11829044175622001>: Agradecer aos membros que ajudaram nesta semana
webhooks:
  - name: Regras alteradas
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "**As regras mudaram.** {{change}}.\nLeia a nova versão em <#11829044175623002>.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Lumen Staff, channel: "11829044175623003", color: "#5865f2" }
    setup: |
      Abra as configurações de #anúncios e vá em *Integrações → Webhooks → Novo webhook*. Dê o nome “Lumen Staff” e clique em **Copiar URL do webhook**: é a URL acima. Mantenha-a em segredo, como uma senha.

      O body não diz o que mudou: quem diz é `{{change}}`, a partir da variável livre escrita na tarefa, `{{change=…}}`. Na próxima vez que as regras mudarem, o moderador escreve a mudança nova na tarefa com **Conteúdo**, e o mesmo webhook a anuncia. `allowed_mentions` com um `parse` vazio impede que a mensagem mencione alguém.
settings:
  - setting: Modo de notificação
    choice: Excluir todas as notificações exceto a última
    why: "#staff é onde a equipe conversa. Só a notificação mais recente fica sob a lista, para a conversa continuar legível."
  - setting: Rastreamento do histórico
    choice: Ativado
    why: "O tópico da lista guarda uma linha por ação, com quem a fez: a Ava lê a semana ali, não no canal."
  - setting: Manter o estado após a seleção
    choice: Ativado
    why: "A Ava escolhe @Moderadores uma vez e o atribui a várias tarefas seguidas: **Proprietário** continua azul depois de cada uma."
  - setting: Lembretes recorrentes
    choice: Recorrentes ativados
    premium: true
    why: "A reunião do staff é toda segunda: um lembrete que se repete, em vez de um novo a cada semana."
  - setting: Sincronizar permissões
    choice: Carregadas
    why: "Em *Configurações do servidor → Integrações*, só os cargos do staff podem usar o TTM. Um membro que vá parar em #staff por engano vê a lista só para leitura."
week:
  - at: 2026-12-07T09:00
    text: "A Ava escreve a lista da semana em #staff com `/criar-lista`, sem proprietários."
  - at: 2026-12-07T09:10
    text: "A Ava escolhe @Moderadores no menu sob **Proprietário** e depois as tarefas, uma após a outra. Com *Manter o estado após a seleção*, **Proprietário** continua azul entre elas, então cada tarefa recebe o cargo com um clique. Cada notificação menciona @Moderadores; com *Excluir todas as notificações exceto a última*, só a última fica."
  - at: 2026-12-07T10:30
    text: "A Ava passa “Acompanhar um moderador por um dia” ao Kai e à Zoe juntos: escolhe os dois no menu. O TTM cria o cargo **TTM1**, dá o cargo aos dois e o torna o proprietário. A notificação menciona o cargo, então os dois são avisados. Um proprietário de várias pessoas é um recurso [Premium](/premium/), desbloqueado para todos os servidores durante a beta."
    card: { kind: notice, type: assigned, by: "11829044175621001", task: "6" }
  - at: 2026-12-07T19:00
    text: "O lembrete da reunião chega. O proprietário é um cargo, então o lembrete é uma mensagem em #staff que menciona @Moderadores, como resposta à lista."
    card: { kind: reminder, task: "4" }
  - at: 2026-12-08T11:00
    text: "O Leo atualiza as regras e marca a tarefa. O webhook publica a mudança em #anúncios, com o texto da variável livre."
    card: { kind: webhook, webhook: Regras alteradas, task: "5", by: "11829044175621002" }
  - at: 2026-12-08T15:20
    text: "A Noa, uma ajudante, tenta marcar “Revisar as denúncias abertas”. A tarefa pertence a @Moderadores, então ela recebe uma recusa que só ela vê: *Só @Moderadores pode marcar ou desmarcar esta tarefa, ou quem gerencia as mensagens deste canal.* A lista não muda."
  - at: 2026-12-08T15:30
    text: "O Leo revisa as denúncias e marca a tarefa: qualquer membro do cargo pode."
  - at: 2026-12-09T18:00
    text: "O Kai e a Zoe passam o dia com o Leo. À noite, o Kai marca a tarefa deles: qualquer um dos dois pode, já que os dois têm o TTM1."
  - at: 2026-12-11T17:00
    text: "A Ava abre o tópico da lista. Ele tem uma linha para cada proprietário, marcação e mudança da semana, com quem a fez."
  - at: 2026-12-11T17:15
    text: "A Ava quer manter o TTM1 para os próximos testes. Em *Configurações do servidor → Cargos* ela o renomeia para “Ajudantes em teste”: a partir daí ele é um dos cargos do servidor, e o TTM nunca o exclui. Sem o nome novo, o TTM excluiria o cargo quando nenhuma lista o usasse mais."
fonte: 00ff5b6fd601
---

## Na próxima vez

Toda segunda, a Ava clica em **Reabrir tudo** <img class="inline-ic" src="/icons/reopen.png" alt="" /> e escolhe **Reabrir**: as tarefas recomeçam com os proprietários delas. Ninguém marca a reunião do staff, porque marcar uma tarefa interrompe o lembrete dela: ela fica na lista o mês inteiro, e o lembrete volta sozinho toda segunda. Uma lista cujos lembretes são únicos usaria **Nova data**, que os move para a semana nova de uma vez. Veja [Reabrir tudo](/docs/list-actions/#reopen-all).

## O que o TTM não faz aqui

O TTM não modera. Não tem banimentos, advertências, registros de casos nem tickets: um bot de moderação e um bot de tickets fazem isso. O TTM guarda o trabalho em volta disso, as tarefas que a sua equipe repete toda semana. Não controla turnos nem mede o quanto cada moderador é ativo.

## Perguntas

### Quem pode marcar uma tarefa que pertence a um cargo?

Qualquer membro do cargo e quem tem *Gerenciar mensagens* no canal. Todos os outros recebem uma recusa que só eles veem: veja [Quem pode marcar uma tarefa](/docs/core-concepts/#who-can-tick-a-task).

### Um moderador pode receber o lembrete por mensagem direta?

Pode: faça desse moderador o proprietário, em vez do cargo. Um lembrete chega a uma pessoa por mensagem direta e a um cargo por uma menção no canal. Veja [Como o lembrete chega](/docs/reminders/#how-the-reminder-arrives).

### O que acontece com o TTM1 se ninguém o renomear?

O TTM exclui um cargo que criou quando nenhuma lista o usa mais, conferindo a cada dez minutos. Renomeá-lo, dar uma permissão a ele ou mudar os membros dele o torna um dos cargos do seu servidor, e o TTM o deixa em paz. Veja [Os cargos que o TTM cria](/docs/owners-and-tags/#the-roles-ttm-creates).
