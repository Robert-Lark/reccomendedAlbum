import navReducer from "./NavReducer";
// import assetReducer from "./AssetReducer";
import releasesReducer from "./ReleasesReducer";
import {combineReducers} from "redux";
import releaseReducer from "./ReleaseReducer";
import userReducer from "./UserReducer";
import labelsReducer from "./LabelsReducer";

const allReducers = combineReducers({
  nav: navReducer,
  user: userReducer,
  labels: labelsReducer,
  releases: releasesReducer,
  individualRelease: releaseReducer,
});

export default allReducers;
