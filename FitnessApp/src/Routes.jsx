import { useAuth } from "./Provider";
import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {
  const { isSignedIn } = useAuth();
  return isSignedIn ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
