
const {MongoClient} = require('mongodb');
const ItemModel = require('../server/itemModels')
const ingredient = { itemName: 'chickenlips', bucketNumber: 0, use: false };

describe('db unit tests', () => {

  let connection;
  let db;

  const MONGO_URI = `mongodb+srv://DavidB:DavidB@cluster0.gkvfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  //console.log(9999999, MONGO_URI)
  beforeAll(async () => {
    connection = await MongoClient.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = await connection.db("myFirstDatabase");
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
    done();
  });

  it('creates & saves an ingredient successfully', async () => {
    
    ItemModel.create(ingredient)
    .then(() => {
      const insertedIngredient = ItemModel.findOne({itemName: 'chickenlips'});
      expect(insertedIngredient).toEqual(ingredient);
    });
  });

  it('returns an error when itemName, bucketNumber or use is not provided', () => {

    const invalidIngredient = { itemName: null, bucketNumber: 0, use: false };
    ItemModel.create(invalidIngredient)
    .then(() => {
      const insertedIngredient = ItemModel.findOne({itemName: 'chickenlips'});
    })
    .catch((error) => { 
      expect(error).toBeDefined();
    });
  });
  

});
