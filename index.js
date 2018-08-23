const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const filter = require('content-filter');

const keys = require('./config/keys');

require('./models/User');
require('./models/Post');
require('./services/passport');

// 'monkey patch' la exec() din Mongoose, ca sa treaca prin Redis
require('./services/cache');

mongoose.connect(keys.mongoURI);

const app = express();

// for Heroku, AWS, etc.
// app.enable('trust proxy');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(filter());


// Decrypts cookie from 'req' and adds it to 'req.session'.
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/postRoutes')(app);
require('./routes/authRoutes')(app);



if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// export pentru unit testing
module.exports = app;