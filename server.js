const express = require("express");
const connectDB = require("./config/db");
const app = express();
connectDB();
app.get("/", (req, res) => res.send("API Running"));

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/cards", require("./routes/api/Cards"));
app.use("/users", require("./routes/api/Users"));
app.use("/auth", require("./routes/api/Auth"));
app.use("/collections", require("./routes/api/Collections"));
const PORT = process.env.PORT || 5000;
app.listen(PORT);
