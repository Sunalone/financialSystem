import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/token.config.js";

const router = express.Router();

const getToken = (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (error, result) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
};

// Login
router.post("/login", async (req, res) => {
    const userInfo = req.body;
    try {
        const user = await User.findOne({
            id: userInfo.id,
        });
        if (!user) {
            res.send({
                status: 404,
                message: "登录失败，未找到用户,请检查用户名或注册新用户",
                result: 0,
            });
            return;
        }
        if (user.password !== userInfo.password) {
            res.send({
                status: 400,
                message: "用户密码错误",
                result: 0,
            });
            return;
        }
        const token = await getToken(user);
        console.log("token", token);
        res.send({
            status: 200,
            message: "登录成功",
            result: 1,
            token,
        });
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Create
router.post("/register", async (req, res) => {
    const newUser = req.body;
    try {
        const user = await User.findOne({
            id: newUser.id,
        });
        if (user) {
            res.send({
                status: 403,
                message: "该用户已存在，请重新填写用户名",
                result: 0,
            });
            return;
        }
        const result = await User.create(newUser);
        const token = await getToken(result);
        res.send({
            status: 200,
            message: `用户${result.id}注册成功`,
            result: 1,
            token,
        });
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
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
