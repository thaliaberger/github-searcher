import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Repos.css";

function Repos(props) {
  const [state, setState] = useState([]);

  const user = `/${props.match.params.username}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const userRepos = `${props.match.params.username}/repos`;

        const response = await axios.get(
          `https://api.github.com/users/${userRepos}`
        );

        setState([...response.data]);
      } catch (err) {}
    }
    console.log(state);
    fetchData();
  }, [props]);

  return (
    <div className="repos-container">
      <div className="all-repos">
        {state.map((repo) => (
          <div className="each-repo">
            <h3>{repo.name}</h3>
            <p>{repo.description ? `Description: ${repo.description}` : ""}</p>
            <div className="repo-row">
              <p>
                {repo.stargazers_count} <br />
                stars
              </p>
              <p>
                {repo.language}
                <br /> language
              </p>
            </div>
            <div className="repo-row">
              <Link className="repo-links" to={repo.homepage}>
                DEMO
              </Link>
              <Link className="repo-links" to={repo.html_url}>
                See on GitHub
              </Link>
            </div>
          </div>
        ))}
        <Link to={user}>Go Back</Link>
      </div>
      <Link className="go-back" to="/">
        go back
      </Link>
    </div>
  );
}

export default Repos;
