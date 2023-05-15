# Chatmovie - Backend

Nesta seção você terá uma melhor introdução sobre a parte lógica da aplicação.

## Apresentação de algumas bibliotecas 

Para a criação do backend desse aplicativo, estive utilizando algumas ferramentas e bibliotecas que auxiliam o desenvolvimento, algumas delas foram:

- `express`: Framework do Node.js para criar aplicativos da web e APIs.
- `express-validator`: Conjunto de middlewares para o express, validando entradas de dados de maneira simples e rápida.
- `express-ws`: Biblioteca para adicionar suporte ao WebSocket em aplicações Express.
- `jsonwebtoken`: Gerar tokens temporários de acesso e validação de tokens.
- `bcrypt`: Criando hash das senhas criadas por usuários e validação de senhas.
- `crypto-js`: Biblioteca para uso em criptografias e descriptografias, utilizada para a criptografia de chaves e mensagens.
- `multer`: Manipulação de imagens enviadas para a aplicação.
- `mongoose`: Conexão ao banco de dados do MongoDB e utilização de models para gerenciamento dos dados.

## Apresentação das rotas usadas pela aplicação

### Rotas HTTP

<details>
<summary>

#### POST /api/users/register

</summary>

- Rota utilizada para cadastros de usuários.
- Parâmetros - corpo da requisição:

    - **name**: Nome completo do usuário.
    - **user_name**: Nome único para cada usuário.
    - **email**: E-mail do usuário.
    - **password**: Senha criada pelo usuário.
    - **confirm_password**: Confirmação da senha definida.

- Exemplo de retorno:

    ```json
    {
        "user": "objeto com dados iniciais do usuário criado",
        "token": "token de acesso"
    }
    ```
</details>

<details>
<summary>

#### POST /api/users/login

</summary>

- Rota utilizada para login de usuários.
- Parâmetros - corpo da requisição:

    - **login**: Username ou e-mail do usuário.
    - **password**: Senha criada pelo usuário ao criar a conta.

- Exemplo de retorno:

    ```json
    {
        "user": "objeto com dados iniciais do usuário criado",
        "token": "token de acesso"
    }
    ```
</details>

<details>
<summary>

#### GET /api/users/

</summary>

- Rota utilizada para listar usuários.
- Parâmetros - cabeçalho da requisição:

    - **Authorization**: token de acesso gerado ao usuário fazer login/registro.

- Exemplo de retorno:

    ```json
    [
        {
            "name": "nome de usuário", 
            "user_name": "nome único de usuário",
            "bio": "biografia definida pelo usuário", 
            "profile_picture": "endpoint contendo a imagem de perfil do usuário",
            "cover_image": "endpoint contendo a imagem de capa do usuário"
        },
        //  ...
    ]
    ```
</details>

<details>
<summary>

#### GET /api/users/profile

</summary>

- Rota utilizada para retornar perfil do usuário logado.
- Parâmetros - cabeçalho da requisição:

    - **Authorization**: token de acesso gerado ao usuário fazer login/registro.

- Exemplo de retorno:

    ```json
    {
        "name": "nome de usuário", 
        "email": "e-mail do usuário",
        "user_name": "nome único de usuário",
        "bio": "biografia definida pelo usuário", 
        "profile_picture": "endpoint contendo a imagem de perfil do usuário",
        "cover_image": "endpoint contendo a imagem de capa do usuário"
    }
    ```
</details>

<details>
<summary>

#### GET /api/users/friends

</summary>

- Rota utilizada para retornar informações sobre amigos do usuário logado.
- Parâmetros - cabeçalho da requisição:

    - **Authorization**: token de acesso gerado ao usuário fazer login/registro.

- Exemplo de retorno:

    ```json
    {
        "friends": [], // lista com ids de usuários amigos
        "friend_requests": [], // lista com ids de usuários que mandaram solicitação
        "friend_requests_sent": [] // lista com ids de usuários que receberam solicitação do usuário logado
    }
    ```
