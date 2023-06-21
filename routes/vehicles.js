const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  fs.readFile("./vehicles.json", "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
      res.status(500).send("Error reading file");
    } else {
      const vehicles = JSON.parse(data);
      const makes = vehicles.makes;
      const makeNames = makes.map((make) => make.name);
      res.json(makeNames);
    }
  });
});

router.get("/:make", (req, res) => {
  fs.readFile("./vehicles.json", "utf8", (err, data) => {
    const make = req.params.make;
    const vehicles = JSON.parse(data);
    const makes = vehicles.makes;
    const makeObj = makes.find(
      (makeObj) => makeObj.name.toLowerCase() === make.toLowerCase()
    );

    if (makeObj) {
      const models = makeObj.models;
      res.json(models);
    } else {
      res.status(404).send(`Cannot find make ${make}`);
    }
  });
});

module.exports = router;
