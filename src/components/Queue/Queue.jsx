import React from "react";
import "./Queue.scss";

export const Queue = ({ color, active, title }) => {
  return (
    <div className={`queue ${active}`} style={{ backgroundColor: color }}>
      <span>{title}</span>
    </div>
  );
};
