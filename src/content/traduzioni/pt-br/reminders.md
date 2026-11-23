---
title: "Lembretes"
description: "Associe um horário a uma tarefa para o TTM avisar o proprietário na hora certa: quem recebe, fusos horários, repetições."
fonte: e9b5187d37f5
---

Um lembrete faz da tarefa algo que lembra *você*, em vez do contrário. Você o define uma vez, e o TTM cuida dos avisos. Você adiciona um com **Lembrete** <img class="inline-ic" src="/icons/alertW.png" alt="" />: no canal, na segunda linha embaixo da lista; na Activity, no painel de uma tarefa.

<div class="howto" id="how-to-do-it"><div class="howto-t">Como fazer</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#reminder"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />No canal</span><span class="howto-d">Lembrete, na segunda linha embaixo da lista: o formulário Quando e o cartão de resumo.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#reminder"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Na Activity</span><span class="howto-d">Lembrete, no painel de uma tarefa: data, hora, fuso horário e repetições juntos.</span></a></div></div>

## As regras

- **Um lembrete tem data, hora e fuso horário.** Ele dispara **uma vez**, a menos que o seu servidor use [lembretes repetidos](#repeating-reminders), um recurso Premium.
- **O início precisa estar pelo menos 5 minutos no futuro.** O formulário começa dez minutos a partir de agora, então um lembrete para "daqui a pouco" não exige digitar nada.
- **Só uma tarefa ainda pendente pode ter um.** Concluir uma tarefa interrompe o lembrete dela: não precisa limpar depois.
- **O lembrete vai para o proprietário da tarefa**, por mensagem direta se o proprietário é uma pessoa. Se a tarefa ainda não tem proprietário, **você se torna o proprietário** ao salvar o lembrete. A partir daí, só você e quem tem *Gerenciar mensagens* no canal podem marcar essa tarefa. Para dá-la a outra pessoa, defina o proprietário antes ou depois de criar o lembrete: veja [Proprietários e tags](/docs/owners-and-tags/).
- **Nada muda até você salvar.** Quando você edita um lembrete, Salvar continua desligado até você mudar a data ou a recorrência.
- **Remover o proprietário remove o lembrete**, porque não sobra ninguém para recebê-lo.

Nada chegou? O proprietário precisa aceitar mensagens diretas de membros desse servidor: veja [Lembretes por mensagem direta](/docs/known-limits/#reminders-by-direct-message).

## Seu fuso horário

O TTM precisa de um nome oficial de fuso horário, como `Europe/Rome`. Procure o seu no **[mapa de fusos horários](https://timezones.bitsplitters.app)**: selecione a sua região no mapa, copie o valor e cole no campo. A Activity também permite pesquisar por cidade ou país.

<div class="callout"><div class="callout-t">Escolha o seu fuso horário</div>Use <a href="/docs/my-timezone/"><strong>/my timezone</strong></a> em qualquer servidor, ou a engrenagem na Activity, e o TTM propõe o <strong>seu</strong> fuso em todo lugar, no canal e na Activity. Até você escolher um, o TTM aprende: o fuso que você deixa em um lembrete passa a ser o seu. Com um fuso próprio, um fuso diferente em um lembrete vale só para aquela data. Os lembretes que você escreve no texto de uma lista usam o mesmo fuso.</div>

## Como o lembrete chega

Quando chega a hora, o TTM lembra o proprietário da tarefa. O lembrete mostra a tarefa, a data para a qual estava marcado e um botão que leva direto à lista.

- Se o proprietário é uma **pessoa**, o lembrete é uma **mensagem direta**.
- Se o proprietário é um **cargo**, é uma **mensagem no canal da lista** que menciona o cargo, como resposta à lista. O Discord avisa todos que têm esse cargo e podem ver o canal.

De qualquer modo, ele chega **em cerca de dez segundos** do horário marcado, e sempre no minuto certo. O TTM distribui os envios para ficar dentro dos limites do Discord. Com as [Notificações push legíveis](/docs/configuration/#readable-push-notifications) desativadas, ele ainda chega, sem o texto simples que deixa as prévias do celular legíveis.

Uma mensagem direta pode ser recusada, e então o TTM espera algumas horas antes de tentar essa pessoa de novo: veja [Lembretes por mensagem direta](/docs/known-limits/#reminders-by-direct-message).

### Não quer lembretes por mensagem direta?

Você decide, pelas configurações do próprio Discord:

- **Mantê-los, sem aviso sonoro.** Clique com o botão direito na sua conversa com o TTM e escolha *Silenciar*. Os lembretes continuam chegando, em silêncio.
- **Interrompê-los.** Clique no nome do servidor, depois em *Configurações de privacidade*, e desative *Mensagens diretas*. Isso interrompe as mensagens diretas de todos os membros desse servidor, não só do TTM.
- **Passar a tarefa adiante.** Peça a quem gerencia a lista que dê a tarefa a outra pessoa, com **Proprietário** <img class="inline-ic" src="/icons/owner.png" alt="" />.

Silenciar o servidor não basta: isso silencia os canais do servidor, não as suas mensagens diretas.

Um cargo só é avisado se puder ser mencionado. Quando isso acontece, e o que ocorre com o @everyone ou com um cargo excluído: veja [Lembretes para um cargo](/docs/known-limits/#reminders-to-a-role).

## Lembretes repetidos

Por padrão, todo lembrete é um **evento único**: um aviso, e nada mais a decidir. As repetições são um recurso [Premium](/docs/premium/): no plano Free, todo lembrete é único. Em um plano que as inclui, elas ainda dependem de ativação: um administrador do servidor ativa **Lembretes recorrentes** em [/config app](/docs/configuration/#recurring-reminders). Até lá, só um lembrete que já é recorrente mostra os menus de repetição.

<div class="callout"><div class="callout-t">Os lembretes recorrentes que você já tem continuam funcionando</div>Um lembrete que já era recorrente continua disparando no plano Free, e no Premium enquanto a opção está desativada: você pode mudar a data dele, movê-lo para outra tarefa ou diminuir o número de vezes que ele chega, mas não aumentá-lo. Clonar ou importar uma lista cria lembretes novos, então, onde não é possível criar novos lembretes recorrentes, uma clonagem ou uma importação recusa um lembrete recorrente: clone sem os lembretes ou defina as repetições dele como <code>0</code>.</div>

### Os campos da repetição

São três menus, no canal e na Activity, então não há nada para digitar nem formato para errar.

| Menu | Significado | Opções |
| :--- | :--- | :--- |
| **Quantas vezes, no total** | Quantos avisos o lembrete envia, **o primeiro incluído**. **1 vez** é um lembrete único. O máximo é 50 no Premium. Onde os lembretes recorrentes não podem crescer, no plano Free ou com a opção desativada, o menu para no número que o lembrete já tem, e o formulário diz por quê. | de 1 a 10 e depois de 15 a 50, de 5 em 5 |
| **A cada** | O tempo entre dois avisos, na unidade do menu seguinte. Não conta com **1 vez**. | de 1 a 10, 12, 14, depois de 15 a 50 de 5 em 5, 60 e 90 |
| **Unidade** | Minutos, horas ou dias. Não há semanas nem meses: uma semana são 7 dias. | minutos, horas, dias |

Ao passar de uma vez para mais, **A cada** começa em 1 dia. Os menus sempre oferecem os valores que o lembrete já tem, mesmo quando não estão na lista:

- um lembrete escrito no texto de uma lista pode rodar 37 vezes, ou a cada 48 horas;
- um que já roda mais de 50 vezes mantém o número dele;
- um intervalo que mistura unidades, como `1d12h`, aparece na menor unidade, 36 horas: deixe **A cada** e **Unidade** como estão e ele continua `1d12h`.

<div class="callout"><div class="callout-t">Horário de verão: o detalhe que importa</div>No menu <strong>Unidade</strong>, os <strong>Dias</strong> mantêm o <strong>mesmo horário no relógio</strong> numa mudança de horário, por exemplo sempre às 09:00. As <strong>Horas</strong> são <strong>exatas</strong>: a cada 24 horas pode deslocar uma hora depois que os relógios mudam. Escolha a que corresponde ao que você quer dizer.</div>

## Ler um lembrete na tarefa

Na linha da tarefa, o lembrete sempre mostra a data do **primeiro** aviso, exibida pelo Discord no horário local de cada leitor. Um lembrete repetido acrescenta dois valores compactos:

`↻` intervalo · `×` vezes no total

Então `↻1h ×4` quer dizer quatro avisos, um por hora, o primeiro incluído. Um evento único mostra **só o carimbo de data e hora**: não há selo, porque não há nada a repetir.

O TTM nunca remove um lembrete por conta própria. Um lembrete cujos avisos estão todos **no passado** continua na tarefa, como registro. Ele não envia mais nada e não conta entre os lembretes à espera. Para defini-lo de novo, escolha uma nova data: até lá, Salvar continua desligado.

No texto de uma lista, o mesmo lembrete é uma data no seu fuso horário e um trio, como `2026-12-08 18:00 [0m,0m,0]`: veja [Lembretes no texto](/docs/writing-a-list/#reminders-in-the-text).

## Erros comuns

Vários destes vêm do formulário **Quando** do canal, onde você digita a data, a hora e o fuso. Na Activity você os escolhe em menus, então ali eles não podem dar errado.

| Mensagem | O que corrigir |
| :--- | :--- |
| *Lembrete inválido* | O início precisa estar pelo menos 5 minutos no futuro. |
| *Uma tarefa concluída não pode ter lembrete* | Desmarque a tarefa primeiro, se ainda estiver pendente; ou escolha uma tarefa que não esteja marcada. |
| *A data não existe* | Confira dia, mês e ano juntos (por ex. 31 de fevereiro). |
| *Hora inválida* | Use o formato de 24 horas `HH:mm`, por ex. `15:30`. |
| *Acima do plano* ou *Acima do permitido* | Aqui os lembretes recorrentes não estão disponíveis: no plano Free, ou desativados em `/config app`. Um lembrete que já era recorrente pode manter o número de vezes que chega ou diminuí-lo. Você vê isso se o plano ou a configuração mudou enquanto o formulário estava aberto: abra as repetições de novo. |
| *Fuso horário incorreto* | O nome não corresponde a um fuso oficial: copie-o do mapa de fusos horários. |

Um lembrete não chegou, ou deu algum outro problema? Veja a [FAQ](/docs/troubleshooting/#reminders).
