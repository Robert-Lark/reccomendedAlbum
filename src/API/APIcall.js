//Base URL
const base_url = "https://api.discogs.com/";
//Call the label function on the button that the user will click when they select
//which label they would like to view => pass the label ID retrieved from Discogs
//and also the page number this function can also be called on the button the user
//clicks when they want to see more titles by passing in the same label id but a different page#

export const API_BASE_URL = process.env.NODE_ENV === "production" ? "https://rlca-backend.herokuapp.com" : "http://localhost:3001"
export const client_url = process.env.NODE_ENV === "production" ? "https://sonic-architecture-v1.netlify.app" : "http://localhost:3000"

// NOT SIGNED IN

export const label = (labelId) =>
  `${base_url}labels/${labelId}?key=${process.env.REACT_APP_DISCOGS_API_KEY}&secret=${process.env.REACT_APP_DISCOGS_API_SECRET}`;

export const artist = (artistId) =>
  `${base_url}artists/${artistId}?key=${process.env.REACT_APP_DISCOGS_API_KEY}&secret=${process.env.REACT_APP_DISCOGS_API_SECRET}`;

export const labelReleases = (labelId, pageNumber) =>
  `${base_url}labels/${labelId}/releases?page=${pageNumber}&per_page=100&key=${process.env.REACT_APP_DISCOGS_API_KEY}&secret=${process.env.REACT_APP_DISCOGS_API_SECRET}`;

export const artistReleases = (artistId, pageNumber) =>
  `${base_url}artists/${artistId}/releases?page=${pageNumber}&per_page=100&key=${process.env.REACT_APP_DISCOGS_API_KEY}&secret=${process.env.REACT_APP_DISCOGS_API_SECRET}`;

//RELEASE DETAILS
export const releaseDetails = (releaseId) =>
  `${base_url}releases/${releaseId}?key=${process.env.REACT_APP_DISCOGS_API_KEY}&secret=${process.env.REACT_APP_DISCOGS_API_SECRET}`;

//FORMAT DETAILS

export const formatDetails = (masterId) =>
  `${base_url}masters/${masterId}?key=${process.env.REACT_APP_DISCOGS_API_KEY}&secret=${process.env.REACT_APP_DISCOGS_API_SECRET}`;


// SIGNED IN

export const labelAuth = (labelId) =>
  `${base_url}labels/${labelId}?key=${process.env.REACT_APP_DISCOGS_API_KEY}&secret=${process.env.REACT_APP_DISCOGS_API_SECRET}`;

export const artistAuth = (artistId) =>
  `${base_url}artists/${artistId}?key=${process.env.REACT_APP_DISCOGS_API_KEY}&secret=${process.env.REACT_APP_DISCOGS_API_SECRET}`;

// export const labelReleasesAuth = () => `http://localhost:3001/searchUsersLabels`;


export const artistReleasesAuth = (artistId, pageNumber) =>
  `${base_url}artists/${artistId}/releases?page=${pageNumber}&per_page=100&key=${process.env.REACT_APP_DISCOGS_API_KEY}&secret=${process.env.REACT_APP_DISCOGS_API_SECRET}`;

//RELEASE DETAILS
export const releaseDetailsAuth = (releaseId) =>
  `${base_url}releases/${releaseId}?key=${process.env.REACT_APP_DISCOGS_API_KEY}&secret=${process.env.REACT_APP_DISCOGS_API_SECRET}`;

//FORMAT DETAILS

export const formatDetailsAuth = (masterId) =>
  `${base_url}masters/${masterId}?key=${process.env.REACT_APP_DISCOGS_API_KEY}&secret=${process.env.REACT_APP_DISCOGS_API_SECRET}`;
//SEARCHED TITLE

export const searchTitleAuth = (input, type) =>
  `${base_url}database/search?q=${input}&${type}?key=${process.env.REACT_APP_DISCOGS_API_KEY}&secret=${process.env.REACT_APP_DISCOGS_API_SECRET}`;
