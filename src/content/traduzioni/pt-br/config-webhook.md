---
title: "/config webhook"
description: "Crie os webhooks do seu servidor: a chamada HTTP, os tokens que ela pode levar e os endereços que o TTM aceita."
fonte: d05440cda658
---

`/config webhook` cria os webhooks do seu servidor: a chamada HTTP que uma tarefa envia quando é concluída ou reaberta. O que um webhook faz e como vinculá-lo a uma tarefa: veja [Webhooks](/docs/webhooks/).

Por padrão, só membros com a permissão *Gerenciar servidor* podem usar `/config webhook`, como o resto de `/config`. Veja [Quem pode abrir o /config](/docs/config/#who-can-open-config).

Os webhooks são **Premium**, desbloqueados para todos os servidores durante a beta. Depois da beta, no plano Free os webhooks que você já tem continuam, e você ainda pode alterá-los ou excluí-los, mas não pode criar novos: veja [O que uma lista da beta mantém](/docs/beta/#what-a-beta-list-keeps).

## Criando um webhook

```
/config webhook
```

O comando tem algumas opções:

| Opção | Obrigatória? | Valores | Observações |
| :--- | :--- | :--- | :--- |
| **ação** | Obrigatória | ver · criar · editar · excluir | O que você quer fazer. |
| **webhook** | Obrigatória | um nome | O webhook em que agir, até 96 caracteres. |
| **evento** | Opcional | conclusão · reabertura | Omita para agir nas **duas** direções ao mesmo tempo. |

Escolher **criar** ou **editar** abre um formulário com quatro campos:

- **Método HTTP** — `GET`, `POST`, `PUT` ou `DELETE`.
- **URL** — um endereço `https` público.
- **Headers** — um `Key: value` por linha.
- **Body** — JSON.

Um webhook é, na verdade, um **par de ações**, uma para a conclusão e outra para a reabertura, sob um único nome. O evento escolhe uma delas. Se você o omitir, um só comando cobre as duas:

| Ação | Sem evento |
| :--- | :--- |
| **criar** | Configura conclusão e reabertura com a mesma configuração. Os tokens `{{state}}` e `{{when}}` distinguem os dois eventos. |
| **ver** | Mostra as duas. |
| **editar** | Preenche a partir da ação de conclusão e sobrescreve as duas. |
| **excluir** | Remove o webhook por inteiro, com todas as ações dele. |

Cada servidor pode manter até **25** webhooks. Chegou ao teto? Exclua um que você não usa mais: o TTM lista todos no erro.

Um webhook novo ainda não está vinculado a nenhuma tarefa: veja [Vinculando um webhook a uma tarefa](/docs/webhooks/#associating-a-webhook-with-a-task).

## Tokens

Dentro da URL, dos headers e do body você pode colocar tokens `{{ }}`, que o TTM substitui na hora do envio.

No body, um token vai dentro de uma string JSON, entre aspas. O TTM faz o escape do valor, então uma tarefa com aspas ou quebra de linha continua enviando um JSON válido.

Na URL, cada valor é codificado em porcentagem: um espaço vira `%20`.

**Tokens embutidos**

| Token | Valor |
| :--- | :--- |
| `{{task}}` | O texto da tarefa |
| `{{state}}` | O estado: concluída ou reaberta |
| `{{list}}` | O título da lista |
| `{{user}}` / `{{user_id}}` | Nome / id de quem alternou a tarefa |
| `{{when}}` | Data e hora (ISO-8601) |
| `{{guild}}` / `{{guild_id}}` | Nome / id do servidor |
| `{{channel}}` / `{{channel_id}}` | Nome / id do canal |

**Variáveis livres** — defina `{{chave=valor}}` em qualquer ponto do texto de uma tarefa e use `{{chave}}` no webhook. Tokens desconhecidos viram simplesmente uma string vazia.

## Exemplo

Um `POST` que anuncia uma conclusão:

```
Método:  POST
URL:     https://example.com/hooks/ttm
Headers: Content-Type: application/json
Body:
{
  "text": "{{user}} {{state}} \"{{task}}\" in {{list}}",
  "at": "{{when}}"
}
```

## Segurança

Pela segurança de todos, o TTM só aceita **URLs `https` públicas**. Destinos internos ou não roteáveis — `localhost`, faixas de IP privadas, endereços link-local — são bloqueados.

O body precisa ser um JSON válido, e cada linha de header precisa seguir o formato `Key: value`.
