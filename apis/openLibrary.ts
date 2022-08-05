import axios from "axios";

const openlibrary = axios.create({
  baseURL: "http://openlibrary.org/",
  // .. other options
});

export default openlibrary;
