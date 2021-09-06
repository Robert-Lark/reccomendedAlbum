const initState = {
  id: false,
  all: [],
  topTen: [],
  loading: false,
  labels: [],
  show: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_USER_DATA":
      return {...state, loading: true};
    case "FETCH_USER_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        id: action.payload.id,
        all: action.payload.all,
      };
    case "ADD_LABEL_SUCCESS":
      return {
        ...state,
        loading: false,
        labels: action.payload.labels,
        all: action.payload.all,
      };

    case "USER_NAV_SELECTOR":
      return {...state, show: true};
    case "USER_NAV_VISIBLE":
      return {...state, show: false};
    case "ADD_TO_TOP_TEN":
      return {...state};
    case "ADD_TO_TOP_TEN_SUCCESS":
      return {...state, show: false, topTen: action.payload.data};

    default:
      return {...state};
  }
};

export default userReducer;
