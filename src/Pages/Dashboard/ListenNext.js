import React from "react";
import picture from "../../assets/genre.png";

function ListenNext(props) {
  return (
    <div className="listenNextContainer">
      <div>
        <h4>Listen Next</h4>
      </div>
      <div>
        <img src={picture} alt="Profile" />
      </div>
    </div>
  );
}

export default ListenNext;
