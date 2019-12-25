const zxcvbn = require("zxcvbn");

const userItems = ["name", "username", "password", "role"];

const checkHttpLoginParams = params => {
    const keys = Object.keys(params);

    // Check username and password
    if (
        keys.length !== 2 ||
        !keys.includes("username") ||
        !keys.includes("password")
    )
        throw "Bad Parameters: username and password are only ones required";
};

const checkHttpParams = params => {
    const itemsExcluded = [];
    const itemsIncluded = [];
    const { password } = params;
    const keys = Object.keys(params);

    // Check valid and required params
    keys.map(item => {
        if (!userItems.includes(item)) {
            itemsExcluded.push(item);
        } else {
            itemsIncluded.push(item);
        }
    });
    if (itemsExcluded.length > 0)
        throw `Parameters not supported: ${itemsExcluded}`;
    if (itemsIncluded.length !== userItems.length)
        throw `Parameters required: ${userItems}`;

    // Check passwd
    if (zxcvbn(password).score < 2)
        throw `Your password must contain at least 8 characters (at least one uppercase, one number and one special character)`;
};

module.exports = { checkHttpParams, checkHttpLoginParams };
