# Back Labs

Backend project made with Express.js + Typescript and PostgreSQL of a RESTful API to manage reviews

## Prerequisites

Make sure you have the following installed:

- Node.js 20.11 - [Download & Install Node.js](https://nodejs.org)
- PostgreSQL - [Download & Install PostgreSQL](https://www.postgresql.org/download/)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/LeiWithP/back-labs.git
    ```

2. Install dependencies:

    ```bash
    cd back-labs
    npm install
    ```

3. Set up PostgreSQL database:

    - Create a new PostgreSQL database named density.
    - Create a new Table in that database named reviews.
    - The commands to create the database and table can be found in the file src/database/database.sql

4. Create a .env file in the root directory with this structure:

   ```bash
   DATABASE_HOST=localhost
   DATABASE_USER=postgres
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=density
   DATABASE_PORT=5432
   APP_PORT=3000
    ```

5. Check that the information of the .env is the same as your postgres configuration and replace the password with the one of your database

6. Start the server:

    ```bash
    npm run dev
    ```

# Important Details

The project is setup to run in the local port asigned in the .env as APP_PORT, feel free to change it as you need, just remeber to update it in the front-labs project

The values of the .env DATABASE variables are based on the default configuration of postgres, if you have a different one you may need to update the values in the .env, always check the HOST and USER of your database as well as is running in the default port 5432.

If you are using pgAdmin you will need a master password to acces all the database, that one is different that the one of your database or server and its not necessary to make a connectiong with the project

## Project Structure

```
.
├── src
│   ├── controllers          # Contains Express route controllers
│   ├── database             # Contains database configuration and connection logic
│   ├── models               # Contains database models (e.g., Sequelize models)
│   ├── routes               # Contains Express routes definitions
│   ├── index.ts             # Main entry point of the application
│   └── types.d.ts           # Custom TypeScript type definitions and interfaces
├── .gitignore               # Specifies intentionally untracked files to ignore
├── package-lock.json        # Automatically generated file describing the exact tree of your npm modules
├── package.json             # File that describes the npm package and its dependencies
├── README.md                # Markdown file containing information about the project
└── tsconfig.json            # TypeScript configuration file specifying compiler options
```
