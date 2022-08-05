const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const path = require('path');
const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(require("body-parser").json());
app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
