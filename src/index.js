import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//Styles
import "./Styles/index.scss";

//Redux
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger'
// old
import rootReducer from "./Redux/Reducers/RootReducer";
//new
// import rootReducer from "./new/Redux/Reducers/RootReducer";
import {Provider} from "react-redux";



const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk, logger)));

//put dispatches here to populate reducer before root component renders



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
