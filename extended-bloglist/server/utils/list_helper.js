const lodash = require("lodash");

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((sum, item) => sum + item.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const mostLiked = blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr;
  });

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  // eslint-disable-next-line no-undef
  const authorCount = lodash.countBy(blogs, "author");

  const mostAuthor = Object.keys(authorCount).reduce((a, b) => (authorCount[a] > authorCount[b] ? a : b));

  return {
    author: mostAuthor,
    blogs: authorCount[mostAuthor]
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const group = lodash(blogs).groupBy("author");
  console.log("group", group);
  const likesCount = group
    .map((items, key) => ({
      author: key,
      likes: lodash.sumBy(items, "likes")
    }))
    .value();
  console.log("likesCount", likesCount);
  // likesCount[({ author: "Michael Chan", likes: 7 }, { author: "Edsger W. Dijkstra", likes: 17 }, { author: "Robert C. Martin", likes: 12 })];

  return likesCount.reduce((a, b) => {
    return a.likes > b.likes ? a : b;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
