---
title: "Configure um servidor do Discord sem esquecer nenhum passo"
seoTitle: "Checklist de configuração de servidor do Discord, passo a passo"
name: "Checklist de configuração do servidor"
description: "Duas pessoas abrem um servidor de comunidade em uma semana: uma lista para cargos, regras, segurança e boas-vindas, um lembrete antes da abertura e um anúncio que se publica sozinho."
highlights: "Proprietários que você pega ou passa, tags de canal, um lembrete por mensagem direta, um webhook que publica o anúncio de abertura, a Activity na noite da abertura."
intro: |
  A Ava vai abrir o **Pixel Harbor**, um servidor de comunidade para pixel artists, no sábado à noite. O Leo, um amigo que modera outro servidor, está ajudando. Eles têm uma semana, de segunda, 7, a domingo, 13 de dezembro de 2026, e uma lista em um canal privado que só os dois enxergam.
order: 1
team:
  guild: Pixel Harbor
  zone: Europe/Berlin
  people:
    - { id: "11819044175621001", name: Ava, username: ava.pixels, color: "#eb459e", about: "Dona do servidor. Cria a lista." }
    - { id: "11819044175621002", name: Leo, username: leo.mod, color: "#3ba55c", about: "Moderador. Novo no TTM." }
  roles:
    - { id: "11819044175622001", name: Admins, about: "Ava e Leo: as tarefas que qualquer um dos dois pode fazer.", members: ["11819044175621001", "11819044175621002"] }
  channels:
    - { id: "11819044175623001", name: configuração, about: "Privado: só a Ava e o Leo o veem. A lista fica aqui." }
    - { id: "11819044175623002", name: regras, about: "As regras do servidor." }
    - { id: "11819044175623003", name: boas-vindas, about: "Onde os membros novos chegam." }
    - { id: "11819044175623004", name: anúncios, about: "Onde a abertura é anunciada." }
