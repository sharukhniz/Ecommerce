const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./database/DBconnection.js");
const router = require("./routes/router");
const multer = require("multer")
const morgan = require("morgan")
const path = require('path')

const app = express();
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('tiny'));

app.use("/", router);

connectDB();

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

app.use("/category", express.static(path.resolve(__dirname,"category")));
app.use("/products", express.static(path.resolve(__dirname,"products")));


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});