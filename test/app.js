var path = require('path');
var app = require('express')();
app.use(require('body-parser')());

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

module.exports = app;

