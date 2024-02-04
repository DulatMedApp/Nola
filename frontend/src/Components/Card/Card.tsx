import React from "react";
import "./Card.css";
import bgImage from "./bg.jpeg";

interface Props {
  companyName: string;
  ticker: string;
  price: number;
}

const Card: React.FC<Props> = ({
  companyName,
  ticker,
  price,
}: Props): JSX.Element => {
  return (
    <div className="card">
      <img src={bgImage} className="image" alt="image" />
      <div className="details">
        <h2>
          {companyName} ({ticker})
        </h2>
        <p>${price}</p>
      </div>
      <p className="infon">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ipsam
        tenetur maxime, at pariatur inventore consectetur! Optio consequatur
        fugit non ex earum placeat ipsam laboriosam voluptas vero, repudiandae
        officiis at!
      </p>
    </div>
  );
};

export default Card;
