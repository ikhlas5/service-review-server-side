const express=require('express');
const app =express();
const cors=require('cors')
const port= process.env.PORt|| 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rrizfqd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const serviceCollection = client.db('weddingPhotographer').collection('services');
        const orderCollection = client.db('weddingPhotographer').collection('reviews');
        app.get('/home', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query).limit(3);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        //review api
        app.get('/reviews', async (req, res) => {
            let query = {};

            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }

            const cursor = orderCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });

        app.post('/reviews', async (req, res) => {
            const review= req.body;
            const result = await orderCollection.insertOne(review);
            res.send(result);
        });

    }
    finally{

    }
}
run().catch(err => console.error(err));
// 1 testing purpuse
app.get('/', (req,res)=>{
    res.send('service review running')
})
app.listen(port,()=>{
    console.log(' running',port)
})
