const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) =>{
  if (error){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //deleteMany()
  // db.collection('Todos').deleteMany({text:'Buy milk'}).then((result) =>{
  //   console.log(result);
  // }).catch((error) => {
  //   console.log('Unable to delete record, error');
  // });
  //deleteOne()
  // db.collection('Todos').deleteOne({text: 'Walk the dog'}).then((result) =>{
  //   console.log(result);
  // }).catch((error) => {
  //   console.log('Unable to delete record, error');
  // });

  //findOneAndDelete()
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.log('Unable to delete document', error);
  // });
  //db.close();

  // db.collection('Users').deleteMany({name: 'Rick Ross'}).then((result) => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.log('Unable to delete document', error);
  // });
  // console.log('|||||||||||||||||||||||||||||||||||||||||||||||||');

  db.collection('Users')
    .findOneAndDelete({_id: new ObjectID('587ff20f5f331ac2ba09e990')})
    .then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log('Unable to delete target document', error);
    });
});
