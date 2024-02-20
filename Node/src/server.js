const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { connect } = require('mongoose');
const cors = require('cors');
const router = require('./routers');
dotenv.config();

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB;

connect(URI_DB);
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/cattalk", router);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});