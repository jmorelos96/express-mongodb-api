const dbo = require('../connections');

/**
 * 
 * @param {type, limit}  
 * @returns 
 */
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

/**
 * 
 * @param {type, startDate, endDate, limit } 
 * @returns 
 */
const getByDate = async ({type, startDate, endDate, limit}) => {
    const dbConnect = dbo.getDb();
    return new Promise( async (resolve, reject) => {
        const data = dbConnect.collection(process.env.MONGO_COLLECTION).find({
            date: {$gte: new Date(startDate), $lt: new Date(endDate)},
            type: type,
        }).sort({date: 1}).limit(limit).toArray();
        await dbConnect.collection(process.env.MONGO_COLLECTION).aggregate([{
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

/**
 * 
 * @param {*} type 
 * @param {*} records 
 * @returns 
 */
const insert = (type, records) => {
    const dbConnect = dbo.getDb();
    return new Promise((resolve, reject) => {
        if(!elem || elem.length == 0) reject(new Error("Data invalid"));
        if(elem.length > 1){
            dbConnect.collection(process.env.MONGO_COLLECTION).insertOne(records[0])
        }else{
            dbConnect.collection(process.env.MONGO_COLLECTION).insertMany(records)
        }
        resolve(1);
    })
}

/**
 * 
 * @param {*} type 
 * @param {*} id 
 * @param {*} data 
 * @returns 
 */
const update = (type, id, data) => {
    const dbConnect = dbo.getDb();
    return new Promise((resolve, reject) => {
        if(!data) reject("No data")
        const res = dbConnect.collection(process.env.MONGO_COLLECTION).updateOne(
            {"_id": id},
            {$set: data }
        );
        console.log(res);
        resolve(1)
    })
}

const deletes = () => {

}

module.exports = {
    find,
    getByDate,
    update,
    insert,
    deletes
}