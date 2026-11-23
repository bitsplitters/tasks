---
layout: ../../layouts/Legal.astro
title: "Política de Privacidade"
description: "Quais dados o bot do Discord Team Tasks Manager coleta, por quê e como são tratados."
updated: "Última atualização: 23 de novembro de 2026"
fonte: c502da0ab375
---

Esta Política de Privacidade explica quais dados o bot **Team Tasks Manager** (“TTM”) coleta e como os tratamos. Ela vale para o uso do bot no Discord, Activity incluída (veja [A Activity](#a-activity)), para o nosso servidor da comunidade no Discord (veja [Nosso servidor da comunidade](#nosso-servidor-da-comunidade)) e para os nossos sites (veja [Nossos sites](#nossos-sites)). Para saber dos seus direitos segundo a lei de proteção de dados da UE, veja também a nossa [página do GDPR](/pt-br/gdpr/).

## Quem somos

O controlador dos dados é a **bitsplitters** — Alessandro Vurro, Via di Dragone 478/B, 00126 Roma (RM), Itália. Número de VAT (IVA) italiano 18349651002, e-mail certificado (PEC): alessandro.vurro@pec.it. Contato: **info@bitsplitters.app**.

## O que coletamos

O TTM guarda apenas o que é necessário para manter listas de tarefas dentro do seu servidor:

- **Identificadores do Discord** — IDs de servidor (guild), canal e mensagem; IDs de usuário e de cargo quando você atribui um proprietário, adiciona uma tag ou configura permissões.
- **Conteúdo das tarefas que você cria** — títulos das listas e texto das tarefas, incluindo tudo o que você digitar nelas (menções, links, anotações).
- **Lembretes** — datas, intervalos, repetições e o fuso horário definido para o servidor.
- **Seu fuso horário pessoal** — o fuso que você escolhe com `/my timezone` ou na engrenagem da [Activity](#a-activity) ou, enquanto não escolher um, o que você define no lugar do proposto quando escolhe uma data: em um lembrete, em **Clonar lista** com lembretes, ou na nova data de **Reabrir tudo**, no canal como na Activity. Ele é guardado junto ao seu ID de usuário do Discord, com a informação de se foi você que o escolheu, e reaproveitado entre servidores. Manter o fuso proposto não guarda nada, e **Voltar ao automático** o exclui.
- **Seu canal de mensagens diretas** — quando você é proprietário de uma tarefa, os lembretes dela chegam a você por mensagem direta, então o bot guarda o ID do canal de mensagens diretas dele com você, para entregá-los com uma única requisição ao Discord. Se você não aceita mensagens diretas, ele guarda também até quando não tentar de novo (seis horas depois da tentativa que falhou). Os dois são guardados junto ao seu ID de usuário do Discord, como o fuso horário; as mensagens em si não são guardadas.
- **Se você aprendeu a segunda linha** — quando você aperta **Conteúdo** ou **Lembrete** sob uma lista, o bot envia uma dica curta com o passo seguinte, até a primeira vez que você escolhe uma tarefa no menu da lista com um deles ativado. Daí em diante a dica não volta, em nenhum servidor: para isso o bot guarda o seu ID de usuário do Discord e quando você fez isso, nada mais.
- **Cargos que o TTM cria** — quando uma tarefa é dada a várias pessoas, o TTM cria um cargo e guarda o ID dele, o nome que deu, os IDs de usuário das pessoas a quem o deu, quem o pediu, quando e em qual dos idiomas do bot: para mostrar essas pessoas quando a tarefa é editada, para excluir o cargo quando nenhuma lista o usa mais e — o idioma — para escrever o aviso que acompanha um lembrete enviado a essas pessoas por mensagem direta quando o TTM não consegue publicar no canal da lista.
- **Configuração** — ajustes por servidor, como modo de notificação, registro do histórico, opção de push e fuso horário.
- **Webhooks** — o método HTTP, a URL, os cabeçalhos e o corpo que você define, e a associação deles às tarefas.
- **Registros de atividade** — registros das ações feitas nas listas (quem fez o quê e quando), quando o registro do histórico está ativado.
- **A Activity** — quando você abre uma lista na Activity, a janela do TTM dentro do Discord: quem você é, uma chave para a janela e um registro das alterações até a publicação do resumo delas. Veja [A Activity](#a-activity).
- **Estatísticas agregadas de uso** — contadores por servidor: com que frequência cada recurso é usado e quando foi usado pela última vez. Também, todos os dias, os totais de listas, tarefas, lembretes e webhooks, e o número de membros do servidor. Por fim, para cada idioma do app do Discord, quantas interações, pessoas e servidores houve naquele dia: para contar cada pessoa e cada servidor uma só vez, o TTM guarda os IDs deles na memória apenas naquele dia e salva somente os totais. Nenhuma dessas estatísticas registra quem fez o quê.

## O que NÃO coletamos

- **Não** lemos nem guardamos as suas mensagens gerais ou mensagens diretas do Discord. O bot não usa nenhum dos acessos privilegiados do Discord: nem o conteúdo das mensagens, nem a lista de membros, nem a presença.
- **Não** coletamos endereços de e-mail, senhas nem dados de pagamento por meio do bot. Se você nos escreve por e-mail, usamos o seu endereço apenas para responder.

## Por que usamos

Tratamos esses dados exclusivamente para **fornecer o serviço**: exibir e atualizar as suas listas, enviar lembretes e notificações, executar os webhooks que você configura, e manter e melhorar o bot (por meio das estatísticas agregadas).

## Compartilhamento

**Não** vendemos os seus dados. Os dados são tratados pelo nosso provedor de infraestrutura, a **OVHcloud**, que hospeda o bot e o banco de dados dele na **França (UE)**, como operadora em nosso nome. O bot também funciona na plataforma **Discord**, então o seu uso está sujeito à [Política de Privacidade do Discord](https://discord.com/privacy). O Discord tem sede nos Estados Unidos: veja [Transferências internacionais](/pt-br/gdpr/#transferências-internacionais). A **Cloudflare**, também com sede nos Estados Unidos, hospeda a página da [Activity](#a-activity) e leva a conexão dela com o bot. Quando você usa webhooks, o TTM envia os dados que você configurou para os **endpoints de terceiros que você escolhe** — esses serviços estão fora do nosso controle.

**Relatórios de erro.** Quando algo falha de forma inesperada, o bot envia um relatório para um canal privado no nosso servidor do Discord, que só nós podemos ver. Um relatório contém os IDs do servidor e do usuário envolvidos e os detalhes técnicos da falha. Pode conter um trecho do que estava sendo processado, como um pedaço de uma tarefa. Excluímos esses relatórios assim que a falha é corrigida e, no máximo, em 12 meses.

## Retenção

Os dados são mantidos enquanto o bot estiver presente e em uso no seu servidor.

**Quando o bot é removido de um servidor**, excluímos o conteúdo e os dados operacionais dele: as listas de tarefas e suas tarefas, tags, lembretes e eventos de lembrete agendados, webhooks e suas ações, o histórico de atividade, os registros de alterações da Activity e os registros dos cargos que o TTM criou — os cargos em si ficam no servidor, que passa a gerenciá-los.

**O que mantemos** é o mínimo necessário para operar o serviço e medir a sua adoção: o ID do servidor junto com os ajustes configurados para ele, as datas em que o bot entrou e saiu, os ajustes de permissão de comandos, os registros de assinatura quando houver, e contadores de uso não identificáveis. **Nenhum conteúdo de tarefa é mantido.**

**Logs operacionais** — para diagnosticar falhas, o bot grava logs técnicos no servidor onde roda. No nível de log usado em produção, eles **não** contêm o texto das suas tarefas nem os títulos das suas listas; podem conter identificadores do Discord, por exemplo o ID do usuário envolvido em um erro. Os logs são excluídos automaticamente após **30 dias**.

**Backups** — fazemos backup do banco de dados todos os dias, para restaurar o serviço após uma falha. Os backups são mantidos por **14 dias**, na UE. Os dados que você exclui, ou que excluímos quando o bot sai de um servidor, podem portanto sobreviver em um backup por até 14 dias; depois desaparecem de vez. Um backup só é usado para restaurar o serviço.

**Seu fuso horário pessoal, canal de mensagens diretas e segunda linha** — o fuso horário que você escolheu ou definiu no lugar do proposto (**Voltar ao automático** o exclui por conta própria), o ID do seu canal de mensagens diretas com o bot (com, se você não aceita mensagens diretas, até quando não tentar de novo) e o registro de que você aprendeu a segunda linha são guardados junto ao seu ID de usuário do Discord e não estão ligados a nenhum servidor em particular, então remover o bot de um servidor não os exclui. Escreva para **info@bitsplitters.app** com o seu ID de usuário do Discord e nós os excluiremos. Excluir o registro da segunda linha só faz a dica voltar.

**A Activity** — a chave da janela dura 24 horas, e a impressão digital dela é excluída em até uma hora depois de expirar. O registro das alterações feitas ali é excluído quando a lista volta ao canal. Veja [A Activity](#a-activity).

**Você pode excluir uma lista sozinho**, sem nos pedir: o botão **Excluir lista** no painel *Mais* da lista, ou `/config lists` quando a mensagem da lista não existe mais. A exclusão é imediata e permanente, e leva junto as tarefas, os proprietários, as tags, os lembretes e o histórico de atividade da lista.

**Selar lista**, no mesmo painel, também remove os dados da lista do TTM, mas deixa a mensagem dela — e o seu tópico de timeline — no canal como mensagens comuns do Discord, sob o controle do seu servidor. Os cargos que o TTM criou para essa lista também ficam, e o TTM os esquece.

**Um cargo que o TTM criou** é esquecido — o registro dele e as pessoas a quem foi dado — assim que nenhuma lista o usa mais, como proprietário ou como tag: se o cargo ainda está como o TTM o deixou (o mesmo nome, nenhuma permissão, o mesmo número de membros), o TTM também o exclui do servidor; caso contrário, deixa-o ao seu servidor. O TTM também esquece os cargos de uma lista quando você a sela, e todos eles quando o bot é removido do servidor.

Você pode pedir a exclusão a qualquer momento (veja [GDPR](/pt-br/gdpr/)); também podemos excluir os dados antes.

## A Activity

A [Activity](/docs/activity/) abre uma lista em uma janela dentro do Discord. Além do que o bot já trata:

- **Login.** Quando você a abre, você deixa o TTM saber quem você é, por meio do Discord. O Discord dá ao TTM o perfil básico da sua conta — seu ID de usuário, nome e avatar, o idioma do seu app do Discord e alguns dados da conta, como suas insígnias e o seu tipo de Nitro — nunca o seu e-mail. O TTM guarda apenas o seu ID de usuário e usa o idioma para os textos da janela e para os totais diários por idioma (veja [O que coletamos](#o-que-coletamos)); não guarda o resto, nem o acesso que o Discord lhe concede.
- **Seu status no Discord.** Na mesma janela, o Discord pergunta se o TTM também pode mostrar no seu perfil que você está na Activity. Se você concordar, o TTM envia ao Discord uma linha, *Planejando tarefas com a equipe* no seu idioma, que os seus amigos e os membros dos seus servidores veem enquanto você está lá. Ela não diz nada sobre a lista, o servidor ou o canal, e o TTM não guarda nada por causa dela. Se você disser não, a Activity abre do mesmo jeito, sem a linha.
- **A chave da janela.** O TTM dá à janela uma chave que dura 24 horas, para que ela se reconecte sozinha depois de uma reinicialização do bot. O TTM guarda apenas uma impressão digital da chave, com o seu ID de usuário, o servidor e o canal a que se destina, quando foi criada e quando expira. As impressões digitais expiradas são excluídas em até uma hora.
- **As alterações.** Enquanto uma lista está na Activity, o TTM registra cada alteração, para escrever o resumo publicado quando a lista volta ao canal: quem a fez e quando, o número e o texto da tarefa e, conforme a alteração, os proprietários, as tags ou as pessoas mencionadas (como IDs do Discord), a data de um lembrete ou de **Reabrir tudo**, o nome de um webhook, o texto das tarefas removidas por **Limpar a lista**. Esses registros são excluídos quando a lista volta ao canal: assim que o resumo é publicado, ou na hora, se não puder ser, por exemplo porque o canal não existe mais. O que resta é uma linha sem dados pessoais — qual lista, o idioma do resumo dela, quando abriu e fechou, e por quê — que acompanha a lista.
- **Quem está lá.** Quem está na Activity, e quem está editando o quê, fica apenas na memória, enquanto a lista está lá. Para mostrar nomes, o TTM guarda na memória por dez minutos os que recebe do Discord — das pessoas na Activity e, com **Proprietário** e **Tag**, dos membros cujo nome corresponde ao que você digita — para não pedir de novo. Ele não os guarda de forma permanente.
- **A página e a conexão dela.** A janela é uma página hospedada pela **Cloudflare, Inc.** (Estados Unidos), como operadora em nosso nome, que o Discord carrega pelo seu próprio proxy. A Cloudflare também leva a conexão entre a janela e o bot até o nosso servidor. O que eles trocam, como a lista e suas alterações, passa pelo proxy do Discord e pela rede da Cloudflare, criptografado em cada trecho: cada um deles o descriptografa para encaminhá-lo, como esses serviços fazem. Como os nossos sites, a página não usa cookies; diferente deles, não carrega estatísticas de visita. No seu navegador ela guarda os seus ajustes da página — tamanho do texto, tema e linhas espaçadas — que ficam no seu dispositivo e nunca chegam ao TTM. Também guarda a chave da janela, no armazenamento de sessão que o navegador esvazia quando você fecha o Discord, para não precisar entrar de novo quando o Discord a recarrega: **Sair** a exclui na hora. Como qualquer servidor web, a Cloudflare registra dados técnicos de cada requisição e conexão, por segurança e para operar o serviço. Veja a [Política de Privacidade da Cloudflare](https://www.cloudflare.com/privacypolicy/).
- **Base legal.** Execução do serviço que você pede quando abre uma lista na Activity (art. 6(1)(b) do GDPR).

## Nosso servidor da comunidade

Mantemos um servidor do Discord para os usuários do TTM ([como entrar](/docs/community/)). Entrar é opcional e é separado do uso do bot: o bot não precisa dele.

- **O que vemos.** Como em qualquer servidor do Discord, os administradores e moderadores dele podem ver o seu nome de usuário, avatar e perfil como mostrados no servidor, os cargos que você tem lá e as mensagens que você publica nos canais. Não as copiamos para nenhum outro lugar, exceto as transcrições dos tickets descritas abaixo.
- **Moderação, cargos e tickets.** O servidor usa o **MEE6**, um bot do Discord de terceiros, para dar cargos (por exemplo o cargo de membro depois que você aceita as regras), ajudar na moderação e gerenciar tickets. O MEE6 trata os dados de que precisa para isso conforme [a própria política de privacidade](https://mee6.xyz/privacy.html).
- **Tickets.** Candidaturas a embaixador, propostas de colaboração e pedidos de suporte que exigem privacidade passam por tickets: um canal privado visível apenas para você e para a equipe. Quando um ticket é fechado, o MEE6 gera uma **transcrição** — uma cópia das mensagens daquele ticket, com os nomes e os IDs do Discord de quem as escreveu — para podermos dar seguimento ao mesmo pedido. O MEE6 a guarda no próprio site, onde ela só abre depois de entrar com o Discord, e publica o link dela em um canal que só a equipe vê. Excluímos esse link, e qualquer cópia que tenhamos baixado, em até **12 meses**, ou antes se você pedir. Por quanto tempo o MEE6 guarda a cópia dele cabe ao MEE6: se você quiser que ela seja excluída, avise-nos e pediremos ao MEE6 que a exclua.
- **Base legal.** O nosso interesse legítimo em manter um espaço de suporte e discussão sobre o bot, em analisar as candidaturas e propostas enviadas ali e em mantê-lo seguro (art. 6(1)(f) do GDPR).

O Discord continua sendo o provedor da plataforma, e o que ele coleta é regido pela [Política de Privacidade do Discord](https://discord.com/privacy).

## Nossos sites

Os nossos sites — bitsplitters.app, tasks.bitsplitters.app e timezones.bitsplitters.app — não usam cookies e não guardam nada no seu navegador.

- **Hospedagem.** Eles são hospedados no **GitHub Pages**, um serviço do GitHub, Inc. (Estados Unidos). Como qualquer servidor web, o GitHub registra dados técnicos de cada visita, incluindo o seu endereço IP, por segurança e para operar o serviço. Veja a [Declaração de Privacidade do GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
- **Estatísticas de visitas.** Para contar visitas e ver quais sites nos enviam pessoas, as nossas páginas carregam um script do **Cloudflare Web Analytics**, um serviço da Cloudflare, Inc. (Estados Unidos). Para cada visualização de página, ele registra a página, o site de onde você veio, o seu país, navegador, sistema operacional e tipo de dispositivo, e quanto tempo a página levou para carregar. Ele não define cookies, não guarda nada no seu navegador e não identifica você: vemos apenas totais, nunca visitantes individuais. A Cloudflare recebe o seu endereço IP junto com a requisição, como qualquer servidor web, e não o usa para reconhecer você. Veja a [Política de Privacidade da Cloudflare](https://www.cloudflare.com/privacypolicy/).
- **O mapa de fusos horários.** O mapa em timezones.bitsplitters.app carrega as imagens dos servidores do **OpenStreetMap**, que por isso recebem o seu endereço IP. Veja a [política de privacidade da OpenStreetMap Foundation](https://osmfoundation.org/wiki/Privacy_Policy).
- **Base legal.** O nosso interesse legítimo em publicar a documentação e as ferramentas que acompanham o bot, e em saber, de forma agregada, quantas pessoas as leem e de onde vêm (art. 6(1)(f) do GDPR).

## Segurança

Aplicamos medidas técnicas e organizacionais razoáveis para proteger os dados. Nenhum método de transmissão ou armazenamento é totalmente seguro, então não podemos garantir segurança absoluta.

## Crianças

O TTM não é destinado a quem tem menos que a idade mínima exigida pelo Discord.

## Alterações

Podemos atualizar esta política; a data de “Última atualização” reflete a versão mais recente.

## Contato

**info@bitsplitters.app**
