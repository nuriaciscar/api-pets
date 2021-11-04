const express = require("express");

const router = express.Router();

const owners = [
  {
    id: 1,
    name: "Mario",
    age: 26,
  },
  {
    id: 2,
    name: "Loling",
    age: 25,
  },
];

router.get("/", (req, res) => {
  res.json(owners);
});
router.get("/owner/:id", (req, res) => {
  const id = +req.params.id;
  const searchedOwner = owners.find((owner) => owner.id === id);
  if (searchedOwner) {
    res.json(searchedOwner);
  } else {
    const error = new Error("Owner not found");
    error.code = 404;
    throw error;
  }
});

module.exports = router;
