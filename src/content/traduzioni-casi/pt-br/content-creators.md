---
title: "Planeje seus vídeos com quem os faz"
seoTitle: "Bot de Discord para criadores de conteúdo: o fluxo dos seus vídeos"
name: "Criadores de conteúdo"
description: "Um vídeo por semana com um editor e um artista de thumbnails: um lembrete de prazo que acompanha o trabalho quando alguém está fora, o aviso aos moderadores antes da estreia e o vídeo novo anunciado por um webhook."
highlights: "Tarefas passadas para outra pessoa, um lembrete que acompanha o novo proprietário, uma revisão de duas pessoas, um link mailto, um webhook que anuncia o vídeo, Clonar lista para o próximo vídeo."
intro: |
  A Mia faz um vídeo por semana para o canal dela. O Leo edita, o Sam desenha as thumbnails e os moderadores do servidor cuidam do chat durante a estreia. O vídeo desta semana é sobre uma mesinha que ela construiu em um fim de semana. A lista fica em #produção, de segunda, 7, a domingo, 13 de dezembro de 2026, com a estreia no sábado às 18h.
order: 6
team:
  guild: Mia Makes
  zone: America/Toronto
  people:
    - { id: "11869044175621001", name: Mia, username: mia.makes, color: "#f0b232", about: "Criadora. Escreve a lista." }
    - { id: "11869044175621002", name: Leo, username: leo.edits, color: "#3ba55c", about: "Editor. Fora de terça a quinta." }
    - { id: "11869044175621003", name: Sam, username: sam.thumbs, color: "#5865f2", about: "Thumbnails. Edita também." }
  roles:
    - { id: "11869044175622001", name: Moderadores, about: "Quatro moderadores do servidor." }
    - { id: "11869044175622002", name: TTM1, about: "Criado pelo TTM para a revisão final, de propriedade do Leo e do Sam.", members: ["11869044175621002", "11869044175621003"], ttm: true }
  channels:
    - { id: "11869044175623001", name: produção, about: "A equipe e os moderadores. A lista fica aqui." }
    - { id: "11869044175623002", name: anúncios, about: "Onde os membros ficam sabendo dos vídeos novos." }
