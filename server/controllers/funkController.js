// const db = require('../models/funkModels');
const fetch = require('node-fetch');

const funkController = {};

funkController.getInventory = (req, res, next) => {
  console.log('Hit getInventory!!');

  //for non-DB testing
  return next();
};

funkController.createItem = (req, res, next) => {
  //  item info on req.body -----> {item1Name: {itemName: string, bucketNo: num, use: true/false}}

  console.log('Hit createItem!!');

  const items = Object.keys(req.body);
  // console.log('items:', items)
  const queryItem = req.body[items[0]];
  console.log('queryItem:', queryItem);

  //for non-DB testing
  return next();
};

funkController.updateItem = (req, res, next) => {
  //   req.body -----> {{itemName: {bucketNo: num, use: true/false}}

  console.log('Hit updateItem!!');

  const items = Object.keys(req.body);
  // console.log('items:', items)
  const queryItem = req.body[items[0]];
  console.log('queryItem:', queryItem);

  //for non-DB testing
  return next();
};

funkController.deleteItems = (req, res, next) => {
  //   req.body -----> {itemName: {bucketNo: num, use: true/false}, item2name:{...}}

  console.log('Hit deleteItems!!', req.body);

  return next();
};

funkController.getRecipes = async (req, res, next) => {
  console.log('Hit getRecipes!!', req.body);

  let keyIndex = 3; //2;
  const apiKeys = [
    '15b3f4802c0e4563b2bded336d9fe84e',
    'f470747f26984405bc334aa91f91c166',
    '2cb2288f93d441528099bd7df94f6b1a',
    '314a08da40d348e69be44f96ef554b44',
  ];
  const howManyRecipes = 5;

  let itemsNames = [];
  const itemsObj = req.body;
  const items = Object.keys(itemsObj);
  const useThese = items.filter((el) => itemsObj[el]['use']);
  let extras = [];

  console.log('useThese:', useThese);

  if (!useThese.length) {
    const bucket1 = items.filter((el) => itemsObj[el]['bucketNumber'] === 0);
    const bucket2 = items.filter((el) => itemsObj[el]['bucketNumber'] === 1);
    const bucket3 = items.filter((el) => itemsObj[el]['bucketNumber'] === 2);
    console.log('bucket1:', bucket1);
    console.log('bucket2:', bucket2);
    console.log('bucket3:', bucket3);

    if (bucket1.length) {
      itemsNames = itemsNames.concat(bucket1);
    }
    extras = extras.concat(bucket2).concat(bucket3);
    console.log('extras:', extras);
  } else {
    itemsNames = useThese;
  }

  console.log('itemsNames:', itemsNames);

  let commaItems = itemsNames.join(',+');

  console.log('commaItems:', commaItems);

  //if (!commaItems.length) throw new Error('No items to use!');
  let recipesListFinal = [];

  while (extras.length) {
    console.log('extras:', extras);
    try {
      const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${commaItems}&number=${howManyRecipes}&ranking=2&apiKey=${apiKeys[keyIndex]}`;

      // get recipes list
      const recipesListData = await fetch(url);
      const recipesList = await recipesListData.json();

      if (!Array.isArray(recipesList)) throw new Error('Invalid recipes list');

      console.log('recipesList:', recipesList);
      if (recipesList.length >= 5) {
        recipesListFinal = recipesList;
        break;
      } else {
        commaItems += ',+' + extras.shift();
        recipesListFinal = recipesList;
      }
    } catch (err) {
      const error = {
        log: 'Error in getRecipes controller (get recipes list)',
        status: 500,
        message: { err: err.message },
      };
      return next(error);
    }
  }

  try {
    // get recipe IDs
    const recipeIDs = recipesListFinal.map((el) => el.id);
    console.log('recipeIDs:', recipeIDs);

    // build return recipe object
    const recipeObj = {};
    for (const rec of recipesListFinal) {
      recipeObj[rec.id] = { id: rec.id, title: rec.title, image: rec.image };
    }

    // get recipe instructions by ID

    const recipes = await Promise.all(
      recipeIDs.map(async (ID) => {
        const urlAnalyzed = `https://api.spoonacular.com/recipes/${ID}/analyzedInstructions?apiKey=${apiKeys[keyIndex]}`;
        const recipe = await fetch(urlAnalyzed);
        const recipeJSON = await recipe.json();

        return { idRecipe: ID, recipe: recipeJSON };
      })
    );

    const ingredientsAll = await Promise.all(
      recipeIDs.map(async (ID) => {
        const urlAnalyzed = `https://api.spoonacular.com/recipes/${ID}/ingredientWidget.json?apiKey=${apiKeys[keyIndex]}`;
        const recipeIngredients = await fetch(urlAnalyzed);
        recipeIngredientsJSON = await recipeIngredients.json();
        return { idIngredients: ID, ingredients: recipeIngredientsJSON };
      })
    );

    console.log('recipes:', recipes);
    recipes.forEach((el) => {
      let recipeText = '';
      const { recipe, idRecipe } = el;
      if (recipe.length) {
        for (const dish of recipe) {
          console.log('dish:', dish);
          if (dish.name.length) recipeText += `${dish.name}\n\n`;
          recipeText += dish.steps.map((stepObj, i) => `${i + 1}. ${stepObj.step}`).join('\n\n');
        }
      }
      console.log('recipeText:', recipeText);
      if (recipeText.length) {
        recipeObj[idRecipe]['instructions'] = recipeText;
      }
    });

    console.log('recipeObj:', recipeObj);

    console.log('all ingredients:', ingredientsAll);
    ingredientsAll.forEach((el) => {
      let ingredientsText = '';
      const { ingredients, idIngredients } = el;
      if (typeof ingredients === 'object') {
        if (ingredients.ingredients) {
          for (const ing of ingredients.ingredients) {
            if (ing.name.length) {
              ingredientsText += `${ing.name}`;
              ingredientsText += `, ${ing.amount.us.value} ${ing.amount.us.unit}\n\n`;
            }
          }
        }
      }
      if (ingredientsText.length) {
        recipeObj[idIngredients]['ingredients'] = ingredientsText;
      }
    });

    console.log('recipeobj:', recipeObj);
    res.locals.recipes = recipeObj;

    // res.json(recipeObj)
  } catch (err) {
    const error = {
      log: 'Error in getRecipes controller',
      status: 500,
      message: { err: err.message },
    };
    return next(error);
  }

  //****************** */
  const recipesListXXX = [
    {
      // id: 110044,//1090283,
      // id: 1090283,

      id: 402588,

      title: 'Forest fruit & banana smoothie',
      image: 'https://spoonacular.com/recipeImages/1090283-312x231.jpg',
      imageType: 'jpg',
      usedIngredientCount: 1,
      missedIngredientCount: 2,
      missedIngredients: [[Object], [Object]],
      usedIngredients: [[Object]],
      unusedIngredients: [],
      likes: 1,
    },
    {
      // id: 1090283,//402588,
      // id: 402588,

      id: 1090283,

      title: 'Forest Fruit & Banana Smoothie',
      image: 'https://spoonacular.com/recipeImages/837261-312x231.jpg',
      imageType: 'jpg',
      usedIngredientCount: 1,
      missedIngredientCount: 2,
      missedIngredients: [
        [
          {
            aisle: 'Baking',
            amount: 1.0,
            id: 18371,
            image: 'https://spoonacular.com/cdn/ingredients_100x100/white-powder.jpg',
            meta: [],
            name: 'baking powder',
            original: '1 tsp baking powder',
            originalName: 'baking powder',
            unit: 'tsp',
            unitLong: 'teaspoon',
            unitShort: 'tsp',
          },
        ],
        [
          {
            aisle: 'Baking',
            amount: 1.0,
            id: 18371,
            image: 'https://spoonacular.com/cdn/ingredients_100x100/white-powder.jpg',
            meta: [],
            name: 'baking powder',
            original: '1 tsp baking powder',
            originalName: 'baking powder',
            unit: 'tsp',
            unitLong: 'teaspoon',
            unitShort: 'tsp',
          },
        ],
      ],
      usedIngredients: [
        [
          {
            aisle: 'Baking',
            amount: 1.0,
            id: 18371,
            image: 'https://spoonacular.com/cdn/ingredients_100x100/white-powder.jpg',
            meta: [],
            name: 'baking powder',
            original: '1 tsp baking powder',
            originalName: 'baking powder',
            unit: 'tsp',
            unitLong: 'teaspoon',
            unitShort: 'tsp',
          },
        ],
      ],
      unusedIngredients: [],
      likes: 0,
    },
  ];

  // ********************* */

  //for non-API testing
  return next();
};

module.exports = funkController;
