const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/api', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        // check for different route and content type
        return request(server)
          .get('/api/inventory')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });


      it('inventories from "DB" are in body of response', () => {
        return request(server)
          .get('/api/inventory')
          .set('Accept', 'application/json')
          .expect((res) => Array.isArray(res.body));
      });
    });
  });

  describe('POST', () => {

    const input = { bread: { itemName: 'bread', bucketNumber: 0, use: false } };

    it('responds with 200 status and application/json content type', () => {
      return request(server)
        .post('/api/inventory')
        .send(input)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

  });



});