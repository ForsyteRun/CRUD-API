# Node.js CRUD Application

## About The Project

This is a simple CRUD (Create, Read, Update, Delete) application built with pure Node.js. It allows you to perform basic CRUD operations on users.

## Before running

Before running this application, ensure you have the following installed:

Node.js (v20 or above)

## Features

- Create: Add new user
- Read: View details of existing user
- Update: Modify details of existing user
- Delete: Remove user

## Set up and run project locally

To set up and run project locally you need to clone repository from `dev` branch, install all dependencies:  
With NPM:

```
npm install
```

With Yarn:

```
yarn install
```

## Scripts usage

### Common application scripts

- `start:dev`: launches development application server with hot refresh on any changes.
- `start:prod`: makes production build of the application and run it
- `start:multi`: launches development application server on diff ports vis Cluster API
- `test`: run tests jest + supertest

### ESLint scripts

- `lint`: runs ESLint to check code for issues.
- `lint:fix`: runs ESLint to fix code issues.

### Prettier scripts

- `format:fix`: runs prettier to check and auto format code.
