var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var userData = {};

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => { 
    res.render('index', userData); 
});

app.post('/', (req, res) => {
    userData = req.body;
    if (userData.inputName) userData.authorized = true; 
    console.log(userData);
    res.render('index', userData);
});

app.get('/logout', (req, res) => {
    userData = {};
    res.render('auth/google');
});

app.get('/auth/google', (req, res) => {
    res.render('auth/google');
});


app.listen(3000);

app.use((req, res, next) => {
    res.status(404).send('Error 404: Not found');
});
