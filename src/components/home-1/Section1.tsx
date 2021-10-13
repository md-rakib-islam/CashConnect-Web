import Box from "@component/Box";
import CarouselCard1 from "@component/carousel-cards/CarouselCard1";
import Carousel from "@component/carousel/Carousel";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import React, { Fragment } from "react";

const Section1 = ({ sliderList }) => {

  return (
    <Fragment>
      <Navbar navListOpen={true} />
      <Box bg="gray.white" mb="3.75rem">
        <Container pb="2rem">
          <Carousel
            totalSlides={sliderList?.length}
            visibleSlides={1}
            infinite={true}
            autoPlay={true}
            showDots={true}
            showArrow={false}
            spacing="0px"
          >
            {sliderList.map((data) => <CarouselCard1 title={data.title} details={data.details} link={data.link} image={data.image} />)}
          </Carousel>
        </Container>
      </Box>
    </Fragment>
  );
};

export default Section1;
