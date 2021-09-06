import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchLabels} from "../../Redux/Actions/userActions";

function LatestReleases(props) {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [latest, setLatest] = useState();
  useEffect(() => {
    dispatch(searchLabels(data.user.all[0]?.labels));
    for (let i = 0; i < data.labels.labels.length; i++) {
      for (let j = 0; j < data.labels.labels[i].slice(0, 5); j++) {
        console.log(data.labels.labels[i][j]);
      }
    }
    // setLatest(data.labels.labels);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="latestRelContainer">
      <div>
        <h4>Latest Releases</h4>
        <p>From the labels you follow</p>
      </div>
      <div>
        {/* {latest.map((data) => {
          data
            .slice(0, 5)
            .map((release) => <img src={release.thumb} alt={release.title} />);
        })} */}
      </div>
      <div className="labelLatestContainer"></div>
    </div>
  );
}

export default LatestReleases;
