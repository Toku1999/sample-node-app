const request = require('supertest');
const app = require('../app');

describe('App Tests', () => {

    test('GET / should return success message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('CI/CD App Running 🚀');
    });

    test('GET /health should return UP', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('UP');
    });

});
