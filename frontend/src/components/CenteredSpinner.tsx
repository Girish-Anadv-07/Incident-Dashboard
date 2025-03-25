import React from "react";
import { Spin } from "antd";

const CenteredSpinner: React.FC = () => {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default CenteredSpinner;
