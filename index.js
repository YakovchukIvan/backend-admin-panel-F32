const express = require('express');
const mongoose = require('mongoose');
const { url_db } = require('./config');
const authRouser = require('./authRouter');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://3.76.253.22:5173',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
  })
);

app.use('/api/User', authRouser);

const start = async () => {
  try {
    mongoose.connect(url_db);

    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT} OK`));
  } catch (error) {
    console.log(error);
  }
};
start();
