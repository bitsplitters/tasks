---
title: "Proprietários e tags"
description: "A quem uma tarefa pertence, quem ela menciona e os cargos que o TTM cria quando várias pessoas são donas de uma tarefa."
fonte: 3beeb818c97b
---

Uma tarefa pode ter um **proprietário** e várias **tags**. O proprietário é a quem a tarefa pertence: quem pode marcá-la e quem recebe o lembrete dela. As tags são os usuários e cargos mencionados na tarefa, por exemplo as pessoas a avisar quando ela for concluída.

Você define os dois com os botões **Proprietário** <img class="inline-ic" src="/icons/owner.png" alt="" /> e **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" />: no canal, na segunda linha sob a lista; na Activity, no painel de uma tarefa.

<div class="howto" id="how-to-do-it"><div class="howto-t">Como fazer</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#owner"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />No canal</span><span class="howto-d">Proprietário e Tag, na segunda linha sob a lista.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#owner"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Na Activity</span><span class="howto-d">Proprietário e Tag, no painel de uma tarefa.</span></a></div></div>

## Proprietário: uma pessoa, um cargo ou várias pessoas

O proprietário é a quem uma tarefa pertence: quem pode marcá-la e quem recebe o lembrete dela. Pode ser:

- **Uma pessoa** — ela é dona da tarefa, e o lembrete chega a ela por mensagem direta.
- **Um cargo** — todos os que têm esse cargo são donos da tarefa, e qualquer um deles pode marcá-la. O lembrete é uma mensagem no canal da lista que menciona o cargo.
- **Várias pessoas** — o TTM cria um cargo para elas e o torna o proprietário. Este é um recurso [Premium](/docs/premium/).

Você não pode misturar pessoas e cargos, e pode escolher no máximo um cargo: uma tarefa tem um proprietário.

