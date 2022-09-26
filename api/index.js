const router = require("express").Router();
const services = require(".././services");
const middleware = require('./middleware');
const errors = require('./errors')
const moment = require("moment");

router.use('', middleware);

router.get('/', (req, res) => {
    services.find({type:req.params.param, limit:50}).then((result) => {
        res.send(result );
    }).catch((err) => {
        res.send(err);
    })
});

router.get("/date", async (req, res) => {
    if(!req.query.startDate && !req.query.endDate) res.send("No information")
    services.getByDate({type:req.params.param,startDate:req.query.startDate,endDate:req.query.endDate, limit:50}).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});


router.get("/getLastDays", async (req, res) => {
    if(!req.query.days && req.query.days > 30) res.send("No information");
    const startDate = moment().format('YYYY-MM-DD');
    const endDate = moment().subtract(days, 'days').format('YYYY-MM-DD');
    services.getByDate({type:req.params.param,startDate,endDate, limit:50}).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});


router.post("/", (req, res) => {
    if(!req.body.data || req.body.data.length == 0) res.send(errors.messages()[403])
    services.insert(req.body.data).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(errors.messages(null,err)[403])
    })
});

router.put("/", (req, res) => {
    if(!req.body.id) res.send(errors.messages()[403])
    if(!req.body.data) res.send(errors.messages()[403])
    services.update(req.body.id, req.body.data).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(errors.messages(null,err)[403])
    })
});

router.delete("/", (req, res) => {
    if(!req.query.id) res.send(errors.messages()[403])
    services.deletes(req.query.id).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(errors.messages(null,err)[403])
    })
})


module.exports = router;