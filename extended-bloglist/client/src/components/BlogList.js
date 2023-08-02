import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../index.css";
import { Table } from "react-bootstrap";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  console.log("blogs", blogs);

  return (
    // className="blog"
    <div>
      <h2>blogs</h2>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
