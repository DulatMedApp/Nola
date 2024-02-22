import React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { ForwardedRef, forwardRef } from "react";

interface CardFullImageProps {
  label: string;
  backgroundColor: string;
  imageSource: string;
  cardWidth: number;
  cardHeight: number;
}

const CardFullImage = forwardRef(
  (
    {
      label,
      backgroundColor,
      imageSource,
      cardWidth,
      cardHeight,
    }: CardFullImageProps,
    ref: ForwardedRef<HTMLElement>
  ) => {
    return (
      <Card
        component="li"
        sx={{
          minWidth: cardWidth,
          minHeight: cardHeight,
          //  borderRadius: "10px",
          // transition: "border-color 0.3s",
          border: "1px solid ",
          ":hover": {
            cursor: "pointer",
            transition: "border-color 0.3s",
            borderRadius: "10px",
            border: "1px solid #fff",
          },
        }}>
        <CardCover
          sx={{
            backgroundColor: { backgroundColor },
          }}>
          <img src={imageSource} loading="lazy" alt="" />
          <img loading="lazy" alt="" />
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            //fontWeight="lg"
            textColor="#fff"
            fontFamily={"Overpass, sans-serif"}
            fontWeight="300"
            mt={{ xs: 12, sm: 18 }}>
            {label}
          </Typography>
        </CardContent>
      </Card>
    );
  }
);

export default CardFullImage;
