const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

require("dotenv").config();

const DB_PORT = process.env.MONGO_PORT;
const DB_HOST = process.env.MONGO_HOST;
const DB_NAME = process.env.MONGO_DB;

mongoose
    .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        console.log(
            `Connection to mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME} established`
        );
    })
    .catch(error => {
        throw error;
    });

const PORT = process.env.SERVER_PORT;
const app = express();

app.use(
    session({
        secret: "basic-auth",
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    })
);

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.use("/security", require("./routes/security"));
app.use("/app", require("./routes/app"));

app.use((req, res) => {
    res.status(404).json({ message: "page not found" });
});

app.listen(PORT, () => console.log(`NodeJS listen to port ${PORT}`));
