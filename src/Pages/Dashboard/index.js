// import Admin from "./Admin";
import {useDispatch} from "react-redux";
import {getUserInfo} from "../../Redux/Actions/userActions";
import ProfileSection from "./ProfileSection";
// import ListenNext from "./ListenNext";
// import LatestReleases from "./LatestReleases";
import TopTen from "./TopTen";

function Index(props) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  if (userId) {
    dispatch(getUserInfo());
  }

  return (
    <div className="dashBoardContainer">
      <ProfileSection />
      <TopTen />
      
      {/* <LatestReleases/> */}
    </div>
  );
}

export default Index;
