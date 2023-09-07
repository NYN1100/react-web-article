import React, { useState } from "react";
import { Input, TextArea } from "../ui";
import ArticleService from "../service/article";
import { useNavigate } from "react-router-dom";
const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  console.log(title, description, body);
  const navigate = useNavigate();
  const formSubmit = async (e) => {
    e.preventDefault();
    const article = { title, description, body };
    try {
      const response = await ArticleService.postArticle(article);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center">
      <h1>Create Article</h1>
      <div className="text-center w-75 mx-auto">
        <form onSubmit={formSubmit}>
          <Input state={title} setState={setTitle} label={"Title"}></Input>
          <TextArea
            state={description}
            setState={setDescription}
            label={"Description"}
          ></TextArea>
          <TextArea
            height="170px"
            state={body}
            setState={setBody}
            label={"Body"}
          ></TextArea>
          <button className="btn btn-success" style={{ padding: "1rem 2rem" }}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
