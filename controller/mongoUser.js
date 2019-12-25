const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const newUser = async newUser => {
    try {
        const { password } = newUser;

        // Encrypt password
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        newUser.password = hashPass;

        // Create user
        const user = new userModel(newUser, { autoIndex: false });
        await user.save();
    } catch (error) {
        throw error;
    }
};

const searchUser = async searchByUsername => {
    try {
        const userSearched = userModel.find({ username: searchByUsername });
        const findAction = await userSearched.exec();
        if (findAction.length === 0) throw `User ${searchByUsername} not found`;
        if (findAction.length > 1) throw `User ${searchByUsername} duplicated`;
        return findAction[0];
    } catch (error) {
        throw error;
    }
};

const checkUserPasswd = async (username, userpasswd) => {
    try {
        const userSearched = userModel.find({ username: username });
        const findAction = await userSearched.exec();
        if (findAction.length === 0) throw `User ${searchByUsername} not found`;
        const passwordDB = findAction[0].password;
        if (!bcrypt.compareSync(userpasswd, passwordDB))
            throw `Invalid Password`;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    newUser,
    searchUser,
    checkUserPasswd
};
