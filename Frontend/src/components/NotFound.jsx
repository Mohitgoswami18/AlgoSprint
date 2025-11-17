import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white">
      <h1 className="text-4xl font-bold mb-4 text-cyan-600">404 - Not Found</h1>
      <p className="text-lg text-black font-bold">
        The route <span className="font-bold text-cyan-600">"{location.pathname}"</span> does not exist.
      </p>
    </div>
  );
};

export default NotFound;