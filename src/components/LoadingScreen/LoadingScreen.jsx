"use client";
import "./LoadingScreen.css";

const LoadingScreen = ({ isLoading }) => {
  return (
    <div className={`loading-screen ${isLoading ? "active" : ""}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingScreen;
