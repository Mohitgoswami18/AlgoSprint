import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SsoCallback = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user) {
      const username = user.username || user.id; 
      navigate(`/${username}/dashboard`);
    }
  }, [isLoaded, user, navigate]);

  return <div>Redirecting...</div>;
};

export default SsoCallback;
