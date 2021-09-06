import axios from "axios";
import {API_BASE_URL} from "../API/APIcall"

//Data diviner is the first step in the journey piping in data from the 
//Discogs API. 
// When called with a url passed into it, axios is used to get data and an array is 
// returned that houses that data. 

export const DataDiviner = async (url) => {
  const allData = [];
  let dataContainer = await axios.get(url);
  allData.push(dataContainer.data);
  return allData;
};

// this is the function that allows the user to add a title 
//to their top ten on their dashboard.

export const topTenHandler = async (coverArt, userId) => {
  // await axios.patch(`http://localhost:3001/user/${userId}`, {topTen: coverArt})
  await axios.patch(`${API_BASE_URL}/user/${userId}`, {topTen: coverArt})
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}

