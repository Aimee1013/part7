const listHelper = require("../utils/list_helper");
const { zeroBlog, oneBlog, manyBlogs } = require("./post_blogs_helper");

// eslint-disable-next-line no-undef
test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  // eslint-disable-next-line no-undef
  expect(result).toBe(1);
});

// eslint-disable-next-line no-undef
describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ];

  // eslint-disable-next-line no-undef
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    // eslint-disable-next-line no-undef
    expect(result).toBe(5);
  });

  // eslint-disable-next-line no-undef
  test("when list has many blogs, equals the sum of them all", () => {
    const result = listHelper.totalLikes(manyBlogs);
    // eslint-disable-next-line no-undef
    expect(result).toBe(36);
  });
});

// eslint-disable-next-line no-undef
describe("the favorite blog", () => {
  // eslint-disable-next-line no-undef
  test("when list has no blog, equals to null", () => {
    const result = listHelper.favoriteBlog(zeroBlog);
    // eslint-disable-next-line no-undef
    expect(result).toBe(null);
  });

  // eslint-disable-next-line no-undef
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.favoriteBlog(oneBlog);
    // eslint-disable-next-line no-undef
    expect(result).toEqual({
      title: "React patterns",
      author: "Michael Chan",
      likes: 7
    });
  });

  // eslint-disable-next-line no-undef
  test("when list has many blogs, equals to the most liked blog", () => {
    const result = listHelper.favoriteBlog(manyBlogs);
    // eslint-disable-next-line no-undef
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    });
  });
});

// eslint-disable-next-line no-undef
describe("author who has the largest amount of blogs", () => {
  // eslint-disable-next-line no-undef
  test("when list has no blog, equals to null", () => {
    const result = listHelper.mostBlogs(zeroBlog);
    // eslint-disable-next-line no-undef
    expect(result).toBe(null);
  });

  // eslint-disable-next-line no-undef
  test("when list has only one blog, equals the author and amount of blogs of that", () => {
    const result = listHelper.mostBlogs(oneBlog);
    // eslint-disable-next-line no-undef
    expect(result).toEqual({
      author: "Michael Chan",
      blogs: 1
    });
  });

  // eslint-disable-next-line no-undef
  test("when list has many blogs, equals to the largest amount of blog", () => {
    const result = listHelper.mostBlogs(manyBlogs);
    // eslint-disable-next-line no-undef
    expect(result).toEqual({
      blogs: 3,
      author: "Robert C. Martin"
    });
  });
});

// eslint-disable-next-line no-undef
describe("the author, whose blog posts have the largest amount of likes", () => {
  // eslint-disable-next-line no-undef
  test("when list has no blog, equals to null", () => {
    const result = listHelper.mostLikes(zeroBlog);
    // eslint-disable-next-line no-undef
    expect(result).toBe(null);
  });

  // eslint-disable-next-line no-undef
  test("when list has only one blog, equals the author and total number of likes of that", () => {
    const result = listHelper.mostLikes(oneBlog);
    // eslint-disable-next-line no-undef
    expect(result).toEqual({
      author: "Michael Chan",
      likes: 7
    });
  });

  // eslint-disable-next-line no-undef
  test("when list has many blogs, equals to the most total number of likes", () => {
    const result = listHelper.mostLikes(manyBlogs);
    // eslint-disable-next-line no-undef
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    });
  });
});
