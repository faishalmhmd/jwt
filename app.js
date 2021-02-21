// inisialisai variable
const express = require("express")
const mysql = require("mysql")
const dotenv = require("dotenv")
const app = express()
const path = require("path")
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public')

// config 

app.use(express.static(publicDirectory))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

dotenv.config({ path: './.env' })

app.set('view engine', 'hbs');

db.connect((err) => {
    (err) ? console.log(err) : console.log("Connect to mysql")
})
app.set('view engine', 'hbs');

// define route
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(5000, () => {
    console.log(`Server started on port 5000`);
});