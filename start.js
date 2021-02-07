const app = require("./server");

const port = 8080;

// Start server.
app({}).listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
