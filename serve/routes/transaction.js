import express from "express";
import Transaction from "../models/transactionModel.js";

const router = express.Router();

router.post("/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
