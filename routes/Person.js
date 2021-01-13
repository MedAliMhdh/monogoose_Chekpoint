const express = require("express");
const router = express.Router();
const Person = require("../models/PersonModel");

//Initialising DB woith data using create() method
const arrayOfPeople = [
  { name: "Person1", age: 24, favouritFood: ["rice", "macncheese"] },
  { name: "Person2", age: 25, favouritFood: ["pasta", "ratatouille"] },
];

Person.create(arrayOfPeople);

//Posting new person
router.post("/", async (req, res) => {
  const person = new Person({
    name: req.body.name,
    age: req.body.age,
    favouritFood: req.body.favouritFood,
  });
  try {
    const saved = await person.save();
    res.json(saved);
  } catch (error) {
    res.json({ Message: error });
  }
});

//finding person by name
router.get("/name/:personName", async (req, res) => {
  try {
    const person = await Person.find({ name: req.params.personName });
    res.json(person);
  } catch (error) {
    res.json({ message: error });
  }
});

//Finding one person with matching favourit food
router.get("/food/:food", async (req, res) => {
  try {
    const person = await Person.findOne({ favouritFood: req.params.food });
    res.json(person);
  } catch (error) {
    res.json({ message: error });
  }
});

//Finding person by ID
router.get("/id/:personsId", async (req, res) => {
  try {
    const person = await Person.findById({ _id: req.params.personsId });
    res.json(person);
  } catch (error) {
    res.json({ message: error });
  }
});

//Find one and save
router.put("/id/:personsId", (req, res) => {
  Person.findById(req.params.personsId, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data.favoriteFoods.push("hamburger"),
        data.save((err, person) => {
          err ? res.json(err) : res.json(person);
        });
    }
  });
});

//Updating found person
router.put("/name/:personsName", (req, res) => {
  Person.findOneAndUpdate(
    { name: req.params.personsName },
    { $set: { age: 20 } },
    { new: true }
  )
    .then((person) => res.json(person))
    .catch((err) => res.json(err));
});

//Find By Id and Remove
router.delete("/id/:personId", (req, res) => {
  Person.findByIdAndRemove(req.params.personId)
    .then((person) => res.json(person))
    .catch((err) => res.json(err));
});

//Delete Many
router.delete("/Rmv", (req, res) => {
  Person.remove({ name: "Mary" })
    .then((person) => res.json(person))
    .catch((err) => res.json(err));
});

//Narrow chain search results
router.get("/Chaining", (req, res) => {
  Person.find({ favoriteFoods: { $all: ["burrito"] } })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      err ? res.json(err) : res.json(data);
    });
});

//Persons page (all persons)
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
