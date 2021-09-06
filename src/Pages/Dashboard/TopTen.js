import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadReleasesSearch} from "../../Redux/Actions/ReleasesAction";
import {getUserInfo} from "../../Redux/Actions/userActions";
import {useHistory} from "react-router-dom";
import { releaseInfoAction } from "../../Redux/Actions/ReleaseInfoAction";

function TopTen(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [topTenData, setTopTenData] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let history = useHistory();
  useEffect(() => {
    dispatch(getUserInfo());

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTopTenData(data?.user?.all[0]?.topTen);
    // eslint-disable-next-line
  }, [data?.user?.all[0]?.topTen]);

  const searchHandler = () => {
    // if the reducer does not have all search data run the all data
    //fetcher, otherwise this will have been run when the user logged in.
    if (data.releases.search.length > 0) {
      history.push("/search");
    } else {
      dispatch(loadReleasesSearch(data.user.all[0].labels));
    }
    history.push("/search");
  };

  return (
    <div className="topTenContainer">
      <div>
        <h4>Top Ten</h4>
      </div>
      <div className="topTenImage" >
        {topTenData?.map((data, i) => (
          <div className="topTenImageHolder" key={i} onClick={() => dispatch(releaseInfoAction())}>
            <img src={data} alt={i} />
            <p>{i + 1}</p>
          </div>
        ))}
        <div className="navButtonsPlus" onClick={searchHandler}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
    </div>
  );
}

export default TopTen;
