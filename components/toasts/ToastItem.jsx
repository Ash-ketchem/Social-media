import React from "react";

const ToastItem = ({ type, label }) => {
  return (
    <div
      className={`alert alert-${type} rounded-lg bg-opacity-100   z-50`}
      // animate-[pulse_1s_ease-in-out_1]
      data-theme="light"
    >
      <span>{label}</span>
    </div>
  );
};

export default ToastItem;
