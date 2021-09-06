const initState = {
  popular: [],
  newReleases: [],
  all: 0,
  label: [],
  preorders: [],
  search: false,
  loading: false,
};

const releasesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_RELEASES":
      return {...state, loading: true};
    case "FETCH_RELEASES_SUCCESS":
      return {
        ...state,
        all: action.payload.all.sort((a, b) => b.year - a.year),
        search: action.payload.all,
        label: action.payload.label,
        loading: false,
      };
    case "SEARCH":
      return {...state, loading: true};
    case "SEARCH_SUCCESS":
      return {
        ...state,
        search: action.payload.all,
        loading: false,
      };
    case "ADD_LABEL_SUCCESS":
      return {
        ...state,
      };
    default:
      return {...state};
  }
};

export default releasesReducer;
