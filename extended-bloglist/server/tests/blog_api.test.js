// run tests on by one :npm test -- tests/blog_api.test.js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
// const helper = require("./test_helper");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const bcrypt = require("bcrypt");

const api = supertest(app);

// eslint-disable-next-line no-undef
test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

// eslint-disable-next-line no-undef
test("property of the blog posts is named id", async () => {
  const blogsData = await api.get("/api/blogs");
  // console.log("blogsData", blogsData.body);
  //  [
  //    ({ id: "64b0e8044c894b1225f6bcb7" },
  //    { title: "blog3", author: "aimee3", id: "64b0ee23e98dadfcb5520bbf" },
  //    { title: "blog4", author: "aimee4", id: "64b0ee6ee98dadfcb5520bc3" },
  //    { title: "blog5", author: "aimee5", id: "64b0f46c2788f417878274d1" },
  //    { title: "blog6", author: "aimee6", id: "64b0f47d2788f417878274d4" },
  //    { title: "blog7", author: "aimee7", id: "64b142b99701e7c3b657c93e" },
  //    { title: "blog8", author: "aimee8", id: "64b297fad4cc0b0e7aafaef3" })
  //  ];

  const ids = blogsData.body.map((blog) => blog.id);
  // console.log("ids", ids);
  // ["64b0e8044c894b1225f6bcb7", "64b0ee23e98dadfcb5520bbf", "64b0ee6ee98dadfcb5520bc3", "64b0f46c2788f417878274d1", "64b0f47d2788f417878274d4", "64b142b99701e7c3b657c93e", "64b297fad4cc0b0e7aafaef3"];

  for (const id of ids) {
    // eslint-disable-next-line no-undef
    expect(id).toBeDefined();
  }
});

// eslint-disable-next-line no-undef
test("successfully create a new blog post", async () => {
  const prevBlogs = await api.get("/api/blogs");

  let token = null;
  const passwordHash = await bcrypt.hash("12345", 10);
  const user = await new User({ username: "name013", passwordHash }).save();

  const userForToken = { username: "name013", id: user.id };
  token = jwt.sign(userForToken, config.SECRET);

  const newBlog = {
    title: "create a new blog05",
    author: "anna05",
    url: "https://www.baidu.com",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${token}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const titles = response.body.map((item) => item.title);

  // eslint-disable-next-line no-undef
  expect(response.body).toHaveLength(prevBlogs.body.length + 1);
  // eslint-disable-next-line no-undef
  expect(titles).toContain("create a new blog");
});

// eslint-disable-next-line no-undef
test("if the likes property is missing, default to the value 0", async () => {
  const prevBlogs = await api.get("/api/blogs");
  console.log("pre", prevBlogs.body);
  const newBlog = {
    title: "create a new blog missing likes02",
    author: "bonnie02",
    url: "https://www.sina.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const newData = await api.get("/api/blogs");

  // eslint-disable-next-line no-undef
  expect(newData.body).toHaveLength(prevBlogs.body.length + 1);
  // eslint-disable-next-line no-undef
  expect(newData.body[newData.body.length - 1].likes).toBe(0);
});

// eslint-disable-next-line no-undef
test("if the title or url are missing, responds to the status code 400", async () => {
  const prevBlogs = await api.get("/api/blogs");
  const newBlog = {
    // title: "create a new blog missing url",
    author: "bella",
    likes: 11,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const newData = await api.get("/api/blogs");
  // eslint-disable-next-line no-undef
  expect(newData.body).toHaveLength(prevBlogs.body.length);
});

// eslint-disable-next-line no-undef
test("deletion of a single blog", async () => {
  const prevBlogs = await api.get("/api/blogs");
  const blogToDelete = prevBlogs.body[0];

  let token = null;
  const passwordHash = await bcrypt.hash("43543", 10);
  const user = await new User({ username: "name010", passwordHash }).save();

  const userForToken = { username: "name010", id: user.id };
  token = jwt.sign(userForToken, config.SECRET);

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const newData = await api.get("/api/blogs");
  // eslint-disable-next-line no-undef
  expect(newData.body).toHaveLength(prevBlogs.body.length - 1);

  // const titles = newData.body.map((item) => item.title);
  // eslint-disable-next-line no-undef
  // expect(titles).not.toContain(blogToDelete.title);
}, 100000);

// eslint-disable-next-line no-undef
test("update the number of likes for a blog", async () => {
  const prevBlogs = await api.get("/api/blogs");
  const blogToUpdate = prevBlogs.body[0];
  console.log("blogToUpdate", blogToUpdate);

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: 88 })
    .expect(200);

  const newData = await api.get("/api/blogs");
  // eslint-disable-next-line no-undef
  expect(newData.body).toHaveLength(prevBlogs.body.length);
  // eslint-disable-next-line no-undef
  expect(newData.body[0].likes).toBe(88);
  console.log(newData.body[0].likes);
});

// eslint-disable-next-line no-undef
afterAll(async () => {
  await mongoose.connection.close();
});
