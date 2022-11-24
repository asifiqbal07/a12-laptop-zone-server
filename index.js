const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const jwt = require('jsonwebtoken');
require('dotenv').config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u9ujzex.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const laptopCollection = client.db('laptopZone').collection('laptops');

        app.get('/laptops', async (req, res) => {
            const query = {};
            const laptops = await laptopCollection.find(query).toArray();
            res.send(laptops);
        });

        app.get('/laptops/:category', async (req, res) => {
            const category = req.params.category;
            const query = { category }
            const brand = await laptopCollection.findOne(query);
            res.send({ brand });
        });

        // app.get('/laptops/:category/:id', async (req, res) => {
        //     const category = req.params.category;
        //     const id = req.params.id;
        //     console.log(id);
        //     const query = { category, id}
        //     const brand = await laptopCollection.findOne(query);
        //     res.send({ brand });
        // });

        app.get('/laptops/hp/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const hp = await laptopCollection.findOne(query);
            res.send({ hp });
        });


    }
    finally {

    }
}
run().catch(console.log);



app.get('/', async (req, res) => {
    res.send('Laptop server is running');
})

app.listen(port, () => console.log(`Laptop Zone running on ${port}`))