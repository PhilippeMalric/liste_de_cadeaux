const path = require('path');
const express = require('express');
const compression = require('compression');
var admin = require('firebase-admin');
const CONTEXT = `/${process.env.CONTEXT || 'app'}`;
const PORT = process.env.PORT || 4000;

var serviceAccount = require('/home/phil/angular/price_game/price-game-17653-firebase-adminsdk-7dhm2-2533224f25.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://price-game-17653.firebaseio.com'
});

var number = 1;
var db = admin.database();
var ref = db.ref('number');
ref.on(
  'value',
  function(snapshot) {
    console.log(snapshot.val());
    number = Number(snapshot.val());
  },
  function(errorObject) {
    console.log('The read failed: ' + errorObject.code);
  }
);

setFirebase = function() {
  ref.set(number + 1);
};

const app = express();

app.use(compression());

app.use('/api', function(req, res, next) {
  console.log('test11');
  setTimeout(function() {
    setFirebase();
  }, 3000);
  setTimeout(function() {
    setFirebase();
  }, 5000);
  setTimeout(function() {
    setFirebase();
  }, 8000);
  res.send('ok');
});

app.use(CONTEXT, express.static(path.resolve(__dirname, '../../public')));

app.use('/', express.static(path.resolve(__dirname, '../../public')));

app.listen(PORT, () =>
  console.log(`App running on http://localhost:${PORT}${CONTEXT}`)
);
