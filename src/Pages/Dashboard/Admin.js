// this component allows the user to see his/her admin information
// as well as updating it and logging out.

import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../Auth/AuthProvider";
// import {Alert} from "react-bootstrap";

function Admin(props) {
  const {logout} = useAuth();

  const [error, setError] = useState("");
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <div className="adminContainer">
      {/* {error && <Alert variant="danger">{error}</Alert>} */}

      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Admin;
