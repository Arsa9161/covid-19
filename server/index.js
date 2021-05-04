/**
 * author Ariunsanaa.B  B190910009
 */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const { generateKeyPair } = require("crypto");
const mainRoutes = require("./routes/mainRoutes");
/*
 * MIDDLEWARES
 */
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", mainRoutes);

app.listen(3001, () => {
  console.log("listening 3001 on server");
});
