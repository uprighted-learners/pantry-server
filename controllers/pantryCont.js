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
        const { pantryName, address, city, state, zipCode, hours, requirements, contact, lat, lng } = req.body;
        const existing = await Pantry.findOne({ pantryName });

        // Missy added basic validation for required fields
        if (!pantryName || !address || !city || !state || !zipCode || !hours || !requirements || !contact || !lat || !lng) {
            return res.status(400).json({
                message: "All fields are required for pantry submissions"
            });
        }

        if (existing) {
            return res.status(409).json({ message: "Pantry already exists"});
        }

        const newPantry = new Pantry({ pantryName, address, city, state, zipCode, hours, requirements, contact, lat, lng });
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