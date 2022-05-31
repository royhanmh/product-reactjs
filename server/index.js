const express = require("express");
const cors = require("cors");

const app = express();

const connectDB = require("./database/connection");
const productsModel = require("./models/Product");

app.use(express.json());
app.use(cors());

connectDB();

app.post("/insert", async (req, res) => {
  name = req.body.productName;
  category = req.body.productCategory;
  remaining = req.body.productRemaining;
  price = req.body.productPrice;

  const product = new productsModel({
    productName: name,
    productCategory: category,
    productRemaining: remaining,
    productPrice: price,
  });

  try {
    await product.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/products", async (req, res) => {
  productsModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  productsModel.findById(id, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  newProductName = req.body.newProductName;
  newProductCategory = req.body.newProductCategory;
  newProductRemaining = req.body.newProductRemaining;
  newProductPrice = req.body.newProductPrice;
  id = req.body.id;

  try {
    await productsModel.findById(id, (err, updatedProduct) => {
      updatedProduct.productName = newProductName;
      updatedProduct.productCategory = newProductCategory;
      updatedProduct.productRemaining = newProductRemaining;
      updatedProduct.productPrice = newProductPrice;
      updatedProduct.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await productsModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
