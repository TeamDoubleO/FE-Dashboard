import React from "react";
import "./css/DeleteButton.css";
import deleteIcon from "../../assets/DeleteButton.png";

const DeleteButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      alert("삭제되었습니다.");
    }
  };

  return (
    <button className="delete-button" onClick={handleClick}>
      <img src={deleteIcon} alt="삭제" className="button-icon" />
    </button>
  );
};

export default DeleteButton;
