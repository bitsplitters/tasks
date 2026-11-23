---
title: "O que o Premium desbloqueia"
description: "O que o plano pago acrescenta ao Free e o que cada limite muda no dia a dia."
fonte: 1ce2890c95d6
---

O TTM está **totalmente desbloqueado durante a beta**, então nada desta página vale ainda. Ela descreve o plano Free e o que o Premium vai liberar quando a beta terminar. O que acontece com o seu servidor quando a beta termina está em [Como a beta funciona](/docs/beta/).

<div class="callout"><div class="callout-t">Planos e preços</div>Os dois planos lado a lado, os preços e a hospedagem própria estão na <a href="/premium/">página Premium</a>. Os preços não incluem impostos (VAT): <a href="/premium/#vat">por quê</a>.</div>

## O que cada um muda, na prática

Acima de um limite do Free você não pode adicionar mais, mas nada do que já existe é excluído ou escondido: veja [Como a beta funciona](/docs/beta/#when-the-beta-ends).

\* **Um limite imposto pelo Discord, não por nós.** É o mesmo em todos os planos: o Premium deixa você *chegar* nele, nunca passar dele. Veja [Limites conhecidos](/docs/known-limits/).

**Listas em uso — 3 → ilimitadas.** Três listas bastam para uma equipe pequena: uma de afazeres, uma de bugs, uma checklist para o próximo evento. Você chega ao limite quando cada projeto, time ou reunião quer a própria lista.

**Tarefas por lista — 20 → 50 \*.** Vinte tarefas formam uma checklist de trabalho e cinquenta formam um backlog. Nenhum plano passa de 50, porque uma mensagem do Discord comporta só alguns menus: veja [Limites conhecidos](/docs/known-limits/).

**Lembretes ativos — 10 → ilimitados.** O limite conta os lembretes *aguardando ao mesmo tempo*, não os lembretes por dia. Um lembrete deixa de contar depois do último aviso ou quando você o remove, e um recorrente conta uma vez só.

**Repetições por lembrete — só único → até 50.** No plano Free todo lembrete dispara uma vez. No Premium um lembrete pode chegar até 50 vezes no total, a primeira incluída, se um admin ativar **Lembretes recorrentes** em [/config app](/docs/configuration/#recurring-reminders). Os lembretes recorrentes que você já tem continuam disparando no plano Free: veja [Lembretes](/docs/reminders/#repeating-reminders).

**Pessoas por proprietário — 1 → até 25 \*.** No plano Free o proprietário de uma tarefa é uma pessoa ou um cargo. No Premium podem ser até 25 pessoas, que compartilham um cargo criado pelo TTM: veja [Os cargos que o TTM cria](/docs/owners-and-tags/#the-roles-ttm-creates). É Premium porque cada pessoa custa uma requisição ao Discord. O Discord limita as requisições que um bot pode enviar, e todos os servidores dele compartilham esse limite.

**Webhooks — nenhum novo → até 25 \*.** Um webhook permite que uma tarefa concluída envie uma chamada HTTP para qualquer coisa que você mantenha: um deploy, uma planilha, um sistema de tickets. É a principal novidade que o Premium traz. Veja [Webhooks](/docs/webhooks/). No plano Free você não pode criar webhooks novos, mas os criados durante a beta continuam: veja [O que uma lista da beta mantém](/docs/beta/#what-a-beta-list-keeps).

## Como funcionam as três vagas

No plano Free um servidor tem três vagas para listas. Uma lista que ocupa uma está **em uso**, e `/config lists` a marca assim.

- **Uma lista ocupa uma vaga na primeira vez que alguém trabalha nela** e a mantém. Trabalhar em uma lista significa qualquer uma destas coisas:
  - marcar ou desmarcar uma tarefa;
  - uma atualização em bloco, ou editar ou remover uma única tarefa;
  - **Limpar lista** ou **Reabrir tudo**;
  - definir um proprietário, uma tag ou um lembrete;
  - vincular um webhook.
- **Uma lista nova ocupa uma vaga** quando você a cria, clona ou importa. Regenerar uma lista conta como trabalhar nela.
- **Uma vaga não expira.** Só selar ou excluir a lista a libera.
- **Uma lista que não está em uso fica no canal como está.** Você ainda pode baixá-la, selá-la ou excluí-la.

As listas criadas durante a beta são a exceção: as tarefas delas ainda podem ser marcadas sem contar no limite de três listas. Veja [O que uma lista da beta mantém](/docs/beta/#what-a-beta-list-keeps).

<div class="callout"><div class="callout-t">Nenhum limite conta com que frequência você usa algo</div>Todo limite conta quantas coisas você tem, nunca com que frequência as usa. Um webhook que dispara mil vezes por semana continua contando como um webhook.</div>

### O que acontece com a quarta lista

Quando as três vagas estão ocupadas, o TTM se recusa a criar, clonar ou importar outra lista. Ele também se recusa a trabalhar em uma lista que não está em uso. O bot diz como liberar uma vaga:

- **Selar lista**, no painel **Mais** <img class="inline-ic" src="/icons/other.png" alt="" /> de uma lista que você já concluiu. A lista fica no canal como registro, sem botões.
- **Excluir lista**, no mesmo painel. Ela remove a lista definitivamente.
- [`/config lists`](/docs/config-lists/), que marca as listas em uso e pode selar ou excluir várias de uma vez.

Apagar à mão a mensagem de uma lista não libera nada: a lista continua no TTM com a vaga dela, e os lembretes dela continuam chegando. Use **Excluir lista**. Se a mensagem já sumiu, `/config lists` pode excluir o que sobrou ou regenerar a lista.

## Dúvidas?

Entre no [Discord](/docs/community/) e pergunte o que quiser sobre preços, limites ou hospedagem própria.
