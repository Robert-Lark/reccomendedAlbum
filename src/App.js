// import Begin from "./components/Begin";
import Navigator from "./components/Navigation/";
import Info from "./components/Information";
import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Signup from "./components/SignIn/Signup";
import {AuthProvider} from "./Auth/AuthProvider";
import Login from "./components/SignIn/Login";
import PrivateRoute from "./Auth/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navigator />
          <div className="appContainer">
            <Switch>
              <Route path={["/:type/:info"]} component={Info} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
