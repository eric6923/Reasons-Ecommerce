import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('https://reasons-server.vercel.app/api/auth/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const left = event.clientX - button.getBoundingClientRect().left - radius;
    const top = event.clientY - button.getBoundingClientRect().top - radius;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    ripple.classList.add("ripple");

    const rippleContainer = button.getElementsByClassName("ripple-container")[0];
    rippleContainer.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 hero-text">
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img
            src="https://img.icons8.com/color/48/fenix.png"
            alt="Fenix"
            className="w-8 h-8"
          />
        </div>

        <h2 className="text-3xl font-bold hero-title text-center">
          REASONS
        </h2>
        <p className="text-gray-500 text-center hero-text mt-2">
          Enter the details to proceed
        </p>

        {error && (
          <p className="text-red-500 text-center mt-2">{error}</p>
        )}

        {success && (
          <p className="text-green-500 text-center mt-2">
            Registration successful! Redirecting to login...
          </p>
        )}

        <div className="mt-6">
          <div className="mb-4">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="border border-gray-300 p-4 hero-text rounded-full w-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 pl-10"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="border border-gray-300 p-4 rounded-full hero-text w-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 pl-10"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="border border-gray-300 p-4 rounded-full hero-text w-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 pl-10"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="border border-gray-300 p-4 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 pl-10"
              />
            </div>
          </div>

          <button
            className="relative w-full py-3 mt-6 bg-black hero-text text-white rounded-full text-lg overflow-hidden focus:outline-none"
            onClick={handleSignup}
            onMouseDown={createRipple}
          >
            <div className="ripple-container absolute inset-0 overflow-hidden rounded-full"></div>
            <span className="relative z-10 hero-text">Sign Up</span>
          </button>

          <hr className="my-6 border-gray-300" />

          <p className="text-center hero-text">
            Already have an account?{" "}
            <span
              className="text-red-500 cursor-pointer hero-text hover:underline"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple-animation 1s linear;
        }

        @keyframes ripple-animation {
          to {
            transform: scale(6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SignupPage;