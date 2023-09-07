import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import article from "../slice/article";
import { Loader } from "../ui";
import { useNavigate } from "react-router-dom";
import { getArticleStart, getArticleSuccess } from "../slice/article";
import ArticleService from "../service/article";
import { useDispatch } from "react-redux";
const Main = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { articles, isLoading } = useSelector((state) => state.article);
  const { loggedin, user } = useSelector((state) => state.auth);
  console.log(loggedin, user);

  const getArticles = async () => {
    dispatch(getArticleStart());
    try {
      const request = await ArticleService.getArticles();
      dispatch(getArticleSuccess(request.articles));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async (slug) => {
    try {
      await ArticleService.deleteArticle(slug);
      getArticles();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <div>{isLoading && <Loader />}</div>
      <div className="album py-5 bg-white">
        <div>
          <div className="row">
            {articles.map((item) => {
              return (
                <div className="col-md-4 h-100" key={item.id}>
                  <div className="card mb-4 box-shadow">
                    <div className="card-body">
                      <img
                        className="card-img-top"
                        alt="Thumbnail [100%x225]"
                        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22508%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20508%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189a0b7bee2%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A25pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189a0b7bee2%22%3E%3Crect%20width%3D%22508%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22169.7562484741211%22%20y%3D%22123.78000068664551%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                        data-holder-rendered="true"
                        style={{
                          height: "225px",
                          width: "100%",
                          display: "block",
                        }}
                      ></img>
                      <p className="card-text fw-bold">{item.title}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => navigate(`/article/${item.slug}`)}
                          >
                            View
                          </button>
                          {loggedin &&
                            user.username === item.author.username && (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() =>
                                    navigate(`/editArticle/${item.slug}`)
                                  }
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="btn  btn-outline-danger"
                                  onClick={() => deleteArticle(item.slug)}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                        </div>
                        <small className="text-muted">
                          {item.author.username}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
