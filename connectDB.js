import mongo from 'mongodb';

const mongoClient = mongo.MongoClient;
// const mongoUrl = 'mongodb://localhost:27017';
const mongoUrl = 'mongodb+srv://Sunitta:sunitta123@cluster0.pzgp6.mongodb.net/ToDoApp?retryWrites=true&w=majority'
const DB = 'ToDoApp';
let dbObj;

const connect = (callback) => {
    mongoClient.connect(mongoUrl, (err, connection) => {
        if(err) throw err
        dbObj = connection.db(DB)
        callback()        
    })
}

const get = () => {
    return dbObj
}

const close = () => {
    dbObj.close()
}

export default { connect, get, close }