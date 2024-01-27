# CHAMELEON STACK - KANBAN

### 📋 PREREQUISITES

- Docker
- NodeJs
- NPM

## 🔧 INSTALLATION PREREQUISITES

### Installing NodeJS

Access the following link and download the LTS version

```
    https://nodejs.org/en
```

After that, just double-click on the file that was downloaded and install Node by clicking next until it is installed. Run the following command in a terminal (cmd, gitbash or others) to check the version:

```
    node --version
```

Also, check the installed NPM version:

```
    npm --version
```

### Installing Docker

The first step is to set up Docker. For each operating system, you need to follow a step-by-step process:

- Linux

```
               https://docs.docker.com/desktop/install/linux-install/
```

- Windows (WSL installation and configuration are required)

```
               https://docs.docker.com/desktop/install/windows-install/
```

- macOS

```
               https://docs.docker.com/desktop/install/mac-install/
```

### Installing the Container for the Project

To install the container that will run in the project, you need to enter the following command in the terminal:

```
docker run --name mongo -e MONGO_PASSWORD=mypassword -p 27017:27017 -d mongo
```

#### In this step, install a DBMS and connect with docker credentials

## ⚙️ CONFIGURING THE PROJECT

### Adding Database Connection Values to .env

Connect to the database created with the variables you used to create the Docker image.
Create a file called ".env" at the root of the project and add the variables contained in the ".env.example" file with the value of the database connection URL(mongo://username:password@localhost:5432/database_name). The ".env" file, according to the container you created, would look something like this:

```
MONGODB_URI=mongo://mongo:mypassword@localhost:27017/chameleon
NODE_ENV=dev
```

### Installing Node.js Packages

Run the following command in the project:

```
npm install
```

or

```
yarn
```

### Add tables

To add the project's tables to your database, it is necessary to make a POST request to the required table using one of the routes:

```
Create User table: POST  https://localhost:3333/user
Create Card table: POST  https://localhost:3333/card/{user_id}
Create Category table: POST  https://localhost:3333/category/{user_id}
```

### Starting the Project

Run the following command in the project:

```
npm run dev
```

or

```
yarn dev
```

The project will run at the following URL:

        http://localhost:3333

### 🚀 TESTS

## Running Tests

To run the project's tests, you need to add a test database to your project with the name "test" and then change the NODE_ENV variable from dev to test. Your .env file should look like this:

```
MONGODB_URI='mongo://mongo:mypassword@localhost:5432/test'
NODE_ENV=test
```

Execute the command:

```
npm run test
```

or

```
yarn test
```

# template-nodejs-express-prisma-mongodb
