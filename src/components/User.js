import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function User(props) {
  const [state, setState] = useState({
    name: "",
    location: "",
    followers: 0,
    following: "",
    bio: "",
    avatar_url: "",
  });

  const repos = `${props.match.params.username}/repos`;

  useEffect(() => {
    async function fetchData() {
      try {
        const user = props.match.params.username;

        const response = await axios.get(
          `https://api.github.com/users/${user}`
        );

        setState({ ...response.data });
      } catch (err) {}
    }
    fetchData();
  }, [props]);

  return (
    <div className="user-container">
      <div className="user-card">
        <div className="card-header">
          <img src={state.avatar_url} alt="user" />
          <h4>{state.name}</h4>
        </div>
        <div className="user-info">
          <p>{state.bio ? `Bio: ${state.bio}` : ""}</p>
          <div className="info-row">
            {state.location ? (
              <p>
                {" "}
                {state.location}
                <br />
                location
              </p>
            ) : (
              <p>
                {" "}
                -
                <br />
                location
              </p>
            )}
            <p>
              {state.followers}
              <br />
              followers
            </p>
            <p>
              {state.following}
              <br />
              following
            </p>
          </div>
          <Link className="link" to={repos}>
            <p>see repos</p>
          </Link>
        </div>
      </div>
      <Link className="go-back" to="/">
        go back
      </Link>
    </div>
  );
}

export default User;
