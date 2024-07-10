const express = require("express");
const morganMiddleware = require("./middlewares/morgan.middleware");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const dotenv = require("dotenv");
const managerRoute = require("./routes/manager.route");
const employeeRoute = require("./routes/employee.route");
const cors = require("cors");
dotenv.config();

const port = 476;
const app = express();

app.use(cors());
app.use(morganMiddleware);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/manager", managerRoute);
app.use("/employee", employeeRoute);

app.listen(port, () => {
  logger.info(`Running on port ${port}!`);
});
