// this action populates the page with all the releases of the particular label or artist that
// the user selected from the left hand nav menu.

import axios from "axios";
import {labelReleases} from "../../API/APIcall";

export const loadReleases = (id, type) => async (dispatch) => {
  dispatch({
    type: "FETCH_RELEASES",
    payload: {
      loading: true,
    },
  });

  let pageNumber = await axios.get(labelReleases(id, 1));
  let pagination = pageNumber.data.pagination.pages;
  if (pagination > 10) {
    pagination = 10;
  }
  console.log(pageNumber.data.pagination.pages)
  console.log(pagination)
  let allData = [];
  for (let i = 1; i <= pagination; i++) {
    let data = await axios.get(labelReleases(id, i));

    allData.push(data.data.releases);
  }
  let releasesData = [].concat.apply([], allData);

  //creates dictionary to store all unique records
  const releasesByTitle = {};
  const releases = [];
  //checks dictionary to see if record by a certain title is already in the dictionary

  //if it is, move on to check the format, else, add it to the dictionary

  //overwrite and replace if the format isnt CD or Vinyl
  //POSSIBLE FORMATS
  // FILE
  // W/LBL
  // PROMO
  // TP
  // PAP
  // CD
  // VINYL
  //FIlter the data up front
  // eslint-disable-next-line
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
  //add the records in dictionary to releases array to pass to reducer
  for (let title in releasesByTitle) {
    releases.push(releasesByTitle[title]);
  }
  dispatch({
    type: "FETCH_RELEASES_SUCCESS",
    payload: {
      all: releases,

      loading: false,
    },
  });
};

export const loadReleasesSearch = (userLabels) => async (dispatch) => {
  const userId = localStorage.getItem("userID");
  console.log(`hit in action with labels ${userLabels}`)
  dispatch({
    type: "FETCH_RELEASES",
    payload: {
      loading: true,
    },
  });

  const labelCodes = userId
    ? userLabels
    : [1149832, 157803, 23127, 389319, 153824];
  //first for loop pulls up  pagination info on each label
  const allData = [];
  
  for (let i = 0; i < labelCodes.length; i++) {
    const pageNumber = await axios.get(labelReleases(labelCodes[i], 1));
    let pagination = pageNumber.data.pagination.pages;
    if (pagination > 10) {
      pagination = 10;
    }
    let allReleaseData = [];
    //second for loop gets the releases for each label
    for (let j = 1; j <= pagination; j++) {
      let data = await axios.get(labelReleases(labelCodes[i], j));
      allReleaseData.push(data.data.releases);
    }
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
  }
  let merged = [].concat.apply([], allData);

  dispatch({
    type: "SEARCH_SUCCESS",
    payload: {
      all: merged,

      loading: false,
    },
  });
};
