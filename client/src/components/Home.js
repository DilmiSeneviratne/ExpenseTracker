import React from "react";
import Navbar from "./Navbar";
import BannerBackground from "../Assests/home-banner-background.png";
import BannerImage from "../Assests/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="banner-backgorund" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Track Your Expenses Today and Thrive for Tommorrow
          </h1>
          <p className="primary-text">
            Effortlessly track your spending, manage your budget, and make
            smarter financial choices with our easy-to-use expense tracker
          </p>
          <button className="secondary-button">
Order Now <FiArrowRight/>
          </button>
        </div>
        <div className="home-image-container">
            <img src={BannerImage} alt="banner-image"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
