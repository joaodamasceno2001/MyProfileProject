import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./registerPage.styles.scss";
import { NavLink } from "react-router-dom";
import LoginImg from "../../assets/undraw_Login_re_4vu2.svg";

import api from "../../services/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [skills, setSkills] = useState("");
  const [contacts, setContacts] = useState("");

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("users", {
        name,
        email,
        password,
        bio,
        skills,
        contacts,
        twitter,
        facebook,
        instagram,
      });

      if (response.data._id) {
        console.log(response.data);
        alert("Usuário cadastrado com sucesso");
        history.push("/");
      }
    } catch (error) {
      alert("Algo deu errado");
    }
  }

  return (
    <div className="registerPageContainer">
      <div className="registerPageSideOne">
        <img className="loginImg" src={LoginImg} alt="Login" />
      </div>

      <div className="registerPageSideTwo">
        <div className="registerPageHeader">
          <span>Have an account?</span>
          <NavLink to="/">Log in</NavLink>
        </div>

        <div className="registerPageInputArea">
          <form className="registerPageForm" onSubmit={(e) => handleSubmit(e)}>
            <h1>Register</h1>
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="*****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <textarea
                className="bio"
                type="text"
                placeholder="Your bio here"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <input
                type="text"
                placeholder="Twitter username"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
              <input
                type="text"
                placeholder="Fcebook username"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
              <input
                type="text"
                placeholder="Instagram username"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />

              <input
                type="text"
                placeholder="Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <input
                type="text"
                placeholder="(00)000000000"
                value={contacts}
                onChange={(e) => setContacts(e.target.value)}
              />
            </div>
            <button className="btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
