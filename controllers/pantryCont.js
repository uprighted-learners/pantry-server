const Pantry = require("../models/Pantry")
const SALT = Number(process.env.SALT);

exports.getPantries = async (req, res) => {
    try {
        const pantries = await Pantry.find();
        res.json(pantries);
    } catch (err) {
        res.status(500).json({
            message: `${err.message}`
        })

    }
};

exports.CreatePantry = async (req, res) => {
    try {
        const { pantryName, zipCode } = req.body;
        const existing = await Pantry.findOne({ pantryName });

        if (existing) {
            return res.status(409).json({ message: "Pantry already exists"});
        }

        const newPantry = new Pantry({ pantryName, address, city, state, zipCode, hours, needs, contact });
        await newPantry.save();

        res.status(201).json({
            message: "Pantry created successfully",
            pantry: newPantry
        });
    } catch (err) {
        res.status(500).json({
            message:`${err.message}`
        });
    }
}