---
title: "Editando uma lista à mão"
description: "Edite uma lista escrevendo o texto dela, para mudar muitas coisas de uma vez ou colar uma lista de outro lugar. Para todo o resto, use os botões, que são mais simples e evitam erros."
fonte: 7218c363e178
---

Esta página é para quando você prefere mudar o texto de uma lista por conta própria, em **Atualização em bloco** no canal ou em **Editar a lista** na Activity.

Os botões fazem as mesmas coisas sem erros: **Proprietário**, **Tag**, **Lembrete** e **Webhook** escrevem os códigos para você, e o TTM os confere enquanto você avança. Use-os primeiro. O texto serve para muitas mudanças de uma vez ou para uma lista que você copia de outro lugar.

O traço e os espaços que formam tarefas e subtarefas estão em [Crie sua primeira lista](/docs/getting-started/#2-create-your-first-list). O mesmo texto está no `/criar-lista`, em **Nova lista** na Activity e no arquivo que o **Download** entrega.

No formulário **Conteúdo** de uma única tarefa, proprietário, tags, lembrete e webhook têm botões próprios: o formulário remove um proprietário, um lembrete ou um webhook que você digitar, e avisa.

<div class="howto"><div class="howto-t">Como fazer</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#bulk-update"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />No canal</span><span class="howto-d">Atualização em bloco, na primeira linha sob a lista.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#edit-the-list"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Na Activity</span><span class="howto-d">Editar a lista, no alto da lista.</span></a></div></div>

## Referência rápida

| Você quer | Você escreve |
| :--- | :--- |
| [Uma tarefa](#tasks-and-subtasks) | `- Publicar` |
| [Uma subtarefa](#tasks-and-subtasks) | `  - Escrever as notas`, sob a tarefa dela |
| [Uma tarefa concluída](#tasks-and-subtasks) | `- [X] Publicar` |
| [Mencionar uma pessoa](#mentioning-people-and-roles) | o botão **Tag**, ou `@Nome` |
| [Uma de duas pessoas com o mesmo nome](#mentioning-people-and-roles) | `@Nome (usuário)` |
| [Mencionar alguém novo](#writing-someone-new) | o botão **Tag**, ou `<@ID>` |
| [Mencionar um cargo](#mentioning-people-and-roles) | o botão **Tag**, ou `@Cargo` |
| [Escrever @ sem uma menção](#writing--without-a-mention) | `\@Nome` |
| [Definir o proprietário](#owners-the-mention-with-a-colon) | o botão **Proprietário**, ou `@Nome:` |
| [Definir alguém novo como proprietário](#writing-someone-new) | o botão **Proprietário**, ou `<@ID>:` |
| [Vincular um canal](#linking-channels) | `#canal` |
| [Adicionar um link](#adding-a-hyperlink) | `[texto](https://url)` |
| [Vincular um e-mail ou um telefone](#adding-a-hyperlink) | `[texto](mailto:nome@example.com)`, `[texto](tel:+12025550100)` |
| [Mostrar o emoji de um botão](#button-emoji) | `:owner:`, `:reminder:`, `:content:`, `:more:`, `:activity:` |
| [Um lembrete em uma data](#reminders-in-the-text) | o botão **Lembrete**, ou `2026-12-08 18:00 [0m,0m,0]` |
| [Um lembrete em outro fuso horário](#reminders-in-the-text) | `2026-12-08 18:00 America/New_York [0m,0m,0]` |
| [Um lembrete dois dias após salvar](#reminders-in-the-text) | `[2d,0m,0]` |
| [Vincular um webhook](#webhooks-in-the-text) | o botão **Webhook**, ou `{{wb=nome}}` |

## Tarefas e subtarefas

```
- [X] Reservar os canais de voz
- [] Preparar as chaves
  - [X] Reunir as inscrições
  - [] Sortear os times
- [] Publicar as regras
```

- **Uma linha que começa com `-` é uma tarefa.**
- **Espaços antes do traço fazem dela uma subtarefa** da tarefa acima. Uma tarefa com subtarefas vira um **grupo**.
- **A primeira linha não pode ser uma subtarefa.**
- **A caixa vem depois do traço**: `[]` para uma tarefa a fazer, `[X]` para uma concluída. Mude-a para marcar ou desmarcar a tarefa. Uma linha nova sem caixa é uma tarefa a fazer.
- **O título** pode ter até 90 caracteres.
- **A lista** pode ter até cerca de 4000 caracteres e 50 tarefas, subtarefas incluídas. Depois da beta, o plano Free permite 20 tarefas: veja [O que o Premium desbloqueia](/docs/premium/).

## Pessoas, cargos e canais pelo nome

No texto, pessoas, cargos e canais se escrevem pelo nome, como o Discord os mostra: `@Ava`, `@Moderadores`, `#geral`.

Ao salvar, o TTM transforma cada nome em uma menção, então a lista avisa e vincula como de costume. Quando você abre o formulário de novo, os nomes voltam.

A linha sob o texto, no canal e na Activity, leva até aqui para adicionar alguém novo: veja [Escrevendo alguém novo](#writing-someone-new).

## Mencionando pessoas e cargos

O botão **Tag** adiciona as menções para você: veja [Tags](/docs/owners-and-tags/#tags). No texto, escreva `@` e o nome:

```
- Pedir à @Ava para conferir as regras e depois avisar @Moderadores
```

Essas menções são as **tags** da tarefa: copie, mova ou remova como quiser.

- **Uma pessoa** vai pelo nome que o servidor mostra: o apelido dela no servidor, senão o nome de exibição, senão o nome de usuário. Maiúsculas e minúsculas não importam.
- **Pelo nome você escreve as pessoas que a lista já menciona.** Alguém novo entra com o botão **Proprietário** ou **Tag**, ou com o código da pessoa: veja [Escrevendo alguém novo](#writing-someone-new).
- **Um cargo** é `@` e o nome dele: `@Moderadores`. Todo cargo do servidor funciona, mesmo um que a lista ainda não menciona.
- **Duas pessoas com o mesmo nome** aparecem com o nome de usuário entre parênteses: `@Mario (mario.rossi)` e `@Mario (mario_b)`. Escreva-as do mesmo jeito. Um nome que corresponde a mais de uma pessoa não pode ser salvo, e a mensagem lista as formas a escrever.
- **Um nome que o TTM não conhece**, como `@elonmusk`, continua sendo texto simples. No lugar do proprietário, é um erro: veja [Proprietários: a menção com dois-pontos](#owners-the-mention-with-a-colon).

O nome mais longo vence: com Mario e Mario Rossi no servidor, `@Mario Rossi` é Mario Rossi. Um nome só conta como palavra inteira, então `@Leonardo` não é `@Leo` seguido de "nardo".

Alguns `@` nunca são um nome:

- `@everyone` e `@here`;
- um `@` sozinho;
- um endereço de e-mail, como `ava@example.com`;
- qualquer coisa dentro de um link ou entre crases.

### Escrevendo alguém novo

Os botões **Proprietário** e **Tag** escolhem no menu do próprio Discord, então alcançam qualquer pessoa do servidor sem nenhum código.

No texto, escreva o código da pessoa onde iria o nome: `<@`, o ID dela e `>`, como `<@123456789012345678>`. Sozinho, é uma tag; seguido de dois-pontos, é o proprietário. Duas formas de obtê-lo:

- em qualquer chat do Discord, digite `\@` e o começo do nome da pessoa, escolha-a no menu e envie: a mensagem mostra o código dela, pronto para copiar;
- com o **Modo desenvolvedor** ligado (Configurações de usuário → Avançado), clique com o botão direito na pessoa → **Copiar ID do usuário** e escreva o ID entre `<@` e `>`.

Salve, e na próxima vez que o formulário abrir a pessoa aparece pelo nome.

### Escrevendo @ sem uma menção

Coloque uma barra invertida na frente de um nome que o TTM conhece: `\@Ava` continua sendo a palavra @Ava, e ninguém é mencionado. `\#geral` faz o mesmo com um canal.

Qualquer outra `@palavra` continua sendo texto sozinha, sem barra invertida. A exceção é o início de uma tarefa, seguido de dois-pontos, onde seria um proprietário: escreva `\@palavra:`.

O TTM mantém a sua barra invertida. A lista mostra a palavra sem ela, e o formulário a mostra de novo na vez seguinte, para você distinguir a palavra da menção. O TTM nunca adiciona uma barra invertida por conta própria.

## Proprietários: a menção com dois-pontos

O botão **Proprietário** define o proprietário de uma tarefa para você: veja [Proprietário](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people). No texto, o proprietário é uma menção seguida de **dois-pontos**, no início da tarefa:

```
- @Ava: Publicar as notas de versão
```

- **Um cargo** funciona do mesmo jeito: `@Moderadores:`. Um código também: `<@123456789012345678>:`.
- **Sem os dois-pontos**, a mesma menção é só uma tag, não um proprietário.
- **O nome do proprietário** vai do `@` até os dois-pontos, então `@Ava Rossi:` é um erro mesmo quando o TTM conhece a Ava.
- **Um nome que o TTM não conhece** é um erro no lugar do proprietário. O TTM não salva nada, e a mensagem diz para escolher o proprietário com o botão **Proprietário** ou escrever o código dele.
- **Para começar uma tarefa com `@palavra:` como texto simples**, veja [Escrevendo @ sem uma menção](#writing--without-a-mention). O formulário Conteúdo não tem proprietário, então ali `@palavra:` continua sendo texto simples.

## Vinculando canais

Escreva `#` e o nome do canal, como a barra lateral o mostra:

```
- Especificações em #design, publicar a partir de #lancamentos
```

Todo canal que você pode mencionar funciona: canais de texto, de avisos, de voz, de palco, de fórum e de mídia, e tópicos ativos. Categorias não.

<div class="callout"><div class="callout-t">Um link de canal também funciona</div>Clique com o botão direito no canal na barra lateral → <strong>Copiar link</strong> e cole na tarefa: o TTM reconhece o link e <strong>o encurta para uma tag de canal</strong>, que o formulário mostra como <code>#nome</code>. Links que apontam para uma <em>mensagem</em> específica ficam como estão: continuam sendo links clicáveis.</div>

## Adicionando um hiperlink

Para links para qualquer coisa fora do Discord, use o Markdown padrão:

```
[nosso roteiro](https://example.com/roadmap)
```

A lista mostra **[nosso roteiro](https://example.com/roadmap)**: um link limpo e clicável no lugar de uma URL solta.

O destino não precisa ser uma página da web. Links `mailto:`, `tel:` e `sms:` funcionam do mesmo jeito e abrem o app do próprio leitor:

```
[o responsável pela versão](mailto:release@example.com)
[o telefone de plantão](tel:+12025550100)
```

O primeiro transforma uma tarefa em um "escrever para esta pessoa" com um clique. O segundo disca direto de um celular.

Um link também pode apontar para **outra lista**: clique com o botão direito na mensagem dela → **Copiar link da mensagem** e cole dentro dos colchetes. Links de mensagem ficam como estão: só os links simples de canal viram uma tag `#canal`.

## Emojis dos botões

Uma tarefa pode mostrar o emoji de um botão da lista, como fazem as lições do [Tutorial](/docs/getting-started/#2-create-your-first-list). No texto, cada um desses emojis aparece como um nome curto:

| Nome | No texto | Botão |
| :--- | :---: | :--- |
| `:owner:` | <img class="inline-ic" src="/icons/owner_blue.png" alt="" /> | **Proprietário** <img class="inline-ic" src="/icons/owner.png" alt="" /> |
| `:reminder:` | <img class="inline-ic" src="/icons/alert_blue.png" alt="" /> | **Lembrete** <img class="inline-ic" src="/icons/alertW.png" alt="" /> |
| `:content:` | <img class="inline-ic" src="/icons/task_blue.png" alt="" /> | **Conteúdo** <img class="inline-ic" src="/icons/task.png" alt="" /> |
| `:more:` | <img class="inline-ic" src="/icons/other_blue.png" alt="" /> | **Mais** <img class="inline-ic" src="/icons/other.png" alt="" /> |
| `:activity:` | <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> | **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> |

Deixe um nome onde está e o emoji continua. Escreva um você mesmo, em minúsculas, e a lista mostra o emoji do botão: útil quando uma tarefa diz qual botão apertar. Qualquer outra palavra entre dois-pontos fica como você escreveu.

## Lembretes no texto

O botão **Lembrete** define um lembrete para você e o confere enquanto você avança: veja [Lembretes](/docs/reminders/). No texto, um lembrete é uma data seguida de um trio, antes do proprietário:

```
- [] 2026-12-08 18:00 [2d3h,1h,3] @Ava: Publicar as notas de versão
```

**A data** se escreve `YYYY-MM-DD HH:mm`, igual em todos os idiomas, no seu fuso horário: veja [/my timezone](/docs/my-timezone/). Mude a data e salve, e o lembrete se move. Só a data logo antes de um trio é um lembrete: uma data em qualquer outro lugar fica como você escreveu.

- **Uma data em outro fuso** leva o fuso depois da hora: `2026-12-08 18:00 America/New_York`. Ela vale só para essa data e vence qualquer outro fuso: útil para manter um horário que alguém te deu no fuso dele.
- **O fuso** vai pelo nome, como `Europe/Rome`, em maiúsculas ou minúsculas, ou como UTC ou GMT com um deslocamento, como `GMT-5:30`.
- **Siglas** como CET ou EST não são aceitas, porque a mesma sigla significa fusos diferentes em países diferentes. A linha recebe uma seta.
- **Quando o formulário abre de novo**, a data volta no seu fuso, no mesmo instante.
- **Uma data com segundos** os mostra: `2026-12-08 18:00:30`.
- **Quando o horário de verão termina**, os relógios passam duas vezes por uma hora. Uma data nessa hora leva o deslocamento, como `2026-10-25 02:30 +02:00`, para que as duas 02:30 fiquem separadas. Sem deslocamento, o TTM usa a primeira das duas.
- **Quando o horário de verão começa**, os relógios pulam uma hora. Uma data nessa hora não existe, e a linha recebe uma seta.

**O trio** é `[distância,intervalo,repetições]`:

- **A distância** cria um lembrete sem data absoluta: ela é contada a partir do momento em que você salva a lista.
- **As repetições** são os avisos depois do primeiro, então a linha da tarefa mostra um a mais: `[2d3h,1h,3]` é `↻1h ×4`. O máximo que um plano permite aqui é 49, 50 avisos no total.
- **Um evento único** usa o intervalo `0m` e `0` repetições: `[2d3h,0m,0]`.
- **Distância e intervalo** usam só `d`, `h` e `m`. Um valor em meses, como `[1M,0m,0]`, é recusado, e a linha recebe uma seta.

`1d` e `24h` não são a mesma coisa quando muda o horário de verão: `1d` mantém a mesma hora do dia, `24h` é exato e pode deslocar uma hora. Veja [Os campos da repetição](/docs/reminders/#the-repetition-fields).

As regras são as do formulário do lembrete, inclusive quantos lembretes podem esperar ao mesmo tempo: veja [Limites conhecidos](/docs/known-limits/). Onde não se podem criar lembretes recorrentes novos, um trio com repetições acima de `0` só é aceito para um lembrete que a lista já tinha, dentro dos limites de [Lembretes repetidos](/docs/reminders/#repeating-reminders).

**Estes lembretes não podem ser salvos**, e a mensagem diz qual tarefa corrigir:

- um lembrete em uma tarefa **sem proprietário**: os lembretes vão para o proprietário, veja [Proprietários: a menção com dois-pontos](#owners-the-mention-with-a-colon);
- um lembrete **sem data** e com distância zero, como `[0m,0m,0]` sozinho: o único aviso dele seria o momento em que você salva, que já passou;
- um lembrete que **não pode ser lido**: um número grande demais, como `[1h,1d,99999999999]`.

**Um lembrete mal escrito recebe uma seta**, como uma linha sem traço. O TTM não adivinha qual você quis dizer:

- duas datas ou dois trios em uma linha;
- uma data sem o trio dela, ou um lembrete sem texto de tarefa;
- uma data que não existe, como `2026-02-30 10:00`;
- uma data em outra forma, como `30/11/2026 18:00`.

Essas verificações olham só as linhas que você muda. Reescrever a lista inteira verifica as linhas que você adiciona ou edita, e o texto de uma única tarefa verifica essa tarefa. Uma lista nova, um clone e uma importação verificam todas as linhas.

## Webhooks no texto

O botão **Webhook** vincula um webhook a uma tarefa para você: veja [Webhooks](/docs/webhooks/). No texto, o vínculo é um token reservado na frente do texto da tarefa:

```
- [] {{wb=deploy}} Publicar as notas de versão
```

Você pode movê-lo, copiá-lo para outra tarefa ou apagá-lo, como uma menção. O token nunca aparece na lista. Uma tarefa com o token também precisa de algum texto.

`wb` é a única chave reservada. Qualquer outro `{{chave=valor}}` no texto de uma tarefa é uma **variável livre**, que o webhook pode usar: veja [Tokens](/docs/config-webhook/#tokens).

## Os códigos por trás dos nomes

O Discord guarda **IDs**, não nomes: números longos que nunca mudam. Por trás de cada nome no texto há um código, e a lista guarda os códigos, na mensagem dela, nas notificações e no arquivo do Download.

| No texto | O código por trás |
| :--- | :--- |
| `@Ava` | `<@123456789012345678>` |
| `@Moderadores` | `<@&987654321098765432>` |
| `#geral` | `<#111222333444555666>` |
| `2026-12-08 18:00` em UTC, antes de um trio | `<t:1796752800>`, a data em segundos |

Você ainda pode escrever ou colar os códigos: o TTM os salva como estão. Um arquivo do Download, ou um texto escrito antes dos nomes, funciona como está.

Quando alguém muda o nome no Discord, o formulário mostra o novo. Nada do que foi salvo quebra, porque a lista guarda o ID.

Um código continua no texto em alguns casos:

- dois cargos com o mesmo nome, ou dois canais com o mesmo nome: os códigos os distinguem;
- uma pessoa cujo nome o Discord não enviou a tempo quando o formulário abriu. Deixe o código como está: a menção continua.

## Juntando tudo

Uma única tarefa pode combinar tudo isso:

```
- @Ava: Revisar as notas de versão em #lancamentos, avisar @Moderadores quando terminar — dúvidas para [o responsável pela versão](mailto:release@example.com)
```

## Quando o texto não pode ser salvo

Se o TTM não consegue ler uma linha, ele mostra o seu texto de volta com uma **seta** em cada linha errada, de uma linha sem traço a um lembrete mal escrito. A mensagem diz o que escrever e leva à parte desta página que o explica.

Fora isso, **uma mensagem lista todos os problemas de uma vez**, um por parágrafo: uma lista longa demais, um lembrete acima de um limite ou sem proprietário. Corrija todos e salve de novo.

Um lembrete cujos avisos estão todos no passado não impede de salvar: ele continua na tarefa dele. Veja [Ler um lembrete na tarefa](/docs/reminders/#reading-a-reminder-on-the-task).

Mais dois casos não salvam nada, e o TTM avisa:

- o TTM não consegue alcançar o servidor no Discord quando você salva: tente de novo em um momento;
- um formulário deixado aberto por mais de seis horas não consegue ler os nomes de volta: abra-o de novo a partir da lista.
