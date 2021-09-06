import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {showBio} from "../../Redux/Actions/ReleaseInfoAction";
import {getUserInfo, topTenAction} from "../../Redux/Actions/userActions";
// import { topTenHandler } from "../../utils/utils";
import {API_BASE_URL} from "../../API/APIcall"

function ReleaseInfo() {
  const [topTenDisabled, setTopTenDisabled] = useState(false);
  const [inLibraryDisabled, setInLibraryDisabled] = useState(false);
  const [removeDisabled, setremoveDisabled] = useState(false);
  const [inTopTen, setInTopTen] = useState(false);
  const [inLibrary, setInLibrary] = useState(false);
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const releaseInfo = useSelector((state) => state.individualRelease);
  const data = useSelector((state) => state);
  const userId = localStorage.getItem("userID");



  //This function converts the returned youtube 'watch' uris into youtube 'embed' uris
  // which is neccessary to host them.
  function youtube_parser(url) {
    let regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }
  const videoLinks = [];
  if (releaseInfo.videos) {
    releaseInfo.videos.forEach((url) => {
      videoLinks.push(youtube_parser(url.uri));
    });
  }
  // this useEffect checks to see if this title is in the users top ten already
  useEffect(() => {
    if (userId) {
      for (let i = 0; i < data.user.all[0].topTen.length; i++) {
        if (releaseInfo.img === data.user.all[0].topTen[i]) {
          setInTopTen(true);
        }
      }
      for (let i = 0; i < data.user.all[0].inLibrary.length; i++) {
        if (releaseInfo.id === data.user.all[0].inLibrary[i]) {
          setInLibrary(true);
        }
      }
    }
    // eslint-disable-next-line
  }, []);

  function topTenHandler(itemId, inTopTen) {
    axios
      .patch(`${API_BASE_URL}/user/${userId}`, {
      // .patch(`http://localhost:3001/user/${userId}`, {
        topTen: itemId,
        inTopTen: inTopTen,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setTopTenDisabled(true);
    dispatch(topTenAction(itemId));
    dispatch(getUserInfo());
    setInTopTen(true);
  }

  function inLibraryHandler(itemId, add) {
    axios
      .patch(`${API_BASE_URL}/user/${userId}`, {
        inLibrary: itemId,
        add: add,
      })
      .then(function (response) {
        console.log(response);
        setInLibrary(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    if (add === true) {
      setInLibraryDisabled(true);
    } else {
      setremoveDisabled(true);
    }
  }

  return (
    <div className="releaseInfoContainer">
      <img src={releaseInfo.img} alt={releaseInfo.title} />
      <h2>{releaseInfo.artists}</h2>
      <h2>{releaseInfo.title}</h2>
      <p>{releaseInfo.released}</p>
      <div className="topButtonsCont">
        <label
          className="inLibrary"
          style={userId ? {display: "auto"} : {display: "none"}}
        >
          <p>Your Library</p>
          <div className="buttonContainerAddRemove">
            {inLibrary ? (
              <div
                className="navButtonsPlusLabels navButtons addRemove"
                onClick={() => inLibraryHandler(releaseInfo.img, false)}
                disabled={removeDisabled}
              >
                <FontAwesomeIcon icon={faMinus} />
              </div>
            ) : (
              <div
                className="navButtonsPlusLabels navButtons addRemove"
                onClick={() => inLibraryHandler(releaseInfo.id, true)}
                disabled={inLibraryDisabled}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            )}
          </div>
        </label>
        <label
          className="inLibrary"
          style={userId ? {display: "auto"} : {display: "none"}}
        >
          <div>
            <p>Top Ten</p>
            {inTopTen ? (
              <div
                className="navButtonsPlusLabels navButtons addRemove"
                onClick={() => topTenHandler(releaseInfo.img, false)}
                disabled={topTenDisabled}
              >
                <FontAwesomeIcon icon={faMinus} />
              </div>
            ) : (
              <div
                className="navButtonsPlusLabels navButtons addRemove"
                onClick={() => topTenHandler(releaseInfo.img, true)}
                disabled={topTenDisabled}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            )}
          </div>
        </label>
      </div>
      <span>
        {releaseInfo.tracklist.map((track, i) => (
          <span key={i} className="tracklistSpan">
            <p className="position">{track.position}</p>
            {track.artists?.map((artist, i) => (
              <p key={i}>{artist.name}</p>
            ))}
            
            <p className="title">{track.title}</p>
          </span>
        ))}
      </span>
      <div className="videoPlayer">
        {videoLinks.map((video, i) => (
          <iframe
            key={i}
            title={i}
            id="ytplayer"
            type="text/html"
            src={`https://www.youtube.com/embed/${video}`}
            frameBorder="0"
          ></iframe>
        ))}
      </div>
      <div className="releaseInfoButtonContainer">
        <button
          onClick={() => {
            dispatch(showBio());
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ReleaseInfo;
