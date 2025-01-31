import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    // Calculate the position of the click
    const left = event.clientX - button.getBoundingClientRect().left - radius;
    const top = event.clientY - button.getBoundingClientRect().top - radius;

    // Set the styles for the ripple
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    ripple.classList.add("ripple");

    // Append the ripple to the button
    const rippleContainer =
      button.getElementsByClassName("ripple-container")[0];
    rippleContainer.appendChild(ripple);

    // Remove the ripple after the animation ends
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center mx-5 bg-white hero-text">
      <div className="bg-white border border-gray-300 rounded-3xl p-6 shadow-xl w-full max-w-md transform transition-all duration-500 hover:shadow-2xl">
        <div className="flex justify-center mb-6">
          <img
            src="https://img.icons8.com/color/48/fenix.png"
            alt="Fenix"
            className="w-8 h-8"
          />
        </div>
        <h2 className="text-3xl hero-title font-bold text-center text-gray-900 mb-5">
          REASONS
        </h2>
      <p className="text-gray-600 hero-text text-center mb-6">
          Please enter your details to login.
        </p>

        <div className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 p-4 rounded-full w-full hero-text focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200 pl-12 text-gray-700"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 p-4 rounded-full hero-text w-full focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200 pl-12 text-gray-700"
            />
          </div>
        </div>

        <button
          className="relative w-full py-3 mt-6 bg-black text-white rounded-full text-lg font-semibold overflow-hidden focus:outline-none"
          onClick={createRipple}
        >
          <div className="ripple-container absolute inset-0 overflow-hidden rounded-full"></div>
          <span className="relative z-10">Login</span>
        </button>

        <hr className="my-6 border-gray-300" />

        <p className="text-center hero-text text-gray-700">
          New here?{" "}
          <span
            className="text-red-500 cursor-pointer hero-text hover:underline"
            onClick={() => (window.location.href = "/signup")}
          >
            Create an account
          </span>
        </p>
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
            transform: scale(7);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
