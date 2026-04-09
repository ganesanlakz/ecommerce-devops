const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Order Service Running");
});

app.post('/order', (req, res) => {
    res.json({ message: "Order placed" });
});

app.listen(3003, () => console.log("Order Service running on 3003"));