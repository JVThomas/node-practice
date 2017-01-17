const express = require('express');

const PORT = process.env.PORT || 3000

let app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found',
    name: 'Todo 1.0'
  });
});

app.get('/users', (req, res) => {
    res.status(200).send({
      users: [
        {
          name:'Bob Smith',
          age: 44
        },
        {
          name: 'John Doe',
          age: 25
        },
        {
          name: 'Mike Dole',
          age: 21
        }
      ]
    });
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

module.exports.app = app;
