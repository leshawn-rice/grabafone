const request = require('supertest');
const app = require('../../app');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./common');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('POST /login expect success', function () {
  test('works', async function () {
    const resp = await request(app)
      .post('/login')
      .send({
        email: 'u1@test.com',
        password: 'testpassword',
      });
    expect(resp.body).toEqual({
      'token': expect.any(String),
      'user': expect.any(Object)
    });
  });
});

describe('POST /login expect failure', function () {
  test('bad request with non-existent user', async function () {
    const resp = await request(app)
      .post('/login')
      .send({
        username: 'no-such-user',
        password: 'testpassword',
      });
    expect(resp.statusCode).toEqual(400);
  });

  test('unauth with wrong password', async function () {
    const resp = await request(app)
      .post('/login')
      .send({
        email: 'u1@test.com',
        password: 'invalid-password',
      });
    expect(resp.statusCode).toEqual(401);
  });

  test('bad request with missing data', async function () {
    const resp = await request(app)
      .post('/login')
      .send({
        email: 'u1@test.com',
      });
    expect(resp.statusCode).toEqual(400);
  });

  test('bad request with invalid data', async function () {
    const resp = await request(app)
      .post('/login')
      .send({
        email: 42,
        password: 'above-is-a-number',
      });
    expect(resp.statusCode).toEqual(400);
  });
});

describe('POST /register expect success', function () {
  test('works for anon', async function () {
    const resp = await request(app)
      .post('/register')
      .send({
        username: 'newuser',
        password: 'password',
        confirm_password: 'password',
        email: 'new@email.com',
      });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      'token': expect.any(String),
      'user': expect.any(Object)
    });
  });
});

describe('POST /register expect failure', function () {
  test('bad request with missing email', async function () {
    const resp = await request(app)
      .post('/register')
      .send({
        username: 'newbaduser',
        password: 'newpassword',
        confirm_password: 'oldpassword'
      });
    expect(resp.statusCode).toEqual(400);
  });
  test('bad request with missing username', async function () {
    const resp = await request(app)
      .post('/register')
      .send({
        email: 'new@new.com',
        password: 'newpassword',
        confirm_password: 'newpassword'
      });
    expect(resp.statusCode).toEqual(400);
  });
  test('bad request with missing password', async function () {
    const resp = await request(app)
      .post('/register')
      .send({
        email: 'new@new.com',
        username: 'newbaduser',
        confirm_password: 'newpassword'
      });
    expect(resp.statusCode).toEqual(400);
  });
  test('bad request with missing confirm_password', async function () {
    const resp = await request(app)
      .post('/register')
      .send({
        email: 'new@new.com',
        username: 'newbaduser',
        password: 'newpassword'
      });
    expect(resp.statusCode).toEqual(400);
  });
  test('bad request with mismatch password + confirm_password', async function () {
    const resp = await request(app)
      .post('/register')
      .send({
        email: 'new@new.com',
        username: 'newbaduser',
        password: 'newpassword',
        confirm_password: 'oldpassword'
      });
    expect(resp.statusCode).toEqual(400);
  });
});

describe('GET /refresh-token expect success', function () {
  test('works for logged-in user', async function () {
    const loginResp = await request(app)
      .post('/login')
      .send({
        email: 'u1@test.com',
        password: 'testpassword',
      });
    const userToken = loginResp.body.token;
    const tokenResp = (await request(app)
      .get('/refresh-token')
      .set('Authorization', `Bearer ${userToken}`));
    expect(tokenResp.statusCode).toEqual(200);
    expect(tokenResp.body.token).toEqual(expect.any(String));
  });
});
describe('GET /refresh-token expect failure', function () {
  test('null token for logged-in user, no token sent', async function () {
    const loginResp = await request(app)
      .post('/login')
      .send({
        email: 'u1@test.com',
        password: 'testpassword',
      });
    const tokenResp = (await request(app)
      .get('/refresh-token'));
    // This error fails silently
    expect(tokenResp.statusCode).toEqual(200);
    expect(tokenResp.body.token).toEqual(null);
  });
  test('null tokenfor anon, no token sent', async function () {
    const tokenResp = (await request(app)
      .get('/refresh-token'));
    // This error fails silently
    expect(tokenResp.statusCode).toEqual(200);
    expect(tokenResp.body.token).toEqual(null);
  });
  test('null token for anon, fake token sent', async function () {
    const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZW1haWwiOiJ1MUB0ZXN0LmNvbSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.HF0IJbsesoDiFLB-HTMpIC2V_2EYemku6blfAenikXg'
    const tokenResp = (await request(app)
      .get('/refresh-token')
      .set('Authorization', `Bearer ${fakeToken}`));
    // This error fails silently
    expect(tokenResp.statusCode).toEqual(200);
    expect(tokenResp.body.token).toEqual(null);
  });
});