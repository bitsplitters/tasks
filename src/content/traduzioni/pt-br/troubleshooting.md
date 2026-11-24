---
title: "FAQ"
description: "Perguntas frequentes: respostas rápidas para os problemas mais comuns, cada uma com um link para a página que a explica por completo."
fonte: a72339b9982f
---

Encontre abaixo o problema que você está tendo. Cada resposta é curta e leva à página que a explica por completo. Os problemas da lista estão separados por lugar: [no canal](#in-the-channel) e [na Activity](#in-the-activity).

A busca funciona com palavras em português: tente *marcar*, *proprietário*, *lembrete*.

## No canal

### Não encontro o comando `/criar-lista`

O Discord mostra cada comando no idioma do seu app do Discord. Em português, o comando é `/criar-lista`, em inglês `/create-list`. Todos os nomes traduzidos estão em [Nomes dos comandos no seu idioma](/docs/commands/#command-names-in-your-language).

### Não consigo marcar uma tarefa

Confira estes pontos, nesta ordem:

- **Um botão da segunda linha está azul ou vermelho.** Clique nele até ficar desligado. Enquanto um botão está ativo, escolher uma tarefa aplica a ação desse botão. Veja [O seletor de marcação](/docs/the-task-list/#the-check-selector).
- **A tarefa tem um proprietário.** Só podem marcá-la o proprietário, os membros do cargo proprietário e quem tem *Gerenciar mensagens* no canal. Veja [Quem pode marcar uma tarefa](/docs/core-concepts/#who-can-tick-a-task).
- **O menu está desativado.** Alguém está editando a lista, então ela está bloqueada: veja [Pressionei Cancelar e a lista continua bloqueada](#i-pressed-cancel-and-the-list-stays-locked) mais abaixo.
- **O bot diz *Você não tem permissão para usar este recurso neste servidor*.** Seu servidor sincronizou as permissões, e para você a lista é somente leitura. Peça a um administrador e veja [Sincronizar permissões](/docs/configuration/#sync-permissions).
- **A beta acabou e o seu servidor está no plano Free.** Quando todas as vagas do seu plano estão ocupadas, uma lista fora delas recusa a marcação.

  Uma lista criada durante a beta é a exceção: as tarefas dela ainda podem ser marcadas. Veja [Como funcionam as três vagas](/docs/premium/#how-the-three-places-work) e [O que uma lista da beta mantém](/docs/beta/#what-a-beta-list-keeps).

### Pressionei Cancelar e a lista continua bloqueada

O TTM bloqueia uma lista enquanto alguém a edita, e fechar o formulário com **Cancelar** ou com o ✕ não a desbloqueia, porque o Discord não avisa o bot. Qualquer pessoa pode desbloqueá-la: abra **Mais** embaixo da lista e pressione **Desbloquear lista** <img class="inline-ic" src="/icons/unlock.png" alt="" />. Veja [Quando a lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).

### Minhas tags ou meu proprietário não foram salvos

Os menus **Tag** e **Proprietário** esperam você confirmar a escolha. No celular, toque em **Salvar** embaixo do menu aberto. No computador não há botão Salvar: clique em qualquer lugar fora do menu, e fechá-lo aplica a escolha. Veja [Confirmar uma seleção](/docs/channel-tasks/#confirming-a-selection--desktop-vs-mobile).

Com **Manter o estado após a seleção** desativado (o padrão), escolha primeiro as pessoas e depois a tarefa. Veja [Tag](/docs/channel-tasks/#tag).

Se uma tarefa ficou com você em vez de ir para as pessoas que você escolheu, o menu ainda estava vazio quando você escolheu a tarefa: com o menu vazio, **Proprietário** dá a tarefa para você. Para corrigir:

1. Clique em **Proprietário** até ficar vermelho e escolha a tarefa, para remover o proprietário.
2. Clique em **Proprietário** até ficar azul, escolha as pessoas e confirme.
3. Escolha a tarefa de novo.

### Quero dar uma tarefa a várias pessoas

Clique em **Proprietário** até ficar azul. No menu embaixo dos botões, com o texto *Escolha uma tarefa no menu acima para pegá-la, ou escolha quem a recebe*, escolha as pessoas. Confirme a escolha e depois escolha a tarefa.

O TTM cria um cargo para essas pessoas e o define como proprietário. Na Activity, escolha as pessoas no painel da tarefa: veja [Proprietário](/docs/activity-list/#owner).

É um recurso [Premium](/docs/premium/). O bot precisa da permissão *Gerenciar cargos*: um administrador a concede ao cargo do bot em *Configurações do servidor → Cargos*, não em um canal. Veja [Proprietário: uma pessoa, um cargo ou várias pessoas](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).

### Excluí a mensagem da lista por engano

Os dados da lista ainda estão no TTM, e os lembretes dela continuam chegando. Execute `/config lists` e pressione o botão dessa lista até ficar azul (**regenerar**). Depois pressione **Aplicar** e confirme. O TTM publica a lista de novo no canal dela, com o mesmo conteúdo e o mesmo histórico. Veja [Regenerar](/docs/config-lists/#regenerate).

## Na Activity

### A Activity não abre

Confira estes pontos, nesta ordem:

- **O primeiro botão embaixo da lista ainda é Clonar lista.** A lista foi publicada antes de a Activity chegar: ela ganha o botão da Activity na próxima vez que mudar.
- **O botão da Activity está desligado.** Alguém está editando a lista no canal. O botão liga quando a lista é desbloqueada: veja [Quando a lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).
- **O bot diz que você precisa de *Usar atividades*.** É uma permissão do Discord no canal, e um administrador do servidor a ativa para você em *Permissões* do canal.
- **O bot diz *Ainda não vejo a Activity*.** Seu app do Discord pode não ter suporte à Activity. Atualize-o ou tente outro dispositivo.

Veja [Quando a lista não abre](/docs/activity/#when-the-list-doesnt-open).

### A lista mostra só Entrar na Activity

A lista está na [Activity](/docs/activity/) e, enquanto estiver lá, não pode ser alterada no canal. Pressione **Entrar na Activity** para trabalhar nela com os outros. Quando todos saem, a lista volta ao canal com todos os botões. Veja [Entrar com os outros](/docs/activity/#join-the-others).

### Não consigo marcar uma tarefa na Activity

O TTM diz por quê. Em geral:

- **A tarefa tem um proprietário.** Um balão na caixa avisa. A regra é a mesma do canal: veja [Quem pode marcar uma tarefa](/docs/core-concepts/#who-can-tick-a-task).
- **Alguém está editando essa tarefa.** Tocando na caixa dela você vê quem. As outras tarefas continuam livres.
- **Alguém está editando a lista inteira** com **Editar a lista**. A linha embaixo da lista diz quem, e as caixas voltam quando a pessoa terminar. Veja [Quem está editando o quê](/docs/activity-list/#who-is-editing-what).
- **O banco de dados não responde.** Uma faixa avisa, e a lista fica somente leitura até ele voltar: veja [Quando o banco de dados não responde](/docs/activity/#when-the-database-isnt-responding).

### A lista demora a voltar da Activity

A Activity foi fechada sem pressionar **Sair**. Para o TTM, uma janela fechada parece uma conexão que caiu por um instante: ele espera 30 segundos para você voltar e depois leva a lista de volta ao canal.

Com um celular deixado em segundo plano ou bloqueado, pode levar até um minuto, porque o bot primeiro precisa perceber que a página parou de responder.

**Sair** avisa o bot na hora que você terminou: se você é o último na lista, ela volta ao canal imediatamente. Veja [De volta ao canal](/docs/activity/#back-to-the-channel).

### A Activity recarrega depois que eu mudo o tema do Discord

Quando você muda o tema, o Discord recarrega a Activity por conta própria, às vezes até um minuto depois: o TTM não consegue impedir. A lista volta sozinha em instantes, com o tema que você tinha.

Se o seu tema era **Igual ao Discord**, ele passa a ser o tema que você estava vendo. Para voltar a seguir o Discord, escolha **Igual ao Discord** na engrenagem: veja [Suas configurações](/docs/activity/#your-settings).

Depois de um recarregamento, **Sair** ainda tira você da lista, mas, por causa de um bug do Discord, não consegue fechar a janela: feche-a pelo Discord.

## Lembretes

### Meu lembrete não chegou

- **O lembrete vai para o proprietário da tarefa.** Só é você se a tarefa não tinha proprietário quando você o definiu. Uma pessoa recebe uma mensagem direta, e um cargo recebe uma menção no canal da lista. Veja [As regras](/docs/reminders/#the-rules).
- **O proprietário precisa permitir mensagens diretas de membros do servidor**, nas *Configurações de privacidade* do servidor. Veja [Lembretes por mensagem direta](/docs/known-limits/#reminders-by-direct-message).
- **O proprietário é um cargo que não pode ser mencionado.** O lembrete aparece no canal, mas ninguém recebe notificação. Veja [Lembretes para um cargo](/docs/known-limits/#reminders-to-a-role).
- **O cargo proprietário foi excluído.** O lembrete não é enviado a ninguém. Escolha outro proprietário para a tarefa. Veja [Lembretes para um cargo](/docs/known-limits/#reminders-to-a-role).
- **O TTM não pode escrever no canal da lista.** Veja [As permissões que o TTM pede](/docs/core-concepts/#the-permissions-ttm-asks-for).
  - Um cargo que o TTM criou para várias pessoas: cada uma recebe o lembrete por mensagem direta, com o motivo.
  - Qualquer outro cargo: o lembrete não é entregue até um administrador conceder a permissão.
- **O proprietário foi removido ou a lista foi selada.** Nesses casos o lembrete some. Antes de remover um proprietário cujo lembrete ainda não disparou, o TTM pede que você confirme. Veja [Proprietários e tags](/docs/owners-and-tags/) e [Selar](/docs/config-lists/#seal).
- **A tarefa está marcada.** Concluir uma tarefa interrompe o lembrete dela, e uma tarefa marcada não pode receber um novo.

### Quero um lembrete semanal

O TTM não tem unidade para semanas, então uma semana são 7 dias. Primeiro, um administrador ativa **Lembretes recorrentes** em [`/config app`](/docs/configuration/#recurring-reminders) (um recurso [Premium](/docs/premium/)).

No canal:

1. Clique em **Lembrete** até ficar azul, escolha a tarefa e envie o formulário **Quando**.
2. No cartão que aparece, pressione **Editar recorrência**.
3. Escolha **A cada** 7 e **Unidade** dias e, em **Quantas vezes, no total**, o número de semanas, por ex. 4 para quatro semanas. Depois envie o formulário.
4. Pressione **Salvar** no cartão.

Na Activity, toque no texto da tarefa e depois em **Lembrete**: os mesmos três menus estão no painel, embaixo da data. Escolha-os e depois toque em **Salvar**.

Veja [Os campos da repetição](/docs/reminders/#the-repetition-fields).

## Planos e permissões

### Não consigo criar uma lista, ou o bot diz para liberar uma vaga

Durante a beta não há limite de listas. Depois dela, o plano Free permite trabalhar com três listas por vez, e o TTM recusa uma quarta até você selar ou excluir uma: veja [O que acontece com a quarta lista](/docs/premium/#what-happens-to-a-fourth-list).

### Quem pode selar ou excluir uma lista?

No painel **Mais** de uma lista, só os membros com *Gerenciar mensagens* no canal veem **Selar lista** e **Excluir lista**. Em `/config lists` vale a regra do `/config`: por padrão, os membros com *Gerenciar servidor*. Veja [O que há dentro de Mais](/docs/the-task-list/#whats-inside-more) e [Quem pode abrir o /config](/docs/config/#who-can-open-config).

### Não encontro o comando `/config`

Por padrão, só os membros com a permissão *Gerenciar servidor* veem o `/config`. Um administrador pode liberá-lo para o seu cargo em *Configurações do servidor → Integrações → Team Tasks Manager*. Veja [Quem pode abrir o /config](/docs/config/#who-can-open-config).

### O bot diz que falta uma permissão

Há dois casos diferentes:

- **Falta uma permissão ao bot.** A mensagem dele nomeia a permissão e os passos para concedê-la. Quando o bot não pode escrever no canal da lista, a mensagem chega só para você e no máximo uma vez por hora. Para que serve cada permissão: [As permissões que o TTM pede](/docs/core-concepts/#the-permissions-ttm-asks-for).
- **Você não tem permissão para usar um recurso.** Essa regra é definida pelos administradores do servidor, não pelo bot. Veja [Sincronizar permissões](/docs/configuration/#sync-permissions).

---

Continua com problema? Pergunte no [servidor do Discord](/docs/community/). Passos claros e uma captura de tela nos ajudam a responder rápido.
