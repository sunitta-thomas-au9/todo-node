import express from 'express';
import mongo from 'mongodb';
import dbConnect from '../connectDB.js';

const router = express.Router();
const colName = 'todo'


//get all ,based on status,startdate,end date
router.get('/', (req, res) => {
    var query = {}
    if(req.query.status) {
        query = {status:req.query.status}
    }
    else if(req.query.start) {
        query = {start:req.query.start}
    }
    else if(req.query.end) {
        query = {end:req.query.end}
    }

    dbConnect.get().collection(colName).find(query).toArray((err, result) => {
        if(err) throw err
        res.send(result)
    })
})

//get one task based on id
router.get('/:id', (req,res) => {
    const Id = mongo.ObjectID(req.params.id)
    dbConnect.get().collection(colName).findOne({_id:Id}, (err,result) => {
        if(err) throw err
        res.send(result)
    })
})

//post data
router.post('/addTask', (req, res) => {
    dbConnect.get().collection(colName).insert(req.body, (err, result) => {
        if(err) throw err
        res.send("data is added successfully")
    })
})

//delete data
router.delete('/delete/:id', (req, res) => {
    const Id = mongo.ObjectID(req.params.id)
    dbConnect.get().collection(colName).remove({_id:Id}, (err, result) => {
        if(err) throw err
        res.send("Data is deleted")
    })
})

//edit data 
router.put('/edit', (req, res) => {
    const Id = mongo.ObjectID(req.body._id)
    dbConnect.get().collection(colName).update(
        {_id:Id},
        {
            $set:{
                title: req.body.title,
                details: req.body.details,
                start: req.body.start,
                end: req.body.end,
                status: req.body.status
            }
        }, (err,result) => {
            if(err) throw err
            res.send("Data is updated")
        }
    )
})

//update stauts completed/pending
router.patch('/updateStatus', (req,res) => {
    const Id = mongo.ObjectID(req.body._id)

    dbConnect.get().collection(colName).update(
        {_id:Id},
        {
            $set:{ status: req.body.status ? req.body.status : pending }
        }, (err,result) =>{
            if(err) throw err
            res.send("data is updated")
        }
    )
})

export default router;