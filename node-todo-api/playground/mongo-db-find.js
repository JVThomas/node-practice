const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) =>{

  if (error){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //method to fetch all documents in Todos colelction
  //returns a mongodb cursor with a ton of methods
  //one method is toArray(), which returns a promise
  // db.collection('Todos').find().toArray()
  //   .then((docs) =>{
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   }).catch((error) => console.log('Unable to fetch docs', error));

    //to find docs based off of criteria, you can pass in key:value pairs
    // db.collection('Todos').find({
    //     _id: new ObjectID("587ff3fa6774b19b06498c13")
    //   }).toArray()
    //   .then((docs) =>{
    //     console.log(JSON.stringify(docs, undefined, 2));
    //   }).catch((error) => console.log('Unable to fetch docs', error));

    //count() is another cursor method, can see more methods with mongodb API
  //   db.collection('Todos').find().count()
  //   .then((count) => {
  //       console.log(`Todos count : ${count}`);
  //   }).catch((error) => console.log('Unable to fetch docs', error));
  //  //db.close(); //closes MongoDB connection

   db.collection('Users').find({name:'John Doe'}).toArray()
    .then((docs) => console.log(JSON.stringify(docs, undefined, 2)))
    .catch((err) => console.log('Unable to fetch User documents', err));
});
