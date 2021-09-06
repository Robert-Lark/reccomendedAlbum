// this action handles the users selection from the side nav
// once the user clicks on an asset from the left it shrinks the original returned data
// (all their artists or all their labels) down to just the artist or label that they
// selected and populates the page with that data



export const assetSelector = (data) => (dispatch) => {
  dispatch({
    type: "ASSET_SELECTOR_SUCCESS",
    payload: {
      all: data,
      loading: false,
    },
  });
  
}

