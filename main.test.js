const request = require('supertest');
const app = require('./main');

describe('API tests', () => {
  let userId;

  test('GET api/users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST api/users', async () => {
    const newUser = {
      username: 'Ved',
      age: 25,
      hobbies: ['Reading', 'Gardening']
    };
    const response = await request(app).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(newUser.username);
    userId = response.body.id;
  });

  test('GET api/users/:userId', async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
  });

  test('PUT api/users/:userId', async () => {
    const updatedUser = {
      username: 'UpdatedName',
      age: 35,
      hobbies: ['swimming']
    };
    const response = await request(app).put(`/api/users/${userId}`).send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body.username).toBe(updatedUser.username);
    expect(response.body.age).toBe(updatedUser.age);
    expect(response.body.hobbies).toEqual(updatedUser.hobbies);
  });

  test('DELETE api/users/:userId - delete created user', async () => {
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.status).toBe(204);
  });

  test('GET api/users/:userId - get deleted user', async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(404);
  });
});
