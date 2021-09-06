import React from "react";
import {useSelector} from "react-redux";
// import AddButton from "../Common/AddButton";

function SideNavAdmin({navState}) {
  const navSelect = useSelector((state) => state.user);
  return (
    <div className={`navContainer ${navSelect.show ? "activeLibrary" : ""}`}>
      <div className="addButton">
        {/* <AddButton /> */}
      </div>
    </div>
  );
}

export default SideNavAdmin;
