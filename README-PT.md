# CHAMELEON STACK - KANBAN

### 📋 PRÉ-REQUISITOS

- Docker
- NodeJs
- NPM

## 🔧 INSTALANDO PRÉ-REQUISITOS

### Instalando o NodeJS

Acesse o seguinte link e baixe a versão LTS

```
    https://nodejs.org/en
```

Após isso é só clicar duas vezes no arquivo que foi baixado e instalar o Node clicando em next até sua instalação.Execute o seguinte comando em um terminal(cmd,gitbash ou outros) para verificar a versão:

```
    node --version
```

Verifique também a versão do NPM instalada:

```
    npm --version
```

### Instalando o Docker

O primeiro passo é configurar o docker. Para cada sistema operacional é necessário seguir um passo a passo:

- Linux

```
               https://docs.docker.com/desktop/install/linux-install/
```

- Windows (Necessário ter o WSL instalado e configurado)

```
               https://docs.docker.com/desktop/install/windows-install/
```

- MAC

```
               https://docs.docker.com/desktop/install/mac-install/
```

### Instalando o container que irá rodar no projeto

Para instalar o container que será rodado no projeto é necessário colocar o seguinte comando no terminal:

```
docker run --name mongo -e MONGO_PASSWORD=mypassword -p 5432:5432 -d mongo
```

#### Nessa etapa instale um SGBD e conecte com as credenciais do docker

## ⚙️ CONFIGURANDO O PROJETO

### Adicionando valores de conexão do banco ao .env

Conecte ao banco criado com as variáveis que você utilizou para criar a imagem do docker.
Crie um arquivo chamado ".env" na raiz do projeto e adicione as variáveis contidas no arquivo ".env.example" com o valor da url(mongo://username:password@localhost:5432/database_name) de conexão do banco de dados. O arquivo env de acordo com o que container criado ficaria aproximadamente assim:

```
MONGODB_URI=mongo://mongo:mypassword@localhost:5432/chameleon
NODE_ENV=dev
```

### Instalando pacotes NodeJs

Rode o seguinte comando no projeto:

```
npm install
```

ou

```
yarn
```

### Adicionando tabelas

Para adicionar as tabelas do projeto ao seu banco é necessário realizar um post para a tabela requirida, utilizando uma das rotas:

```
Create User table: POST  https://localhost:3333/user
Create Card table: POST  https://localhost:3333/card/{user_id}
Create Category table: POST  https://localhost:3333/category/{user_id}

```

### Iniciando o projeto

Rode o seguinte comando no projeto:

```
npm run dev
```

ou

```
yarn dev
```

O projeto irá rodar na seguinte URL:

        http://localhost:3333

### 🚀 TESTES

## Rodando os testes

Para rodar os testes do projeto é necessário adicionar um banco de testes em seu projeto com o nome "test" e então alterar a variável NODE_ENV de dev para test, ficando dessa forma o arquivo .env:

```
MONGODB_URI='mongo://mongo:mypassword@localhost:5432/test'
NODE_ENV=dev
```

Execute o comando:

```
npm run test
```

ou

```
yarn test
```
