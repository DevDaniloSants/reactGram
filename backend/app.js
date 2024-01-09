require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT;

const app = express();

// config json and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

// Upload directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// DB connection
require('./config/db.js');

// routes
const router = require('./routes/Router');
app.use(router);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
