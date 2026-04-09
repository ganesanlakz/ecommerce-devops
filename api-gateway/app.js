const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', (req, res) => {
    res.send("API Gateway Running");
});

app.get('/products', async (req, res) => {
    const response = await axios.get('http://product-service:3002/products');
    res.json(response.data);
});

app.listen(3000, () => console.log("API Gateway running on 3000"));