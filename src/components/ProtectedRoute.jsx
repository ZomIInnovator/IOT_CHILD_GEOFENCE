import { useNavigate } from "react-router-dom";
import { useUser } from "../services/Auth/authQuery";

function ProtectedRoute({ children }) {
  const { isLoading, authUser } = useUser();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="h-svh bg-gray-300 flex items-center justify-center">
        Please wait a moment syncing information..!
      </div>
    );
  }

  if (!authUser) {
    navigate("/landing", { replace: true });
  }
  return children;
}

export default ProtectedRoute;
