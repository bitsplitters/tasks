---
title: "/config lists"
description: "Veja todas as listas do servidor, sele ou exclua as que você já terminou, ou traga de volta uma cuja mensagem foi excluída por engano."
fonte: 0da09921c70a
---

Execute o comando:

```
/config lists
```

Ele abre um painel privado, que só você vê, com **todas as listas que este servidor ainda tem**. Cada lista tem uma linha: o nome da lista e o canal onde ela vive, como um link clicável.

Uma lista que ocupa uma das vagas do seu plano é marcada como **em uso** ao lado do canal. Quando você precisa liberar uma vaga, essas são as listas a selar ou excluir. Durante a beta não há limite, então nenhuma lista é marcada. Como uma lista ocupa uma vaga: veja [Como funcionam as três vagas](/docs/premium/#how-the-three-places-work).

Uma lista em que alguém está trabalhando na [Activity](/docs/activity/) é marcada como **na Activity**. Você ainda pode regenerá-la, selá-la ou excluí-la, e a confirmação avisa você antes: veja [O que fica no canal](/docs/activity/#what-stays-in-the-channel).

Por padrão, só os membros com a permissão *Gerenciar servidor* podem usar o `/config lists`, como no resto do `/config`. Veja [Quem pode abrir o /config](/docs/config/#who-can-open-config).

## Um botão, quatro estados

Cada linha tem um único botão que muda de estado a cada vez que você o aperta:

| Estado | Significado |
| :--- | :--- |
| <span class="c-grey">Cinza</span> <img class="inline-ic" src="/icons/noaction.png" alt="" /> | nenhuma ação |
| <span class="c-blue">Azul</span> <img class="inline-ic" src="/icons/refresh.png" alt="" /> | **regenerar** |
| <span class="c-green">Verde</span> <img class="inline-ic" src="/icons/seal.png" alt="" /> | **selar** |
| <span class="c-red">Vermelho</span> <img class="inline-ic" src="/icons/delete.png" alt="" /> | **excluir** |

Marque quantas listas precisar — duas para excluir, uma para selar e três para regenerar, se for o caso — e depois aperte **Aplicar**. Antes de qualquer coisa acontecer, uma janela de confirmação as lista pelo nome, agrupadas por ação: envie-a para seguir em frente, feche-a para cancelar.

O bloco então roda **em ordem**: primeiro as exclusões, depois as selagens, depois as regenerações. Assim um bloco pode liberar uma vaga e usá-la: uma lista que você exclui ou sela passa a vaga dela para uma lista que você regenera.

No fim você recebe um resumo, por nome: as listas excluídas, seladas e regeneradas, e as que não puderam ser tratadas. Cada uma dessas vem com o motivo, por exemplo uma lista que não existe mais, ou uma regeneração sem vaga sobrando no seu plano. O painel então se redesenha com as listas como estão agora.

**Cancelar** fecha o painel e não faz nada. Suas escolhas sobrevivem à troca de página: o cabeçalho diz quantas você marcou em outras páginas, e a confirmação as inclui. As escolhas da página à sua frente ficam no próprio painel, então nunca expiram enquanto você pensa. As de outras páginas são lembradas por uma hora depois da última vez que você mexe no painel.

## Regenerar

Publica a lista de novo, no canal original, com o mesmo conteúdo: tarefas, proprietários, tags e lembretes. Use quando a mensagem da lista foi excluída por engano — os dados ainda estavam lá, só a mensagem tinha sumido.

Três coisas que vale saber:

- **a timeline de atividades acompanha a lista.** A mensagem nova reutiliza o mesmo tópico, então o histórico fica onde estava e nada fica órfão;
- **a mensagem antiga é removida** se ainda existir. É de propósito: uma mensagem deixada para trás ainda tem botões funcionando. Apertá-los faria o bot reconstruir a lista uma segunda vez, deixando duas listas que se afastam uma da outra;
- **regenerar conta como trabalhar na lista.** Uma lista que já ocupa uma das vagas do seu plano a mantém. Uma lista sem vaga precisa de uma livre, ou acaba no resumo entre as não realizadas.

## Selar

Para uma lista que você já terminou, mas quer guardar como registro. A lista **fica no canal** com o mesmo conteúdo, mas sem botões nem menus, e com uma linha *Lista selada* no fim. Todo o resto some:

- a lista não pode mais ser editada, reaberta nem baixada;
- os lembretes dela param;
- ela libera a vaga dela no seu plano;
- ela não aparece mais neste painel, porque os dados dela saem do TTM.

A timeline de atividades fica onde está. Selar não pode ser desfeito: se você pode querer reutilizar a lista, baixe-a antes de selá-la.

A notificação no canal e a linha na timeline seguem as opções do seu servidor: com as duas desativadas, nada registra quem selou a lista.

Uma lista cuja mensagem não existe mais **não pode ser selada**: não sobrou registro para guardar. Ela aparece no resumo entre as não realizadas, com o motivo, e o resto do bloco roda de qualquer forma. Para removê-la, marque-a em vermelho para **excluí-la**.

É a mesma selagem que você obtém com **Selar lista** no painel **Mais** <img class="inline-ic" src="/icons/other.png" alt="" /> de uma lista.

## Excluir

Remove a lista de forma permanente: tarefas, proprietários, tags, lembretes e o histórico de atividades. Um recibo é publicado no canal da lista, e a última linha da timeline registra a exclusão antes de o tópico ser deixado em paz.

É a mesma exclusão que você obtém com **Excluir lista** no painel **Mais** <img class="inline-ic" src="/icons/other.png" alt="" /> de uma lista. Use este comando quando a mensagem da lista não está mais lá para clicar.

<div class="callout"><div class="callout-t">Por que o bot não sabe quais listas estão mortas?</div>Distinguir uma lista viva de uma excluída significa perguntar ao Discord sobre cada lista, toda vez que o painel abre. O TTM não faz isso: ele mostra o que existe e dá um link para cada canal, para você olhar por conta própria. Adivinhar a partir do silêncio é exatamente como dados são destruídos por acidente.</div>

## Se o banco de dados estiver inacessível

Se o banco de dados estiver inacessível, o comando se recusa a abrir e avisa. Cada linha desse painel vem do banco de dados. Uma exclusão que não conseguisse remover os dados deixaria lembretes disparando para uma lista que não aparece mais em lugar nenhum.
