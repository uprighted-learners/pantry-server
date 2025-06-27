require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { dbConnect } = require("./config/db");
const app = express();
const PORT = process.env.PORT || 4000;

const host = "127.0.0.1";

const authRoutes = require("./routes/authRoutes");
const pantryRoutes = require('./routes/pantryRoutes');

// testing the routes
app.get("/", (req, res) => {
    res.json({ message: "Your GET is working"})
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // There was a ton of confusion around the difference between server and client/html endpoints in my last project, so I looked it up. I couldn't find it using strategic key words, so I asked ChatGPT, but wanted to be sure so I finally just added the exact code -app.use("/api/auth", authRoutes); vs. app.use("/", authRoutes);- to the search engine and that worked. I read this article -https://dev.to/aritik/setting-up-auth-routes-with-express-57oi- This allows for the server/client separation. (Nick asked why, and this is why)
app.use("/api/pantries", pantryRoutes);



app.listen(PORT, host, () => {
	dbConnect();
	console.log(`[server] listening on ${PORT}`)
});

