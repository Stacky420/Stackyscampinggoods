const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();
const dbFile = './database.db';

if (!fs.existsSync(dbFile)) {
    const loaddb = require('./initDB.js');
}

const db = new sqlite3.Database(dbFile);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit-feedback', (req, res) => {
    const { name, email, phone, message } = req.body;
    db.run(`INSERT INTO Feedback (name, email, phone, message) VALUES (?, ?, ?, ?)`,
        [name, email, phone, message],
        function (err) {
            if (err) {
                res.status(500).send('Error saving feedback');
                return;
            }
            res.status(200).send('Feedback submitted successfully!');
        }
    );
});

app.get('/products', (req, res) => {
    db.all(`SELECT * FROM Products`, [], (err, rows) => {
        if (err) {
            res.status(500).send('Error fetching products: ' + err);
            return;
        }
        res.status(200).json(rows);
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM Users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
        if (err) {
            res.status(500).send('Login error');
            return;
        }
        if (row) {
            res.status(200).send('Login successful!');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
