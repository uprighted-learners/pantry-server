require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { dbConnect } = require("./config/db")
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes")
app.use("/api/auth", authRoutes); // There was a ton of confusion around the difference between server and client/html endpoints in my last project, so I looked it up. I couldn't find it using strategic key words, so I asked ChatGPT, but wanted to be sure so I finally just added the exact code to the search engine and that worked. This allows for the server/client separation. 


app.listen(PORT, () => {
	dbConnect();
	console.log(`[server] listening on ${PORT}`)
});