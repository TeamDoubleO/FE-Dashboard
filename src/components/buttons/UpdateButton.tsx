import React from "react";
import { MdAdd } from "react-icons/md";
import "./css/UpdateButton.css";

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
      <MdAdd className="update-button-icon" />
    </button>
  );
};

export default UpdateButton;
