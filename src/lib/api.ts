import axios from "axios";

// Create an Axios instance
const api = axios.create({
  // This looks for the URL in your .env.local file. 
  // If it can't find it, it defaults to "/api" which works for your local setup.
  
baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Request Interceptor: Auto-attach Token
// This automatically puts the "Bearer token" on every request if you are logged in.
api.interceptors.request.use(
  (config) => {
    // Check if we are in the browser (client-side)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Response Interceptor: Handle Global Errors
// If the token expires or is fake (401 error), this kicks the user back to Login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        // Clear bad data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Redirect to login
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;



