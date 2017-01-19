const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) =>{
  if (error){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //findOneAndUpdate
  //three arguments
    //1) filter object -> determines what you're searching by
    //2) update object -> use update operators to change fields
    //3) options object -> optional settings
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("588101745c877f9b07b086eb")
  }, {
    //have to use update operators
    $set:{
      completed: true
    }
  }, {
    //this option allows you to return the updated object with its new fields
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("587ff1e8b89b02c2b35fa294")
  }, {
    $set:{name: 'Jane Doe'},
    $inc:{age:1}
  },{
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log('Unable to find and update document', error);
  });
  //db.close();
});
