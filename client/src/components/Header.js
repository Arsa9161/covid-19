import React from "react";
import BacterSvg from "../assets/images/bacterium.svg";

const Header = () => {
  return (
    <header>
      <div className="flex items-center">
        <img src={BacterSvg} alt="" className="w-10 h-10 mr-2" />
        <h1 className="text-2xl font-bold">COVID-19 тандалт</h1>
      </div>
      <p className="mt-1 -ml-1 opacity-80">
        Дэлхийн тархалтын мэдээллийг харуулна
      </p>
    </header>
  );
};

export default Header;
