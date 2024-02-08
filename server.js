require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const notesRouter = require("./routes/notes");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: process.env.FRONTPORT,
  })
);

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/notes", notesRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
