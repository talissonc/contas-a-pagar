# Contas a pagar
REST API para um sistema de controle de contas a pagar.

## Tecnologias usadas
- NodeJS
- TypeScript
- Mysql 5.7
- Docker

### Pacotes usados NodeJS
- Express
- Cors

## Instruções de inicialização

### Requisitos
As seguintes portas devem estar livres:
- 3001 (API REST)
- 3006 (Mysql)

## Documentação API

URL padrão: ```http://localhost:3001```

Header: 
```
Content-type: application/json
```

GET: ```/contas```

Retorno: 
```
{
    "id_conta": Number,
    "nome": String,
    "data_vencimento": Datetime,
    "data_pagamento": Datetime,
    "valor_original": Number,
    "dias_atraso": Number,
    "valor_corrigido": Number
}
```

POST: ```/conta```

Body: 
```
{
    "nome": String,
    "data_vencimento": Datetime,
    "data_pagamento": Datetime,
    "valor": Number
}
```

Retorno ```200```:
```
{
    msg: 'Conta cadastrada com sucesso.',
    id_conta: Number
}
```