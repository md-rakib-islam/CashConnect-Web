import { BASE_URL } from "@data/constants";
import Link from "next/link";
import React from "react";
import Button from "../buttons/Button";
import Typography from "../Typography";
import { StyledCarouselCard1 } from "./CarouselCardStyle";

export interface CarouselCard1Props {
  title: string;
  details: string;
  link: string;
  image: string;
}

const CarouselCard1: React.FC<CarouselCard1Props> = ({ title, details, link, image }) => {
  return (
    <StyledCarouselCard1>
      <div>
        <div className="image-holder">
        <img
          src={`${BASE_URL}${image}`}
          alt="Not found"
        />
          <div className="sliderInfo">
              <h1 className="title">{title}</h1>
            <Typography style={{color: 'whitesmoke',fontWeight: 'bold'}} color="secondary.main" mb="1.35rem">{details}</Typography>
            <Link href={link || "/"}>
              <Button
                className="button-link"
                variant="contained"
                color="primary"
                p="1rem 1.5rem"
                >
                Visit Collections
              </Button>
            </Link>
          </div>
        </div>
      
      </div>

     
    </StyledCarouselCard1>
  );
};

export default CarouselCard1;
