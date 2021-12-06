const express = require("express");
const cors = require("cors");
const { authRouter } = require("./routes/auth.routes");
const { userRouter } = require("./routes/user.routes");
const { serviceRouter } = require("./routes/service.routes");
const { serverRouter } = require("./routes/server.routes");
const { serverServiceRouter } = require("./routes/server_service.routes");
const app = express();

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const { initialRole, initialServer, initialService, initialUser } = require("./database");


db.sequelize.sync();

// force: true will drop the table if it already exists
// database oluşturulması lazım ilk ve daha sonra her başlatıldığında users tablosunu silmiş oluyor
// db.sequelize.sync().then(() => {
//   console.log("Drop and Resync Database with { force: true }");
//   initialRole();initialUser();
//   initialServer();initialService();
// });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/service", serviceRouter);
app.use("/api/server", serverRouter);
app.use("/api/serverservice", serverServiceRouter);

app.use((err, req, res, next) => {
  // console.log(err);
  res.status(400).json({
    message: err.message,
    //stack: err.stack
  });
});

const intervalFunc = require("./logs");
// setInterval(intervalFunc, 300000);

module.exports = {
  app,
};


