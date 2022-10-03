const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

//login and return access token
const login = async (username, password) => {
  const response = await request
    .post("/api/auth/login")
    .send({
      username,
      password,
    })
    .expect(200)
    .expect("Content-Type", /application\/json/);
  return response.body.accessToken;
};

//export
module.exports = {
  login,
};
