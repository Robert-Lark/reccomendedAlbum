import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {Helmet} from "react-helmet";
import LoadingImage from "../../assets/loading.jpeg";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addLabel} from "../../Redux/Actions/userActions";
import {API_BASE_URL} from "../../API/APIcall";

function UserLabelSearch(props) {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [display, setDisplay] = useState(true);
  const [error, setError] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [inputValue, setInputValue] = useState();
  const inputHandler = (e) => {
    axios
      .get(`${API_BASE_URL}/search`, {
        withCredentials: true,
        params: {
          discogsAccessparams: `${e}&?label`,
        },
      })
      .then(function (response) {
        const results = [];
        for (let i = 0; i < response.data.results.length; i++) {
          const current = response.data.results[i];
          if (
            current.type !== "label" ||
            current.cover_image.substr(current.cover_image.length - 3, 3) ===
              "gif"
          ) {
            continue;
          } else {
            results.push(response.data.results[i]);
          }
        }
        const firstTen = results.slice(0, 10);
        setSearchResults(firstTen);
        setDisplay(false);
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
      });
  };

  const clickHandler = (id, add) => {
    setClicked(true);
    dispatch(addLabel(id, add));
  };

  return (
    <div className="searchContainer">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Label Search</title>
        <link
          rel="canonical"
          href="https://sonic-architecture-v1.netlify.app/searchLabels"
        />
      </Helmet>
      <input
        type="text"
        key="searchBar"
        placeholder={"search"}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => inputHandler(inputValue)} type="submit">
        Search
      </button>
      <br></br>
      <div>
        {display && (
          <p className="searchInstructions">
            Here you can search for a particular label you would like to add to
            your library.
          </p>
        )}
        {error && (
          <p className="searchInstructions">
            I am sorry it looks like your search query caused an error. Please
            try again.
          </p>
        )}
      </div>
      <div className="userSearchResults">
        {searchResults?.map((asset, i) => (
          <div key={i} className="navButtonsUserLabelSearch">
            <img
              src={asset.cover_image ? asset.cover_image : LoadingImage}
              alt={asset.title}
              key={`nav item ${i} image`}
              className="labelSearchImg"
            />
            <div className="labelSearchBottom">
              <p key={`nav item ${i} name`}>{asset.title}</p>
              {clicked ? (
                <div className="navButtonsPlusLabels navButtons">
                  <FontAwesomeIcon icon={faMinus} />
                </div>
              ) : (
                <div
                  className="navButtonsPlusLabels navButtons"
                  onClick={() => clickHandler(asset.id, true)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserLabelSearch;
