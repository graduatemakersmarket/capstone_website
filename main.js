require("dotenv").config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const market = express();

market.use(express.json());
market.use(bodyParser.json({ limit: '20MB' }));
market.use(bodyParser.urlencoded({ limit: '20MB', extended: true }));

market.use(cookieParser({ limit: '20MB' }));
market.use(express.static(path.join(__dirname, 'views/static')));
market.set("views", path.join(__dirname, 'views'));
market.set("view engine", "ejs");

market.use('/api/account', require('./routes/api/v1/accountAPI'));
market.use('/api/product', require('./routes/api/v1/productAPI'));

market.use('/', require('./routes/root'));
market.use('/makers', require('./routes/makers'));
market.use('/account', require('./routes/account'));
market.use('/products', require('./routes/products'));
market.use('/admin', require('./routes/admin'));

const auth = require('./middleware/auth');

market.get('*', auth.guestAccess, (req, res) => {
    res.status(404).render('errors/404.ejs', { session: req.session });
  });

market.listen(3001)