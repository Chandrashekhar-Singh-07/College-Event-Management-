const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Server Start
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Database ko yaha Import Kiye hai db.js Se

// const express = require("express");
// const path = require("path");
const db = require("./db");

// const app = express();
// const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Registration Page
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
});

// Save Student Data
app.post("/register", (req, res) => {

    const { name, email, phone, department, semester, password } = req.body;

    const sql = "INSERT INTO students(name,email,phone,department,semester,password) VALUES(?,?,?,?,?,?)";

    db.query(sql, [name, email, phone, department, semester, password], (err) => {

        if (err) {
            console.log(err);
            res.send("Registration Failed");
        } else {
            res.send("Registration Successful");
        }

    });

});

// Login Page
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Check Login
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM students WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            return res.send("Something Went Wrong");
        }

        if (result.length > 0) {
            res.redirect("/dashboard");
        } else {
            res.send("Invalid Email or Password");
        }

    });

});

// Dashboard Page
    app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});


// Admin Login Page
app.get("/adminlogin", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "adminlogin.html"));
});

// Check Admin Login
app.post("/adminlogin", (req, res) => {

    const { username, password } = req.body;

    const sql = "SELECT * FROM admin WHERE username=? AND password=?";

    db.query(sql, [username, password], (err, result) => {

        if (err) {
            return res.send("Error");
        }

        if (result.length > 0) {
            res.redirect("/addevent");
        } else {
            res.send("Invalid Username or Password");
        }

    });

});

// Events Page
app.get("/events", (req, res) => {

    db.query("SELECT * FROM events", (err, result) => {

        if (err) {
            return res.send("Error");
        }

        let data = "";

        result.forEach((event) => {

            data += `
                <div class="card">
                    <h3>${event.event_name}</h3>
                    <p>Date : ${event.event_date}</p>
                    <p>Venue : ${event.venue}</p>
                </div>
            `;

        });

        res.send(`
            <html>
            <head>
                <title>Events</title>
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>

                <nav>
                    <h2>College Events</h2>
                </nav>

                <div class="hero">
                    <h1>Available Events</h1>
                </div>

                <div class="features">
                    ${data}
                </div>

            </body>
            </html>
        `);

    });

});

// Add Event Page
app.get("/addevent", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "addevent.html"));
});

// Save Event
app.post("/addevent", (req, res) => {

    const { event_name, event_date, venue } = req.body;

    const sql = "INSERT INTO events(event_name,event_date,venue) VALUES(?,?,?)";

    db.query(sql, [event_name, event_date, venue], (err) => {

        if (err) {
            res.send("Event Not Added");
        } else {
            res.send("Event Added Successfully");
        }

    });

});

app.get("/students", (req, res) => {

    db.query("SELECT * FROM students", (err, result) => {

        if (err) {
            return res.send("Error");
        }

        let data = `
        <html>
        <head>
            <title>Students</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>

        <nav>
            <h2>Registered Students</h2>
        </nav>

        <div class="features">
        `;

        result.forEach((student) => {
            data += `
            <div class="card">
                <h3>${student.name}</h3>
                <p>${student.email}</p>
                <p>${student.department}</p>
                <p>Semester : ${student.semester}</p>
            </div>
            `;
        });

        data += `
        </div>
        </body>
        </html>
        `;

        res.send(data);

    });

});

app.listen(PORT, () => {
    console.log("Server Started");
    console.log(`http://localhost:${PORT}`);
});