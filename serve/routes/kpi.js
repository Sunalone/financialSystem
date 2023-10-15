import express from "express";
import Kpi from "../models/kpiModel.js";

const router = express.Router();

router.post("/kpis", async (req, res) => {
    try {
        const kpis = await Kpi.find();
        res.status(200).json(kpis);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
