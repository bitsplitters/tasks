---
title: "/config"
description: "O comando de quem cuida do TTM em um servidor: três painéis para configurações, listas e webhooks, e quem pode abri-los."
fonte: 2d6f9fe746d2
---

`/config` é o comando de quem cuida do TTM no seu servidor. Ele tem três subcomandos, cada um com a sua função:

| Subcomando | Para que serve |
| :--- | :--- |
| [`/config app`](/docs/configuration/) | Como o bot se comporta aqui: notificações, histórico, as dicas para quem está começando, lembretes, fuso horário e permissões. |
| [`/config lists`](/docs/config-lists/) | Todas as listas do servidor: regenere uma excluída, sele ou exclua as que você já concluiu. |
| [`/config webhook`](/docs/config-webhook/) <a class="premium-tag" href="/docs/premium/" title="Desbloqueado para todos os servidores durante a beta">Premium</a> | Crie, veja, edite ou exclua os webhooks que as suas tarefas chamam quando são concluídas ou reabertas. |

As tarefas em si nunca são tratadas aqui: tudo sobre uma única lista fica nos botões dela, no canal e na Activity. Veja [A lista no canal](/docs/the-task-list/) e [Trabalhando em uma lista na Activity](/docs/activity-list/).

## Quem pode abrir o /config

Por padrão, só membros com a permissão *Gerenciar servidor* veem `/config`. Isso vale para `/config app`, `/config lists` e `/config webhook`.

Um admin pode abri-lo para outros cargos ou membros, ou fechá-lo em alguns canais. Faça isso em *Configurações do servidor → Integrações → Team Tasks Manager*, no comando `/config`. O Discord define essas regras para o comando inteiro, não para cada subcomando: quem pode abrir `/config` pode usar todos os painéis dele.

As permissões que você sincroniza com **Carregar permissões** em `/config app` valem para as suas listas, não para `/config`. Veja [Sincronizar permissões](/docs/configuration/#sync-permissions).
