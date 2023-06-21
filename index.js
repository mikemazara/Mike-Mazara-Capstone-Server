const express = require("express");
const app = express();
const router = express.Router();
const vehicles = require("./routes/vehicles");
const chat = require("./routes/chat");

console.log(vehicles);

app.use(express.json());

require("dotenv").config();

const port = process.env.PORT || 3000;

app.use("/vehicles", vehicles);
app.use("/chat", chat);

app.listen(port, () => console.log(`i be listening on port ${port}!`));
