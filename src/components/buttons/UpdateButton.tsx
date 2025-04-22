import React from "react";
import "./css/UpdateButton.css";
import addIcon from "../../assets/UpdateButton.png";

const UpdateButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      alert("추가되었습니다.");
    }
  };

  return (
    <button className="update-button" onClick={handleClick}>
      <img src={addIcon} alt="추가" className="button-icon" />
    </button>
  );
};

export default UpdateButton;
