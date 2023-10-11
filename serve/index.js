import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";

// env

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// route config
app.use("/user", userRoute);

const PORT = 3000;

app.listen(PORT, () => console.log(`server is running at ${PORT}`));
