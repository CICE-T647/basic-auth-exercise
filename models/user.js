const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    username: {
        type: String,
        required: [true, "username es is required"],
        unique: true
    },
    password: {
        type: Object,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: {
            values: ["USER_ROLE", "ADMIN_ROLE"],
            message:
                "{VALUE} is not valid in {PATH} (Allowed - USER_ROLE or ADMIN_ROLE)"
        }
    }
});

userSchema.plugin(uniqueValidator, { message: "{PATH} has to be uniq" });

module.exports = mongoose.model("User", userSchema);
