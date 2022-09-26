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
const insert = (records) => {
    const dbConnect = dbo.getDb();
    return new Promise((resolve, reject) => {
        if(!records || records.length == 0) reject(new Error("There is not records"));
        let res;
        try{
            if(records.length > 1){
                res = dbConnect.collection(process.env.MONGO_COLLECTION).insertOne(records[0])
            }else{
                res = dbConnect.collection(process.env.MONGO_COLLECTION).insertMany(records)
            }
            resolve(res);
        }catch(e){
            reject(e)
        }
    })
}

/**
 * 
 * @param {*} type 
 * @param {*} id 
 * @param {*} data 
 * @returns 
 */
const update = (data) => {
    const dbConnect = dbo.getDb();
    return new Promise((resolve, reject) => {
        if(!data) reject(new Error("There is not data"));
        if(!data.id) reject(new Error("There is not an id"));
        try{
            const res = dbConnect.collection(process.env.MONGO_COLLECTION).updateOne(
                {"_id": data.id},
                {$set: data }
            );
            resolve(res);
        }catch(e){
            reject(e)
        }
    })
}

/**
 * 
 * @param {*} type 
 * @param {*} id 
 */
const deletes = (id) => {
    const dbConnect = dbo.getDb();
    return new Promise((resolve, reject) => {
        if(!id) reject(new Error("There is not id"));
        try{
            let res = dbConnect.collection(process.env.MONGO_COLLECTION).deleteOne({"_id": id})
            resolve(res);
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    find,
    getByDate,
    update,
    insert,
    deletes
}