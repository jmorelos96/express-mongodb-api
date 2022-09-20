const router = require("express").Router();
const dbo = require('../../connections');

router.get('/', (req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect
      .collection(process.env.MONGO_COLLECTION)
      .find({type: "expense"})
      .limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.send('Error fetching listings!');
        } else {
          res.json(result);
        }
      });
});
router.get("/date", async (req, res) => {
    if(!req.query.startDate && !req.query.endDate) res.send("No information")
    const dbConnect = dbo.getDb();
    const query = dbConnect
    .collection(process.env.MONGO_COLLECTION)
    .find({
        date: {$gte: new Date(req.query.startDate), $lt: new Date(req.query.endDate)},
        type: 'expense',
    })
    .sort({
        date: 1
    })
    .limit(50);
    const data =  await query
    .toArray();
    await dbConnect.collection("incomes_expenses").aggregate([{
        $match: {
            type: 'expense'
        }
    }, {
        $group: {
            _id: '$type',
            total: {
                $sum: '$amount'
            }
        }
    }]).toArray((err, result) => {
        if(!err && data && result) res.send({data, aggs: result})
        else res.statusCode(400)
    });
});
module.exports = router;