const request = require("supertest");
const app = require("../src/app");
const users = require("./data/users.json");

describe("Get users", () => {
  test("Return list items", (done) => {
    request(app)
      .get("/users/")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).toStrictEqual(users);
        done();
      });
  });

  test("Return user from firs id", (done) => {
    request(app)
      .get("/users/?id=1")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).toStrictEqual(users[0]);
        done();
      });
  });

  test("Return user from login", (done) => {
    request(app)
      .get("/users/?login=Test1")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).toStrictEqual(users[0]);
        done();
      });
  });

  test("Return user from password", (done) => {
    request(app)
      .get("/users/?password=Test2")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).toStrictEqual(users[1]);
        done();
      });
  });
});

describe("Get users by invalid", () => {
  test("Get user by invalid id should be 404", (done) => {
    request(app)
      .get("/users/?id=666")
      .expect(404)
      .expect((res) => expect(res.text).toBe("User not found"))
      .end(done);
  });

  test("Get user by invalid login should be 404", (done) => {
    request(app)
      .get("/users/?login=666")
      .expect(404)
      .expect((res) => expect(res.text).toBe("User not found"))
      .end(done);
  });

  test("Get user by invalid passsword should be 404", (done) => {
    request(app).get("/users/?passsword=666").expect(404, done);
  });
});

describe("Update user data", () => {
  test("login", (done) => {
    request(app)
      .post("/users/?id=1")
      .send({ login: "John" })
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).toStrictEqual({ ...users[0], login: "John" });
        done();
      });
  });

  test("find from login with update login and password", (done) => {
    request(app)
      .post("/users/?login=John")
      .send({ login: "Test1", password: "blablabla" })
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).toStrictEqual({ ...users[0], login: "Test1", password: "blablabla" });
        done();
      });
  });

  test("find of password and update password", (done) => {
    request(app)
      .post("/users/?password=blablabla")
      .send({ password: "Test1" })
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).toStrictEqual({ ...users[0], password: "Test1" });
        done();
      });
  });

  test("update with out update data", (done) => {
    request(app)
      .post("/users/?id=1")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).toStrictEqual(users[0]);
        done();
      });
  });
});

describe("Update user data by invalid", () => {
  test("update id", (done) => {
    request(app)
      .post("/users/?id=1")
      .send({ id: 2 })
      .expect(400)
      .expect((res) => expect(res.text).toBe("Can't update id"))
      .end(done);
  });

  test("update without query", (done) => {
    request(app)
      .post("/users/")
      .send({ id: 2 })
      .expect(400)
      .expect((res) => expect(res.text).toBe("Missing query for find user"))
      .end(done);
  });

  test("update missed user", (done) => {
    request(app)
      .post("/users/?id=666")
      .send({ login: "login" })
      .expect(404)
      .expect((res) => expect(res.text).toBe("User not found"))
      .end(done);
  });

});

// afterAll(() => {
//   process.env.CONNECTION = "/test/data";
// });
