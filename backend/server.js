const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });
const express = require("express");
const app = express();
require("./app");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);

app.listen(process.env.PORT, function () {
  console.log(`server is listening on port ${process.env.PORT}`);
});
