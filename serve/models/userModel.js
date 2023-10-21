import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});

const USER = mongoose.model("USER", UserSchema);

export default USER;
