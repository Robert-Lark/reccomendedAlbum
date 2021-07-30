// import Begin from "./components/Begin";
import Navigator from "./components/Navigation/";
import Info from "./components/Information";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Test from "./components/Information/test";


function App() {
  return (
    <Router>
      <div>
        <Navigator />
        <div className="appContainer">
          <Switch>
            {/* <Route path="/" exact component={Begin} /> */}
            <Route path={["/:type/:info"]} component={Info} />
          </Switch>
        </div>
<Test/>
      </div>
    </Router>
  );
}

export default App;
