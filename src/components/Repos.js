import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Repos.css";

function Repos(props) {
  const [state, setState] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const user = `/${props.match.params.username}`;

  const limit = 10;

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
  }, [props, currentPage, total]);

  console.log(total);
  console.log(pages);

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

  return (
    <div>
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
