const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Product Service Running");
});

app.get('/products', (req, res) => {
    res.json([
        { id: 1, name: "Laptop", price: 50000 },
        { id: 2, name: "Phone", price: 20000 }
    ]);
});

app.listen(3002, () => console.log("Product Service running on 3002"));