import Navigator from "./Pages/Navigation/";
import Info from "./Pages/Information";
import Dashboard from "./Pages/Dashboard";
import Guide from "./Pages/Intro";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Login from "./Pages/SignIn/Login";
import PrivateRoute from "./Auth/PrivateRoute";

import Search from "./Pages/Search/";
import Interim from "./Pages/SignIn/Interim";
import SideNavAdmin from "./Pages/Navigation/SideNavAdmin";
import UserLabelSearch from "./Pages/Search/UserLabelSearch";



function App() {
  

  return (
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <div>
        <Navigator />
        <div className="appContainer">
          <Switch>
            <Route exact path={"/"} component={Guide} />
            <Route path={["/:type/:info"]} component={Info} />
            <Route path="/login" component={Login} />
            <Route path="/authorizing" component={Interim} />
            <Route path="/search" component={Search} />

            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/labels" component={SideNavAdmin} />
            <PrivateRoute path="/searchLabels" component={UserLabelSearch} />

            {/* <Route path="/dashboard" component={Dashboard} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
