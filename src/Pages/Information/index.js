import Releases from "./Releases";
import Bio from "./Bio";
import {useSelector} from "react-redux";
import ReleaseInfo from "./ReleaseInfo";

function Index(props) {
  const checker = useSelector((state) => state.individualRelease);
  
  return checker.show ? (
    <div>
      <ReleaseInfo/>
    </div>
  ) : (
    <div>
      <Bio />
      <Releases />
    </div>
  );
}

export default Index;
