import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchLabels} from "../../Redux/Actions/userActions";

function LatestReleases(props) {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!data.labels.labels) {
      dispatch(searchLabels(data.user.all[0]?.labels));
    // }
    // eslint-disable-next-line 
  }, []);

  return (
    <div className="latestRelContainer">
      <div>
        <h4>Latest Releases</h4>
        <p>From the labels you follow</p>
      </div>

      <div className="labelLatestContainer">
        {data.labels.labels.map((asset, i) => (
          <div>
          <p>{}</p>
          <img src={asset[i].thumb} alt={asset[i].title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestReleases;
