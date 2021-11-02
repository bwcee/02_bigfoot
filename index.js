import express from 'express';
import { read, add } from './json_arw.js';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const goHome = (request, response) => {
  read('data.json', (err, data) => {
    const sightingsArr = data.sightings;
    if (err) {
      response.status(404).send("Git outta here, there's no such page!");
    }
    response.render('home', { sightingsArr });
  });
};

const submitSighting = (request, response) => {
  response.render('submit_form');
};

app.post('/sighted', (request, response) => {
  console.log('The request body is', request.body);
  // Add new recipe data in request.body to recipes array in data.json.
  add('data.json', 'sightings', request.body, (err) => {
    console.log('The request body within add() is', request.body);
    if (err) {
      response.status(500).send('DB write error.');
      return;
    }

    response.send('Saved sightings!');
  });
});

app.get('/sighted', submitSighting);
app.get('/', goHome);

app.listen(3004);
