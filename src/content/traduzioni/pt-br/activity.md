---
title: "A Activity"
description: "Abra uma lista em uma janela dentro do Discord, onde sua equipe trabalha nela junta e vê cada mudança enquanto acontece."
fonte: 3944b7fd591c
---

Experimente o modo Activity: mais fluido e livre dos limites dos canais de texto, ideal para sessões de trabalho mais longas ou colaborativas.

A **Activity** abre uma lista em uma janela dentro do Discord, no computador e no celular. Várias pessoas trabalham nela ao mesmo tempo e veem cada mudança ao vivo. Quando a última pessoa sai, a lista volta para o canal dela com um resumo do que mudou. Ela fala o idioma do seu Discord se o TTM o falar, e inglês caso contrário.

Esta página trata de entrar e sair. Como você trabalha na lista lá dentro: [Trabalhando em uma lista na Activity](/docs/activity-list/).

## Quatro jeitos de entrar

- **De uma lista em um canal** — aperte **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, o primeiro botão sob a lista. Essa lista abre. Veja [Abrir uma lista na Activity](#open-a-list-in-the-activity).
- **Da barra de mensagens** — em um canal de texto, abra o **Iniciador de apps** do Discord, escolha o Team Tasks Manager e depois **Launch**. Veja [O início do canal](#the-home-of-the-channel).
- **De uma chamada de voz** — aperte o botão de Atividades da chamada e escolha o Team Tasks Manager. Veja [O início do canal](#the-home-of-the-channel).
- **De alguém que já está dentro** — aperte **Entrar na Activity** sob a lista, o **Participar** do Discord no perfil da pessoa, ou o convite que ela enviar para você. Veja [Entrar com os outros](#join-the-others).

O Iniciador de apps e a chamada de voz abrem o início do canal, com todas as listas dele: você escolhe uma ali, ou cria uma nova.

## Abrir uma lista na Activity

Aperte **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, o primeiro botão da [primeira linha](/docs/the-task-list/#row-1--acts-on-the-whole-list), em um canal de texto ou no chat de um canal de voz. Uma lista mais antiga recebe o botão na primeira vez que muda.

Se a janela não conectar em 30 segundos, o TTM avisa você e a lista continua no canal.

### Quando a lista não abre

O botão segue as regras do resto da lista, como as [permissões sincronizadas](/docs/configuration/#sync-permissions) no `/config app`. O TTM também recusa, em uma mensagem que só você vê:

- sem a permissão *Usar atividades* do Discord no canal, que um administrador concede em *Permissões* do canal;
- enquanto o banco de dados não responde;
- enquanto alguém está editando a lista no canal: veja [Quando a lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked);
- quando o seu plano não tem uma vaga livre: veja [Como funcionam as três vagas](/docs/premium/#how-the-three-places-work).

## Entrar com os outros

Enquanto uma lista está na Activity, a mensagem dela mantém um único botão, **Entrar na Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, e a última linha diz <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> *Estão trabalhando nesta lista na Activity*. O **Participar** do Discord, no perfil de quem está dentro, também funciona. Enquanto isso, nada muda a lista a partir do canal.

Para trazer alguém, aperte **Convidar**, no canto superior direito do início e de cada lista, ao lado de quem está lá. O Discord abre a própria janela, onde você escolhe amigos ou um canal para enviar o convite. Isso exige a permissão *Criar convite* do Discord no canal: sem ela, o TTM avisa você no botão e diz como um administrador a concede.

## Seu status no Discord

Enquanto você está na Activity, o seu perfil do Discord mostra o Team Tasks Manager com *Planejando tarefas com a equipe*, no seu idioma. Não diz nada sobre a lista, o servidor ou o canal. O Discord pergunta antes, na janela em que você deixa o TTM saber quem você é. Se você disser não, a Activity abre do mesmo jeito, sem essa linha.

## O início do canal

Quando você começa pelo **Iniciador de apps** ou por uma **chamada de voz** (veja [Quatro jeitos de entrar](#four-ways-in)), o TTM abre o início do canal, com o nome do canal como título. Tópicos, posts de fórum, canais de avisos e palcos ficam de fora. O início tem três partes:

- **Nova lista**, sob o título — um título e as tarefas, escritos como em [Crie sua primeira lista](/docs/getting-started/#2-create-your-first-list), criada aqui e já na Activity. O resumo que a acompanha de volta ao canal começa com a criação dela e pode mencionar os proprietários das tarefas: veja [Quando uma lista é criada](/docs/configuration/#when-a-list-is-created). Os arquivos são importados com `/criar-lista`, no canal.
- **Agora na Activity** — quem está em cada lista e quem está editando. Toque em uma para entrar.
- **No canal** — as outras listas, as mais novas primeiro. Toque em uma para lê-la e depois em **Levar para a Activity**, que espera enquanto alguém a edita no canal.

O botão **Início** <img class="inline-ic" src="/icons/home.png" alt="" />, no canto superior esquerdo de cada lista, leva você de volta para lá.

## De volta ao canal

**Sair** traz a lista de volta quando você está sozinho. Com outras pessoas, você escolhe:

- **Sair sem os outros** — os outros continuam;
- **Levar de volta ao canal para todos** — a Activity fecha para todos.

A lista também volta 30 segundos depois que a última pessoa sai, inclusive fechando a janela ou bloqueando o celular. **Sair** e **Início** fazem isso na hora.

Depois vem um **resumo**, uma linha por mudança com quem a fez: no canal como diz o seu [Modo de notificação](/docs/configuration/#notification-mode), e completo no tópico da [timeline de atividades](/docs/configuration/#history-tracking). Ele usa o idioma de quem levou a lista para a Activity.

## O que fica no canal

**Clonar**, **Download**, **Selar**, **Excluir**, **Desbloquear** e a importação de um arquivo: veja [Ações da lista](/docs/list-actions/). Na Activity uma lista se desbloqueia sozinha.

Um administrador ainda pode **Excluir**, **Selar** ou **Regenerar** uma lista na Activity pelo [`/config lists`](/docs/config-lists/). Excluir a remove também para quem está dentro; Selar a leva de volta ao canal primeiro.

## Quando o banco de dados não responde

Nenhuma lista entra na Activity, e o início esconde **Nova lista**. Uma lista que já está nela fica somente leitura até o banco de dados voltar, e uma faixa oferece levá-la de volta ao canal.

## Suas configurações

A engrenagem no canto superior direito tem dois grupos. Em **Para você, em todo lugar**, **Fuso horário** é o seu fuso horário, o mesmo do [/my timezone](/docs/my-timezone/): o TTM o propõe no canal e também em todos os servidores, e **Voltar ao automático** o esquece. Em **Neste dispositivo**, **Tamanho do texto**, **Tema** e **Linhas espaçadas**, mais espaço para tocar no celular, valem só para você, naquele dispositivo.

## Para onde ir depois

- [Trabalhando em uma lista na Activity](/docs/activity-list/) — as caixas, o painel de uma tarefa e quem está editando o quê.
- [A lista no canal](/docs/the-task-list/) — todos os botões sob a lista, no canal.
- [O que o Premium desbloqueia](/docs/premium/) — as vagas do seu plano e o que o plano pago acrescenta.
- [FAQ](/docs/troubleshooting/#in-the-activity) — respostas rápidas para os problemas mais comuns.
