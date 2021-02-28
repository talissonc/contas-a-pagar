# Contas a pagar
REST API para um sistema de controle de contas a pagar.

## Instruções de inicialização

### Requisitos
As seguintes portas devem estar livres:
- 3001 (API REST)
- 3006 (Mysql)

### Usando o docker-compose
**APENAS LINUX:** Se você utiliza Linux, primeiro siga esse tutorial: [Como instalar o Docker engine Linux](https://docs.docker.com/engine/install/#server)

Siga o tutorial para instalação do Docker e Docker compose de acordo com o seu sistema operacional: [Como instalar o Docker Compose](https://docs.docker.com/compose/install/)

Após a instalação do Docker Compose, entre na pasta raíz do repositório e rode o comando:

```
docker-compose up
```

### Rodando a fora do compose
Você deve ter um servidor mysql com um banco de dados 
(database) chamado ```contas-a-pagar``` ou deve alterar o nome do banco no arquivo ```.env```.

Outro requisito é o ```NodeJS``` com o gerenciador de pactoes ```npm``` instalado no computador que irá rodar a aplicação

Após ter o banco de dados configurado, entre no diretório ```server``` e execute os seguintes comandos:

```
npm -i yarn -g && yarn && yarn knex:migrate && yarn knex:seeds && yarn dev
```

## Documentação API

URL padrão: ```http://localhost:3001```

Header: 
```
Content-type: application/json
```

**GET**: ```/contas```

Retorno: 
```
{
    "id_conta": Number,
    "nome_conta": String,
    "data_vencimento": Datetime,
    "data_pagamento": Datetime,
    "valor_original": Number,
    "dias_atraso": Number,
    "valor_final": Number,
    "id_regra: : Number,
    "nome_regra": String,
    "qtd_dias_inicial": Number,
    "qtd_dias_final": Number
    "qtd_multa": Number,
    "qtd_juros": Number,
}
```

**POST**: ```/conta```

Body: 
```
{
    "nome_conta": String,
    "data_vencimento": Datetime,
    "data_pagamento": Datetime,
    "valor_original": Number
}
```

Retorno ```200```:
```
{
    msg: 'Conta cadastrada com sucesso.',
    id_conta: Number
}
```

## Tecnologias usadas
- NodeJS
- Mysql
- Docker

### Pacotes usados NodeJS (API-Backend)
- Express
- Cors
- MomentJS
- Knex
- Mysql2
- Typescript

### Linguagem de programação
- JavaScript (TypeScript)

## Estrutura dos arquivos e pastas
```
server
  └── src
    └── controllers
      └── index.ts
    └── database
      └── migrations
        └── 00_create_regras.ts
        └── 01_create_contas.ts
      └── seeds
        └── create_regras.ts
      └── connect.ts
    └── routes
      └── index.ts
    └── server.ts
  └── .env
  └── Dockerfile
  └── package.json
  └── tsconfig.json
docker-compose.yml
```