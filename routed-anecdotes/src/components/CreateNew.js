import React, { useState } from "react";
import { useField } from "../hooks";
import { TextField, Button } from "@mui/material";

const CreateNew = (props) => {
  //   const [content, setContent] = useState("");
  //   const [author, setAuthor] = useState("");
  //   const [info, setInfo] = useState("");
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");

  //   console.log("useField", content, author, author);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("000", content);
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const handleReset = (event) => {
    event.preventDefault();
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <TextField label="content" {...content} />
        </div>
        <div>
          author
          <TextField label="author" {...author} />
        </div>
        <div>
          url for more info
          <TextField label="url" {...info} />
        </div>
        <Button onClick={handleSubmit}>create</Button>{" "}
        <Button onClick={handleReset}>reset</Button>
      </form>
      {/* <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form> */}
    </div>
  );
};

export default CreateNew;
