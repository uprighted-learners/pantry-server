require("dotenv").config();
const express = require("express")
const cors = require("cors")



const { dbConnect } = require("./config/db")
const app = express();
const PORT = process.env.PORT || 4000;

const host = "127.0.0.1";

const authRoutes = require("./routes/authRoutes")
const pantryRoutes = require('./routes/pantryRoutes')

dbConnect();

app.get("/", (req, res) => {
    res.json({ message: "Your GET is working"})
})

app.use(cors());
app.use(express.json());
app.use("/api/pantries", pantryRoutes);



app.listen(PORT, host, () => {
	dbConnect();
	console.log(`[server] listening on ${PORT}`)
})