import React from "react";
import Card from "../Card/Card";

interface Props {}

const CardList: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div>
      <Card companyName="Apple" ticker="Apple" price={100} />
      <Card companyName="Microsoft" ticker="Micro" price={200} />
      <Card companyName="Amazon" ticker="Amazon" price={300} />
    </div>
  );
};

export default CardList;
