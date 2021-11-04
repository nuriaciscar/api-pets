const express = require("express");
const Pet = require("../../database/models/pet");

const router = express.Router();

router.get("/", async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

router.get("/pet/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const searchedPet = await Pet.findById(id);
    if (searchedPet) {
      res.json(searchedPet);
    } else {
      const error = new Error("Pet not found");
      error.code = 404;
      throw error;
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
});

router.post(
  "/new",
  (req, res, next) => {
    console.log("¡Ojo! Están creando un pet.");
    next();
  },
  async (req, res, next) => {
    try {
      const pet = req.body;
      const newPet = await Pet.create(pet);
      res.json(newPet);
    } catch (error) {
      error.code = 400;
      error.message = "Focus!";
      next(error);
    }
  }
);

module.exports = router;
