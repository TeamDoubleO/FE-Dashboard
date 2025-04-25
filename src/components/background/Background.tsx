import React from "react";
import "./css/Background.css";

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return <div className="background">{children}</div>;
};

export default Background;