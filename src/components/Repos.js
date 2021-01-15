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
              <a href={repo.homepage} className="repo-links" target="_blank">
                DEMO
              </a>
              <a href={repo.html_url} className="repo-links" target="_blank">
                See on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
      <Link className="go-back" to={user}>
        go back
      </Link>
    </div>
  );
}

export default Repos;
