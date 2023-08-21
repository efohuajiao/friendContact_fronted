const mysql = require("mysql")
const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"friend_contact"
})

module.exports = db