const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
console.log(DB_URL)

const dbConnect = async () => {
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect(DB_URL)
        console.log(`[db] connected to: ${DB_URL}`);
    } catch (err) {
        console.log(`[db] error: ${err}`);
    }
};

module.exports = { dbConnect, mongoose };