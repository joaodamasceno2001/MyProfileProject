import React, { useEffect, useState } from "react";
import profilePic from "../../assets/indice.jpg";
import { NavLink } from "react-router-dom";

import "./searchedProfilePage.styles.scss";

export default function SearchedProfilePage() {
  const [user, setUser] = useState();

  useEffect(() => {
    const res = localStorage.getItem("sUser");
    const parserdRes = JSON.parse(res);
    if (res) {
      setUser(parserdRes);
    }
  }, []);

  return (
    <div className="container">
      {user && (
        <>
          <div className="background">
            <img src={user.image ? user.image_url : profilePic} alt="" />
            <NavLink className="editLogOut" to="/profile">
              Ir para Perfil
            </NavLink>
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
