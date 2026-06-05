import { Navigate } from "react-router";
import PageLoader from "../components/PageLoader";
import { useAuth } from "@clerk/react";


const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loader while Clerk is checking auth
  if (!isLoaded) {
    return <PageLoader />;
  }

  // Redirect if not signed in
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;