list:
  title: "Episódio 42: a mesinha"
  channel: "11869044175623001"
  at: 2026-12-11T20:00
  look: |
    Sexta à noite: o vídeo está pronto. O primeiro corte e a correção de cor agora são do Sam, com o lembrete do corte. “Revisão final” é do TTM1, o cargo que o TTM criou para o Leo e o Sam. O link do vídeo espera em `{{video=…}}`, para o webhook ler no sábado.
  text: |
    - [X] <@11869044175621001>: Escrever o [roteiro](https://docs.google.com/document/d/1tiny-desk-script/edit)
    - [X] <@11869044175621001>: Filmar a montagem, com as duas câmeras
    - [X] <@11869044175621001>: [Pedir ao patrocinador que aprove a leitura do anúncio](mailto:partners@example.com?subject=Episode%2042%20ad%20read)
    - [X] <t:1796922000> [0m,0m,0] <@11869044175621003>: Primeiro corte, cerca de 12 minutos
    - [X] <@11869044175621003>: Correção de cor e de som
    - [X] <@11869044175621003>: Thumbnail, três opções para escolher
    - [X] <@&11869044175622002>: Revisão final
    - [] <t:1797112800> [0m,0m,0] <@&11869044175622001>: Estreia às 18h: fixar o link e acompanhar o chat
    - [] {{wb=Vídeo novo}} <@11869044175621001>: Publicar o vídeo {{video=https://youtu.be/tinydesk42}}
    - [] <@11869044175621001>: Responder aos primeiros comentários
webhooks:
  - name: Vídeo novo
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "Vídeo novo: **Construí uma mesinha em um fim de semana**\n{{video}}", "allowed_mentions": {"parse": []}}
    postsAs: { name: Mia Makes, channel: "11869044175623002", color: "#f0b232" }
    setup: |
      Abra as configurações de #anúncios e vá em *Integrações → Webhooks → Novo webhook*. Dê o nome “Mia Makes”, coloque a imagem do canal e clique em **Copiar URL do webhook**: é a URL acima. Mantenha-a em segredo, como uma senha.

      O link vem da tarefa: `{{video}}` lê a variável livre `{{video=…}}`. A Mia escreve o link com **Conteúdo** assim que o YouTube o entrega, antes da estreia. Na semana que vem ela muda o título no body com `/config webhook ação:editar`, ou passa o título também para a tarefa, como `{{title=…}}`.
settings:
  - setting: Dicas
    choice: Desativadas
    why: "A equipe conhece os botões. Sem o Tutorial e a linha de ajuda, a lista fica mais curta."
  - setting: Notificações push legíveis
    choice: Ativado
    why: "O Sam lê os lembretes no celular. A notificação push mostra a tarefa, não um cartão vazio."
  - setting: Tarefas concluídas atenuadas
    choice: Ativado
    why: "Na sexta, a maior parte da lista já está pronta. As tarefas marcadas ficam esmaecidas e a estreia se destaca."
week:
  - at: 2026-12-07T10:00
    text: "A Mia usa `/criar-lista` em #produção e escreve as tarefas da semana. Depois dá a cada uma o proprietário com **Proprietário**: as notificações mencionam o Leo, o Sam e @Moderadores, e cada um sabe o que é seu. **Lembrete** define o prazo do corte e o aviso da estreia, e **Webhook** vincula “Publicar o vídeo” a Vídeo novo. O link do patrocinador abre um e-mail novo, com o assunto já escrito."
  - at: 2026-12-07T10:30
    text: "A Mia passa “Revisão final” ao Leo e ao Sam juntos: escolhe os dois no menu sob **Proprietário**. O TTM cria o cargo **TTM1** para eles e o torna o proprietário. Um proprietário de várias pessoas é um recurso [Premium](/premium/), desbloqueado para todos os servidores durante a beta."
  - at: 2026-12-08T09:00
    text: "O Leo está fora até quinta à noite. A Mia **passa** as duas tarefas dele para o Sam: escolhe o Sam no menu sob **Proprietário**, confirma e depois escolhe “Primeiro corte”. Faz o mesmo com a correção de cor. A notificação cita o Leo e menciona o Sam, então o Discord o avisa."
    card: { kind: notice, type: updated, by: "11869044175621001", from: "11869044175621002", task: "4" }
  - at: 2026-12-10T12:00
    text: "O prazo do primeiro corte chega ao Sam por mensagem direta. Ele não vai mais para o Leo: um lembrete acompanha o proprietário da tarefa."
    card: { kind: reminder, task: "4" }
  - at: 2026-12-10T16:30
    text: "O Sam termina o corte e o marca."
  - at: 2026-12-11T17:00
    text: "O Leo voltou. Ele e o Sam assistem ao vídeo juntos, e o Leo marca “Revisão final”: qualquer um dos dois pode, já que os dois têm o TTM1."
  - at: 2026-12-12T17:00
    text: "O lembrete da estreia menciona @Moderadores em #produção, como resposta à lista. Uma hora antes: a data do lembrete é 17h."
    card: { kind: reminder, task: "8" }
  - at: 2026-12-12T18:00
    text: "A estreia começa. A Mia marca “Publicar o vídeo”, e o webhook publica o link em #anúncios."
    card: { kind: webhook, webhook: Vídeo novo, task: "9", by: "11869044175621001" }
fonte: ef4a937f2aeb
---

## Na próxima vez

Depois deste vídeo, a Mia abre **Mais** <img class="inline-ic" src="/icons/other.png" alt="" /> e clica em **Clonar lista**: o mesmo canal, sem as marcações e sem os lembretes. Com **Atualização em bloco** ela muda o título, as tarefas e os links, e remove o `{{video=…}}` do vídeo antigo. Depois dá as datas novas com **Lembrete**. Veja [Clonar](/docs/list-actions/#clone).

O clone mantém o TTM1 como proprietário de “Revisão final”, então o cargo continua mesmo que a Mia exclua a lista antiga: o TTM só o exclui quando nenhuma lista o usa mais.

## O que o TTM não faz aqui

O TTM não envia, não agenda nem edita vídeos, e não lê as estatísticas do seu canal. Não guarda arquivos: o corte e as thumbnails ficam no seu drive na nuvem, e a lista aponta para eles. O TTM guarda o trabalho da semana, os prazos e as pessoas.

## Perguntas

### E se a Mia tivesse removido o Leo em vez de passar as tarefas dele para o Sam?

O lembrete teria ido embora com ele: um lembrete sem proprietário não chega a ninguém. Se ele ainda não disparou, o TTM pergunta antes, e você pode fechar a janela para manter tudo. Veja [Proprietário](/docs/channel-tasks/#owner).

### Por que o Sam recebeu uma menção e a Mia não?

Uma notificação menciona quem recebe uma tarefa de outra pessoa. O Sam recebeu da Mia as tarefas do Leo. Quem age nunca é mencionado: já sabe. Veja [Proprietários e tags](/docs/owners-and-tags/).

### O lembrete da estreia pode vir mais cedo, ou duas vezes?

O lembrete vem na data que você der, então uma hora antes significa 17h. Para avisar os moderadores duas vezes, uma hora antes e dez minutos antes, faça-o se repetir: a partir das 17h, a cada 50 minutos, duas vezes no total. Lembretes recorrentes são um recurso [Premium](/premium/), desbloqueado para todos os servidores durante a beta. Veja [Lembretes repetidos](/docs/reminders/#repeating-reminders).
