import "./index.css";
import axios from "axios";
import App from "./App.jsx";
import "react-toastify/ReactToastify.css";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:1218/";
axios.defaults.headers.common["x-api-key"] = "Bearer alsafia_api_key_1812";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <Router>
    <App />
    <ToastContainer />
  </Router>
);
