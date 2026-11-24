---
title: "Primeiros passos"
description: "Convide o bot, crie uma lista, depois marque uma tarefa e defina um lembrete — no canal ou na Activity."
fonte: e7a439b39622
---

O Team Tasks Manager (TTM) permite que sua equipe compartilhe e gerencie tarefas **sem sair do Discord**. Esta página leva você do zero a uma lista funcionando: criá-la, marcar uma tarefa, definir um lembrete.

<div class="callout"><div class="callout-t">Todos os recursos estão liberados durante a beta</div>Todos os recursos estão liberados, para todos os servidores. Onde estas páginas mencionam o plano Free ou o Premium, isso vale só depois da beta — veja <a href="/docs/beta/">Como funciona a beta</a>.</div>

## 1. Convide o bot

<p><a class="btn" href="/invite">Adicionar ao Discord</a></p>

Esse botão convida o Team Tasks Manager para o seu servidor. Mantenha as permissões que ele pede: o TTM precisa delas para publicar listas, executar lembretes e escrever a timeline. Se você pular uma, o bot diz exatamente qual permissão está faltando quando precisar dela. Para que serve cada permissão: [As permissões que o TTM pede](/docs/core-concepts/#the-permissions-ttm-asks-for).

## 2. Crie sua primeira lista

Digite `/` na caixa de mensagem e escolha o comando, ou comece a digitar o nome dele:

```
/criar-lista
```

Se o seu Discord está em outro idioma, o comando tem um nome traduzido: em italiano é `/crea-lista`. Todos os nomes estão na [Referência de comandos](/docs/commands/#command-names-in-your-language).

O TTM responde com uma explicação curta de como escrever uma lista e um botão **Crie sua lista**. Clique nele: abre um formulário com dois campos, o **título da lista** e a **lista de atividades**. Escreva uma atividade por linha, cada uma começando com um traço `-`. Por exemplo, com o título *Torneio de sábado*:

```
- Reservar os canais de voz
- Preparar as chaves
  - Coletar as inscrições
  - Sortear as equipes
- Publicar as regras
- Transmitir a final
```

As regras:

- **Uma linha que começa com `-` é uma tarefa.**
- **Espaços antes do traço fazem dela uma subtarefa** da tarefa de cima. Uma tarefa com subtarefas vira um **grupo**.
- O título pode ter até **90 caracteres**, a lista cerca de **4000 caracteres** e **50 tarefas**, subtarefas incluídas: veja [Limites conhecidos](/docs/known-limits/).

Envie o formulário e a lista aparece no canal. Aqui está a mesma lista depois de alguns passos. A primeira tarefa está marcada, *Preparar as chaves* tem um proprietário e *Transmitir a final* tem um lembrete.

<picture class="screen">
  <source media="(max-width: 640px)" srcset="/screens/pt-br/list-mobile.png" width="795" height="1063" />
  <img src="/screens/pt-br/list-desktop.png" width="465" height="418" loading="lazy" alt="A lista Torneio de sábado no Discord: seis tarefas numeradas com caixas. A primeira está marcada e em cinza; Preparar as chaves tem duas subtarefas e um proprietário; Transmitir a final tem um proprietário e a data de um lembrete. Sob as tarefas, uma pequena linha aponta para Mais, Guia e a documentação completa, e uma barra verde mostra quanto já foi feito. Abaixo da lista ficam o menu suspenso, Marcar tarefa, e duas linhas de botões." />
</picture>

Prefere aprender fazendo? Ao lado de **Crie sua lista** há um botão **Tutorial**: ele transforma a explicação em uma lista de prática com sete lições no seu idioma e envia o Guia a você em uma mensagem que só você vê.

Faça as lições em ordem: cada uma nomeia um botão com o ícone dele e pede que você faça algo com ele mesmo, desde marcá-lo até abri-lo na Activity.

A lista de prática é uma lista normal: quando terminar, exclua-a em **Mais** → **Excluir lista**.

Agora escolha onde trabalhar nela. A lista é a mesma nos dois lugares, e ela fica [em um lugar de cada vez](/docs/core-concepts/#one-list-two-places).

## <img class="place-ic" src="/icons/posto-canale.svg" alt="" />3. No canal

### Marque uma tarefa

Sob a lista há o **seletor de marcação**, um menu suspenso que mostra o título da lista, e duas linhas de botões. Abra o menu e escolha uma tarefa: a caixa dela passa de <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> para <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" /> e a lista se atualiza para todos. Escolha-a de novo para reabri-la.

Marcar um grupo marca também as subtarefas dele. Conforme as suas [configurações](/docs/configuration/), o TTM também pode publicar um aviso curto sob a lista e registrar a mudança em um tópico de timeline.

<div class="callout"><div class="callout-t">Não consegue marcar uma tarefa?</div>Todos os botões da segunda linha precisam estar <strong>desligados</strong>: se um estiver azul ou vermelho, escolher uma tarefa aplica a ação desse botão. E uma tarefa com proprietário só pode ser marcada pelo proprietário e por quem tem <em>Gerenciar mensagens</em> no canal.</div>

### Defina um lembrete

Na segunda linha:

1. Clique em **Lembrete** <img class="inline-ic" src="/icons/alertW.png" alt="" />, o quarto botão, uma vez: ele fica **azul**.
2. Escolha uma tarefa que **ainda não esteja marcada**. Abre um formulário com o título *Lembrete para a tarefa …*, preenchido com dez minutos a partir de agora.
3. Envie-o como está. Se o seu servidor ativou os lembretes recorrentes, um cartão de resumo vem em seguida: aperte **Salvar**.

A tarefa mostra o horário, e o lembrete chega uma vez. O fuso horário do último campo é o do seu idioma do Discord, ou o do servidor: mude-o se o seu for diferente, e defina-o com [/my timezone](/docs/my-timezone/) para vê-lo sempre proposto.

**Fechou o formulário com ✕?** A lista continua bloqueada: abra **Mais** sob a lista e aperte **Desbloquear lista**. Veja [Quando a lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).

Todos os botões sob a lista: [A lista no canal](/docs/the-task-list/) e [Editando uma tarefa no canal](/docs/channel-tasks/).

## <img class="place-ic is-activity" src="/icons/activity.png" alt="" />4. Na Activity

Na Activity você trabalha na lista em uma janela dentro do Discord, com caixas e painéis no lugar de menus. Aperte **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, o primeiro botão sob a lista. Os outros no canal podem entrar com você. Você também pode começar pelo Iniciador de apps do Discord ou por uma chamada de voz: veja [Quatro jeitos de entrar](/docs/activity/#four-ways-in).

### Marque uma tarefa

Toque na caixa de uma tarefa. A lista se atualiza para todos na janela, e um grupo marca as subtarefas dele também.

### Defina um lembrete

Toque no texto de uma tarefa que ainda não esteja marcada: o painel dela abre. Toque em **Lembrete** <img class="inline-ic" src="/icons/alertW.png" alt="" /> uma vez: ele fica **azul**, e a data, a hora e o fuso horário aparecem, definidos para dez minutos a partir de agora no fuso do seu dispositivo. Toque em **Salvar**.

Quando terminar, aperte **Sair**: a lista volta para o canal, com um resumo do que mudou.

Tudo o que há na janela: [A Activity](/docs/activity/) e [Trabalhando em uma lista na Activity](/docs/activity-list/).

## Bom saber antes do primeiro lembrete

- **O lembrete vai para o proprietário da tarefa**, por mensagem direta se o proprietário for uma pessoa.
- **Se a tarefa ainda não tem proprietário, você se torna o proprietário dela**, e o lembrete chega a você: veja [As regras](/docs/reminders/#the-rules).
- **Não chegou nada?** Permita mensagens diretas de membros do servidor: veja [Lembretes por mensagem direta](/docs/known-limits/#reminders-by-direct-message).

## Próximos passos

- [Conceitos básicos](/docs/core-concepts/) — uma lista em dois lugares, proprietários, tags, grupos e permissões.
- [Proprietários e tags](/docs/owners-and-tags/) — dê uma tarefa a uma pessoa, a um cargo ou a várias pessoas, e adicione tags para avisar quem precisar.
- [Lembretes](/docs/reminders/) — quem os recebe, fusos horários, lembretes recorrentes.
- [Dicas e truques](/docs/tips/) — pequenos hábitos que poupam tempo, como reutilizar uma lista em outro servidor.
- [/config app](/docs/configuration/) — notificações, as dicas, fuso horário e mais.
- [FAQ](/docs/troubleshooting/) — respostas rápidas para os problemas mais comuns.
