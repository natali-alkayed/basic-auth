const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js

// Mock user data for testing
const userCredentials = {
  username: 'testuser',
  password: 'testpassword',
};

// Test the authentication middleware
describe('Authentication middleware', () => {
  test('should allow access with valid basic auth credentials', async () => {
    const response = await request(app)
      .get('/protected-route')
      .set('Authorization', `Basic ${Buffer.from(`${userCredentials.username}:${userCredentials.password}`).toString('base64')}`);

    expect(response.statusCode).toBe(200);
    // Add additional assertions for the response body or headers if needed
  });

  test('should return 401 Unauthorized without valid basic auth credentials', async () => {
    const response = await request(app)
      .get('/protected-route');

    expect(response.statusCode).toBe(401);
    // Add additional assertions for the response body or headers if needed
  });
});

// Test the signup and signin routes
describe('Authentication routes', () => {
  test('should create a new user with valid signup data', async () => {
    const response = await request(app)
      .post('/signup')
      .send(userCredentials);

    expect(response.statusCode).toBe(201);
    // Add additional assertions for the response body or headers if needed
  });

  test('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/signin')
      .auth(userCredentials.username, userCredentials.password);

    expect(response.statusCode).toBe(200);
    // Add additional assertions for the response body or headers if needed
  });

  test('should return 401 Unauthorized with invalid credentials', async () => {
    const response = await request(app)
      .post('/signin')
      .auth(userCredentials.username, 'invalidpassword');

    expect(response.statusCode).toBe(401);
    // Add additional assertions for the response body or headers if needed
  });
});
