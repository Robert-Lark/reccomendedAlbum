// this action populates the page with all the information about the
//release that the user selected from the particular
// artist or labels releases.

import {releaseDetails} from "../../API/APIcall";
import {DataDiviner} from "../../utils/utils";

export const releaseInfoAction = (id) => async (dispatch) => {
  dispatch({
    type: "FETCH_RELEASE_INFO",
    payload: {
      loading: true,
    },
  });
  const allData = [];
  let data = await DataDiviner(releaseDetails(id));

  allData.push({
    artists: data[0].artists_sort,
    title: data[0].title,
    released: data[0].released_formatted,
    img: data[0].thumb,
    tracklist: data[0].tracklist,
    videos: data[0].videos,
    id: id,
  });

  dispatch({
    type: "FETCH_RELEASE_INFO_SUCCESS",
    payload: {
      loading: false,
      all: allData,
    },
  });
};
export const showBio = () => (dispatch) => {
  dispatch({
    type: "SHOW",
    payload: {
      show: false,
    },
  });
};
