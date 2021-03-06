import React, { useState } from "react";
import { Link } from "react-router-dom";

function Homepage() {
  const [state, setState] = useState({ username: "" });

  function handleChange(event) {
    setState({ username: event.currentTarget.value });
    console.log(state.username);
  }

  return (
    <div className="home">
      <svg viewBox="0 0 2000 300">
        {/* <!-- Symbol with text --> */}
        <symbol id="s-text">
          <text
            text-anchor="middle"
            x="50%"
            y="50%"
            dy=".35em"
            class="text--line"
          >
            GitHub
          </text>
        </symbol>

        {/* <!-- Clippath  with text --> */}
        <clipPath id="cp-text">
          <text
            text-anchor="middle"
            x="50%"
            y="20%"
            dy=".35em"
            class="text--line"
          >
            GitHub Searcher
          </text>
        </clipPath>

        {/* <!-- Group for shadow --> */}
        <g clip-path="url(#cp-text)" class="shadow">
          <rect
            width="100%"
            height="100%"
            class="anim-shape anim-shape--shadow"
          ></rect>
        </g>

        {/* <!-- Group with clippath for text--> */}
        <g clip-path="url(#cp-text)" class="colortext">
          {/* <!-- Animated shapes inside text --> */}
          <rect width="100%" height="100%" class="anim-shape"></rect>
          <rect width="80%" height="100%" class="anim-shape"></rect>
          <rect width="60%" height="100%" class="anim-shape"></rect>
          <rect width="40%" height="100%" class="anim-shape"></rect>
          <rect width="20%" height="100%" class="anim-shape"></rect>
        </g>

        {/* <!-- Transparent copy of text to keep
       patterned text selectable --> */}
        {/* <use xlink:href="#s-text"
     class="text--transparent"></use> */}
      </svg>
      <input onChange={handleChange} type="text" placeholder="Search User..." />
      <Link className="go" to={state.username}>
        go
      </Link>
    </div>
  );
}

export default Homepage;
