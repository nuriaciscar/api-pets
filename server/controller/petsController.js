const Pet = require("../../database/models/pet");

const getPets = async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
};

const getPetById = async (req, res, next) => {
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
};

const createPet = async (req, res, next) => {
  try {
    const pet = req.body;
    const newPet = await Pet.create(pet);
    res.json(newPet);
  } catch (error) {
    error.code = 400;
    error.message = "Focus!";
    next(error);
  }
};

module.exports = {
  getPets,
  getPetById,
  createPet,
};
