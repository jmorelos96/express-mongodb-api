const router = require("express").Router();
const services = require(".././services");
const middleware = require('./middleware');

router.use('', middleware);

router.get('/:param', (req, res) => {
    services.find({type:req.params.param, limit:50}).then((result) => {
        res.send(result );
    }).catch((err) => {
        res.send(err);
    })
});

router.get("/:param/date", async (req, res) => {
    if(!req.query.startDate && !req.query.endDate) res.send("No information")
    services.getByDate({type:req.params.param,startDate:req.query.startDate,endDate:req.query.endDate, limit:50}).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});


router.get("/:param/getLastDays", async (req, res) => {
    if(!req.query.days && req.query.days > 30) res.send("No information");
    const currDate = new Date();
    services.getByDate({type:req.params.param,startDate:req.query.startDate,endDate:req.query.endDate, limit:50}).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});


router.post("/:param", () => {

});

router.put("/:param", () => {

});

router.delete("/:param", () => {

})


module.exports = router;