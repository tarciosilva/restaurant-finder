import React from "react";
import Lottie from "react-lottie";
import loader from "./../../assets/loader.json";


const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={100}
        width={400}
      />
    </div>
  );
};

export default Loader;