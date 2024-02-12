import supertest from 'supertest';
import { server } from './index';

const userData = {
  username: 'JohnDoe',
  age: 30,
  hobbies: ['reading', 'gaming'],
};

const modifyUser = {
  username: 'IvanDorn',
  age: 110,
  hobbies: ['reading'],
};

const request = supertest.agent(server);

describe('scenario 1', function () {
  it('should GET empty []', async () => {
    const res = await request.get('/users');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should POST user', async () => {
    const res = await request.post('/users').send(userData);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ ...userData, id: expect.any(String) });
  });

  it('should GET user by id', async () => {
    const userData = {
      username: 'JohnDoe',
      age: 30,
      hobbies: ['reading', 'gaming'],
    };

    const postResponse = await request.post('/users').send(userData);
    const { id } = postResponse.body;

    const getResponse = await request.get(`/users/${id}`);

    expect(getResponse.status).toBe(200);

    expect(getResponse.body).toEqual(expect.objectContaining(userData));
  });

  it('should PUT user', async () => {
    const postResponse = await request.post('/users').send(userData);
    const { id } = postResponse.body;

    const putResponse = await request.put(`/users/${id}`).send(modifyUser);

    expect(putResponse.status).toBe(201);
    expect(putResponse.body).toEqual({ ...modifyUser, id: expect.any(String) });
  });

  it('should DELETE user by id', async () => {
    const postResponse = await request.post('/users').send(userData);
    const { id } = postResponse.body;

    const getResponse = await request.delete(`/users/${id}`);

    expect(getResponse.status).toBe(204);
  });

  it('should GET removed user', async () => {
    const postResponse = await request.post('/users').send(userData);
    const { id } = postResponse.body;

    await request.delete(`/users/${id}`);

    const getResponse = await request.get(`/users/${id}`);

    expect(getResponse.status).toBe(404);

    expect(getResponse.body).toEqual({
      msg: '404 Not Found',
    });
  });
});

describe('scenario 2', function () {
  it('should GET 3 users', async () => {
    const res = await request.get('/users');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { ...userData, id: expect.any(String) },
      { ...userData, id: expect.any(String) },
      { ...modifyUser, id: expect.any(String) },
    ]);
  });

  it('should POST & PUT user', async () => {
    const modifyUser = {
      username: 'IvanDorn',
      age: 110,
      hobbies: ['reading'],
    };

    const postResponse = await request.post('/users').send(userData);
    const { id } = postResponse.body;

    const putResponse = await request.put(`/users/${id}`).send(modifyUser);

    expect(putResponse.status).toBe(201);
    expect(putResponse.body).toEqual({ ...modifyUser, id: expect.any(String) });
  });

  it('should GET user by id', async () => {
    const userData = {
      username: 'JohnDoe',
      age: 30,
      hobbies: ['reading', 'gaming'],
    };

    const postResponse = await request.post('/users').send(userData);
    const { id } = postResponse.body;

    const getResponse = await request.get(`/users/${id}`);

    expect(getResponse.status).toBe(200);

    expect(getResponse.body).toEqual(expect.objectContaining(userData));
  });

  it('should DELETE user by id', async () => {
    const userData = {
      username: 'JohnDoe',
      age: 30,
      hobbies: ['reading', 'gaming'],
    };

    const postResponse = await request.post('/users').send(userData);
    const { id } = postResponse.body;

    const getResponse = await request.delete(`/users/${id}`);

    expect(getResponse.status).toBe(204);
  });
});

describe('scenario 3', function () {
  afterAll((done: jest.DoneCallback) => {
    server.close(done);
  });

  it('should GET status code 200', async () => {
    const res = await request.get('/users');

    expect(res.status).toBe(200);
  });

  it('should POST & PUT user', async () => {
    const postResponse = await request.post('/users').send(userData);
    const { id } = postResponse.body;

    const putResponse = await request.put(`/users/${id}`).send(modifyUser);

    expect(putResponse.status).toBe(201);
    expect(putResponse.body).toEqual({ ...modifyUser, id: expect.any(String) });
  });

  it('should DELETE user by id', async () => {
    const userData = {
      username: 'JohnDoe',
      age: 30,
      hobbies: ['reading', 'gaming'],
    };

    const postResponse = await request.post('/users').send(userData);
    const { id } = postResponse.body;

    const getResponse = await request.delete(`/users/${id}`);

    expect(getResponse.status).toBe(204);
  });
});
