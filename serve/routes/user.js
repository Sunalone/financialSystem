import express from "express";

const router = express.Router();

// Create
router.post("/addUser", (req, res) => {
    const newUser = req.body;
});

// // Update
router.post("/updateUser", (req, res) => {
    const { id, age, name } = req.body;
});

// // Read
router.post("/getUser", (req, res) => {});

// Delete
router.post("/deleteUser", (req, res) => {
    const { id } = req.body;
});

export default router;
