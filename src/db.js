const path=require('path')
require('dotenv').config()
console.log('DBHOST:', process.env.DBHOST);
console.log('DBUSER:', process.env.DBUSER);
console.log('DBPASSWD:', process.env.DBPASSWD);
console.log('DB:', process.env.DB);
console.log('DBPORT:', process.env.DBPORT);
const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWD,
    database: process.env.DB,
    port: process.env.DBPORT
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

module.exports = db;
