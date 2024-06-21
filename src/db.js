const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Ec3o',
    password: 'root',
    database: 'v1d4r_b10g',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

module.exports = db;
