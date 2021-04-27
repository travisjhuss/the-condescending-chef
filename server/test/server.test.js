const app = require('../server');
const testServer = require('supertest');

describe('Testing user routes', () => {
  test('Logout route should always respond with status200', async () => {
    const response = await testServer(app).post('/api/user/logout');
    expect(response.statusCode).toBe(200);
  });

  test('User route should be protected - must be logged in', async () => {
    const response = await testServer(app).get('/api/user/');
    expect(response.statusCode).toBe(403);
  });

  test('User route should return user if logged in', async () => {
    // assigning to variable will help keep state
    const agent = testServer.agent(app);
    const loginResponse = await agent
      .post('/api/user/login')
      .send({ username: 'GordonRamsey', password: 'hell' });
    expect(loginResponse.statusCode).toBe(200);

    const userResponse = await agent.get('/api/user/');
    expect(userResponse.statusCode).toBe(200);
  });
});

describe('Testing recipe routes', () => {
  test('Recipe route to get all recipes', async () => {
    const response = await testServer(app).get('/api/recipes');
    expect(response.statusCode).toBe(200);
  });
});