**Uma tarefa para várias pessoas** funciona como uma tarefa de um cargo. O cargo se chama TTM1, TTM2 e assim por diante, e só as pessoas que você escolheu o têm. O TTM precisa da permissão *Gerenciar cargos* para criá-lo: veja [Os cargos que o TTM cria](#the-roles-ttm-creates).

**Para pegar uma tarefa para você**, no canal: clique em **Proprietário** até ele ficar azul e depois escolha a tarefa sem escolher ninguém. Funciona em uma tarefa sem proprietário. Uma tarefa que já tem proprietário só muda se você escolher a si mesmo no menu: veja [Proprietário](/docs/channel-tasks/#owner).

**Quem recebe uma tarefa de outra pessoa é mencionado** na notificação no canal, então o Discord o avisa: uma pessoa, ou todos do cargo. Na Activity, a menção chega com o resumo no fim da sessão.

**Remover o proprietário remove também o lembrete dele**, porque não sobra ninguém para recebê-lo. Se o lembrete ainda não disparou, o TTM pede que você confirme antes.

Como o lembrete chega a uma pessoa ou a um cargo: veja [Como o lembrete chega](/docs/reminders/#how-the-reminder-arrives). Quem pode marcar uma tarefa com proprietário: veja [Quem pode marcar uma tarefa](/docs/core-concepts/#who-can-tick-a-task).

## Tags

Uma tag é um usuário ou um cargo mencionado na tarefa. Uma tarefa pode ter **até 25 tags**, pessoas e cargos juntos. As tags não mudam quem pode marcar a tarefa: elas dizem quem deve saber dela.

Uma nova escolha de tags **substitui** a antiga: a tarefa fica marcada exatamente com as pessoas e os cargos que você escolheu. Para adicionar alguém, mantenha os outros na sua escolha. Remover as tags remove todas de uma vez.

O jeito de escolher é um pouco diferente nos dois lugares. No canal, uma configuração do servidor decide se você sobrescreve as tags ou as edita ao vivo: veja [Tag](/docs/channel-tasks/#tag). Na Activity você sempre parte das tags que a tarefa tem agora: veja [Tag](/docs/activity-list/#tag).

No texto de uma lista, uma tag é `@` e o nome, como `@Ava`, e o proprietário é o mesmo nome seguido de dois-pontos, `@Ava:`: veja [Editando uma lista à mão](/docs/writing-a-list/#owners-the-mention-with-a-colon).

## Os cargos que o TTM cria

Esta parte é para quem administra o servidor: o que o TTM faz com os cargos que cria para tarefas de várias pessoas, do que ele precisa e quando os exclui.

Quando você dá uma tarefa a várias pessoas, o TTM:

- cria um cargo chamado **TTM** seguido do primeiro número livre: TTM1, TTM2 e assim por diante. O cargo é **mencionável**, **não tem permissões** e fica no fim da lista de cargos;
- dá o cargo às pessoas que você escolheu, uma de cada vez;
- torna o cargo o proprietário da tarefa.

### Do que ele precisa

O bot precisa da permissão *Gerenciar cargos*, e o link de convite a inclui. Sem ela, o TTM não cria nem exclui cargos. Em um servidor que adicionou o bot antes, um administrador pode ter que concedê-la ao cargo do bot. Faça isso em *Configurações do servidor → Cargos*, não em um canal.

Em um canal, o Discord mostra a mesma permissão como *Gerenciar permissões*. Lá ela faz outra coisa: permite que um cargo mude as permissões daquele canal.

Um servidor pode ter no máximo **250 cargos**: este é um limite do Discord. Quando o servidor chega a ele, o TTM não consegue criar o cargo e avisa.

Dar o cargo também leva tempo. O Discord deixa um bot fazer isso dez vezes a cada dez segundos, então 25 pessoas levam cerca de vinte segundos. Com mais de dez pessoas, o TTM avisa quanto tempo vai demorar.

### Quando o TTM cria um cargo novo

**O TTM nunca muda um cargo depois de criá-lo.**

- Escolher pessoas diferentes, mesmo uma a mais ou uma a menos, cria um cargo novo.
- Escolher exatamente as mesmas pessoas do proprietário atual não muda nada.
- No canal, com **Manter o estado após a seleção** ativado, a mesma seleção em várias tarefas seguidas reutiliza o cargo criado para a primeira tarefa.

### Quando um cargo deixa de ser do TTM

O TTM se lembra dos cargos que cria e das pessoas a quem os deu. Um cargo continua sendo do TTM só enquanto estiver do jeito que o TTM o deixou:

- o mesmo nome;
- nenhuma permissão, nem no servidor nem em um canal;
- o mesmo número de membros.

Renomeie-o, dê a ele uma permissão, adicione-o às permissões de um canal, ou adicione ou remova um membro: ele passa a ser um dos cargos do seu servidor. O TTM verifica isso antes de excluir um cargo e quando mostra o proprietário de uma tarefa para alterá-lo. Um cargo que não é mais do TTM nunca é excluído, e a escolha de proprietário mostra o cargo em vez das pessoas.

Então, para manter um cargo para o seu servidor, **renomeie-o**. Assim você pode usá-lo em qualquer lugar. Uma cor nova ou uma posição nova não bastam: o TTM ainda excluiria o cargo quando nenhuma lista o usasse mais.

O TTM vê *quantos* membros um cargo tem, mas não *quem* são. Então, se você trocar um membro por outro, o TTM não percebe: ele continua mostrando as pessoas a quem deu o cargo.

### Quando o TTM exclui um cargo

O TTM exclui um cargo que criou, também do servidor, quando as duas condições a seguir são verdadeiras:

- **nenhuma lista o usa mais**, como proprietário ou como tag, e nenhuma permissão de comando o usa;
- ele ainda parece ser do TTM.

O TTM verifica a cada dez minutos e nunca mexe em um cargo criado há menos de dez minutos. Alguns cargos sempre ficam:

- os cargos de uma lista **selada**, porque a mensagem selada ainda os mostra;
- todos os cargos que o TTM criou, quando o bot é **removido** de um servidor.
