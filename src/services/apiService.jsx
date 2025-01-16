import axios from "axios";


let authToken = null;

// Function to set the authentication token
export function setAuthToken(token) {
  authToken = token;
}


// helpers.js
export  const baseURL = "https://47cb-117-98-68-130.ngrok-free.app/api/admin";
    // Use the same base URL as your axios instance


// Axios instance with default configuration
const router = axios.create({
  baseURL: baseURL, // Paths like '/api' will be forwarded to http://localhost:5000/api
});

 
router.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers["x-access-token"] = authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


  

export default router;
