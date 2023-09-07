import React, { useState, useEffect } from "react";
import { TextArea, Input } from "../ui";
import ArticleService from "../service/article";
import { useNavigate } from "react-router-dom";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const request = await ArticleService.getArticleDetail(slug);
        dispatch(getArticleDetailSuccess(request.article));
        setTitle(request.article.title);
        setDescription(request.article.description);
        setBody(request.article.body);
      } catch (error) {
        dispatch(getArticleDetailFailure());
        console.log(error);
      }
    };

    getArticleDetail();
  }, [slug]);

  const formSubmit = async (e) => {
    e.preventDefault();
    const article = { title, description, body };
    try {
      await ArticleService.editArticle(slug, article);
      // console.log(response)
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

export default EditArticle;
