import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Home from "./Home";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirectToHome, setRedirectToHome] = useState(false);
  axios.defaults.withCredentials = true;
  //   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://login-ebon-tau.vercel.app/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          setRedirectToHome(true);
        }
      })
      .catch((err) => console.log(err));
  };

  if (redirectToHome) {
    return <Navigate to="/home" />;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      <p>Don't an account?</p>
      <Link to="/register">Signup</Link>
    </div>
  );
}

export default Login;
