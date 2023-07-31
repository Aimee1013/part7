import React from "react";

const Notification = ({ notification }) => {
  if (notification === null) return null;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return <div>{notification && <div style={style}>{notification}</div>}</div>;
};

export default Notification;
