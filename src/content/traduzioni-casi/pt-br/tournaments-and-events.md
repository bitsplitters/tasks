---
title: "Organize um torneio da comunidade sem planilha"
seoTitle: "Bot de Discord para torneios e eventos da comunidade"
name: "Torneios e eventos"
description: "Uma copa de sábado com oito times: árbitros como proprietários, um lembrete que continua chamando os times que faltam, o aviso aos narradores antes da transmissão e o vencedor anunciado por um webhook."
highlights: "Proprietários em um grupo, o cargo TTM dos narradores, um lembrete a cada 15 minutos, marcações ao vivo na Activity, o vencedor em uma variável livre, Clonar lista para a semana que vem."
intro: |
  A Mia organiza a **Saturday Cup #12** no servidor de games dela: oito times, quatro árbitros, dois narradores na transmissão. Os times jogam de vários países. O staff tem uma lista em #staff-do-torneio para a semana de segunda, 7, a domingo, 13 de dezembro de 2026, e no sábado eles a marcam ao vivo, juntos.
order: 3
team:
  guild: Fragline
  zone: Europe/London
  people:
    - { id: "11839044175621001", name: Mia, username: mia.fragline, color: "#f0b232", about: "Organizadora. Tem Gerenciar mensagens no canal do staff." }
    - { id: "11839044175621002", name: Leo, username: leo.casts, color: "#3ba55c", about: "Narrador." }
    - { id: "11839044175621003", name: Sam, username: sam.casts, color: "#5865f2", about: "Narrador." }
    - { id: "11839044175621004", name: Noa, username: noa.ref, color: "#e74c3c", about: "Árbitra." }
    - { id: "11839044175621005", name: Kai, username: kai.ref, color: "#1abc9c", about: "Árbitro." }
    - { id: "11839044175621006", name: Zoe, username: zoe.ref, color: "#9b59b6", about: "Árbitra. Atrasada no sábado." }
  roles:
    - { id: "11839044175622001", name: Árbitros, about: "Noa, Kai, Zoe e mais um." }
    - { id: "11839044175622002", name: TTM1, about: "Criado pelo TTM para a transmissão, de propriedade dos dois narradores.", members: ["11839044175621002", "11839044175621003"], ttm: true }
  channels:
    - { id: "11839044175623001", name: staff-do-torneio, about: "O canal do staff. A lista fica aqui." }
    - { id: "11839044175623002", name: anúncios, about: "Onde os jogadores leem os resultados." }
    - { id: "11839044175623003", name: Palco principal, about: "O canal de voz da transmissão.", voice: true }
