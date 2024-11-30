## Description

This microservice app is designed to receive and handle high volume of user location messages. The app logs those messages to postgres if they overlap with predefined geospatial areas. The app is designed to scale as needed. 

## Folder structure 

* There are 2 NestJS apps (api and consumer) located in **src/api** and **src/consumer**. 
  * api is a http rest application
  * consumer is a daemon that listens and consumes location messages coming from rabbitmq.

* **src/core** contains domain models: entities, types, and dtos.

* **src/app** contains business logic, the only place postgres is written and read

* **src/infra** contains external service implementations exported as NestJS Modules.


## Project setup

Requirements: pnpm, docker engine, nvm
```bash
$ nvm use
$ pnpm install 
$ docker compose up -d
```

## Compile and run the project

```bash
$ pnpm typeorm:migrate
$ pnpm run api
$ pnpm run consumer
```
