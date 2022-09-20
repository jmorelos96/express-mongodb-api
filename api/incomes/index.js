const router = require("express").Router();
const services = require("../../services");
router.get('/', (req, res) => {
    services.find({type:"income", limit:50}).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    })
});

router.get("/date", async (req, res) => {
    if(!req.query.startDate && !req.query.endDate) res.send("No information")
    services.getByDate({type:"income",startDate:req.query.startDate,endDate:req.query.endDate, limit:50}).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = router;