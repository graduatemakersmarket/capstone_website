require("dotenv").config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const market = express();

market.use(express.json());
market.use(bodyParser.json());
market.use(bodyParser.urlencoded({extended: true}));

market.use(cookieParser());
market.use(express.static(path.join(__dirname, 'views/static')));
market.set("views", path.join(__dirname, 'views'));
market.set("view engine", "ejs");

market.use('/api/account', require('./routes/api/v1/accountAPI'));

market.use('/', require('./routes/root'));
market.use('/account', require('./routes/account'));
market.use('/product', require('./routes/product'));
market.use('/admin', require('./routes/admin'));

market.listen(3001)