const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const emailApi = require('./routes/api');

app.use('/api', emailApi);

exports.mailing = functions.https.onRequest(app);
