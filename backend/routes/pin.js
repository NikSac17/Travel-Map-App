const router = require("express").Router();
const Pin = require("../models/Pin");

//create a pin
router.post("/", async (req, res) => {
  const { username, title, description, rating, lat, long } = req.body;

  const pin = new Pin({ username, title, description, rating, lat, long });

  try {
    const savedPin = await pin.save();
    res.status(200).json(savedPin);
  } catch (error) {
    res.status(500).send("Internal Server Error...");
  }
});

//get all pins
router.get("/", async (req, res) => {

  try {
    const pin = await Pin.find();
    res.status(200).json(pin);
  } catch (error) {
    res.status(500).send("Internal Server Error...");
  }
});

module.exports = router;
