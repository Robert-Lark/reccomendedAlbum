import React from "react";
import axios from "axios";
import {useEffect} from "react";
import {API_BASE_URL, client_url} from "../../API/APIcall";

const Interim = (props) => {
  console.log(API_BASE_URL);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/identity`, {withCredentials: true})
      .then(function (response) {
        localStorage.setItem("userID", response.data.id);
        localStorage.setItem("username", response.data.username);
        axios
          .post(`${API_BASE_URL}/user/`, {
            idNum: response.data.id,
            name: response.data.username,
          })
          .then(function () {
            window.location = `${client_url}/dashboard`;
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return <div>AUTHORIZING</div>;
};

export default Interim;
