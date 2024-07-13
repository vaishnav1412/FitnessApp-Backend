const express = require("express");
const app = express();
const http = require("http");
require("dotenv").config();
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const { Server } = require("socket.io");
app.use(cors());
const user_route = require("./routes/user_route");
const admin_route = require("./routes/admin_route");
const { upload } = require("./config/multer");
const messageController = require("./controller/messageController");
app.use("/api/user", user_route);
app.use("/api/admin", admin_route);
app.use("/upload", express.static("./uploads"));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
