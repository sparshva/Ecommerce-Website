import React from "react";
import { DotLoader } from "react-spinners";
// import { css } from "@emotion/core";

const Loading = () => {
  return (
    <div className="loading">
      <DotLoader size={300} color="#38bdf8" />
    </div>
  );
};

export default Loading;
