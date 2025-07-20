const Pantry = require("../models/Pantry")
// const SALT = Number(process.env.SALT); -salt not needed here (Missy)

// Missy added React-Admin required syntax
exports.getPantries = async (req, res) => {
    try {
        const { _sort, _order, _start, _end, ...filters } = req.query;

        let query = {};
        
        if (filters.pantryName) {
            query.pantryName = { $regex: filters.pantryName, $options: 'i' }; // Case-insensitive search
        }

        if (filters.address) {
            query.address = { $regex: filters.address, $options: 'i' };
        }
        if (filters.city) {
            query.city = { $regex: filters.city, $options: 'i' };
        }
        if (filters.state) {
            query.state = { $regex: filters.state, $options: 'i' };
        }
        if (filters.zipCode) {
            query.zipCode = { $regex: filters.zipCode, $options: 'i' };
        }
        if (filters.hours) {
            query.hours = { $regex: filters.hours, $options: 'i' };
        }
        if (filters.hours) {
            query.hours = { $regex: filters.hours, $options: 'i' };
        }
        if (filters.contact) {
            query.contact = { $regex: filters.contact, $options: 'i' };
        }

        const total = await Pantry.countDocuments(query);

        let sortOptions = {};
        if (_sort) {
            sortOptions[_sort] = (_order === 'DESC' ? -1 : 1);
        } else {
            sortOptions.pantryName = 1; 
        }

        const start = parseInt(_start) || 0;
        const limit = (parseInt(_end) - start) || 25;


        const pantries = await Pantry.find(query)
            .sort(sortOptions)
            .skip(start)
            .limit(limit)

        const formattedPantries = pantries.map(pantry => {
            const obj = pantry.toObject(); 
            obj.id = obj._id.toString(); 
            delete obj._id; 
            return obj;
        });

        const end = start + formattedPantries.length - 1;
        res.setHeader('Content-Range', `pantries ${start}-${end}/${total}`);
        res.status(200).json(formattedPantries);
        
    } catch (err) {
        console.error("Error fetching pantries list;", err)
        res.status(500).json({
            message: "Failed to fetch pantries list",
            error: err.message
        });
    }
};

// Missy Added GET one with React-Admin required syntax
exports.getOnePantry = async (req, res) => {
    try {
        const { id } = req.params;

        const pantry = await Pantry.findById(id);

        if (!pantry) {
            return res.status(404).json({ message: "Pantry not found" });
        }

        const obj = pantry.toObject();
        obj.id = obj._id.toString();
        delete obj._id;

        res.status(200).json(obj);

    } catch (err) {
        console.error("Error fetching single pantry record:", err);
        res.status(500).json({
            message: "Failed to fetch single pantry record",
            error: err.message
        });
    }
};

// Missy added React-Admin required syntax
exports.createPantry = async (req, res) => {
    try {

        // Missy added missing information that was needed to match the Pantry model
        const { pantryName, address, city, state, zipCode, hours, requirements, contact } = req.body;
        const existing = await Pantry.findOne({ pantryName });

        // Missy added basic validation for required fields
        if (!pantryName || !address || !city || !state || !zipCode || !hours || !requirements || !contact) {
            return res.status(400).json({
                message: "All fields are required for pantry submissions"
            });
        }

        if (existing) {
            return res.status(409).json({ message: "Pantry already exists"});
        }

        const newPantry = new Pantry({ pantryName, address, city, state, zipCode, hours, requirements, contact });
        await newPantry.save();

        const createdPantry = newPantry.toObject();
        createdPantry.id = createdPantry._id.toString();
        delete createdPantry._id;

        res.status(201).json({
            message: "Pantry created successfully",
            data: createdPantry
        });
    } catch (err) {
        console.error("Error creating pantry:", err);
        res.status(500).json({
            message: "Failed to create pantry",
            error: err.message
        });
    }
};

// Missy Added update and delete pantry with React-Admin required syntax
exports.updatePantry = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedPantry = await Pantry.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!updatedPantry) {
            return res.status(404).json({ message: "Pantry not found" });
        }

        const obj = updatedPantry.toObject();
        obj.id = obj._id.toString();
        delete obj._id;

        res.status(200).json({
            message: "Pantry updated successfully",
            data: obj 
        });
    } catch (err) {
        console.error("Error updating pantry:", err);
        res.status(500).json({
            message:" Failed to update pantry",
            error: err.message
        });
    }
};

exports.deletePantry = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPantry = await Pantry.findByIdAndDelete(id);

        if (!deletedPantry) {
            return res.status(404).json({ message: "Pantry not found" });
        }

        res.status(200).json({
            message: "Pantry deleted successfully",
            data: { id: deletedPantry._id.toString() }
        });
    } catch (err) {
        console.error("Error deleting pantry:", err);
        res.status(500).json({
            message: "Failed to delete pantry",
            error: err.message
        });
    }
};


