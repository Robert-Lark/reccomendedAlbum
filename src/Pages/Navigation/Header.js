import {useDispatch, useSelector} from "react-redux";
import {
  navSelectorDispatch,
  navSelectorUserDispatch,
  navVisibility,
} from "../../Redux/Actions/navSelectorAction";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRecordVinyl} from "@fortawesome/free-solid-svg-icons";

import {faMusic} from "@fortawesome/free-solid-svg-icons";
import {faDoorOpen} from "@fortawesome/free-solid-svg-icons";
import {faDragon} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


import {useEffect} from "react";
import {getUserInfo} from "../../Redux/Actions/userActions";
import { showBio } from "../../Redux/Actions/ReleaseInfoAction";

function Header() {
  const data = useSelector((state) => state);
  const userId = localStorage.getItem("userID");
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUserInfo());
    }
    // eslint-disable-next-line
  }, []);

  const loadData = () => {
    dispatch(navVisibility());
    if (userId) {
      dispatch(navSelectorUserDispatch(data.user.all[0]?.labels));
    } else {
      if (data.nav && data.nav.length > 0) {
        return;
      } else {
        dispatch(navSelectorDispatch("label", data.nav.labels));
      }
    }
  };

  return (
    <div className="headerContainer">
      <nav>
        <Link to={"/"}>
          <span onClick={loadData}>
            <FontAwesomeIcon
              className="fai"
              icon={faRecordVinyl}
            ></FontAwesomeIcon>
            <p>Label</p>
          </span>
        </Link>

        <Link to={"/search"}>
          <span onClick={() => dispatch(showBio())}>
            <FontAwesomeIcon className="fai" icon={faMusic}></FontAwesomeIcon>
            <p>Search</p>
          </span>
        </Link>
        {userId ? (
          <Link to={"/dashboard"}>
            <span
              onClick={data.nav.show ? () => dispatch(navVisibility()) : null}
            >
              <FontAwesomeIcon
                className="fai"
                icon={faDragon}
              ></FontAwesomeIcon>
              <p>Dashboard</p>
            </span>
          </Link>
        ) : (
          <Link to={"/login"}>
            <span
              onClick={data.nav.show ? () => dispatch(navVisibility()) : null}
            >
              <FontAwesomeIcon
                className="fai"
                icon={faDoorOpen}
              ></FontAwesomeIcon>
              <p>Sign In</p>
            </span>
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Header;
