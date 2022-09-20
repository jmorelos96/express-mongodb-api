const router = require("express").Router();
const incomes = require("./incomes");
const expenses = require("./expenses");
router.use('/incomes',incomes);
router.use('/expenses',expenses);
module.exports = router;