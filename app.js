const express  = require('express');

const app = express();
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(shopRoutes)
app.use('/admin', adminRoutes);

app.use('/', (req, res, next) => {
    res.status(404).send('not found page')
})



app.listen(3001);