import Lottie from "lottie-react";
import glowLoading from "./glow-loading.json"; // 경로 정확히 확인
import "./css/Loading.css";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <Lottie animationData={glowLoading} loop />
    </div>
  );
};

export default Loading;
