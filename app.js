const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();

dotenv.config();
const { PORT = 8000 } = process.env;
app.use(cors());
app.use(morgan("dev"));

/** for call routes */
const adminRoute = require("./routes/adminRoutes");
const employeeRoute = require("./routes/employeeRoutes");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

/** for use routes */
app.use(adminRoute);
app.use(employeeRoute);
app.use("/assets", express.static("assets"));

app.get("/", (req, res) => {
  res.send("hello people");
});

app.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});

module.exports = app;
