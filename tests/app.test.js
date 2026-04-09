const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Node.js CI/CD App Running 🚀');
  });
});