</details>

<details>
<summary>

#### GET /api/users/:id

</summary>

- Rota utilizada para retornar dados de um usuário em específico pelo seu id.
- Parâmetros - cabeçalho da requisição:

    - **Authorization**: token de acesso gerado ao usuário fazer login/registro.

- Parâmetros - rota da requisição:

    - **:id**: referência ao id de outro usuário.

- Exemplo de retorno:

    ```json
    {
        "name": "nome de usuário", 
        "user_name": "nome único de usuário",
        "bio": "biografia definida pelo usuário", 
        "profile_picture": "endpoint contendo a imagem de perfil do usuário",
        "cover_image": "endpoint contendo a imagem de capa do usuário"
    }
    ```
</details>

<details>
<summary>

#### GET /api/users/:id/movies

</summary>

- Rota utilizada para retornar os filmes favoritados por um usuário específicado pelo seu id.
- Parâmetros - cabeçalho da requisição:

    - **Authorization**: token de acesso gerado ao usuário fazer login/registro.

- Parâmetros - rota da requisição:

    - **:id**: referência ao id de outro usuário.
    - **page**: query opcional para paginação sobre os dados recebidos.

- Exemplo de retorno:

    ```json
    {
        "movies": [], // array com ids de filmes favoritos, recebe 10 em cada página
        "page" : 1 // especifica a paginação atual
    }
    ```
</details>

<details>
<summary>

#### POST /api/users/friends

</summary>

- Rota utilizada para mandar solicitações para outros usuários.
- Parâmetros - cabeçalho da requisição:

    - **Authorization**: token de acesso gerado ao usuário fazer login/registro.

- Parâmetros - corpo da requisição:

    - **id_recipient_user**: id do usuário que receberá a solicitação (definido no corpo da requisição).

- Exemplo de retorno:

    ```json
    {
        "friends": [], // lista com ids de usuários amigos
        "friend_requests": [], // lista com ids de usuários que mandaram solicitação
        "friend_requests_sent": [] // lista com ids de usuários que receberam solicitação do usuário logado
    }
    ```
</details>

<details>
<summary>

#### POST /api/users/friends/accept

</summary>

- Rota utilizada para aceitar solicitações de outros usuários.
- Parâmetros - cabeçalho da requisição:

    - **Authorization**: token de acesso gerado ao usuário fazer login/registro.

- Parâmetros - corpo da requisição:

    - **id_user_request**: id do usuário que mandou a solicitação (definido no corpo da requisição).

- Exemplo de retorno:

    ```json
    {
        "friends": [], // lista com ids de usuários amigos
        "friend_requests": [], // lista com ids de usuários que mandaram solicitação
        "friend_requests_sent": [] // lista com ids de usuários que receberam solicitação do usuário logado
    }
    ```
</details>

<details>
<summary>

#### POST /api/users/friends/reject

</summary>

- Rota utilizada para rejeitar solicitações de outros usuários.
- Parâmetros - cabeçalho da requisição:

    - **Authorization**: token de acesso gerado ao usuário fazer login/registro.

- Parâmetros - corpo da requisição:

    - **id_user_request**: id do usuário que mandou a solicitação (definido no corpo da requisição).

- Exemplo de retorno:

    ```json
    {
        "friends": [], // lista com ids de usuários amigos
        "friend_requests": [], // lista com ids de usuários que mandaram solicitação
        "friend_requests_sent": [] // lista com ids de usuários que receberam solicitação do usuário logado
    }
    ```
</details>

<details>
<summary>

#### PUT /api/users/profile

</summary>

- Rota utilizada para atualizar perfil do usuário logado.
- Parâmetros - cabeçalho da requisição:

    - **Authorization**: token de acesso gerado ao usuário fazer login/registro.

