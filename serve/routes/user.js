import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Create
router.post("/addUser", (req, res) => {
    const newUser = req.body;
    User.create(newUser)
        .then((user) => {
            console.log("Created user:", user);
            res.send({
                status: 200,
                message: "新增用户成功",
            });
        })
        .catch((err) => {
            res.send({
                status: 500,
                message: err,
            });
        });
});

// // Update
router.post("/updateUser", (req, res) => {
    const { id, age, name } = req.body;
    User.update(
        { age, name },
        {
            where: {
                id,
            },
        }
    )
        .then((updatedRows) => {
            console.log("Updated rows:", updatedRows);
            res.send({
                status: 200,
                result: updatedRows,
            });
        })
        .catch((err) => {
            res.send({
                status: 500,
                result: err,
            });
        });
});

// // Read
router.post("/getUser", (req, res) => {
    User.findAll()
        .then((users) => {
            res.send({
                status: 200,
                result: users,
            });
        })
        .catch((err) => {
            res.send({
                status: 500,
                result: err,
            });
        });
});

// Delete
router.post("/deleteUser", (req, res) => {
    const { id } = req.body;
    User.destroy({
        where: {
            id,
        },
    })
        .then((deletedRows) => {
            res.send({
                status: 200,
                result: deletedRows,
            });
        })
        .catch((err) => {
            res.send({
                status: 500,
                result: err,
            });
        });
});

export default router;
