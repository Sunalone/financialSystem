import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/token.config.js";

const authMiddleware = (req, res, next) => {
    //从头部获取token
    const token = req.header("x-auth-token");
    //判断是否有token
    if (!token) {
        return res.status(401).json({ msg: "没有访问权限" });
    }
    try {
        //解析token
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user; //赋予解码后的user属性，便于后续使用
        next();
    } catch (err) {
        res.status(401).json({ msg: "令牌无效" });
    }
};

export default authMiddleware;
