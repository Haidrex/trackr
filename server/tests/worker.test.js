const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { login } = require("./testHelper");

const initialWorkers = [
  {
    id: 1,
    firstname: "Tomas",
    lastname: "Tomaitis",
    kennitala: "1234567890",
  },
  {
    id: 2,
    firstname: "Petras",
    lastname: "Petraitis",
    kennitala: "0987654321",
  },
];

beforeEach(async () => {
  await prisma.worker.deleteMany({});
  await prisma.worker.createMany({
    data: initialWorkers,
  });
});

//test if workers are returned
test("workers are returned as json", async () => {
  const accessToken = await login("testadmin", "password");
  await request
    .get("/api/workers")
    .set("x-access-token", accessToken)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

//test if valid user is created
test("a valid worker can be added", async () => {
  const newWorker = {
    firstname: "Jonas",
    lastname: "Jonaitis",
    kennitala: "987987-9874",
  };

  const accessToken = await login("testadmin", "password");
  await request
    .post("/api/workers")
    .send(newWorker)
    .set("x-access-token", accessToken)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const workersAtEnd = await prisma.worker.findMany();
  expect(workersAtEnd).toHaveLength(initialWorkers.length + 1);

  const firstnames = workersAtEnd.map((w) => w.firstname);
  expect(firstnames).toContain(newWorker.firstname);
});

//test if user with existing kennitala is not created
test("worker with existing kennitala is not added", async () => {
  const newWorker = {
    firstname: "Jonas",
    lastname: "Jonaitis",
    kennitala: "1234567890",
  };

  const accessToken = await login("testadmin", "password");
  await request
    .post("/api/workers")
    .send(newWorker)
    .set("x-access-token", accessToken)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const workersAtEnd = await prisma.worker.findMany();
  expect(workersAtEnd).toHaveLength(initialWorkers.length);
});

//test if user with missing data is not created
test("worker with missing data is not added", async () => {
  const newWorker = {
    firstname: "Jonas",
    lastname: "Jonaitis",
  };

  const accessToken = await login("testadmin", "password");
  await request
    .post("/api/workers")
    .send(newWorker)
    .set("x-access-token", accessToken)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const workersAtEnd = await prisma.worker.findMany();
  expect(workersAtEnd).toHaveLength(initialWorkers.length);
});

//test if user can be deleted
test("worker can be deleted", async () => {
  const accessToken = await login("testadmin", "password");
  await request
    .delete("/api/workers/1")
    .set("x-access-token", accessToken)
    .expect(204);

  const workersAtEnd = await prisma.worker.findMany();
  expect(workersAtEnd).toHaveLength(initialWorkers.length - 1);
});
