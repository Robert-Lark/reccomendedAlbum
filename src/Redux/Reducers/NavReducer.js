const initialState = {
  id: "",
  show: false,
  all: [],
  labels: [],
  selected: false,
  loading: false,
  type: "",
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NAV_SELECTOR":
      return {...state, show: true, all: action.payload.all};
    case "NAV_SELECTOR_SUCCESS":
      return {
        ...state,
        all: action.payload.all,
        loading: false,
        type: action.payload.type,
      };
    case "NAV_VISIBLE":
      return {...state, show: !state.show};
    case "ADD_LABEL_SUCCESS":
      return {...state, labels: action.payload.labels};
    case "ID":
      return {...state, id: action.payload.id};
    case "ASSET_SELECTOR_SUCCESS":
      //todo figure out why ...state changes formatting
      return {
        // ...state,
        show: false,
        loading: true,
        selected: action.payload.all,
        id: state.id,
        all: state.all,
      };
    case "NAV_SELECTOR_SUCCESS_USER":
      return {...state, labels: action.payload.all};
    default:
      return {...state};
  }
};

export default navReducer;
