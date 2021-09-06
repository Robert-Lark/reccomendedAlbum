import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {releaseInfoAction} from "../../Redux/Actions/ReleaseInfoAction";
import LoadingImage from "../../assets/loading.jpeg";
import {getUserInfo} from "../../Redux/Actions/userActions";
import {loadReleases} from "../../Redux/Actions/ReleasesAction";
import Dropdown from "../Common/Dropdown";

function Releases() {
  const [loadAmmount, setLoadAmmount] = useState(20);
  const [sortBy, setSortBy] = useState("");
  const dispatch = useDispatch();
  let data = useSelector((state) => state);
  const user = localStorage.getItem("userID");

  //sort by functionality
  if (sortBy === "Year 00-99") {
    data.releases.all = data.releases.all.sort((a, b) => b.year - a.year);
  }
  if (sortBy === "Year 99-00") {
    data.releases.all = data.releases.all.sort((a, b) => a.year - b.year);
  }
  if (sortBy === "Title A-Z") {
    data.releases.all = data.releases.all.sort((a, b) =>
      a.title.trim() === b.title.trim()
        ? 0
        : a.title.trim() < b.title.trim()
        ? -1
        : 1
    );
  }
  if (sortBy === "Title Z-A") {
    data.releases.all = data.releases.all.sort((a, b) =>
      b.title.trim() === a.title.trim()
        ? 0
        : b.title.trim() < a.title.trim()
        ? -1
        : 1
    );
  }
  if (sortBy === "Artist A-Z") {
    data.releases.all = data.releases.all.sort((a, b) =>
      a.artist.trim() === b.artist.trim()
        ? 0
        : a.artist.trim() < b.artist.trim()
        ? -1
        : 1
    );
  }
  if (sortBy === "Artist Z-A") {
    data.releases.all = data.releases.all.sort((a, b) =>
      b.artist.trim() === a.artist.trim()
        ? 0
        : b.artist.trim() < a.artist.trim()
        ? -1
        : 1
    );
  }

  useEffect(() => {
    if (user) {
      dispatch(getUserInfo());
    }
    if (!data.releases.all) {
      dispatch(loadReleases(localStorage.getItem("labelId"), null));
    }
    // eslint-disable-next-line
  }, []);

  const inLibraryHandler = (id) => {
    if (data.user.all) {
      if (data.user?.all[0]?.inLibrary?.filter((e) => e === id).length > 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  return data.releases.all ? (
    <div className="bioContainer #top">
      <Dropdown sortBy={sortBy} setSortBy={setSortBy} />
      <div className="releasesContainer">
        {data.releases.all.slice(0, loadAmmount).map((asset) => (
          <div
            key={uuidv4()}
            className={` releaseContainer ${
              inLibraryHandler(asset.id) ? "in" : ""
            }`}
            onClick={() => dispatch(releaseInfoAction(asset.id))}
          >
            <img src={asset.thumb} alt={asset.title} />
            <p>{asset.catno}</p>
            <p>{asset.artist}</p>
            <p>{asset.title}</p>
            <p>Released - {asset.year}</p>
          </div>
        ))}
      </div>
      <div className="footerContainer">
        <div className={`${data.releases.all ? "loadMore" : "hideTop"}`}>
          <button onClick={() => setLoadAmmount((prev) => prev + 20)}>
            {loadAmmount < data.releases.all.length ? (
              <p>Load More Titles</p>
            ) : (
              <p>End of titles</p>
            )}
          </button>
          <button>
            <a href="#top">Top</a>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="loadingContainer">
      <img src={LoadingImage} alt="loading" />
    </div>
  );
}

export default Releases;
