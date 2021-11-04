const express = require("express");

const router = express.Router();

const pets = [
  {
    id: 1,
    name: "Lorenzo",
    age: 13,
  },
  {
    id: 2,
    name: "Maki",
    age: 1,
  },
];

router.get("/", (req, res) => {
  res.json(pets);
});
router.get("/pet/:id", (req, res) => {
  const id = +req.params.id;
  const searchedPet = pets.find((pet) => pet.id === id);
  if (searchedPet) {
    res.json(searchedPet);
  } else {
    const error = new Error("Pet not found");
    error.code = 404;
    throw error;
  }
});

module.exports = router;
