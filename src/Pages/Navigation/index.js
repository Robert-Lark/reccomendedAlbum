import {useSelector} from "react-redux";

import SideNavLabels from "./SideNav";
import SideNavAdmins from "./SideNavAdmin";

import Header from "./Header";

function Navigator() {
  const navSelector = useSelector((state) => state.label);
  return (
    <div>
      <Header />
      <SideNavLabels navSelector={navSelector}/>

      <SideNavAdmins />
    </div>
  );
}

export default Navigator;
