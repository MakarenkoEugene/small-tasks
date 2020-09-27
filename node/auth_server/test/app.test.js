const request = require("supertest");
const app = require("../src/app");

test("App works", async (done) => {
  const data = await request(app).get("/");
  expect(data.statusCode).toBe(200);
  done();
});
