import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleService from "../service/article";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import { Loader } from "../ui";

const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { articleDetail, isLoading } = useSelector((state) => state.article);

  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const request = await ArticleService.getArticleDetail(slug);
        dispatch(getArticleDetailSuccess(request.article));
      } catch (error) {
        dispatch(getArticleDetailFailure());
        console.log(error);
      }
    };

    getArticleDetail();
  }, [slug]);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        articleDetail !== null && (
          <div class="jumbotron mt-3">
            <h1>{articleDetail.title}</h1>
            <p class="lead">{articleDetail.description}</p>
            <div>{moment(articleDetail.createdAt).format("DD MMM,YYYY")}</div>
            <div>{moment(articleDetail.updatedAt).format("DD MMM,YYYY")}</div>
          </div>
        )
      )}
    </div>
  );
};

export default ArticleDetail;
