import {useSelector} from "react-redux";
import ReleaseInfo from "../Information/ReleaseInfo";
import Search from "./Search";

function Index(props) {
  const checker = useSelector((state) => state.individualRelease);

  return checker.show ? (
    <div>
      <ReleaseInfo />
    </div>
  ) : (
    <div>
      <Search />
    </div>
  );
}

export default Index;
