require("dotenv").config();
const Express = require("express");
const app=Express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const DB_PORT = process.env.DB_PORT;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session); // Esto es para guardar la session con mongo. DEvuelve una funcion que recibe la session como parámetro, 

app.use(session({
    secret: 'basic-auth', //El texto que queramos
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false }, //Se le puede dar tiempo  maxAge: 60000  secure:true es para darle un protocolo securizado o no, https o no comon no usamos https ponemos false para que no pete
    store: new MongoStore(
        {
            mongooseConnection: mongoose.connection.db,
            url: 'mongodb://localhost:27017/app'
        }
    )
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()); 
 

app.use("/auth", require("./routes/auth")); 
app.use("/user", require("./routes/userAccess.js")); 
app.use("/admin", require("./routes/adminAccess.js")); 

mongoose.connect(`mongodb://localhost:${DB_PORT}/app`,  {
     useNewUrlParser: true ,  
     useUnifiedTopology: true 
})
.then(()=> console.log(`Conected to mongo on port ${DB_PORT}`))
.catch(err => {throw err})


app.use((req, res)=>{
    res.status(404).json({message: "route not found"})
})

app.listen(SERVER_PORT, ()=>{
    console.log(`Server listening on port ${SERVER_PORT}`)
})