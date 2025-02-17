import axios from "axios";

const baseURL =
  import.meta.env.VITE_ENVIRONMENT == "production"
    ? import.meta.env.VITE_API_PRODUCTION_URL
    : import.meta.env.VITE_ENVIRONMENT == "staging"
    ? import.meta.env.VITE_API_STAGING_URL
    : import.meta.env.VITE_API_LOCALHOST_URL;

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Optionally, attach auth token if needed
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Optionally, you can process the response here
//     // return response.data; // Returning only the data part
//     return response;
//   },
//   (error) => {
//     // Handle errors globally (e.g., token expiration, network errors)
//     if (error.response) {
//       // Server responded with a status code out of 2xx range
//       console.log("Response error: ", error.response);
//     } else if (error.request) {
//       // No response received (network error)
//       console.log("Request error: ", error.request);
//     } else {
//       // Something else went wrong
//       console.log("Error: ", error.message);
//     }
//   }
// );

export default axiosInstance;
