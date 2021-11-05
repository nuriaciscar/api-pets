const express = require("express");
const {
  getPetById,
  createPet,
  getPets,
} = require("../controller/petsController");

const router = express.Router();

router.get("/", getPets);

router.get("/pet/:id", getPetById);

router.post("/new", createPet);

module.exports = router;