list:
  title: Abertura do Pixel Harbor
  channel: "11819044175623001"
  at: 2026-12-11T12:00
  tips: true
  look: |
    As tarefas marcadas ficam menores e cinza, então o que resta se destaca. Toda tarefa tem um proprietário: o Leo nas que ele pegou ou recebeu, a Ava nas dela, @Admins nas que qualquer um dos dois pode fazer. “Anunciar a abertura” tem o lembrete dela, e “Abrir as portas” mostra o webhook, que só o TTM vê.
  text: |
    - [X] <@11819044175621001>: Ativar a Comunidade em Configurações do servidor, com o [guia do Discord](https://support.discord.com/hc/en-us/articles/360047132851)
    - [X] <@&11819044175622001>: Escrever as regras em <#11819044175623002>
    - [X] <@11819044175621002>: Configurar o AutoMod: spam, links e filtro de palavras
    - [] <@11819044175621002>: Escrever a mensagem de boas-vindas para <#11819044175623003>
    - [X] <@&11819044175622001>: Criar os cargos
     - [X] Membro, Artista, Moderador
     - [X] Cores e ordem na lista de cargos
    - [] <@&11819044175622001>: Definir as permissões de cada categoria
    - [] <@&11819044175622001>: Testar o servidor com uma conta que só tenha Membro
    - [] <@11819044175621002>: Fixar um guia para futuros moderadores: :owner: e depois uma tarefa para pegá-la, :reminder: para um aviso no dia
    - [] <t:1797008400> [0m,0m,0] <@11819044175621001>: Anunciar a abertura nas redes sociais e nos servidores parceiros
    - [] {{wb=Post de abertura}} <@11819044175621001>: Abrir as portas
webhooks:
  - name: Post de abertura
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "**{{guild}} está aberto!**\nComece por <#11819044175623002> e depois diga oi em <#11819044175623003>. Mal podemos esperar para ver a sua arte.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Pixel Harbor, channel: "11819044175623004", color: "#f0b232" }
    setup: |
      Abra as configurações de #anúncios e vá em *Integrações → Webhooks → Novo webhook*. Dê um nome, coloque o ícone do servidor e clique em **Copiar URL do webhook**: é a URL acima. A URL é uma senha do canal: quem a tem pode publicar lá, então cole-a só em `/config webhook`.

      O body é a mensagem, escrita e conferida dias antes da abertura. `allowed_mentions` com um `parse` vazio quer dizer que a mensagem não menciona ninguém, mesmo que alguém acrescente uma menção depois.
settings:
  - setting: Dicas
    choice: Ativadas, depois desativadas
    why: "O Leo é novo no TTM: o Tutorial e a linha de ajuda sob a lista mostram a ele onde clicar. A Ava as desativa no sábado à noite, quando o servidor já estiver aberto e ele conhecer os botões."
  - setting: Sincronizar permissões
    choice: Carregadas
    why: "Em *Configurações do servidor → Integrações*, só @Admins podem usar o TTM. Depois da sincronização, um moderador acrescentado depois vê a lista só para leitura até a Ava dar o cargo a ele."
week:
  - at: 2026-12-07T10:00
    text: "A Ava usa `/criar-lista` em #configuração e escreve só as tarefas. Depois define os proprietários com **Proprietário**: @Admins para as tarefas que qualquer um dos dois pode fazer, o Leo para o guia, ela mesma para a Comunidade e “Abrir as portas”. Com **Webhook** ela vincula “Abrir as portas” a Post de abertura."
  - at: 2026-12-07T10:20
    text: "O Leo **pega** “Configurar o AutoMod”: clica em **Proprietário** até ficar azul e depois escolhe a tarefa sem escolher ninguém. A tarefa passa a ser dele, e o canal diz quem a pegou."
    card: { kind: notice, type: claimed, by: "11819044175621002", task: "3" }
  - at: 2026-12-07T19:40
    text: "A Ava ativa a Comunidade e escreve as regras com o Leo. Ela cola o link de #regras, copiado com *Copiar link* no canal: o TTM o transforma em uma tag de canal."
  - at: 2026-12-08T09:00
    text: "A Ava **passa** “Escrever a mensagem de boas-vindas” para o Leo: escolhe-o no menu sob **Proprietário** e depois escolhe a tarefa. A notificação o menciona, então o Discord o avisa."
    card: { kind: notice, type: assigned, by: "11819044175621001", task: "4" }
  - at: 2026-12-09T21:00
    text: "A Ava marca o grupo “Criar os cargos”. As duas subtarefas dele são marcadas junto."
  - at: 2026-12-10T22:10
    text: "A Ava coloca um lembrete em “Anunciar a abertura”, para sexta às 18h. A tarefa não tinha proprietário, e um lembrete vai para o proprietário: ao salvá-lo, a Ava passa a ser a proprietária."
  - at: 2026-12-11T18:00
    text: "O lembrete chega à Ava por mensagem direta. O botão sob ele abre a lista."
    card: { kind: reminder, task: "9" }
  - at: 2026-12-12T17:30
    text: "A Ava abre a lista com **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, o primeiro botão sob ela. O Leo entra com **Entrar na Activity**. Eles testam o servidor juntos, marcando as últimas tarefas pelo caminho."
  - at: 2026-12-12T18:00
    text: "A Ava marca “Abrir as portas”. O webhook publica o anúncio em #anúncios, com o nome e o ícone do webhook."
    card: { kind: webhook, webhook: Post de abertura, task: "10", by: "11819044175621001" }
  - at: 2026-12-12T18:40
    text: "A Ava e o Leo saem da Activity. A lista volta para #configuração com um resumo do que eles mudaram, e o tópico da lista registra cada mudança com quem a fez. A Ava desativa as **Dicas** em `/config app`."
fonte: 46fb8aa39338
---

## Na próxima vez

A Ava guarda a lista para o próximo servidor que abrir: em **Mais** <img class="inline-ic" src="/icons/other.png" alt="" />, **Download** <img class="inline-ic" src="/icons/download.png" alt="" /> entrega a lista como um arquivo `.txt`, escrito como o texto acima. No servidor novo, ela usa `/criar-lista` e anexa o arquivo.

Os cargos e os canais do Pixel Harbor não existem lá. O TTM confere cada menção antes de criar qualquer coisa e lista todas as que o servidor novo não tem: a Ava troca essas menções no arquivo pelas novas e importa de novo. O arquivo também guarda as marcações, e um lembrete com a data já passada volta sem disparar. Então ela troca `[X]` por `[]` e dá ao lembrete uma data nova com **Lembrete**. Veja [Reutilize uma lista em qualquer lugar](/docs/tips/#reuse-a-list-anywhere).

## O que o TTM não faz aqui

O TTM acompanha o trabalho, e você faz a configuração. Ele não cria os seus canais, não muda permissões nem configura o AutoMod: isso fica em *Configurações do servidor*. Também não copia um servidor. Para um servidor com os mesmos canais e cargos, o Discord tem os próprios modelos de servidor, em *Configurações do servidor*.

## Perguntas

### Preciso escrever os códigos?

Não. Os botões os escrevem: **Proprietário** para o proprietário, **Tag** para as tags, **Lembrete** para o lembrete, **Webhook** para o webhook. Você escreve só as tarefas. Os códigos importam quando você copia uma lista, ou quando prefere digitar a clicar: veja [Editando uma lista à mão](/docs/writing-a-list/).

### Por que o Leo recebeu uma menção e a Ava não?

Uma notificação menciona quem *recebe* uma tarefa de outra pessoa, para que o Discord o avise. O Leo recebeu “Escrever a mensagem de boas-vindas” da Ava. Quando ele mesmo pegou “Configurar o AutoMod”, ninguém foi mencionado: ele já sabia. Veja [Proprietários e tags](/docs/owners-and-tags/).

### Os membros vão ver a lista?

Quem pode ler o canal dela a vê. Em um canal privado, só as pessoas com acesso. Para deixar as listas só para leitura para alguns deles, veja [Sincronizar permissões](/docs/configuration/#sync-permissions).
