const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const session = require('express-session')
const hbs = exphbs.create({});
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const sess = {
//   secret: 'Super secret secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true
// }
// app.use(session(sess))
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