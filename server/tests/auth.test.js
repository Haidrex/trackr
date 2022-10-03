const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await prisma.user.deleteMany({});

  const passwordHash = await bcrypt.hash("password", 10);
  const user = {
    username: "testadmin",
    password: passwordHash,
    isadmin: true,
  };
  await prisma.user.createMany({
    data: [user],
  });
}, 100000);

//test if login is successful
test("login is successful", async () => {
  const login = await request
    .post("/api/auth/login")
    .send({
      username: "testadmin",
      password: "password",
    })
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(login.body.accessToken).toBeDefined();
});
