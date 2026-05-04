import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = ({ isModal, onClose, switchToLogin }) => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  // 📧 Email validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(regex.test(email));
  };

  // 🔐 Password strength
  const checkStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    setStrength(score);
  };

  const handleRegister = async () => {

    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (!emailValid) {
      toast.error("Invalid email");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (strength < 2) {
      toast.error("Password is too weak");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://127.0.0.1:5000/register", data);

      toast.success("Registered successfully 🎉");
      if (isModal && onClose) {
        setTimeout(() => onClose(), 1000);
      }

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const strengthColor = [
    "bg-red-500",
    "bg-yellow-400",
    "bg-blue-500",
    "bg-green-500"
  ];

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">

      <Toaster position="top-right" />

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        {/* Name */}
        <input
          value={data.name}
          placeholder="Full Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Email */}
        <input
          value={data.email}
          placeholder="Email"
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
            validateEmail(e.target.value);
          }}
          className={`w-full border p-2 rounded mb-1 focus:outline-none ${
            emailValid === null
              ? ""
              : emailValid
              ? "border-green-500"
              : "border-red-500"
          }`}
        />

        <p className="text-xs mb-3">
          {emailValid === null
            ? ""
            : emailValid
            ? "Valid email"
            : "Invalid email"}
        </p>

        {/* Password */}
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            value={data.password}
            placeholder="Password"
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
              checkStrength(e.target.value);
            }}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Strength Bar */}
        <div className="w-full h-2 bg-gray-200 rounded mb-1">
          <div
            className={`h-2 rounded ${strengthColor[strength]} transition-all`}
            style={{ width: `${(strength / 3) * 100}%` }}
          ></div>
        </div>

        <p className="text-xs mb-3">
          {["Weak", "Medium", "Good", "Strong"][strength]}
        </p>

        {/* Confirm Password */}
        <input
          type="password"
          value={data.confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
          className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition flex justify-center items-center"
        >
          {loading ? "Please wait..." : "Register"}
        </button>

        {/* Login */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={switchToLogin}
            className="text-purple-600 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
};

export default Register;