//loads mongodb node driver
//const MongoClient = require('mongodb').MongoClient;

//object destructuring -> ES6 feature
//lets you pull out a property from an object and assign to var
//let user = {name:'John Doe', age: 23};
//let {name} = user;
//console.log(name);
const {MongoClient,ObjectID} = require('mongodb');

//connect takes two arguments
//first is url of database
//second is callback function that's called on success/fail
  //callback takes two arguments, first is error, second is db object
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) =>{
  //Note: don't need to create a db ahead of time like with SQL
  //can just state a name and it'll be made
  //Mongo will not save the db untl data is saved to it
  if (error){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //collections work the same way. No need to create ahead of time
  //simply state the name in the method call
  //insertOne takes two arguments
    // 1) Object to insert into colelction
    // 2) Callback function for success/error
  // db.collection('Todos').insertOne({
  //   text: 'New task at hand',
  //   completed: false
  // },(error, result) => {
  //   if (error){
  //     return console.log('Unable to insert todo task', error);
  //   }
  //   //result.ops will return all the docs that were inserted
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

//   db.collection('Users').insertOne({
//     //you can create an id if you want
//     name: 'John Doe',
//     age: 30,
//     location: 'Anchorage, AL'
//   },(err, result) =>{
//     if(err){
//       return console.log('Unable to add new User', err);
//     }
//     //timestamp is stored in object id (details below)
//     //can get details from the object id
//     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
//   });
//
   db.close(); //closes MongoDB connection
});

//mongo was made to scale out easy, can kick up new db servers to handle loads
//as such, mongo doesn't use an incrementing id like SQL databases
//id is 12 bit value, first 4 bytes is a timestamp
//next 3 bytes is a machine identifier
//2 bytes is process id
//last up is 3 byte counter, similar to waht MYSQL would do
