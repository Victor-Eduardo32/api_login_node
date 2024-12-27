# API de Cadastro de Usuário

Uma API que permite o cadastro de usuários e a verificação dos usuários cadastrados.

## 🔥 Introdução

O objetivo deste projeto é criar uma API para estudos, utilizando Node.js com TypeScript, Clean Architecture e princípios SOLID.

## ⚙️ Pré-requisitos

- Ter o Node.js(versão 20 ou superior) instalado.
- Ter o PostgreSQL ou outro banco de dados de sua preferência configurado.

### ⚒️ Guia de Instalação

**Etapas para instalar**

Instale as dependências do Node:

```
npm i
```
Copie o arquivo [.env.example](.env.example) para .env e configure com suas credenciais de acesso ao banco de dados. Não se esqueça de inicializar o servidor do banco de dados.

Execute as migrations do Prisma:

```
npx prisma migrate dev
```

Inicie a API:
```
npm run dev
```

### 💾 Tecnologias Usadas
* [Node.js](https://nodejs.org/pt)
* [TypeScript](https://www.typescriptlang.org)
* [Prisma](https://www.prisma.io)
* [Express](https://expressjs.com)
