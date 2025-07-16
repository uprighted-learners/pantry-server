const Pantry = require("../models/Pantry")
// const SALT = Number(process.env.SALT); -salt not needed here (Missy)

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

exports.createPantry = async (req, res) => {
    try {

        // Missy added missing information that was needed to match the Pantry model
        const { pantryName, address, city, state, zipCode, hours, requirements, contact } = req.body;
        const existing = await Pantry.findOne({ pantryName });
        

        if (existing) {
            return res.status(409).json({ message: "Pantry already exists"});
        }

        const newPantry = new Pantry({ pantryName, address, city, state, zipCode, hours, requirements, contact });
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