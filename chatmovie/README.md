# ChatMovie - Front

Nesta seção você terá uma melhor introdução sobre a parte visual da aplicação

## Apresentação de algumas bibliotecas 

Para a criação do front desse aplicativo, estive utilizando algumas ferramentas e bibliotecas que auxiliam o desenvolvimento, algumas delas foram:

- `@react-navigation`: Biblioteca usada para criar e gerenciar rotas no desenvolvimento mobile.
- `react-redux` e `@reduxjs/toolkit`: Gerenciamento de estados de variáveis com escopo global.
- `axios`: Realizando requisições para a API do TMDB e para o backend da aplicação.
- `crypto-js`: Biblioteca para uso em criptografias e descriptografias, utilizei na descriptografia de mensagens recebidas e enviadas.
- `expo-secure-store`: Armazenamento seguro de dados locais.
- `styled-components`: Criação de componentes estilizados usando a sintaxe do CSS.

## Telas do projeto

1. Telas não autenticadas:

    - Tela de abertura:

        ![Imagem da tela de abertura](./src/assets/imagens-projeto/splash-screen.png)

    - Tela inicial

        ![Imagem da tela inicial do aplicativo](./src/assets/imagens-projeto/tela-inicial.png)

    - Tela de detalhes sobre os filmes

        ![Imagem da mostrando detalhes de um filme](./src/assets/imagens-projeto/tela-filmes-detalhes.png)

    - Tela de login

        ![Imagem da tela para login do aplicativo](./src/assets/imagens-projeto/tela-login.png)

    - Tela de cadastro

        ![Imagem da tela para cadastrar-se no aplicativo](./src/assets/imagens-projeto/tela-cadastro.png)

2. Telas autenticadas:

    - Tela perfil

        ![Imagem visualizando perfil do usuário logado](./src/assets/imagens-projeto/tela-perfil.png)

    - Tela para editar perfil:

        ![Imagem editando perfil do usuário logado](./src/assets/imagens-projeto/tela-editar-perfil.png)

    - Tela listando usuários:

        ![Imagem listando outros usuários](./src/assets/imagens-projeto/tela-usuarios.png)

    - Tela com solicitações de amizades:

        ![Imagem com solicitações de amizades](./src/assets/imagens-projeto/tela-pedidos-de-amizade.png)

    - Tela amigos:

        ![Imagem mostrando os amigos do usuario logado](./src/assets/imagens-projeto/tela-amigos.png)

    - Tela com perfil de um usuário:

        ![Imagem visualizando perfil de outras contas criadas](./src/assets/imagens-projeto/tela-usuario.png)

    - Tela do chat em tempo real:

        ![Imagem que mostra a criação do chat](./src/assets/imagens-projeto/tela-mensagens.png)

    - Tela mensagens atuais:

        ![Imagem da tela mostrando as mensagens atuais do usuario](./src/assets/imagens-projeto/tela-lista-mensagens.png)


## Como executar

Para o funcionamento correto sobre o aplicativo, recomenda a configuração e inicialização do back-end primeiro, após isso você pode seguir os seguintes passos:

1. Definindo as variaveis de ambiente necessárias:

    - Crie um arquivo nomeado `.env` na pasta atual.
    - Crie uma conta no [TMDB](https://www.themoviedb.org) para poder acessar a sua chave da API.
    - Dentro do arquivo `.env` defina a seguinte estrutura:

    ```dotenv
    API_KEY_TMDB=sua-chave-da-API
    ```

2. Instale as dependências do projeto:

    - Abra o seu terminal e navegue até a pasta atual do projeto.
    - Execute o comando ```npm install``` para instalar as dependências necessárias.
    - Caso não possua a ferramenta **expo** em sua máquina ou celular, você pode estar vendo como instalar no site oficial deles: [instalando Expo](https://docs.expo.dev/get-started/installation/).

3. Executando aplicação:

    - Após instalar as dependências, utilize o comando ```npm start``` ou ```npx expo start```.
    - O comando acima vai inicializar sua aplicação e gerar um QR Code, você pode estar rodando a aplicação em seu celular através do aplicativo Expo Go e realizando a leitura desse QR Code.