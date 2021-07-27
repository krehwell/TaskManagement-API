<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

# TASK MANAGEMENT WITH AUTHENTICATION API (Template for NestJS)

## Project Setup 

### NestJS
- Installation
    ```bash
    npm i -g @nestjs/cli
    ```
- Create New Entities
    ```bash
    # --no-spec = don't generate testfile
    # create module 
    nest g module <noun>

    # create service | business logic
    nest g service <noun> --no-spec  

    # create controller | routes
    nest g controller <noun> --no-spec 
    ```

### Database
- PostgreSQL (TypeOrm)
    - Create PostgreSQL using Docker
    ```bash
    docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
    ```

    - **[Linux]** 
    Systemd activate docker `systemctl start docker`

    - Run Docker
    ```bash
    docker container start postgres-nest
    ```

    - Useful Command
    ```bash
    docker container ls  # list of containers run

    docker stop rm <container name>  # stop container

    docker container rm <container name>  # delete container
    ```


### Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## License

This project is [GPL licensed](http://giant-penis-license.org/).
