import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import mongoose from "mongoose";
import kpiRoute from "./routes/kpi.js";
import productRoute from "./routes/product.js";
import transactionRoute from "./routes/transaction.js";

// env
const PORT = 3000;
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//db
mongoose
    .connect("mongodb://localhost:27017/web")
    .then(async () => {
        console.log("连接成功");

        app.listen(PORT, () => console.log(`server is running at ${PORT}`));
    })
    .catch(() => {
        console.log("连接失败");
    });

// route config
app.use("/user", userRoute);
app.use("/kpi", kpiRoute);
app.use("/product", productRoute);
app.use("/transaction", transactionRoute);
