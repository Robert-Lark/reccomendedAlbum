// these actions handle the users populate the users unique content inside their dashboard
// once the user logs in these actions are executed.

import axios from "axios";
import {API_BASE_URL} from "../../API/APIcall"

export const getUserInfo = () => async (dispatch) => {
  dispatch({
    type: "FETCH_USER_DATA",
    payload: {
      loading: true,
    },
  });

  const userId = localStorage.getItem("userID");
  const allData = [];
  await axios
    .get(`${API_BASE_URL}/user/${userId}`)
    // .get(`http://localhost:3001/user/${userId}`)
    .then(function (response) {
      allData.push(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  dispatch({
    type: "FETCH_USER_DATA_SUCCESS",
    payload: {
      id: userId,
      all: allData,
      loading: false,
    },
  });
};

export const topTenAction = (data) => async (dispatch) => {
  const userId = localStorage.getItem("userID");
  let topTen = [data];
  await axios
    .get(`${API_BASE_URL}/user/${userId}`)
    // .get(`http://localhost:3001/user/${userId}`)
    .then(function (response) {
      topTen.push(response.data.topTen);
    })
    .catch(function (error) {
      console.log(error);
    });

  dispatch({
    type: "ADD_TO_TOP_TEN",
    payload: {
      loading: true,
    },
  });

  dispatch({
    type: "ADD_TO_TOP_TEN_SUCCESS",
    payload: {
      data: topTen,
      loading: false,
    },
  });
};

export const addLabel = (id, add) => async (dispatch) => {
  dispatch({
    type: "ADD_LABEL",
    payload: {
      loading: true,
    },
  });
  const userId = localStorage.getItem("userID");
  let labels = [];
  let all = [];
  await axios
    .patch(`${API_BASE_URL}/user/${userId}`, {
      labels: id,
      add: add,
    })
    .then(function (response) {
      labels.push(response.data.labels);
      all.push(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  dispatch({
    type: "ADD_LABEL_SUCCESS",
    payload: {
      labels: labels,
      loading: false,
      all: all,
    },
  });
};

export const searchLabels = (data) => async (dispatch) => {
  console.log(`hit in WRONG action with labels ${data}`);
  const allReleaseData = [];
  const latestReleaseData = [];
  for (let i = 0; i < data.length; i++) {
    const response = await axios.get(
      `${API_BASE_URL}/usersLabelsSearch`,
      {
        withCredentials: true,
        params: {
          discogsAccessParams: data[i],
        },
      }
    );
    
    allReleaseData.push(response.data.releases);
    latestReleaseData.push(response.data.releases)
  }

  
  const allData = [];

  let releasesData = [].concat.apply([], allReleaseData);
  
  const releasesByTitle = {};
  const releases = [];

  releasesData.forEach((release) => {
    if (!release.format.includes("File") && release.thumb) {
      if (!releasesByTitle[release.title]) {
        releasesByTitle[release.title] = release;
      } else {
        if (releasesByTitle[release.title].format.includes("W/Lbl")) {
          releasesByTitle[release.title] = release;
        }
        if (releasesByTitle[release.title].format.includes("Promo")) {
          releasesByTitle[release.title] = release;
        }
        if (releasesByTitle[release.title].format.includes("TP")) {
          releasesByTitle[release.title] = release;
        }
        if (releasesByTitle[release.title].format.includes("Pap")) {
          releasesByTitle[release.title] = release;
        }
      }
    }
  });

  for (let title in releasesByTitle) {
    releases.push(releasesByTitle[title]);
  }
  //here we flatten the arrays, this allows search functionality
  // if the user wants to search all labels then they cannot be in seperate
  // arrays (organized by label), they have to be in one big array.

  allData.push(releases);

  let merged = [].concat.apply([], allData);

  

  dispatch({
    type: "SEARCH_LABELS_SUCCESS",
    payload: {
      all: merged,
      labels: latestReleaseData,
      loading: false,
    },
  });
};

// , {
//   withCredentials: true,
//   params: {
//     discogsAccessparams: `${e}&?label`,
//   },
// }
