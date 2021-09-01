import {faMinus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addLabel} from "../../Redux/Actions/userActions";

function Bio() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const userId = localStorage.getItem("userID");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    
    if (!data.nav.selected[0]) {
      // dispatch(loadReleases(localStorage.getItem("labelId"), null));
    }
    // eslint-disable-next-line
  }, []);

  const removeLabelHandler = (id) => {
    console.log(id)
    dispatch(addLabel(id, false));
    setDisabled(true);
  };

  return data.nav.selected ? (
    <div className="bioContainer">
      {data.nav.selected.map((asset, i) => (
        <div key={i} className="infoContainer">
          <img src={asset.image} alt={asset.name} key={`${i} image`} />
          <p key={`${i} name`}>{asset.name}</p>
          <span>
            <p key={`${i} profile`}>{asset.profile}</p>
          </span>
        </div>
      ))}
      <div
        className="inLibrary"
        style={userId ? {display: "auto"} : {display: "none"}}
        onClick={() => removeLabelHandler(data.nav.selected[0].id)}
        disabled={disabled}
      >
        {disabled ? <p>Removed</p> : <p>Remove Label</p>}
        <div
          className="navButtonsPlusLabels navButtons addRemove"
          // onClick={() => topTenHandler(releaseInfo.img, false)}
          // disabled={topTenDisabled}
        >
          <FontAwesomeIcon icon={faMinus} />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Bio;
