const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.post('/', (req, res) => {
    res.json(req.body);
});

app.get('/', (req, res) => {
    res.json(req.body);
});
app.listen(8800, () => console.log('Running on port 8800'));