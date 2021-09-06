const initState = {
    labels: [],
    all: []
  };
  
  const labelsReducer = (state = initState, action) => {
    switch (action.type) {
      case "SEARCH_LABELS_SUCCESS":
        return {...state, labels: action.payload.labels, all: action.payload.all};
     
      default:
        return {...state};
    }
  };
  
  export default labelsReducer;