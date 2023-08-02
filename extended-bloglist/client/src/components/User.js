import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const id = useParams();
  console.log("userid", id);
  const user = useSelector((state) => state.users.find((u) => u.id === id.id));

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.username}</h2>

      <h3>added blogs</h3>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  );
};

export default User;
