const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const exhbs = require ('express-handlebars');
const hbs = exhbs.create({});
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const PORT = process.env.PORT ||3001;
app = express();
app.use(express.json());

sess = {
    secret: 'Super secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore ({
        db: sequelize,
    }),
}
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));
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

