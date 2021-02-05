const express = require("express");
const app = express();
const port = 8080;
const router = express.Router();

// Serve static files.
app.use(express.static("public"));

// Declare routes.
router.get("/user", (req, res) => {
  res.send("Hello World!");
});

// Set API prefix.
app.use("/api/v1", router);

// Start server.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
