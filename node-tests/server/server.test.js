const request = require('supertest');
const app = require('./server').app;
//supertest has flexibility with expect
const expect = require('expect');

describe('/', function() {
  it('should return page not found', function(done) {
    request(app)
      .get('/')
      .expect(404)
      .expect((res) => {
        expect(res.body).toInclude({error: 'Page not found'});
      }).end(done);
  });
});
describe('/users', function(){
  it('should return users from the users route', function(done) {
    request(app)
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body.users).toInclude({
          name: 'Bob Smith',
          age: 44
        });
        expect(res.body.users.length).toBe(3);
      }).end(done);
  });
});
