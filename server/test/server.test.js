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

  test('Recipe route to edit recipe only when logged in as owner of recipe', async () => {
    const agent = testServer.agent(app);

    const editResponseNotLoggedIn = await agent.put('/api/recipes/8').send({
      name: 'recipe name',
      description: 'recipe instructions',
      photo: 'photo.jpg',
      url: 'recipe.com',
      marked_for_review: true,
      tags: '#one #two',
    });
    expect(editResponseNotLoggedIn.statusCode).toBe(403);

    const loginResponse = await agent
      .post('/api/user/login')
      .send({ username: 'GordonRamsey', password: 'hell' });
    expect(loginResponse.statusCode).toBe(200);

    const editResponseLoggedIn = await agent.put('/api/recipes/8').send({
      name: 'recipe name',
      description: 'recipe instructions',
      photo: 'photo.jpg',
      url: 'recipe.com',
      marked_for_review: true,
      tags: '#one #two',
    });
    expect(editResponseLoggedIn.statusCode).toBe(201);
  });
});

describe('Deleting will only work when the logged in user is the recipe owner', () => {
  test('Deleting unless logged in will return 403', async () => {
    const agent = testServer.agent(app);
    const notLoggedInResponse = await agent
      .delete('/api/recipes/74')
      .send({
        recipeId: 74,
        id: 5,
      });
    expect(notLoggedInResponse.statusCode).toBe(403);
  })

  test('Unless logged in user is the recipe owner, they cannot delete. will respond 200 because query was sent successfully but not deleted from db', async () => {
    const agent = testServer.agent(app);
    // first log in as user id=5
    const loginResponse = await agent
      .post('/api/user/login')
      .send({ username: 'GordonRamsey', password: 'hell' });
    expect(loginResponse.statusCode).toBe(200);
    // Test user that is logged in cannot delete other user's recipe
    const loggedInButNotOwnerResponse = await agent
      .delete('/api/recipes/74')
      .send({
        recipeId: 74,
        id: 5,
      });
    expect(loggedInButNotOwnerResponse.statusCode).toBe(200);
  });

  
});
