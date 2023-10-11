import Sequelize from "sequelize";
import sequelize from "../config/sequelize.js";

const User = sequelize.define(
    "users",
    {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);

export default User;
