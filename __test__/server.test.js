'use strict';
const { app } = require('../src/server');
const { db } = require('../src/auth/models/ index');
const supertest = require('supertest');
const mockServerMethods = supertest(app);
const bcrypt = require('bcrypt');
const basicAuth = require('../src/auth/middleware/basic');
const base64 =require('base-64');

beforeAll(async () => {
    await db.sync();
});

describe('testing my server', () => {
    it('POST to /signup to create a new user.', async () => {
        const response = await mockServerMethods.post('/signup').send({
            username: 'samer',
            password: '321'
        });
        expect(response.status).toBe(200);
    });



        describe('POST to /signin to login as a user (use basic auth).', () => {
            it('should login as a user using basic auth', async () => {
                const credentials = Buffer.from('samer:321').toString('base64');
                const response = await mockServerMethods
                    .post('/signin')
                    .set('Authorization', `Basic ${credentials}`);
    // console.log(response);
    //console.log(credentials,"****************")
                expect(response.status).toBe(200);
                // expect(response.body).toHaveProperty('message');

            });
        });


 
});


afterAll(async () => {
    await db.drop();
});


