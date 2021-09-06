import React from "react";
import {Helmet} from "react-helmet";
import HomeGuide from "./HomeGuide";
function index(props) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link
          rel="canonical"
          href="https://sonic-architecture-v1.netlify.app/"
        />
      </Helmet>
      <HomeGuide />
    </div>
  );
}

export default index;
