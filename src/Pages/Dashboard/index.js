import {useDispatch} from "react-redux";
import {getUserInfo} from "../../Redux/Actions/userActions";
import ProfileSection from "./ProfileSection";
import {Helmet} from "react-helmet";

import LatestReleases from "./LatestReleases";
import TopTen from "./TopTen";

function Index(props) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  if (userId) {
    dispatch(getUserInfo());
  }

  return (
    <div className="dashBoardContainer">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
        <link
          rel="canonical"
          href="https://sonic-architecture-v1.netlify.app/dashboard"
        />
      </Helmet>
      <ProfileSection />
      <TopTen />

      <LatestReleases/>
    </div>
  );
}

export default Index;
