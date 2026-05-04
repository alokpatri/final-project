import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ isModal, onClose, switchToRegister }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // 📧 Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 🔐 Login function
  const handleLogin = async () => {

    if (!email || !password) {
      toast.error("All fields required");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password
      });

      if (res.data.msg === "success") {
        localStorage.setItem("token", res.data.token);

        toast.success("Login successful 🚀");
        if (isModal && onClose) {
          setTimeout(() => onClose(), 1000);
        }

        setTimeout(() => {
          navigate("/");
        }, 1200);

      } else {
        toast.error("Invalid email or password");
      }

    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Google Login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/google-login", {
        token: credentialResponse.credential
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Google Login Successful 🎉");

      setTimeout(() => {
         navigate("/");
      }, 1200);

    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">

      <Toaster position="top-right" />

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Login
        </h2>

        {/* Google Login */}
        <div className="mb-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Login Failed")}
          />
        </div>

        <div className="text-center text-gray-400 mb-4">OR</div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        {/* Register Redirect */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={switchToRegister}
            className="text-blue-500 cursor-pointer"
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
};

export default Login;