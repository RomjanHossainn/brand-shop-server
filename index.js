const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors())
app.use(express.json())


app.get('/',(req,res) => {
    res.send('server home route running')
})


    
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://FashionApparelProject:IPMQpXovKh7ZnUlS@cluster0.m61flku.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    // category get // prodcuts part


    const productsDataBase = client.db('ProductsDB').collection('products');
    const categoryesDatabase = client.db('ProductsDB').collection('categoryes')

    app.get('/categoryes',async(req,res) => {
      const result = await categoryesDatabase.find().toArray();
      res.send(result);
    })

    
    app.get("/products/:name", async (req, res) => {
      const name = req.params.name;
      const query = { brand_name: name };
      const result = await productsDataBase.find(query).toArray();
      res.send(result);
    });

    app.get('/product/:id',async(req,res) => {
      const id = req.params.id;
      const query = {_id:new ObjectId(id)}
      const result = await productsDataBase.findOne(query);
      res.send(result);
    })


    app.post('/products',async(req,res) => {
      const addProducts = req.body;
      const imageurl = addProducts.image;
      const checkMultiple = {image : imageurl}
      const finedData = await productsDataBase.findOne(checkMultiple);
      if(!finedData){
        const result = await productsDataBase.insertOne(addProducts);
        res.send(result);
      }else{
        res.send({
          alreadyAddeded : true
        })
      }
    })



    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

    
    
    



app.listen(port,() => {
    console.log('the server is running')
})
