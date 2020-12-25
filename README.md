# Jobby

[![Build Status](https://drone.quving.com/api/badges/Quving/jobby/status.svg)](https://drone.quving.com/Quving/jobby)

## Too Long To Read
Jobby is a central reporting hub for autonomous tasks and jobs that are executed on a regular schedule. For example, backup scripts that run every day send a report whether they did their job successfully, incorrectly or not at all. The latter information is obtained by the absence of the report.

## Motivation
Some people probably know the problem: You are a developer or a server administrator and you have several servers or applications that you have to maintain. Now one and the other application or server has jobs that are regularly executed autonomously. For example a backup script, or a task that cleans up the database of an application. Usually these jobs run silently in the background and the Developer/Admin is not informed whether the job was executed successfully or failed.

Jobby is a self-host platform that can be considered as a report centre. The idea is that when a cronjob has finished, it forwards its status to Jobby. The user then gets an overview of all his distributed jobs in the jobby dashboard.

## Screenshots
### Login
![](https://i.imgur.com/wRBFSYF.png)

### Dashboard
![](https://i.imgur.com/TWy9fvi.png)




## Setup
### Techstack
- The Backend is built with Python using the [Django-Rest-Framework](https://www.django-rest-framework.org/)
- The Frontend is based on [VueJs](https://vuejs.org/)
- Database [PostreSQL](https://www.postgresql.org/)
- And ofcourse [Docker](https://www.docker.com/) is involved.

### Docker (docker-compose.yml)

#### dotenv
```
# Global settings
TZ=Europe/Berlin

# Database
# ====================================================================
POSTGRES_DB=jobby_db
POSTGRES_USER=jobby
POSTGRES_PASSWORD=jobby-db-password

# API
# ====================================================================
SECRET_KEY=my-django-secret
USE_HTTPS=false

# SMTP (optional)
EMAIL_USER=your-smtp-user
EMAIL_PASSWORD=your-smtp-password
EMAIL_PORT=587
EMAIL_HOST=your-smtp-host
DEFAULT_EMAIL=noreply@yourjobbyhost.com

# Database Authentication
DB_USER=jobby
DB_PASS=jobby-db-password
DB_DB=jobby_db
DB_PORT=5432
DB_HOST=postgres
DJANGO_MODE=production

# Web
# ====================================================================
JOBBY_API_HOST=http://localhost:4800

```
#### docker-compose.yml
```
version: '3.7'
services:
  postgres:
    image: postgres:11.5
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
    environment:
      TYPE: server
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}

  api-master:
    image: quving/jobby:api-master
    # build:
    #   context: api
    #   dockerfile: Dockerfile
    restart: on-failure
    depends_on:
      - postgres
      - api-worker
    ports:
      - 4800:4800
    environment:
      TZ: ${TZ}
      TYPE: master
      JOBBY_SECRET_KEY: ${SECRET_KEY}
      JOBBY_EMAIL_USER: ${EMAIL_USER}
      JOBBY_EMAIL_PASSWORD: ${EMAIL_PASSWORD}
      JOBBY_EMAIL_PORT: ${EMAIL_PORT}
      JOBBY_EMAIL_HOST: ${EMAIL_HOST}
      JOBBY_DEFAULT_EMAIL: ${DEFAULT_EMAIL}
      JOBBY_DB_USER: ${DB_USER}
      JOBBY_DB_PASS: ${DB_PASS}
      JOBBY_DB_PORT: ${DB_PORT}
      JOBBY_DB_HOST: ${DB_HOST}
      JOBBY_DB_DB: ${DB_DB}
      JOBBY_USE_HTTPS: ${USE_HTTPS}
      JOBBY_API_WORKER_URL: http://api-worker:8800
      DJANGO_MODE: development

  api-worker:
    image: quving/jobby:api-master
    # build:
    #   context: api
    #   dockerfile: Dockerfile
    restart: on-failure
    depends_on:
      - postgres
    ports:
      - 8800:8800
    environment:
      TZ: ${TZ}
      TYPE: worker
      JOBBY_SECRET_KEY: ${SECRET_KEY}
      JOBBY_EMAIL_USER: ${EMAIL_USER}
      JOBBY_EMAIL_PORT: ${EMAIL_PORT}
      JOBBY_EMAIL_PASSWORD: ${EMAIL_PASSWORD}
      JOBBY_EMAIL_HOST: ${EMAIL_HOST}
      JOBBY_DEFAULT_EMAIL: ${DEFAULT_EMAIL}
      JOBBY_DB_USER: ${DB_USER}
      JOBBY_DB_PASS: ${DB_PASS}
      JOBBY_DB_PORT: ${DB_PORT}
      JOBBY_DB_HOST: ${DB_HOST}
      JOBBY_DB_DB: ${DB_DB}
      JOBBY_API_WORKER_URL: http://api-worker:8800
      DJANGO_MODE: development

  web:
    image: quving/jobby:web-master
    ports:
      - 8080:80
    environment:
      VUE_APP_JOBBY_API_HOST: ${JOBBY_API_HOST}
```

## Usage
### Entities
- Job
- JobGroup
- Host
- HostGroup
- Report

### Administration
#### Create User
The backend is written in Python (Django). In order to create an initial-admin user, we have to do following steps:

1. ``` docker-compose exec api-master bash```
2. ``` python mange.py createsuperuser```
3. Enter your credentials



## Backup & Restore
In order to create a full backup, you need to create a backup of the used postgres-instance. In the [docker-compose.yml](docker-compose.yml) above, its already persisted by the bind-volume. Alternatively, you can also create a usual psql-dump.
