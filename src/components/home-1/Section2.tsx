import Box from "@component/Box";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Carousel from "../carousel/Carousel";
import CategorySectionCreator from "../CategorySectionCreator";
import ProductCard1 from "../product-cards/ProductCard1";

interface Section2Props {
  flashDealsList: any[]
}

const Section2: React.FC<Section2Props> = ({ flashDealsList }) => {
  const [visibleSlides, setVisibleSlides] = useState(5);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(3);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(6);
  }, [width]);

  const product_list = (
    <CategorySectionCreator
      iconName="light"
      title="Flash Deals"
      seeMoreLink="product/search/flash_deals_all"
    >
      <Box mt="-0.25rem" mb="-0.25rem">
        <Carousel totalSlides={flashDealsList?.length} visibleSlides={visibleSlides}>
          {flashDealsList?.map((item) => (
            <Box py="0.25rem" key={item.id}>
              <ProductCard1
                id={item.id}
                imgUrl={item.imgUrl}
                title={item.title}
                rating={item.rating}
                price={item.price}
                off={0}
                key={item.id}
                reviewCount={item.reviewCount}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );

  const returnableData = _.isEmpty(flashDealsList) ? null : product_list

  return returnableData

};

export default Section2;

