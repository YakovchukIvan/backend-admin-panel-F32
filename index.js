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
<<<<<<< HEAD
    app.listen(PORT, () =>
      console.log(`SERVER STARTED ON PORT ${PORT} Its Okay`)
    );
=======
    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT} OK`));
>>>>>>> fcf315550e9b6033eac93cde7488440e509838b2
  } catch (error) {
    console.log(error);
  }
};
start();
