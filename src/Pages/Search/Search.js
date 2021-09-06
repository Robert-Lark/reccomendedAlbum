import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {releaseInfoAction} from "../../Redux/Actions/ReleaseInfoAction";
import LoadingImage from "../../assets/loading.jpeg";
import axios from "axios";
import {topTenAction} from "../../Redux/Actions/userActions";
import {navVisibility} from "../../Redux/Actions/navSelectorAction";
import {loadReleasesSearch} from "../../Redux/Actions/ReleasesAction";
import {API_BASE_URL} from "../../API/APIcall";

const Search = ({topTen}) => {
  const user = localStorage.getItem("userID");
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState();
  const releaseInfo = useSelector((state) => state.releases.search);
  const data = useSelector((state) => state);

  useEffect(() => {
    // if the reducer does not have all search data run the all data
    //fetcher, otherwise this will have been run when the user logged in.
    if (data.nav.show) {
      dispatch(navVisibility());
    }
    if (user) {
      if (data.user?.all[0]?.labels < 1) {
        return;
      } else {
        dispatch(loadReleasesSearch(data.user.all[0].labels));
      }
      
    } else {
      dispatch(loadReleasesSearch());
    }
    // eslint-disable-next-line
  }, []);

  const inputHandler = (e) => {
    setSearchInput(e);
  };

  return data.user?.all[0]?.labels < 1 ? (
    <div className="noLabelMessage">
      <h1>You need to add a label before you can search for a release.</h1>
    </div>
  ) : releaseInfo.length > 0 ? (
    <div className="searchContainer">
      <input
        type="text"
        key="searchBar"
        placeholder={"search"}
        onChange={(e) => inputHandler(e.target.value)}
      />
      <div className="searchResults">
        {searchInput &&
          releaseInfo.map((release, i) => {
            if (
              release.title.toLowerCase().includes(searchInput.toLowerCase())
            ) {
              return (
                <div className="searchResult" key={i}>
                  <SearchRelease
                    name={release.title}
                    artist={release.artist}
                    image={release.thumb}
                    catno={release.catno}
                    id={release.id}
                    topTen={topTen}
                  />
                </div>
              );
            }
            if (
              release.artist.toLowerCase().includes(searchInput.toLowerCase())
            ) {
              return (
                <div className="searchResult" key={i}>
                  <SearchRelease
                    topTen={topTen}
                    name={release.title}
                    artist={release.artist}
                    image={release.thumb}
                    catno={release.catno}
                    key={i + 1}
                    id={release.id}
                  />
                </div>
              );
            } else return <></>;
          })}
      </div>
    </div>
  ) : (
    <div className="loadingContainer">
      <img src={LoadingImage} alt="loading" />
    </div>
  );
};

const SearchRelease = ({name, artist, image, catno, id, topTen}) => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  function topTenHandler(itemImg) {
    const userId = localStorage.getItem("userID");

    axios
      .patch(`${API_BASE_URL}/user/${userId}`, {
        // .patch(`http://localhost:3001/user/${userId}`, {
        topTen: itemImg,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setDisabled(true);
    dispatch(topTenAction(itemImg));
  }
  return (
    <div onClick={() => dispatch(releaseInfoAction(id))}>
      <img src={image} alt={name} />
      <span>
        <p>{artist}</p>
        <p>{name}</p>
        <p>{catno}</p>
      </span>
      {topTen ? (
        <button
          className="addToTopTenButton"
          onClick={() => topTenHandler(image)}
          disabled={disabled}
        >
          Add to Top Ten
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;
