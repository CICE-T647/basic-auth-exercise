const userModel = require("../models/user");

const newUser = async newUser => {
    try {
        const user = new userModel(newUser, { autoIndex: false });
        await user.save();
    } catch (error) {
        throw error;
    }
};

const searchUser = async searchByMail => {
    try {
        const userSearched = userModel.find(searchByMail);
        const findAction = await userSearched.exec();
        if (findAction.length === 0) throw { message: "Recipe not found" };
        return findAction;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    newUser,
    searchUser
};
