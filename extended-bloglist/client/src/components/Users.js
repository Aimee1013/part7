import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.users);
  console.log("useSelector", users);
  return (
    <div>
      <h2>Users</h2>

      {/* <span>username</span> */}
      <span style={{ marginLeft: 60, fontWeight: "bold" }}>created blogs</span>

      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.username}</Link>
          <span style={{ marginLeft: 30 }}>{user.blogs.length}</span>{" "}
        </div>
      ))}
    </div>
  );
};

export default Users;
