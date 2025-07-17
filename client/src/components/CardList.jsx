import React from "react";
import Card from "./Card";

export default function CardList({ items }) {
  return (
    <div className="row">
      {items.map((item, idx) => (
        <div key={idx} className="col-md-4 mb-4">
          <Card title={item.title} text={item.text} />
        </div>
      ))}
    </div>
  );
}
