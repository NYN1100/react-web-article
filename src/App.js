import { Routes, Route } from "react-router-dom";
import {
  Main,
  Login,
  Register,
  Navbar,
  ArticleDetail,
  CreateArticle,
  EditArticle,
} from "./components";
import AuthService from "./service/Auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUserSuccess } from "./slice/auth";
import { getItem } from "./helpers/persistence-storage";
// import ArticleService from "./service/article";
// import { getArticleStart, getArticleSuccess } from "./slice/article";

function App() {
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const request = await AuthService.getUser();
      dispatch(signUserSuccess(request.user));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      getUser();
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/article/:slug" element={<ArticleDetail />}></Route>
          <Route path="/createArticle" element={<CreateArticle />} />
          <Route path="/editArticle/:slug" element={<EditArticle />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
