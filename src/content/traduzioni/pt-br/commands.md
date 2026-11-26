---
title: "Referência de comandos"
description: "Todos os slash commands em um só lugar, com a página que explica cada um — a maior parte do TTM vive em botões, não em comandos."
fonte: 103a298bf4e4
---

O TTM mantém os comandos no mínimo: depois que uma lista existe, você faz tudo com botões e menus. Para executar um comando, digite `/` na caixa de mensagem e escolha-o. Você também pode abrir o **Iniciador de apps** na barra de mensagens e escolher **Team Tasks Manager** em *Apps neste servidor*.

Se o seu Discord está em outro idioma, alguns nomes são traduzidos: veja [Nomes dos comandos no seu idioma](#command-names-in-your-language) no fim.

| Comando | Para que serve | Onde é explicado |
| :--- | :--- | :--- |
| `/criar-lista` | Criar uma lista, ou reconstruir uma a partir de um arquivo | [Crie sua primeira lista](/docs/getting-started/#2-create-your-first-list); o arquivo, [abaixo](#create-list) |
| `/config` | Os três comandos de quem cuida do TTM no servidor | [/config](/docs/config/) |
| `/config app` | As configurações do servidor: notificações, histórico, dicas, lembretes, fuso horário, permissões | [/config app](/docs/configuration/) |
| `/config lists` | Todas as listas do servidor: regenerar, selar ou excluir várias de uma vez | [/config lists](/docs/config-lists/) |
| `/config webhook` | Criar, ver, editar ou excluir um webhook | [/config webhook](/docs/config-webhook/) |
| `/my timezone` | Seu fuso horário, o mesmo em todos os servidores | [/my timezone](/docs/my-timezone/) |
| `/beta` | O que a beta significa para o seu servidor | [Como a beta funciona](/docs/beta/) |
| `/help` | Seu ponto de partida dentro do Discord | [Abaixo](#help) |
| `/invite` | Um cartão para adicionar o TTM a outro servidor | [Abaixo](#invite) |
| `/news` | As últimas novidades do TTM | [Abaixo](#news) |

## `/criar-lista`

Para criar uma lista do zero, veja [Crie sua primeira lista](/docs/getting-started/#2-create-your-first-list). Esta seção trata da única opção do comando, **`arquivo`**, que você pode deixar de fora.

Anexe o arquivo `.txt` que o **Download** de uma lista entrega. Ele leva o nome da lista e pode vir de outro servidor. O TTM então reconstrói a lista a partir do arquivo, em vez de abrir o formulário de criação.

A lista volta com as tarefas e o estado delas, proprietários, tags, lembretes e webhooks. Como qualquer lista nova, ela precisa de uma vaga livre no seu plano (veja [Como funcionam as três vagas](/docs/premium/#how-the-three-places-work)).

O TTM recusa um arquivo na hora se ele não for um `.txt` ou for maior que **64 KB**. Caso contrário, o TTM lê o arquivo. Se algo não se encaixar, o TTM não cria nada e lista todos os problemas em uma mensagem, cada um com a linha ou a tarefa correspondente:

- **O formato** — o arquivo não é texto UTF-8, ou não começa com `#!ttm/1`. O título está faltando.

  Uma linha não é uma tarefa, ou um lembrete está escrito em meses (`M`) ou escrito errado. Um webhook está vinculado a uma tarefa sem texto, a lista começa com uma subtarefa, ou não há tarefas.
- **O tamanho** — a lista é longa demais para uma mensagem, ou tem mais tarefas do que uma lista comporta ou do que o seu plano permite.
- **Os lembretes** — um lembrete não tem proprietário, não tem data e tem distância zero, ou se repete mais vezes do que o seu plano permite. Um lembrete recorrente é recusado onde não é possível criar novos (veja [Lembretes](/docs/reminders/#repeating-reminders)). Lembretes demais estariam aguardando ao mesmo tempo.
- **Este servidor** — um cargo, um canal ou um webhook do arquivo não existe aqui, ou um usuário do arquivo não é membro.

Lembretes cujos avisos estão todos no passado não são um problema: eles voltam nas tarefas deles e não enviam mais nada.

→ Veja [Reutilize uma lista em qualquer lugar](/docs/tips/#reuse-a-list-anywhere).

## `/help`

Este comando é o seu ponto de partida dentro do Discord. Ele abre um painel com cinco botões:

- **Início** <img class="inline-ic" src="/icons/home.png" alt="" /> — uma visão geral do app.
- **Começar** <img class="inline-ic" src="/icons/start.png" alt="" /> — um início rápido, com um link para esta documentação.
- **Configuração** <img class="inline-ic" src="/icons/config.png" alt="" /> — para que servem `/config app`, `/config lists` e `/config webhook`.
- **Premium** <img class="inline-ic" src="/icons/premium.png" alt="" /> — como será o plano pago quando a beta terminar, limites do Free incluídos.
- **Quem somos** <img class="inline-ic" src="/icons/aboutus.png" alt="" /> — quem faz o TTM.

## `/invite`

Mostra um cartão para adicionar o Team Tasks Manager a outro servidor: a mesma apresentação da página dele no App Directory (o que ele faz, como começar), o botão **Adicionar ao Discord**, o guia e o servidor de suporte.

**Adicionar ao Discord** abre a página de autorização do Discord para o bot, com as mesmas permissões de https://tasks.bitsplitters.app/invite.

O cartão é visível para todos no canal, então você pode executá-lo onde as pessoas que vão configurar o outro servidor possam vê-lo. Ele não lê nada do servidor e não precisa de permissão.

## `/news`

As últimas novidades do Team Tasks Manager, no seu idioma: o que há de novo no bot e como usá-lo. A novidade abre em uma mensagem que só você vê, com a data sob o título.

Sob o texto, **Servidor do Discord** abre o nosso servidor de suporte e **Notas de versão** abre essa versão na página de [Notas de versão](/docs/release-notes/). Quando há novidades mais antigas ou mais novas, os botões **Anterior** e **Próxima** levam você até elas.

Voltando, você encontra todas as versões desde a primeira, a 1.0.0, cada uma com o dia em que saiu. Funciona só em servidores e não precisa de permissão.

Quando há uma novidade que ninguém no seu servidor leu ainda, a última linha dos painéis do bot avisa, no lugar do rodapé de sempre: no `/help`, no Guia, em **Mais**, no `/config app` e na explicação que o `/criar-lista` mostra.

Assim que alguém no servidor abre o `/news`, a linha some para todos. Um servidor que adiciona o TTM depois de uma novidade não recebe a linha: a novidade está no `/news`.

## Nomes dos comandos no seu idioma

O Discord mostra cada comando no idioma do seu app do Discord, e em inglês para um idioma em que o TTM não está traduzido. `/config app`, `/config lists`, `/config webhook` (com a opção `webhook`), `/my timezone`, `/beta`, `/help`, `/invite` e `/news` têm o mesmo nome em todo lugar.

| Idioma | `/create-list` | a opção `file` | opções de `/config webhook` |
| :--- | :--- | :--- | :--- |
| Inglês, e qualquer outro idioma | `/create-list` | `file` | `action` · `trigger` |
| Italiano | `/crea-lista` | `file` | `azione` · `evento` |
| Español | `/crear-lista` | `archivo` | `acción` · `evento` |
| Português (Brasil) | `/criar-lista` | `arquivo` | `ação` · `evento` |
| Français | `/creer-liste` | `fichier` | `action` · `événement` |
| Deutsch | `/liste-erstellen` | `datei` | `aktion` · `ereignis` |

As escolhas dentro das opções — ver, criar, editar, excluir; conclusão, reabertura — também aparecem no seu idioma.
