import React from "react";
import SonicArchLogo from "../../assets/SonicArchLogo.png";
function HomeGuide(props) {
  const userId = localStorage.getItem("userID");
  return userId ? (
    <div className="homeGuideContainer">
      <img src={SonicArchLogo} alt="logo" />
    </div>
  ) : (
    <div className="homeGuideContainer">
      <img src={SonicArchLogo} alt="logo" />
      <p>
        a tool designed to help music lovers keep track of their favorite record
        labels.{" "}
      </p>
      <p>click label to browse pre-loaded labels. </p>
      <p>click sign in to load your own and access the user dashboard. </p>
    </div>
  );
}

export default HomeGuide;
