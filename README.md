# SaaSApplicationManagement
This is my first full stack web app repository.

![pre](./pre.png)

## Backend: Abp vNext

create project from https://abp.io/get-started

### about project template
[read this](https://docs.abp.io/en/abp/latest/Startup-Templates/Application)

## FrontEnd: Angular + Angular Material

create project from https://cli.angular.io/

### about project template
[read this](https://angular.io/guide/file-structure#application-project-files)

## How to Run
1. start real backend: `cd backend/src/SaaSApplicationManagement.HttpApi & dotnet run`
2. start fakebackend: `cd frontend/src/fakebackend & npm run start`
3. run frontend as dev, this will use fackbackend: `ng s -o`
4. run frontend as prod, this will use real backend: `ng s -o --prod`