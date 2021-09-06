//This is the nav selector - All actions in here relate to the nav and its functions
//ie: depending on what button the user clicked
// in the header the navSelectorDispatch will populate a navigation menu that slides out from the left.
// That menu will be populated by either the users saved content (if they have an account) or
// or dummy data.

//our API urls
import {label} from "../../API/APIcall";
import {artist} from "../../API/APIcall";
import genreImg from "../../assets/genre.png";
// the function that calls the API
import {DataDiviner} from "../../utils/utils";

export const navSelectorUserDispatch = (userLabelCodes) => async (dispatch) => {
  dispatch({
    type: "NAV_SELECTOR_USER",
    payload: {
      loading: true,
    },
  });
  // dispatch({
  //   type: "SHOW",
  //   payload: {
  //     show: false,
  //   },
  // });

  const labelData = [];

  for (let i = 0; i < userLabelCodes.length; i++) {
    let data = await DataDiviner(label(userLabelCodes[i]));
    labelData.push({
      name: data[0].name,
      image: data[0].images[0].uri,
      profile: data[0].profile,
      url: data[0].urls[0],
      id: data[0].id,
      type: "label",
    });
  }

  dispatch({
    type: "NAV_SELECTOR_SUCCESS_USER",
    payload: {
      all: labelData,
      loading: false,
    },
  });
};

export const navSelectorDispatch = (nav) => async (dispatch) => {
  dispatch({
    type: "NAV_SELECTOR",
    payload: {
      loading: true,
    },
  });
  dispatch({
    type: "SHOW",
    payload: {
      show: false,
    },
  });

  const allData = [];
  if (nav === "label") {
    //todo replace these codes with some from the users db
    const dummyLabelCodes = [1149832, 157803, 23127, 389319, 153824, 88949];
    for (let i = 0; i < dummyLabelCodes.length; i++) {
      let data = await DataDiviner(label(dummyLabelCodes[i]));
      allData.push({
        name: data[0].name,
        image: data[0].images[0].uri,
        profile: data[0].profile,
        url: data[0].urls[0],
        id: data[0].id,
        type: "label",
      });
    }
  } else if (nav === "artist") {
    //todo replace these codes with some from the users db
    const dummyCodes = [411447, 3415415, 216297, 59946, 1868506, 830699];
    for (let i = 0; i < dummyCodes.length; i++) {
      let data = await DataDiviner(artist(dummyCodes[i]));
      allData.push({
        name: data[0].name,
        image: data[0].images[0].uri,
        profile: data[0].profile,
        url: data[0].urls[0],
        id: data[0].id,
        type: "artist",
      });
    }
  } else if (nav === "genre") {
    const dummyCodes = [
      "Techno",
      "Ambient",
      "Drone",
      "Neo-Classical",
      "Dark Jazz",
    ];
    for (let i = 0; i < dummyCodes.length; i++) {
      allData.push({name: dummyCodes[i], image: genreImg, type: "genre"});
    }
  } else if (nav === "user") {
    //replace dummy codes with codes from the users database
    const dummyCodes = [90336];
    for (let i = 0; i < dummyCodes.length; i++) {
      let data = await DataDiviner(label(dummyCodes[i]));
      allData.push({
        name: data[0].name,
        image: data[0].images[0].uri,
        id: data[0].id,
        type: "user",
      });
    }
  }

  dispatch({
    type: "NAV_SELECTOR_SUCCESS",
    payload: {
      all: allData,
      loading: false,
      type: nav,
    },
  });
};

export const navVisibility = () => (dispatch) => {
  dispatch({
    type: "NAV_VISIBLE",
    // payload: {
    //   show: visibility,
    // },
  });
};

export const userID = (data) => (dispatch) => {
  //this sends the userId to the reducer
  dispatch({
    type: "ID",
    payload: {
      id: data,
    },
  });
};
