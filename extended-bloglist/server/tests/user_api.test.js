// run tests on by one :npm test -- tests/user_api.test.js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

// eslint-disable-next-line no-undef
test("creation succeeds with a fresh username", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "test4",
    name: "super test4",
    password: "test4",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  // eslint-disable-next-line no-undef
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

  const usernames = usersAtEnd.map((u) => u.username);
  // eslint-disable-next-line no-undef
  expect(usernames).toContain(newUser.username);
});

// eslint-disable-next-line no-undef
test("creation fails with proper statuscode and message if username already taken", async () => {
  const prevUsers = await helper.usersInDb();
  console.log("prevUsers", prevUsers);

  const newUser = {
    username: "root",
    name: "Superuser",
    password: "salainen",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  // eslint-disable-next-line no-undef
  expect(result.body.error).toContain("username should be unique");

  const currUsers = await helper.usersInDb();
  // eslint-disable-next-line no-undef
  expect(currUsers).toEqual(prevUsers);
});
