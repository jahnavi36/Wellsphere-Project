require('dotenv').config();
var sql = require("mysql");

const db = sql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE

        });

db.connect( err => {
    if (err) throw err;
})

exports.query = (sql, param) => {
    return new Promise((resolve, reject) => {
        db.query(sql, param, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        })
    })
}

