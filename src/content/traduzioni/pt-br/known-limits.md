---
title: "Limites conhecidos"
description: "Os tetos de listas, tarefas, lembretes e mais: a maioria vem do próprio Discord, e como trabalhar dentro deles."
fonte: fad07d75572a
---

O Team Tasks Manager funciona inteiramente dentro do Discord, então a maioria dos limites abaixo não é escolha do TTM. Eles vêm do próprio Discord. Por exemplo: o tamanho máximo de uma mensagem, quantos menus cabem em uma mensagem, até quanto tempo atrás dá para excluir mensagens em bloco. Quando um limite é do Discord, nós dizemos.

## Listas e tarefas

| Limite | Valor | Por quê |
| :--- | :--- | :--- |
| Listas em uso por servidor | **3** no plano Free | Veja [Como funcionam as três vagas](/docs/premium/#how-the-three-places-work). |
| Caracteres por lista | **4000** | A lista inteira é editada dentro de um único campo do Discord, e o Discord limita esse campo a 4000 caracteres. A contagem inclui *tudo o que aparece*: o texto das tarefas, as caixas, o horário de um lembrete e uma quebra de linha por linha, não só o que você digita. O TTM mantém uma pequena margem de segurança abaixo do limite máximo. |
| Itens por lista | **50** (tarefas + subtarefas) | O Discord permite 5 linhas de componentes por mensagem e até 25 opções por menu suspenso. O TTM reserva linhas para os botões de ação, e isso deixa espaço para 50 itens selecionáveis no total, subtarefas incluídas. Seu plano pode parar antes: veja [O que o Premium desbloqueia](/docs/premium/). |
| Título da lista | **90** caracteres | As janelas de criar, editar e clonar não deixam você digitar mais. O título também dá nome ao menu da lista e ao tópico do histórico dela, que o Discord mantém curtos. |
| Arquivo importado | `.txt`, até **64 KB** | O `/criar-lista` importa só o arquivo gerado por **Download**. O que mais ele verifica: veja [`/criar-lista`](/docs/commands/#create-list). |

<div class="callout"><div class="callout-t">Chegou a um teto?</div>Divida o trabalho em várias listas. Duas listas focadas são mais fáceis de ler do que uma no limite, e cada uma tem os próprios lembretes, proprietários e tags.</div>

**O Download sempre entrega um arquivo.** Uma mensagem normal do Discord é limitada a 2000 caracteres. Por isso o **Download**, no painel **Mais** <img class="inline-ic" src="/icons/other.png" alt="" /> sob a lista no canal, nunca publica a lista como texto. Ele envia um arquivo `.txt` só para você, em uma mensagem que só você vê. É o mesmo arquivo que o `/criar-lista` pode importar de volta.

**Excluir a mensagem não é o mesmo que excluir a lista.** A lista mantém a vaga dela, e os lembretes continuam chegando: veja [O que acontece com a quarta lista](/docs/premium/#what-happens-to-a-fourth-list).

## Lembretes

| Limite | Valor | Por quê |
| :--- | :--- | :--- |
| Lembretes aguardando ao mesmo tempo | **10** no plano Free | Veja [O que o Premium desbloqueia](/docs/premium/). |
| Repetições por lembrete | **até 50** no Premium, nenhuma no Free | Lembretes recorrentes são um recurso Premium: no plano Free todo lembrete é um evento único. No Premium um lembrete pode chegar no máximo 50 vezes no total, a primeira incluída; escolha **1 vez** para um lembrete único. No texto de uma lista, em **Atualização em bloco** ou **Editar a lista**, o trio conta as repetições depois da primeira: no máximo 49. |
| Com que antecedência um lembrete pode disparar | **5 minutos** a partir de agora | A data de início precisa estar pelo menos cinco minutos no futuro, para que o agendador tenha tempo de pegá-lo. |
| Quão pontual é um lembrete | em cerca de **10 segundos** | Lembretes que vencem juntos são distribuídos em até dez segundos, para ficar dentro dos limites de taxa do Discord. O lembrete ainda chega no minuto certo. |

As repetições só são oferecidas em um plano que inclui lembretes recorrentes, e só quando **Lembretes recorrentes** está ativado em [/config app](/docs/configuration/#recurring-reminders). Por padrão, todo lembrete é um evento único. Os lembretes recorrentes que você já tem continuam disparando de qualquer forma: veja [Lembretes repetidos](/docs/reminders/#repeating-reminders).

### Lembretes por mensagem direta

O lembrete de uma pessoa chega por mensagem direta, então depende das configurações de mensagens diretas do proprietário. Se o proprietário não aceita mensagens diretas de membros do servidor, o Discord recusa a mensagem, e esse lembrete não chega. O mesmo acontece se o proprietário não compartilha mais nenhum servidor com o bot.

Para aceitar mensagens diretas de membros de um servidor, clique no nome do servidor e depois em *Configurações de privacidade*.

Depois de uma mensagem recusada, o TTM se lembra disso e não tenta de novo com essa pessoa por **6 horas**. Passado esse tempo, ele tenta outra vez, e a primeira mensagem direta que passar encerra a pausa.

### Lembretes para um cargo

Quando o proprietário de uma tarefa é um cargo, o lembrete é uma mensagem no canal da lista que menciona o cargo. O Discord transforma a menção em notificação só em um destes casos:

- o cargo permite que qualquer pessoa o mencione: em *Configurações do servidor → Cargos*, o cargo pode ser mencionado com @ por qualquer pessoa;
- o bot tem a permissão *Mencionar @everyone, @here e todos os cargos* no canal da lista. O link de convite a concede.

Caso contrário, a mensagem aparece no canal e ninguém recebe notificação. O TTM avisa você quando você define um lembrete assim. Ele também avisa quando você torna um cargo assim o proprietário de uma tarefa com lembrete.

- **@everyone como proprietário**: só conta a permissão do bot.
- **Um cargo que o TTM cria** para vários proprietários nasce mencionável. Os lembretes dele o notificam mesmo sem a permissão, a menos que alguém desative essa configuração.
- **Um cargo excluído** não recebe lembrete nenhum. O TTM avisa você, e a solução é escolher outro proprietário.

Em todos os casos, só são notificados os membros que podem ver o canal da lista.

## Proprietários e tags

Cada tarefa tem **um proprietário**: uma pessoa ou um cargo. No Premium, também pode ter até 25 pessoas, que compartilham um cargo que o TTM cria para elas. 25 é o máximo do menu de proprietários. Uma tarefa pode ter **até 25 tags**, os usuários ou cargos a avisar: 25 é o máximo do Discord para um menu.

**Os cargos que o TTM cria contam nos 250 cargos por servidor do Discord.** Com 250 cargos, o TTM não consegue criar um novo e avisa. Quando o TTM exclui os cargos dele: veja [Os cargos que o TTM cria](/docs/owners-and-tags/#the-roles-ttm-creates).

**O TTM vê quantos membros um cargo tem, não quem são.** Se você trocar um membro de um cargo criado pelo TTM por outra pessoa, o TTM continua mostrando as pessoas a quem deu o cargo: veja [Os cargos que o TTM cria](/docs/owners-and-tags/#the-roles-ttm-creates).

## Webhooks

| Limite | Valor |
| :--- | :--- |
| Webhooks por servidor | **25** no Premium, nenhum novo no plano Free. O seletor é um menu suspenso do Discord, e 25 opções é o máximo dele. |
| Nome do webhook | até **96** caracteres \* |
| URL do webhook | até **2000** caracteres |

\* O limite do próprio Discord é 100, mas o nome viaja dentro do identificador do campo do formulário
junto com um marcador curto, e esses caracteres também contam: o TTM verifica 96 e avisa se você passar.
A mensagem de erro cita o mesmo número que você lê aqui.

## A timeline de atividades

Quando a timeline está ativada, o TTM publica cada ação em um tópico ao lado da lista, por meio de um webhook do Discord. O Discord permite **15 webhooks por canal**, então o TTM cria **um webhook por canal** e o reutiliza para todas as listas desse canal. O nome e a imagem que você vê em cada mensagem são definidos por mensagem, então nada muda visualmente.

Se um canal já atingiu os 15 do Discord (por causa de outros bots ou integrações), a timeline de uma lista nova não consegue começar. Libere um em **Configurações do canal → Integrações → Webhooks**.

## Canais de voz

As listas funcionam também no chat de um canal de voz, com uma diferença: lá elas não têm a [timeline de atividades](#the-activity-timeline). A timeline é um tópico ao lado da lista, e o Discord não permite tópicos em canais de voz. Todo o resto funciona como em um canal de texto: os botões, as notificações, os lembretes, a [Activity](/docs/activity/), **Clonar lista**, **Download**, **Selar lista** e **Excluir lista**.

Quando a timeline está ativada em [`/config app`](/docs/configuration/#history-tracking), quem cria uma lista em um canal de voz recebe uma mensagem curta sobre isso, visível só para essa pessoa; a lista de prática do Tutorial não tem essa mensagem. Se você precisa da timeline, crie a lista em um canal de texto, ou copie-a para lá com **Clonar lista**.

Em um canal de voz o TTM não precisa de *Criar tópicos públicos* nem de *Gerenciar webhooks*, que só servem à timeline. Em vez disso, ele precisa de *Conectar*: sem ela, o TTM não consegue escrever no chat do canal de voz. O Discord dá *Conectar* a todos por padrão; se o seu servidor a retira em um canal de voz, conceda-a ao TTM lá, ou o `/criar-lista` avisa que ela está faltando.

## Notificações

Quando o TTM organiza as próprias mensagens de notificação, o Discord só permite excluir em bloco as mensagens dos **últimos 14 dias**. As notificações mais antigas podem ficar no canal: você pode removê-las manualmente.

---

Estes números refletem a versão atual do bot. Qualquer mudança será anotada nas [Notas de versão](/docs/release-notes/).
