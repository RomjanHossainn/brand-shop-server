const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors())
app.use(express.json())


app.get('/',(req,res) => {
    res.send('server home route running')
})


    
const { MongoClient, ServerApiVersion } = require("mongodb");
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

    // prodcuts part

    const productsDataBase = client.db('ProductsDB').collection('products');

    app.get("/products/:name", async (req, res) => {
      const name = req.params.name;
      const result = await productsDataBase.find().toArray();
      const filterBrand = result.filter(brand => brand.brand_name === name)
      res.send(filterBrand)

    });

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
