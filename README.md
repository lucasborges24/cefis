# ReadMe API - Projeto CEFIS

## 📋 Sobre o Projeto

Este projeto API atua como a camada de servidor para o Projeto CEFIS para [cliente web](https://github.com/lucasborges24/cefis-front), permitindo operações CRUD para usuários e cursos, além de realizar autenticacão com login. O servidor API foi construído usando NestJS, e os detalhes de cada rota estão documentados abaixo.

## 🚀 Versão em Produção

A versão em produção da API está disponível em: cefisapi-58rcxozg.b4a.run

## 🛠️ Construído com

- [NestJS](https://nestjs.com/) - O framework web usado
- Docker - Containerização
- NodeJS - Ambiente de execução
- MySQL - Banco de dados

## 🚀 Como Rodar o Projeto com Docker

Para rodar o projeto com Docker, é necessário ter o Docker instalado na máquina. Para instalar o Docker, siga as instruções do site oficial: https://docs.docker.com/get-docker/

Após instalar o Docker, clone o repositório do projeto e execute o comando abaixo na raiz do projeto:

```sh
docker-compose up --build
```

## Rotas da API

Baseado na [documentação da Postman](https://universonarrado.postman.co/workspace/cefis~97fd9128-bfe6-4ce2-ad04-7135e3b3895e/overview), as seguintes rotas estão disponíveis:

### User

1. POST `/user`

- Descrição: Cria um novo usuário
- Parâmetros:
  - name: Nome do usuário
  - email: Email do usuário
  - password: Senha do usuário
- Respostas:
  - 201 Created: Usuário criado com sucesso
  - 400 Bad Request: Dados de entrada inválidos

2. GET `/user/all`

- Descrição: Retorna todos os usuários cadastrados
- Respostas:
  - 200 OK: Array com todos os usuários cadastrados

3. GET `/user`

- Descrição: Retorna os dados do usuário logado
- Respostas:
  - 200 OK: Dados do usuário logado
  - 403 Forbidden: Usuário não autenticado

4. PATCH `/user`

- Descrição: Atualiza os dados do usuário logado
- Parâmetros:
  - name: Nome do usuário
- Respostas:
  - 200 OK: Usuário atualizado com sucesso
  - 400 Bad Request: Dados de entrada inválidos
  - 403 Forbidden: Usuário não autenticado

5. DELETE `/user`

- Descricao: Deleta o usuário logado
- Resposta:
  - 200 OK: Usuário deletado com sucesso
  - 403 Forbidden: Usuário não autenticado

## Autenticacão

1. POST `/auth/login`

- Descrição: Autentica o usuário
- Parâmetros:
  - email: Email do usuário
  - password: Senha do usuário
- Respostas:
  - 201 Created: Usuário autenticado com sucesso

## Course

1. POST `/course`

- Descrição: Cria um novo curso
- Parâmetros:
  - title: Título do curso
  - duration: Duração do curso
- Respostas:
  - 201 Created: curso criado com sucesso
  - 400 Bad Request: Dados de entrada inválidos

1. GET `/course`

- Descrição: Retorna todos os cursos cadastrados
- Respostas:
  - 200 OK: Array com todos os cursos cadastrados

3. GET `/course/:id`

- Descrição: Retorna os dados do curso
- Respostas:
  - 200 OK: Dados do curso logado
  - 403 Forbidden: usuário não autenticado
  - 404 Not Found: curso não encontrado

1. PATCH `/course/:id`

- Descrição: Atualiza os dados de um curso
- Parâmetros:
  - title: título do curso
  - duration: duracão do curso
- Respostas:
  - 200 OK: curso atualizado com sucesso
  - 400 Bad Request: Dados de entrada inválidos
  - 401 Unauthorized: usuário não é o dono do curso
  - 403 Forbidden: usuário não autenticado
  - 404 Not Found: curso não encontrado

5. DELETE `/course/:id`

- Descricao: Deleta o curso logado
- Resposta:
  - 200 OK: curso deletado com sucesso
  - 401 Unauthorized: usuário não é o dono do curso
  - 403 Forbidden: usuário não autenticado
  - 404 Not Found: curso não encontrado
