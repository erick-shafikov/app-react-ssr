import axios from "axios";

function createHttpPlugin(baseURL: string = "https://dummyjson.com/") {
  const http = axios.create({
    baseURL,
    timeout: 10000,
  });

  return http;
}

export default createHttpPlugin;
