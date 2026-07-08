const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Chan@0713",
    database: "college_event"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
    } else {
        console.log("Database Connected Successfully");
    }
});

module.exports = db;