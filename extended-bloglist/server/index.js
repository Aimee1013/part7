// const express = require("express");
// const app = express();
// const cors = require("cors");
// const blogsRouter = require("./controllers/blog");

// app.use(cors());
// app.use(express.json());
// app.use("/api/blogs", blogsRouter);

const app = require("./app");
const http = require("http");
const config = require("./utils/config");

const server = http.createServer(app);

// const PORT = 3003;
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
