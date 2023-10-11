import Sequelize from "sequelize";

const sequelize = new Sequelize("web", "root", "a123456", {
    host: "localhost",
    dialect: "mysql",
});

export default sequelize;