- Parâmetros - corpo da requisição:

    - **name**: nome atualizado do usuário.
    - **bio**: biografia atualizada do usuário.
    - **user_name**: nome único de usuário atualizado.
    - **profile_picture**: atualização de imagem de perfil do usuário (opcional).
    - **cover_image**: atualização de imagem de capa do usuário (opcional).

- Exemplo de retorno:

    ```json
    {
        "email": "e-mail do usuário",
        "user_name": "nome único de usuário atualizado", 
        "name": "nome completo do usuário atualizado",
        "profile_picture": "endpoint com a foto de perfil do usuário atualizada", 
        "cover_image": "endpoint com a foto de capa do usuário atualizada",
        "bio": "biografia atualizada do usuário"
    }
    ```
</details>

<details>
<summary>

#### PATCH /api/users/movies

</summary>

- Rota utilizada para adicionar ou remover um filme favoritado pelo usuário.
- Parâmetros - cabeçalho da requisição:

    - **Authorization**: token de acesso gerado ao usuário fazer login/registro.

- Parâmetros - corpo da requisição:

    - **action**: ação que vai ser realizada, aceita os valores: *'add'* | *'remove'*.
    - **id_movie**: id do filme.

- Exemplo de retorno:

    ```json
    {
        "movies": [] // lista de filmes atualizada
    }
    ```
</details>


### Rotas WebSocket

<details>
<summary>

#### Conexão /api/message

</summary>

- Rota utilizada para conexão ao websocket, retorna uma lista de mensagens recentes do usuário ao conectar com sucesso.
- Parâmetros - cabeçalho da requisição:

    - **Authorization**: token de acesso gerado ao usuário fazer login/registro.

- Exemplo de retorno:

    ```json
    {
        "type": "especificação do tipo de retorno: 'success' | 'error'",
        "message": [
            {
                "messages": [], // ultima mensagem criptografada
                "key": "chave de decriptação da mensagem",
                "updatedAt": "horário com a última mensagem enviada",
                "members": [] // lista com ids de membros do chat
            },
            // ...
        ],
        "status": "numero de status da solicitação",
        "action": "especifica a ação realizada" // ao conectar recebe: get-last-messages
    }
    ```

- manipulando os envios de mensagens através da conexão:

    - receber as mensagens de um chat específico:

        ```json
        {
            "action": "get-message",
            "id_user": "id de outro usuário"
        }
        ```

    - enviar mensagem para um usuário:

        ```json
        {
            "action": "send-message",
            "id_user": "id de usuário que vai receber a mensagem",
            "message": "mensagem que será enviada"
        }
        ```

    - ação ao receber uma mensagem:

        ```json
        {
            "action": "receive-message",
            "id_user": "id de usuário que mandou a mensagem",
            "message": "mensagem recebida"
        }
        ```

</details>

## Como executar

Para a inicialização do back-end siga os seguintes passos:

1. Definindo as variaveis de ambiente necessárias:

    - Crie um arquivo nomeado `.env` na pasta atual.
    - Crie uma conta no [TMDB](https://www.themoviedb.org) para poder acessar a sua chave da API.
    - Dentro do arquivo `.env` defina a seguinte estrutura:

    ```dotenv
    API_KEY_TMDB=sua-chave-da-API
    DB_USER=seu-nome-de-usuario-no-banco-de-dados
    DB_PASS=sua-senha-de-usuario-no-banco-de-dados
    JWT_KEY=uma-chave-para-a-geração-de-tokens
    MASTER_KEY=uma-chave-principal-para-a-criptografia
    ```

2. Instale as dependências do projeto:

    - Abra o seu terminal e navegue até a pasta atual do projeto.
    - Execute o comando ```npm install``` para instalar as dependências necessárias.

3. Executando aplicação:

    - Após instalar as dependências, utilize o comando ```npm start```.
    - Você receberá um log com a especificação da porta rodando a aplicação e uma mensagem de conexão ao banco de dados.
