"use client";
import React, { useEffect, useId, useState } from "react";
import ToastItem from "./ToastItem";

let addToast = null;

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (toasts.length) {
        setToasts(
          toasts.filter((toast) => toast.id !== toasts[toasts.length - 1].id)
        );
      }
    }, 1000);

    if (toasts.length === 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [toasts]);

  addToast = ({ type, label }) => {
    setToasts((toasts) => [
      {
        id: crypto.randomUUID(),
        label,
        type,
      },
      ...toasts,
    ]);
  };
  return (
    <div>
      <div className="toast toast-top toast-center flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <ToastItem type={toast.type} label={toast.label} key={toast.id} />
        ))}
      </div>
    </div>
  );
};

export default Toast;
export { addToast };
