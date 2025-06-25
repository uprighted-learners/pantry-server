require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { dbConnect } = require("./config/db")
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// import routes here



app.listen(PORT, () => {
	dbConnect();
	console.log(`[server] listening on ${PORT}`)
});