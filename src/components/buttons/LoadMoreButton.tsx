import React from "react";
import "./css/LoadMoreButton.css";

interface LoadMoreButtonProps {
  onClick?: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <button className="load-more-button" onClick={onClick}>
      더보기
    </button>
  );
};

export default LoadMoreButton;