const express = require('express');
const cors = require('cors');

const app = express();

// Middleware

app.use(express.json());
app.use(cors());

const assets = require('./routes/api/assets');
app.use('/api/assets', assets);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}.`))