list:
  title: "Saturday Cup #12"
  channel: "11839044175623001"
  at: 2026-12-12T19:10
  look: |
    Sábado à noite, depois da final. “Rodada 1” não tem proprietário: cada partida pertence ao seu árbitro, então o grupo foi marcado sozinho, com a última partida. “Chamar os times que faltam” mostra `↻15m ×3`: três avisos, com quinze minutos de intervalo. A variável livre `{{winner=Team Nova}}` fica no texto, onde o webhook a leu.
  text: |
    - [X] <@11839044175621001>: Abrir as inscrições, com o [chaveamento no Challonge](https://challonge.com/saturday_cup_12)
    - [X] <@&11839044175622001>: Conferir os elencos dos oito times
    - [X] <t:1797080400> [0m,0m,0] <@&11839044175622001>: Abrir o check-in, das 13h às 14h
    - [X] <t:1797082200> [0m,15m,2] <@&11839044175622001>: Chamar os times que faltam
    - [X] <t:1797085800> [0m,0m,0] <@&11839044175622002>: Entrar ao vivo na call do Palco principal às 15h
    - [X] Rodada 1, melhor de três
     - [X] <@11839044175621004>: Partida A: Team Nova x Pixel Pirates
     - [X] <@11839044175621005>: Partida B: Iron Owls x Blue Shift
     - [X] <@11839044175621006>: Partida C: Night Foxes x Glitch Gang
     - [X] <@11839044175621005>: Partida D: Red Comets x Lumen Five
    - [X] <@&11839044175622001>: Arbitrar as semifinais e a final
    - [X] {{wb=Resultados}} <@11839044175621001>: Publicar os resultados {{winner=Team Nova}}
    - [] <@&11839044175622002>: Enviar o replay da final
    - [] <@11839044175621001>: Agradecer aos times e enviar o formulário de feedback
    - [] <@11839044175621001>: Abrir as inscrições da Saturday Cup #13
webhooks:
  - name: Resultados
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "🏆 **{{winner}}** venceu {{list}}! GG para os oito times. O chaveamento continua no Challonge.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Fragline Cups, channel: "11839044175623002", color: "#e67e22" }
    setup: |
      Abra as configurações de #anúncios e vá em *Integrações → Webhooks → Novo webhook*. Dê o nome “Fragline Cups” e clique em **Copiar URL do webhook**: é a URL acima. Mantenha-a em segredo, como uma senha.

      Dois tokens escrevem a mensagem. `{{winner}}` vem da variável livre na tarefa, `{{winner=…}}`, que a Mia escreve quando a final termina. `{{list}}` é o título da lista: a lista da semana que vem se chama Saturday Cup #13, e o mesmo webhook nomeia a copa nova.
settings:
  - setting: Fuso horário
    choice: Europe/London
    why: "A copa roda no horário de Londres. O Discord mostra cada data da lista no fuso do próprio leitor, então um árbitro em Toronto lê as horas dele. Quando um árbitro salva um lembrete, o TTM propõe o fuso do idioma do Discord dele até ele escolher um."
  - setting: Notificações push legíveis
    choice: Ativado
    why: "Os árbitros leem os lembretes no celular. A notificação push mostra a tarefa, não um cartão vazio."
  - setting: Mencionar os proprietários nas listas novas
    choice: Ativado
    why: "A lista da semana que vem menciona @Árbitros e os narradores assim que é publicada: eles sabem que a copa vem aí."
  - setting: Lembretes recorrentes
    choice: Recorrentes ativados
    premium: true
    why: "“Chamar os times que faltam” avisa a cada 15 minutos, até três vezes."
week:
  - at: 2026-12-07T19:00
    text: "A Mia usa `/criar-lista` em #staff-do-torneio e escreve as tarefas de sábado, com @Árbitros como proprietário das tarefas que qualquer árbitro pode fazer, escrito como `@Árbitros:` ([Editando uma lista à mão](/docs/writing-a-list/#owners-the-mention-with-a-colon) mostra como). Ela cola o link do chaveamento do Challonge. A primeira notificação menciona @Árbitros, então todos os árbitros são avisados."
  - at: 2026-12-08T20:30
    text: "A Mia passa “Entrar ao vivo” ao Leo e ao Sam juntos: escolhe os dois no menu sob **Proprietário**. O TTM cria o cargo **TTM1** para os dois e o torna o proprietário. Um proprietário de várias pessoas é um recurso [Premium](/premium/), desbloqueado para todos os servidores durante a beta."
  - at: 2026-12-09T21:00
    text: "A Mia acrescenta os lembretes com **Lembrete**: o check-in às 13h para @Árbitros, “Chamar os times que faltam” às 13h30, a cada 15 minutos, 3 vezes no total, e a transmissão às 14h30 para o TTM1."
  - at: 2026-12-12T13:00
    text: "O lembrete do check-in menciona @Árbitros em #staff-do-torneio. O Kai abre o check-in e marca a tarefa."
  - at: 2026-12-12T13:30
    text: "“Chamar os times que faltam” avisa @Árbitros. Faltam dois times, e a Noa escreve aos capitães deles. Às 13h45 o aviso vem de novo."
  - at: 2026-12-12T13:52
    text: "O último time faz o check-in, e a Noa marca “Chamar os times que faltam”. Marcar uma tarefa interrompe o lembrete dela: o aviso das 14h nunca chega."
  - at: 2026-12-12T14:30
    text: "O lembrete da transmissão menciona o TTM1, então o Leo e o Sam o recebem."
    card: { kind: reminder, task: "5" }
  - at: 2026-12-12T14:40
    text: "A Mia abre a lista com **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, o primeiro botão sob ela. Os árbitros entram com **Entrar na Activity**, e cada um marca a sua partida quando ela termina. A Zoe está atrasada: pelo painel de “Partida C”, a Mia passa a partida para ela."
  - at: 2026-12-12T15:35
    text: "A Noa termina a Partida A e toca na caixa de toda a “Rodada 1”. Um balão diz que não: marcar o grupo também marcaria as partidas do Kai e da Zoe. A Mia poderia, com *Gerenciar mensagens* no canal. Ela espera: quando o Kai marcar a Partida D, a última, o grupo é marcado sozinho."
  - at: 2026-12-12T18:45
    text: "O Team Nova vence a final. A Mia escreve `{{winner=Team Nova}}` em “Publicar os resultados” com **Conteúdo** e depois marca a tarefa. O webhook publica o vencedor em #anúncios."
    card: { kind: webhook, webhook: Resultados, task: "8", by: "11839044175621001" }
  - at: 2026-12-12T19:05
    text: "O último árbitro sai da Activity. A lista volta para #staff-do-torneio com um resumo, uma linha por mudança com quem a fez. O resumo menciona a Zoe, que recebeu a Partida C dentro da Activity: as menções de uma sessão chegam com ela."
fonte: b260b9b17faa
---

## Na próxima vez

No domingo, a Mia abre **Mais** <img class="inline-ic" src="/icons/other.png" alt="" /> e clica em **Clonar lista**: o mesmo canal, sem as marcações e sem os lembretes. Com **Atualização em bloco** ela muda o título para Saturday Cup #13, o link do chaveamento e as partidas, e remove `{{winner=Team Nova}}`. Depois dá as datas do sábado novo com **Lembrete**. O clone menciona @Árbitros e o TTM1 na primeira notificação. Veja [Clonar](/docs/list-actions/#clone).

A copa da semana passada fica como registro. Para liberar a vaga dela, a Mia pode **Selar lista**, também em **Mais**: a mensagem fica, sem botões.

## O que o TTM não faz aqui

O TTM não gerencia chaveamentos, não guarda placares nem faz check-in de times: o Challonge e o start.gg fazem isso. Também não transmite. O TTM guarda o trabalho do staff em um só lugar, avisa as pessoas certas no minuto certo e anuncia o resultado que você escreve.

## Perguntas

### Por que a Noa não pôde marcar a Rodada 1?

Um grupo leva as subtarefas junto. Marcá-lo teria marcado as partidas do Kai e da Zoe, e só os proprietários delas podem fazer isso, ou quem tem *Gerenciar mensagens* no canal. Veja [Quem pode marcar uma tarefa](/docs/core-concepts/#who-can-tick-a-task).

### E se ninguém marcar “Chamar os times que faltam”?

Ela avisa três vezes no total, às 13h30, 13h45 e 14h, e depois para. O selo `↻15m ×3` diz isso. Veja [Lembretes repetidos](/docs/reminders/#repeating-reminders).

### Os narradores recebem o lembrete da transmissão por mensagem direta?

Não. O TTM1 é um cargo, e um lembrete para um cargo é uma mensagem no canal da lista que o menciona, então o Discord avisa todos do cargo. Passe a tarefa a um dos narradores para enviá-la por mensagem direta. Veja [Como o lembrete chega](/docs/reminders/#how-the-reminder-arrives).
