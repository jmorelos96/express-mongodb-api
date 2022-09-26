# ExpressJS + MongoDB
    This repository it's a implementation of expressJS with MongoDB
    In this case the use case it is about personal finances.
# Case use
This project is based on how to manage your own personal finances storing the data in a mongoDB schema and having a expressJS as webserver that handle the API.

**Incomes** and **Expenses** 
in both cases it will allow you to add, update, remove and to get between some dates, get the last 30 days or 15 days of incomes, and also if want to retrieve all the incomes it is possible with the API.

# Requisites
- Node installed
- Mongo Server installed or configured a database in cloud
# Installation
- Run ``npm i`` to install the modules/libraries
- Set up the **.env** with the following variables
    ``MONGO_HOST, MONGO_DB, MONGO_COLLECTION``
- Import the from the follwing file **incomes_expenses.json**

# Endpoints
*Note: ``${parm}`` it can be ``income/`` or ``expense/``*
| HTTP          | URL               | Action                    | Params            |
| ------------- | -------------     | ------------              |------------       |
| GET           | api/``${parm}``/      | Get all the incomes or expenses       |  N/A              |
| GET           | api/``${parm}``/date  | Get incomes between dates |  Params: **startDate**=YYYY-MM-DD, **endDate**=YYYY-MM-DD |
| GET           | api/``${parm}``/getByDays   |Get the last *n* days. **Max: 30 days**|Params: **days** as integer|
| POST           | api/``${parm}``   |It can add one or many incomes/expenses as you like.|``body: {data: object}``|
| PUT           | api/``${parm}``   |It can update one income or expense.|``body: {id: int, data: object}``|
| DELETE           | api/``${parm}``   |It can delete one income or expense.| Param: **Id** as integer|