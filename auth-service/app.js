const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Auth Service Running");
});

app.post('/login', (req, res) => {
    res.json({ message: "Login success" });
});

app.listen(3001, () => console.log("Auth Service running on 3001"));