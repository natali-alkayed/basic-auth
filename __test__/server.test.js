'use strict';
const { app } = require('../src/server');
const { db } = require('../src/auth/models/ index');
const supertest = require('supertest');
const mockServerMethods = supertest(app);

beforeAll(async () => {
    await db.sync();
});

describe('testing my server', () => {
   
    it('404 on a bad route', async () => {
        const response = await mockServerMethods.get('/no');
        expect(response.status).toBe(404);
    });
    
    it('should return 404 on a bad method', async () => {
    const response = await mockServerMethods.post('/');
    expect(response.status).toBe(404);
    });

    // it('Create a record using POST', async () => {
    //     const response = await mockServerMethods.post('/signup').send({
    //         username: 'natali',
    //         password: '123'
    //     });
    //     expect(response.status).toBe(201);
    // });
    // it('Read a list of records using GET', async () => {
    //     const response = await mockServerMethods.get('/signin');
    //     expect(response.status).toBe(200);
    // });
   
});

afterAll(async () => {
    await db.drop();
});


