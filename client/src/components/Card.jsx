import React from "react";

export default function Card({ title, text }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
}
