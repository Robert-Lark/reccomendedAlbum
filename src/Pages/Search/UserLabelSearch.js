import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import LoadingImage from "../../assets/loading.jpeg";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addLabel} from "../../Redux/Actions/userActions";
import {API_BASE_URL} from "../../API/APIcall";

function UserLabelSearch(props) {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
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
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const clickHandler = (id, add) => {
    setClicked(true);
    dispatch(addLabel(id, add))
  };

  return (
    <div className="searchContainer">
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
        <p className="searchInstructions">
          Here you can search for a particular label you would like to add to
          your library.
        </p>
      </div>
      <div className="userSearchResults">
        {searchResults?.map((asset, i) => (
          <div
            key={i}
            className="navButtonsUserLabelSearch"
          >
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
