import express from 'express';
import { read } from './json_arw.js';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const getRecipePage = (request, response) => {
  read('data.json', (err, data) => {
    const recipeObj = data.recipes[request.params.index];
    if (err) {
      response.status(404).send("Git outta here, there's no such page!");
    }

    if (recipeObj === undefined) {
      response.status(404).send("Git outta here, there's no such page!");
    } else {
      response.render('single_recipe', { recipeObj });
    }
  });
};

const home = (request, response) => {
  read('data.json', (err, data) => {
    const recipesArr = data.recipes;
    if (err) {
      response.status(404).send("Git outta here, there's no such page!");
    }

    // const catArr = recipesArr.map((obj) => {
    //   if (obj.category == undefined) {
    //     return "Uncategorised";
    //   } else {
    //     return obj.category;
    //   }
    // });

    // const catArrNoDups = [...new Set(catArr)]

    // console.log(catArrNoDups);
    // why must recipesArr be passed object??
    response.render('index', { recipesArr });
  });
};

app.get('/', home);
app.get('/recipe/:index', getRecipePage);

app.listen(3004);
