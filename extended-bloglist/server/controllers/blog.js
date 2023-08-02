const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const middleware = require("../utils/middleware");

// token authentication
// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.startsWith("Bearer")) {
//     return authorization.replace("Bearer ", "");
//   }
//   return null;
// };

blogsRouter.get("/", async (request, response) => {
  console.log("get blogs");
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const token = request.token;
  // const user = request.user;
  console.log("token", token);

  try {
    // const users = await User.find({});
    // const user = users[0];
    // const user = await User.findById(body.userId);

    const decodedToken = jwt.verify(token, config.SECRET);
    if (!token && decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    const blogWithUser = await savedBlog.populate("user", {
      username: 1,
      name: 1,
    });

    user.blogs = user.blogs.concat(blogWithUser._id);
    await user.save();

    response.status(201).json(blogWithUser.toJSON());
  } catch (error) {
    console.error(error);
    return response.status(400).json(error);
  }
});

// blogsRouter.post("/", (request, response) => {
//   const body = request.body;

//   // const user = await User.findById(body.userId)

//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//   });

//   blog
//     .save()
//     .then((savedBlog) => {
//       response.status(201).json(savedBlog);
//     })
//     .catch((error) => {
//       response.status(400).json(error);
//     });
// });

// blogsRouter.delete("/:id", (request, response, next) => {
//   console.log("get deletion");
//   Blog.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end();
//     })
//     .catch((error) => next(error));
// });

blogsRouter.post("/:id/comments", async (request, response) => {
  const { comment } = request.body;
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });

  blog.comments = blog.comments.concat(comment);

  const updatedBlog = await blog.save();

  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(404).end();
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, config.SECRET);
  const user = await User.findById(decodedToken.id);

  console.log("token", token);
  console.log("user", user);
  console.log("decodedToken", decodedToken);

  if (!(token && decodedToken.id)) {
    return response.status(401).end();
  }

  const id = request.params.id;
  const blog = await Blog.findById(id).populate("user");
  console.log("blog", blog);

  if (blog?.user && blog.user.id.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: id });
    response.sendStatus(204).end();
  } else {
    response.status(401).json({ error: "unauthorized operation" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: body.id,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(404).end();
});

module.exports = blogsRouter;
