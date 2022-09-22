# NodeJS + MongoDB
    This repository it's a implementation of expressJS with MongoDB
    In this case the use case it is about personal finances.
# Case use
    This project is based on how to manage your own personal finances storing the data in a mongoDB schema and having a expressJS as webserver that handle the API.

    Incomes
    Expenses

# Requisites
- Node installed
- Mongo Server installed or configured a database in cloud
# Installation
- Run ``npm i`` to install the modules/libraries
- Set up the env with the following variables
    ``MONGO_HOST, MONGO_DB, MONGO_COLLECTION``
- Import the from the follwing file incomes_expenses.json
# Endpoints
| HTTP          | URL               | Action                    | Params            |
| ------------- | -------------     | ------------              |------------       |
| GET           | api/incomes/      | Get all the incomes       |  N/A              |
| GET           | api/incomes/date  | Get incomes between dates |  startDate=YYYY-MM-DD, endDate=YYYY-MM-DD |
| GET           | api/incomes/getByDays   |                       ||
| POST           | api/incomes   |||
| PUT           | api/incomes   |||
| DELETE           | api/incomes   |||
| GET           | api/expenses/      | Get all the expenses       |  N/A              |
| GET           | api/expenses/date  | Get expenses between dates |  startDate=YYYY-MM-DD, endDate=YYYY-MM-DD |
| GET           | api/expenses/getByDays   |                       ||
| POST           | api/expenses   |||
| PUT           | api/expenses   |||
| DELETE           | api/expenses   |||