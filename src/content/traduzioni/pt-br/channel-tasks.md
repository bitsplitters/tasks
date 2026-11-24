---
title: "Editando uma tarefa no canal"
description: "A segunda linha de botões sob a lista — Conteúdo, Proprietário, Tag, Lembrete e Webhook — com seus formulários e menus."
fonte: 9439d0a8db43
---

A segunda linha sob a lista age sobre **uma tarefa por vez**: o texto dela, o proprietário, as tags, o lembrete e o webhook. Esta página mostra onde clicar. O que cada recurso faz e as regras dele: [Proprietários e tags](/docs/owners-and-tags/), [Lembretes](/docs/reminders/), [Webhooks](/docs/webhooks/).

## A segunda linha

Cada botão da segunda linha é um **interruptor de três estados**. Clique nele para passar de uma cor para outra, as mesmas que o Discord usa nos botões dele:

- <span class="c-grey">Cinza</span> — desligado.
- <span class="c-blue">Azul</span> — ativo no modo <span class="c-blue">edição</span>.
- <span class="c-red">Vermelho</span> — ativo no modo <span class="c-red">exclusão</span>.

O procedimento é sempre o mesmo: **deixe um botão azul ou vermelho e depois escolha a tarefa** no [seletor de marcação](/docs/the-task-list/#the-check-selector). O TTM aplica a ação a essa tarefa.

Enquanto um botão está azul ou vermelho, o seletor diz o que vai acontecer, por exemplo *Editar tarefa* ou *Excluir tarefa*; com todos os botões desligados, ele diz *Marcar tarefa*: escolha uma tarefa ali para marcá-la ou desmarcá-la.

Até você escolher uma tarefa desse jeito uma vez, deixar **Conteúdo** ou **Lembrete** azul ou vermelho envia uma mensagem que só você vê. Ela diz qual tarefa escolher e o que acontece se você apertar o botão de novo. Depois que você escolhe uma tarefa com um botão da segunda linha ligado, a mensagem para de aparecer, em todos os servidores.

| Botão | <span class="c-blue">Azul (edição)</span> | <span class="c-red">Vermelho (exclusão)</span> |
| :--- | :--- | :--- |
| [**Conteúdo**](#content) <img class="inline-ic" src="/icons/task.png" alt="" /> | Muda o texto da tarefa, em um formulário. | Exclui a tarefa. |
| [**Proprietário**](#owner) <img class="inline-ic" src="/icons/owner.png" alt="" /> | Define ou muda o proprietário: uma pessoa ou um cargo. Com o [Premium](/docs/premium/), também várias pessoas. | Remove o proprietário e também o lembrete dele. |
| [**Tag**](#tag) <img class="inline-ic" src="/icons/tag.png" alt="" /> | Define os usuários e cargos a avisar, vários de uma vez. | Remove todas as tags da tarefa. |
| [**Lembrete**](#reminder) <img class="inline-ic" src="/icons/alertW.png" alt="" /> | Adiciona ou edita um lembrete. | Remove o lembrete. |
| [**Webhook**](#webhook) <img class="inline-ic" src="/icons/api.png" alt="" /> <a class="premium-tag" href="/docs/premium/" title="Liberado para todos os servidores durante a beta">Premium</a> | Vincula um webhook à tarefa. | Remove o webhook da tarefa. |

Com **Proprietário**, **Tag**, **Lembrete** ou **Webhook** em vermelho, o seletor lista só as tarefas que têm algo a remover: um proprietário, tags, um lembrete ou um webhook. Uma tarefa feita só de tags não aparece, porque sem elas ficaria sem texto.

Se nenhuma tarefa tem algo a remover, o seletor fica desligado e diz isso, por exemplo *Nenhum proprietário para remover*, e você recebe uma nota sobre como adicionar um.

Depois que você usa **Proprietário**, **Tag** ou **Lembrete**, o botão volta para cinza ou continua ligado para a próxima tarefa: quem decide é o seu servidor, com **Manter o estado após a seleção** no menu **Comportamento** do [/config app](/docs/configuration/#keep-the-state-after-a-selection). Manter o estado muda o que Proprietário e Tag podem fazer: veja [Proprietário](#owner) e [Tag](#tag).

## Conteúdo

O **azul** abre um formulário com o texto da tarefa. As tags dela não estão no formulário: ficam na tarefa, no fim do texto, e o botão **Tag** as muda.

- As quebras de linha viram espaços, e os canais aparecem pelo nome, como em **Atualização em bloco**.
- Proprietários, tags, lembretes e webhooks digitados ali são removidos, e o TTM diz o que removeu: eles têm botões próprios.
- Um texto deixado vazio, ou que deixaria a lista longa demais, não é salvo.

Canais, links e emojis no texto: veja [Editando uma lista à mão](/docs/writing-a-list/).

Enquanto o formulário está aberto, a lista fica bloqueada para os outros. Salvar a desbloqueia; o ✕ não: veja [Quando a lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).

O **vermelho** exclui a tarefa. Excluir um grupo com subtarefas pede confirmação antes. As subtarefas dele ficam no lugar: entram no grupo acima ou viram tarefas, se não houver um. Você não pode excluir a última tarefa: use **Excluir lista** ou **Selar lista** em [Mais](/docs/the-task-list/#whats-inside-more).

## Proprietário

O **azul** mostra um menu sob os botões, com o rótulo *Escolha uma tarefa no menu acima para pegá-la, ou escolha quem a recebe*.

**Para pegar uma tarefa**, clique em **Proprietário** até ficar azul e depois escolha a tarefa no seletor de marcação, sem escolher ninguém: ela vira sua, e o canal mostra quem a pegou.

Uma tarefa que já é sua, ou que é de outra pessoa, fica como está, e o TTM diz por quê. Para tirar uma tarefa de outra pessoa, escolha você mesmo no menu, confirme a seleção e depois escolha a tarefa: trocar um proprietário exige uma escolha explícita.

**Para dar uma tarefa a alguém**, escolha o proprietário no menu, confirme a seleção e depois escolha a tarefa. Para dar uma tarefa a várias pessoas, um recurso [Premium](/docs/premium/):

1. Clique em **Proprietário** até ficar azul.
2. Escolha as pessoas.
3. Confirme a seleção: toque em **Salvar** no celular, ou clique fora do menu no computador (veja [Confirmando uma seleção](#confirming-a-selection--desktop-vs-mobile)).
4. Escolha a tarefa no seletor de marcação.
5. O TTM cria o cargo (TTM1, TTM2…) e o dá a elas.

**Quem recebe a tarefa fica sabendo.** A notificação no canal menciona o novo proprietário, então o Discord o avisa: a pessoa, ou todos do cargo. Quando você pega uma tarefa, ninguém é mencionado, porque você já sabe. Com o [Modo de notificação](/docs/configuration/#notification-mode) em *Desativado*, nenhuma notificação é postada, como em qualquer outra ação.

O que um proprietário pode ser, e os cargos que o TTM cria: [Proprietários e tags](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).

Com **Manter o estado após a seleção** ligado, **Proprietário** continua azul depois que você pega uma tarefa, e o menu fica vazio: escolha a próxima tarefa para pegá-la também.

- Uma tarefa de outra pessoa carrega o proprietário dela no menu; para um cargo criado pelo TTM, o menu mostra as pessoas a quem ele deu o cargo.
- Cada mudança que você confirma vale para essa tarefa na hora.
- Se você esvaziar o menu, o proprietário é removido, e o lembrete dele também, como no modo vermelho.

Para voltar a pegar tarefas, clique em **Proprietário** até ficar azul de novo.

O **vermelho** remove o proprietário, e o lembrete dele também: não sobra ninguém para recebê-lo. Se o lembrete ainda não disparou, o TTM pede confirmação antes.

## Tag

O **azul** mostra um menu sob os botões. Por padrão, escolha ali até 25 usuários ou cargos, confirme a seleção (veja [Confirmando uma seleção](#confirming-a-selection--desktop-vs-mobile)) e depois escolha a tarefa:

- escolha *Ana* e *@Devs*, e a tarefa fica com as tags Ana e @Devs, nada além: a sua escolha **substitui** as tags da tarefa;
- escolha as pessoas **antes** da tarefa: com o menu vazio, o TTM pede que você selecione pelo menos uma tag primeiro.

O **vermelho** remove todas as tags da tarefa.

### Com o estado mantido — dois modos

Com **Manter o estado após a seleção** ligado, no menu **Comportamento** do [/config app](/docs/configuration/#keep-the-state-after-a-selection), o botão continua azul depois de cada tarefa. O que a Tag faz então depende do que você escolhe primeiro:

- **Pessoas primeiro** significa **atribuir**.
- **Tarefa primeiro**, com o menu ainda vazio, significa **edição ao vivo**.

**Atribuir — escolha as pessoas e depois a tarefa.** As tags da tarefa passam a ser exatamente a sua escolha, como acima. Suas escolhas ficam no menu, então você pode aplicar o mesmo conjunto à próxima tarefa, e à seguinte, sem escolher de novo.

**Edição ao vivo — escolha a tarefa, com o menu vazio.** Deixe a Tag azul e escolha a tarefa que quer remarcar, sem escolher ninguém. Isso não é um erro: as tags atuais da tarefa são carregadas no menu, já marcadas. Agora você edita essa tarefa diretamente:

- cada vez que você fecha o menu, a tarefa é atualizada na hora;
- desmarque alguém e a pessoa sai da tarefa; marque alguém e a pessoa entra;
- não há etapa de confirmação, e nada é sobrescrito: você ajusta o conjunto existente;
- desmarque todo mundo para remover todas as tags.

Se você escolher outra tarefa, a edição passa para ela. Desligue a Tag (cinza) para terminar: a próxima ativação começa do zero.

### Confirmando uma seleção — computador e celular

Os menus de **Tag** e **Proprietário** deixam você escolher vários de uma vez. Esses menus de seleção múltipla **não aplicam uma escolha assim que você a marca**: esperam que você **confirme** a seleção inteira. Os menus de escolha única, como o seletor de marcação, aplicam assim que você escolhe. Como confirmar depende do dispositivo:

- **No celular**, um botão **Salvar** aparece sob o menu aberto. Toque nele para aplicar suas escolhas.
- **No computador**, **não há botão Salvar**. **Clique em qualquer lugar fora do menu** para fechá-lo: fechar o menu aplica a sua seleção. Se as suas tags parecem não ser aplicadas, quase sempre é por isso.

Isso importa mais na edição ao vivo de tags ou do proprietário: no computador, cada clique fora do menu salva uma mudança.

## Lembrete

Clique em **Lembrete** <img class="inline-ic" src="/icons/alertW.png" alt="" /> até ficar **azul**. Depois escolha a tarefa no seletor de marcação: uma que ainda não esteja marcada. O TTM abre o formulário **Quando**, com o título *Lembrete para a tarefa …*:

| Campo | Formato | Notas |
| :--- | :--- | :--- |
| **Dia** | um número (1–31) | já preenchido |
| **Mês** | um menu suspenso, no seu idioma | sem ambiguidade de `dd/mm` com que se preocupar |
| **Ano** | um número | já preenchido |
| **Hora** | `HH:mm`, 24 horas | por exemplo `15:30` |
| **Fuso horário** | o nome oficial de um fuso | já preenchido com o *seu* fuso (até você escolher um com `/my timezone`, o do seu idioma do Discord, ou o do servidor) |

Tudo chega já preenchido com **dez minutos a partir de agora**. Envie, e a tarefa mostra o horário agendado. Enquanto o formulário está aberto, a lista fica bloqueada para os outros. Quem recebe o lembrete, e o fuso horário: veja [Lembretes](/docs/reminders/#the-rules).

### O cartão de resumo

Com os [lembretes recorrentes](/docs/reminders/#repeating-reminders) ligados (um recurso Premium), enviar o **Quando** ainda não salva. O TTM mostra um cartão de resumo privado com a data que entendeu, uma linha **Recorrência** e quatro botões. A linha diz *nenhuma* para um lembrete único, ou mostra o selo de recorrência:

| Botão | O que faz |
| :--- | :--- |
| **Salvar** | Guarda o lembrete exatamente como o cartão mostra. Ao editar um lembrete existente, ele só liga depois que você muda alguma coisa. |
| **Editar data** | Reabre o **Quando**, já preenchido com os valores atuais. |
| **Editar recorrência** | Abre o formulário de repetição, com os três menus: veja [Os campos da repetição](/docs/reminders/#the-repetition-fields). Para um lembrete único, ele abre em 2 vezes, a cada 1 dia. Com **1 vez**, o lembrete continua único. |
| **Cancelar** | Descarta tudo — a lista é desbloqueada. |

<div class="callout"><div class="callout-t">Nada é salvo até você apertar Salvar</div>Editar a data ou a recorrência só atualiza o cartão. Você pode mudá-las quantas vezes precisar, e <strong>Cancelar</strong> cancela de verdade.</div>

Com os lembretes recorrentes desligados, ou no plano Free, o cartão só aparece quando você edita um lembrete que **já é recorrente**, para que ele mantenha as repetições: veja [Lembretes repetidos](/docs/reminders/#repeating-reminders). Um lembrete novo passa direto pelo **Quando** e é salvo como evento único.

### Editando ou removendo

- **Editar** — deixe **Lembrete** azul e escolha a tarefa:
  - se a tarefa já tem um lembrete *recorrente*, ou os lembretes recorrentes estão ligados, você cai no cartão de resumo, com a data e o selo atuais: mude só o que precisar;
  - caso contrário, o **Quando** abre, já preenchido com a data atual;
  - a mesma data e a mesma recorrência que o lembrete já tem não mudam nada: o TTM avisa e não envia notificação.
- **Remover** — clique em **Lembrete** até ficar **vermelho** (modo exclusão) e escolha a tarefa. O lembrete é removido.

<div class="callout"><div class="callout-t">Fechar um formulário não é cancelar</div>Um formulário fechado com o ✕ deixa a lista bloqueada. Use <strong>Cancelar</strong> no <a href="#the-summary-card">cartão de resumo</a> quando ele estiver ali; caso contrário, veja <a href="/docs/the-task-list/#when-the-list-is-locked">Quando a lista está bloqueada</a>.</div>

## Webhook

Os webhooks são um recurso [Premium](/docs/premium/).

Clique em **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" /> até ficar **azul**, escolha o webhook no seletor que aparece e depois escolha a tarefa. A partir daí, concluir ou reabrir essa tarefa dispara a chamada. Clique em **Webhook** até ficar **vermelho** e escolha a tarefa para remover o vínculo.

Os webhooks em si são criados com o [/config webhook](/docs/config-webhook/), por quem gerencia o servidor. O formulário **Conteúdo** não mostra o webhook de uma tarefa, e remove um que você digite ali, avisando. Em **Atualização em bloco** ele aparece como um token: veja [Webhooks no texto](/docs/writing-a-list/#webhooks-in-the-text).

## Para onde ir depois

- [A lista no canal](/docs/the-task-list/) — o seletor de marcação, a primeira linha e o Mais.
- [Trabalhando em uma lista na Activity](/docs/activity-list/) — os mesmos cinco botões, no painel de uma tarefa.
- [FAQ](/docs/troubleshooting/#in-the-channel) — respostas rápidas para os problemas mais comuns.
