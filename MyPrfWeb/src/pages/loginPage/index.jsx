import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./loginPage.styles.scss";
import { NavLink } from "react-router-dom";
import LoginImg from "../../assets/undraw_Login_re_4vu2.svg";
import api from "../../services/api";

import { Redirect } from "react-router";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const user = response.data;
      if (user._id) {
        navigateTo(user);
      }
    } catch (error) {
      console.log(error);
      alert("Algo deu errado");
    }
  }

  function navigateTo(user) {
    localStorage.setItem("user", JSON.stringify(user));
    history.push("/profile");
  }

  return (
    <div className="loginPageContainer">
      <div className="loginPageSideOne">
        <img className="loginImg" src={LoginImg} alt="Login" />
      </div>

      <div className="loginPageSideTwo">
        <div className="loginPageHeader">
          <span>Don't have an account?</span>
          <NavLink to="/register">Register</NavLink>
        </div>

        <div className="loginPageInputArea">
          <form onSubmit={(e) => handleLogin(e)} className="loginPageForm">
            <h1>Log In</h1>
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="text"
                placeholder="example@example.com"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                placeholder="*****"
              />
              <p>Forgot your password?</p>
            </div>
            <button className="btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
