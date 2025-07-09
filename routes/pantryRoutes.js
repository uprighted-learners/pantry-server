const express = require("express");
const router = express.Router();
const Pantry = require("../models/Pantry.js");

router.get("/", async (req, res) => {
   try {
    const pantries = await Pantry.find();
    res.json(pantries);
} catch (err) {
    res.status(500).json({ error: "Failed to fetch pantries"})
}})

router.post("/newPantry", async (req, res) => {
    const  { pantryName, address, city, state, zipCode, hours, requirements, contact } = req.body;
            console.log(pantryName, address, city, state, zipCode, hours, requirements, contact);

            try {
            const foundPantry = await Pantry.findOne({ pantryName });

            if (foundPantry) {
                return res.status(409).json ({
                    message: "Pantry already exists"
                });
            } 

                const newPantry = new Pantry({ pantryName, address, city, state, zipCode, hours, requirements, contact });
                await newPantry.save();

                res.status(201).json({ message: "Pantry added successfully", pantry: newPantry });
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
                });

module.exports = router