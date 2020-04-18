const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect DB
connectDB();

// Initialise middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/members", require("./routes/api/members"));
app.use("/api/sessions", require("./routes/api/sessions"));
app.use("/api/bookings", require("./routes/api/bookings"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // Serve index.html file for anything other than routes above
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
