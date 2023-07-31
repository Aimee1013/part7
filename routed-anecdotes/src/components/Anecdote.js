import React from "react";

const Anecdote = ({ anecdote }) => {
  console.log("anecdote", anecdote);
  return (
    <div>
      <h2>Anecdote</h2>
      <h3>{anecdote.content}</h3>
    </div>
  );
};

export default Anecdote;
