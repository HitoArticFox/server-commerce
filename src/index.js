const admin = require("firebase-admin");
const express = require("express");
const app = express();

admin.initializeApp({
    credential: admin.credential.cert('./permission.json')
  });

const db = admin.firestore();

app.use(express.json());
const puerto = process.env.puerto || 3000

app.use(express.urlencoded({extended: true}));

app.get("/hello-world", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

app.post("/api/products", async (req, res) => {
  try {
    console.log(req.body);
    await db
      .collection("products")
      .doc("/" + req.body.id + "/")
      .create({ 
        units: req.body.units,
        price: req.body.price,
        name: req.body.name 
        });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/api/products/:products_id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("products").doc(req.params.products_id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

app.put("/api/products/:products_id", async (req, res) => {
  try {
    const document = db.collection("products").doc(req.params.products_id);
    await document.update({
      units: req.body.units,
      price: req.body.price,
      name: req.body.name
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json();
  }
});

app.delete("/api/products/:products_id", async (req, res) => {
  try {
    const doc = db.collection("products").doc(req.params.products_id);
    await doc.delete();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});
//----------------------------------------------------------------------------------------------------
// USUARIOS CREAR-OBTENER-CAMBIAR-BORRAR EN LA BASE DE DATOS FIRESTORE
//----------------------------------------------------------------------------------------------------

app.post("/api/users", async (req, res) => {
  try {
    console.log(req.body);
    await db
      .collection("users")
      .doc("/" + req.body.id + "/")
      .create({ 
        contraseña: req.body.contraseña,
        name: req.body.name 
        });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/api/users/:users_id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("users").doc(req.params.users_id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

app.put("/api/users/:users_id", async (req, res) => {
  try {
    const document = db.collection("users").doc(req.params.users_id);
    await document.update({
      contraseña: req.body.contraseña,
      name: req.body.name
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json();
  }
});

app.delete("/api/users/:users_id", async (req, res) => {
  try {
    const doc = db.collection("users").doc(req.params.users_id);
    await doc.delete();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.listen(3000, () => console.log(`Server has started on port 3000`))