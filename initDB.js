const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    // Users 
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    // Feedback 
    db.run(`CREATE TABLE IF NOT EXISTS Feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL
    )`);

    // Products 
    db.run(`CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT NOT NULL
    )`);

    const products = [
        { name: 'Tent 1', category: 'Tents', price: 100.0, image:"tent1.jfif" },
        { name: 'Tent 2', category: 'Tents', price: 150.0, image:"tent2.jfif" },
        { name: 'Backpack 1', category: 'Backpacks', price: 80.0, image:"backpack1.jfif" },
        { name: 'Backpack 2', category: 'Backpacks', price: 120.0, image:"backpack2.jfif" },
        { name: 'Shoe 1', category: 'Shoes', price: 60.0, image:"shoe1.jfif" },
        { name: 'Shoe 2', category: 'Shoes', price: 90.0, image:"shoe2.jfif" }
    ];

    const stmt = db.prepare(`INSERT INTO Products (name, category, price, image) VALUES (?, ?, ?, ?)`);
    products.forEach(product => {
        stmt.run(product.name, product.category, product.price, product.image);
    });
    stmt.finalize();
});

db.close();
console.log('Database tables created and sample data inserted successfully.');
