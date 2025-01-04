
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";

const SessionExpired = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/signin");
  };
 

  return <div>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h1 className="text-2xl font-bold text-red-600">Session Expired</h1>
            <p className="text-gray-700 mt-2">Please log in again to continue.</p>
            <Button variant="primary" size="md" onClick={handleLogin} text="Go to Signin Page" />
          </div>
        </div>
  </div>
};

export default SessionExpired; ;
