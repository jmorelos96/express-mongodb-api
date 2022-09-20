const dbo = require('../connections');

const find = ({type, limit}) => {
    const dbConnect = dbo.getDb();
    return new Promise((resolve, reject) => {
        dbConnect.collection(process.env.MONGO_COLLECTION)
        .find({type: type})
        .limit(limit)
        .toArray((err, result) => {
            if(err) reject(err);
            resolve(result)
        })
    })
}

const getByDate = async ({type, startDate, endDate, limit}) => {
    const dbConnect = dbo.getDb();
    return new Promise((resolve, reject) => {
        const data = dbConnect.collection(process.env.MONGO_COLLECTION).find({
            date: {$gte: new Date(startDate), $lt: new Date(endDate)},
            type: type,
        }).sort({date: 1}).limit(limit).toArray();
        await dbConnect.collection("incomes_expenses").aggregate([{
            $match: {
                type: type
            }
        }, {
            $group: {
                _id: '$type',
                total: {
                    $sum: '$amount'
                }
            }
        }]).toArray((err, result) => {
            if(!err && data && result) resolve({data, aggs: result});
            else reject(err);
        });
    });
}

module.exports = {
    find,
    getByDate
}