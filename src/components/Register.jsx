import React, { useEffect, useState } from "react";
import { logo } from "../constants/logo";
import { Input } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { signUSerFailure, signUserStart, signUserSuccess } from "../slice/auth";
import AuthService from "../service/Auth";
import ValidationError from "./ValidationError";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, loggedin } = useSelector((state) => state.auth);
  const navigate = useNavigate("/");
  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { username, email, password };
    try {
      const response = await AuthService.userRegister(user);
      const token = response.user;
      dispatch(signUserSuccess(token));
      navigate("/");
    } catch (error) {
      console.log(error);
      // dispatch(signUSerFailure(error.response.data.errors));
    }
  };

  useEffect(() => {
    if (loggedin) {
      navigate("/");
    }
  }, [loggedin]);

  // console.log(useSelector((state) => state.auth));

  return (
    <div
      className="container border border-5 rounded-4 text-center mt-5"
      style={{ width: "400px" }}
    >
      <form className="form-signin  p-5">
        <img className="mb-4" src={logo} alt="" width="72" height="72" />

        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <ValidationError />
        <Input
          label={"Username"}
          type={"text"}
          state={username}
          setState={setUsername}
        />
        <Input
          label={"Email address"}
          type={"email"}
          state={email}
          setState={setEmail}
        />
        <Input
          label={"Password"}
          type={"password"}
          state={password}
          setState={setPassword}
        />
        <button
          className="btn btn-lg btn-primary mt-4"
          type="submit"
          onClick={registerHandler}
          disabled={isLoading}
        >
          {isLoading ? "Loading.." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
