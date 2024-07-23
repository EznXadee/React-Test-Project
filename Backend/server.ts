import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
const PORT = process.env.PORT || 5000;

app.use("/", require("./routes/indexRoute"));
app.use("/get/employees", require("./routes/getEmployeeRoute"));
app.use("/get/sales", require("./routes/getSalesRoute"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
