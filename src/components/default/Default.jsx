import "./default.css";
import { useNavigate } from "react-router-dom";

export const DefaultPage = ({ access }) => {
  const navigate = useNavigate();

  if (access) {
    navigate("/home");
  } else {
    navigate("/auth/login");
  }

  return <span className="loader"></span>;
};
