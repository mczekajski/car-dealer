const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Car dealer api is working on port 3000')
})

app.listen(3000)