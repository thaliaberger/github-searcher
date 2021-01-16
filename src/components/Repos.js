import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Repos.css";

function Repos(props) {
  const [state, setState] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState([]);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const user = `/${props.match.params.username}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const userRepos = `${props.match.params.username}/repos`;

        const response = await axios.get(
          `https://api.github.com/users/${userRepos}?page=${currentPage}&per_page=${limit}`
        );

        const allRepos = await axios.get(
          `https://api.github.com/users/${userRepos}`
        );

        let totalPages = Math.ceil(total / limit);
        let arrayPages = [];
        for (let i = 1; i <= totalPages; i++) {
          arrayPages.push(i);
        }

        setState([...response.data]);
        setTotal(allRepos.data.length);
        setPages(arrayPages);
      } catch (err) {}
    }
    fetchData();
  }, [props, currentPage, total, limit]);

  function PreviousPage() {
    currentPage > 1
      ? setCurrentPage(currentPage - 1)
      : setCurrentPage(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function NextPage() {
    currentPage < pages.length + 1
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function NumberClick(event) {
    console.log(event.target.innerHTML);
    setCurrentPage(event.target.innerHTML);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleChange(event) {
    setLimit(event.target.value);
  }

  return (
    <div>
      <select onChange={handleChange} name="options" id="options">
        <option value="10" disabled selected>
          show
        </option>
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <div className="repos-container">
        <div className="all-repos">
          {state.map((repo) => (
            <div key={repo.id} className="each-repo">
              <h3>{repo.name}</h3>
              <p>
                {repo.description ? `Description: ${repo.description}` : ""}
              </p>
              <div className="repo-row">
                <p>
                  {repo.stargazers_count} <br />
                  stars
                </p>
                {repo.language ? (
                  <p>
                    {" "}
                    {repo.language}
                    <br />
                    language
                  </p>
                ) : (
                  <p>
                    {" "}
                    -
                    <br />
                    language
                  </p>
                )}
              </div>
              <div className="repo-row">
                {repo.homepage ? (
                  <a
                    href={repo.homepage}
                    className="repo-links"
                    target="_blank"
                    rel="noreferrer"
                  >
                    DEMO
                  </a>
                ) : (
                  ""
                )}

                <a
                  href={repo.html_url}
                  className="repo-links"
                  target="_blank"
                  rel="noreferrer"
                >
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
      <div className="pages-info">
        <p>showing {state.length} repos</p>
        <div className="pages">
          {currentPage > 1 ? <p onClick={PreviousPage}>previous</p> : <></>}

          {pages.map((page) => (
            <p
              onClick={NumberClick}
              className="each-page"
              key={page}
              value={page}
            >
              {page}
            </p>
          ))}
          {currentPage < pages.length ? <p onClick={NextPage}>next</p> : <></>}
        </div>
      </div>
    </div>
  );
}

export default Repos;
