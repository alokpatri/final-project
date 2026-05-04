import { useNavigate } from "react-router-dom";

const StartJourney = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">

      <h1 className="text-6xl mb-4">welcome to the SafeX</h1>

      <h2 className="text-xl font-semibold mb-6">
        😊 Feature is launching soon...
      </h2>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
       Back to Home
      </button>

    </div>
  );
};

export default StartJourney;