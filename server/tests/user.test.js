const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { login } = require("./testHelper");

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

//test if users are returned
test("users are returned as json", async () => {
  const accessToken = await login("testadmin", "password");
  await request
    .get("/api/users")
    .set("x-access-token", accessToken)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

//test if user is created
test("a valid user can be added", async () => {
  const newUser = {
    username: "testuser",
    password: "password",
    isadmin: false,
  };

  const accessToken = await login("testadmin", "password");
  await request
    .post("/api/users")
    .send(newUser)
    .set("x-access-token", accessToken)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await prisma.user.findMany();
  expect(usersAtEnd).toHaveLength(2);

  const usernames = usersAtEnd.map((u) => u.username);
  expect(usernames).toContain(newUser.username);
});

//test if invalid user is not created
test("user without username is not added", async () => {
  const newUser = {
    password: "password",
    isadmin: false,
  };
  const accessToken = await login("testadmin", "password");

  await request
    .post("/api/users")
    .set("x-access-token", accessToken)
    .send(newUser)
    .expect(400);

  const usersAtEnd = await prisma.user.findMany();
  expect(usersAtEnd).toHaveLength(1);
});
//test if user without password is not created
test("user without password is not added", async () => {
  const newUser = {
    username: "testuser",
    isadmin: false,
  };

  const accessToken = await login("testadmin", "password");

  await request
    .post("/api/users")
    .set("x-access-token", accessToken)
    .send(newUser)
    .expect(400);

  const usersAtEnd = await prisma.user.findMany();
  expect(usersAtEnd).toHaveLength(1);
});
