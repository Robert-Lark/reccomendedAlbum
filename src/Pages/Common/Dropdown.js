import React, {useState} from "react";

function Dropdown({sortBy, setSortBy}) {
  const [show, setShow] = useState(false);

  function clickHandler(sortValue) {
    setSortBy(sortValue);
    setShow(false);
  }

  return (
    <div className="sortByButtonContainer">
      <div>
        <button className="sortByButton" onClick={() => setShow(!show)}>
          {" "}
          Sort by {sortBy} <i className="arrow down"></i>
        </button>
        {show && (
          <div className="menu">
            <button
              className="sortByButton"
              onClick={() => clickHandler("Year 00-99")}
            >
              Year 00 - 99
            </button>
            <button
              className="sortByButton"
              onClick={() => clickHandler("Year 99-00")}
            >
              Year 99 - 00
            </button>
            <button
              className="sortByButton"
              onClick={() => clickHandler("Title A-Z")}
            >
              {" "}
              Title A-Z{" "}
            </button>
            <button
              className="sortByButton"
              onClick={() => clickHandler("Title Z-A")}
            >
              {" "}
              Title Z-A{" "}
            </button>
            <button
              className="sortByButton"
              onClick={() => clickHandler("Artist A-Z")}
            >
              {" "}
              Artist A-Z{" "}
            </button>
            <button
              className="sortByButton"
              onClick={() => clickHandler("Artist Z-A")}
            >
              {" "}
              Artist Z-A{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
