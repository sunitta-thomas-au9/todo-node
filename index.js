import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongo from 'mongodb';
import dbConnect from './connectDB.js';
import todoRoutes from './Routes/todoRoutes.js';

const app = express();
const PORT = process.env.PORT || 9700;

app.use(bodyParser.json());
app.use(cors());

//healthCheck
app.get('/', (req,res) => {
    res.status(200).send("Health Ok")
})

//Todo Routes
app.use('/todo', todoRoutes)

//Connect DB and Start Server
dbConnect.connect(() => {
    app.listen(PORT, (err) => {
        if(err) throw err
        console.log(`Server is running on port:${PORT}`)
    })
})
