const router = require("express").Router();
const error = require("./errors");
router.use((req, res, next) => {
    if(req.path == "/income" || req.path == "/expense"){
        next();
    }else{
        const err = error.messages(req.path);
        res.send(err["409"]).status(409);
    }
})
module.exports = router;