import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import profilePic from "../../assets/indice.jpg";
import { NavLink } from "react-router-dom";

import "./profilePage.styles.scss";
import api from "../../services/api";

export default function ProfilePage() {
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [searched, setSearched] = useState([]);
  const [visible, setVisible] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const res = localStorage.getItem("user");
    const parserdRes = JSON.parse(res);
    if (res) {
      setUser(parserdRes);
    }
  }, []);

  async function getUserNames(e) {
    e.preventDefault();
    try {
      console.log();
      if (name !== "") {
        const response = await api.get(`/names/${name}`);
        setSearched(response.data);
        setVisible(true);
      }
    } catch (error) {
      alert("Algo deu errado");
    }
  }

  function searchedProfile(user) {
    localStorage.setItem("sUser", JSON.stringify(user));
    history.push("/searched-profile");
  }
  function logOut() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="container">
      {user && (
        <>
          <div className="background">
            <div className="searchbar">
              <form onSubmit={(e) => getUserNames(e)}>
                <input
                  placeholder="Search a user"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
            </div>
            <div id="users-found">
              <ul
                id="user-list"
                style={
                  visible
                    ? { display: "block", margin: 0 }
                    : { display: "none" }
                }
              >
                {searched.map((item) => {
                  return (
                    <li onClick={() => searchedProfile(item)}>{item.name}</li>
                  );
                })}
              </ul>
            </div>
            <NavLink className="edit" to="/edit">
              Edit Profile
            </NavLink>
            <a className="editLogOut" onClick={() => logOut()}>
              Log Out
            </a>
            <img src={user.image_url ? user.image_url : profilePic} alt="" />
          </div>
          <h2>{user.name}</h2>
          <div className="main">
            <div className="bio">
              <p>{user.bio}</p>
            </div>
            <div className="sections">
              <div className="section">
                <h3 className="titleSection">Social media</h3>
                <ul>
                  <li>
                    <a href={`https://twitter.com/${user.socialMedia.twitter}`}>
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://facebook.com/${user.socialMedia.facebook}`}
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://instagram.com/${user.socialMedia.instagram}`}
                    >
                      Instagem
                    </a>
                  </li>
                </ul>
              </div>
              <div className="section">
                <h3 className="titleSection">Contatos</h3>
                <ul>
                  <li>{user.email}</li>
                  {user.contacts.map((contact, index) => (
                    <li key={index}>{contact}</li>
                  ))}
                </ul>
              </div>
              <div className="section">
                <h3 className="titleSection">Competências</h3>
                <ul>
                  {user.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      <footer>
        <div>
          Developed by: <br />
          <a to=""> Christian Herculano </a>
          <br />
          <a to=""> João Paulo </a>
          <br />
          <a to="https://github.com/joaodamasceno2001"> João Victor </a>
          <br />
          <a to="https://github.com/Nousz"> Lucas Farias </a>
        </div>
      </footer>
    </div>
  );
}
