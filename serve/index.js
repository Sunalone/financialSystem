import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import kpiRoute from "./routes/kpi.js";
import productRoute from "./routes/product.js";
import transactionRoute from "./routes/transaction.js";

// env

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// 设置路由
app.use("/kpi", kpiRoute);
app.use("/product", productRoute);
app.use("/transaction", transactionRoute);

const PORT = process.env.PORT || 1231;

// 设置moogoose
mongoose.Promise = global.Promise;
const connection = mongoose.connect(process.env.MONGO_URL, {
    useMongoClient: true,
});
connection
    .then(async () => {
        app.listen(PORT, () => console.log(`server is running at ${PORT}`));
    })
    .catch((error) => console.log(`error is ${error}`));

console.log("hello");
