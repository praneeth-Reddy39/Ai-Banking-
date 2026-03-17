import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!isTokenValid(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
