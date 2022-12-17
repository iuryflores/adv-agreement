
# Adv Manager API

This API was created to help lawers to manager the agreement pay of all of they lawsuit, he can add lawsuit contents as date, jurisdiction, complainant name and more, can add agreement of process, and manager payments parcels of the agreements.
## Dependencies

- bcryptjs
- expressjs
- jsonwebtoken
- mongoose
- morgan
- nodemon
## Application Structure

*app.js*  - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.

*config/* - This folder contains configuration for passport as well as a central location for configuration/environment variables.

*routes/* - This folder contains the route definitions for our API.

*models/* - This folder contains the schema definitions for our Mongoose models.
## Api Flow

|METHOD|URL|REQUEST BODY|PAYLOAD|
|------|---|------------|-------|
|GET|/process|-|All process|
|GET|/process/:id|{id}|{dateProcess, processNumber, defendantId, complainantName, subject, jurisdiction, judgment, dealsId, status}|
|POST|/process|{dateProcess, processNumber, defendantId, complainantName, subject, jurisdiction, judgment, dealsId, status}|{dateProcess, processNumber, defendantId, complainantName, subject, jurisdiction, judgment, dealsId, status}|
|DELETE|/process/:id|{id}|-|
|GET|/defendant|-|All defendant|
|GET|/defendant/:id|{id}|{full_name, cnpj}|
|POST|/defendant|{full_name, cnpj}|{full_name, cnpj}|
|DELETE|/defendant/:id|{id}|-|
|PUT|/defendant/:id|{id,full_name, cnpj}|{full_name, cnpj}|
|GET|/deals|-|All deals|
|POST|/deal|{ quotas, price, dueDate, defendantId, processId }|{ quotas, price, dueDate, defendantId, processId }|
|DELETE|/deal/:id|{id}|-|
|GET|/parcels|-|All unpaid parcels|
|GET|/payment/paid|-|All paid parcels|
|PUT|/payment/pay/:id|{id}|Set payDay|

## Client repo

```bash
https://github.com/iuryflores/adv-agreement-client
```
## Deployed API

```bash
  https://clumsy-wig-slug.cyclic.app/
```


## Autores

- [@iuryflores](https://www.github.com/iuryflores)

