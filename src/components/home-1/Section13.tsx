import Box from "@component/Box";
import Card from "@component/Card";
import Carousel from "@component/carousel/Carousel";
import FlexBox from "@component/FlexBox";
import HoverBox from "@component/HoverBox";
import LazyImage from "@component/LazyImage";
import { H4 } from "@component/Typography";
import useFormattedProductData from "@customHook/useFormattedProductData";
import { Product_Discount } from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";

const Section13: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();

  const [productData, setProductData] = useState([]);
  const [formattedProductData] = useFormattedProductData(productData);

  useEffect(() => {
    axios.get(`${Product_Discount}`).then(res => {
      console.log("Product_DiscountRes", res.data.discounted_products)
      setProductData(res.data.products)
    })
  }, [])

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(6);
  }, [width]);


  console.log("bigDiscount", formattedProductData)
  return (
    <CategorySectionCreator
      iconName="gift"
      title="Big Discounts"
      seeMoreLink="#"
    >
      <Box my="-0.25rem">
        <Carousel totalSlides={formattedProductData.length} visibleSlides={visibleSlides}>
          {formattedProductData.map((item) => (
            <Box py="0.25rem" key={item.id}>
              <Card p="1rem">
                <Link href={`/product/${item.id}`}>
                  <a>
                    <HoverBox borderRadius={8} mb="0.5rem">
                      <LazyImage
                        src={item.imgUrl}
                        loader={() => item.imgUrl}
                        width="100%"
                        height="auto"
                        layout="responsive"
                        alt={item.title}
                      />
                    </HoverBox>
                    <H4 fontWeight="600" fontSize="14px" mb="0.25rem">
                      {item.title}
                    </H4>

                    <FlexBox>
                      <H4
                        fontWeight="600"
                        fontSize="14px"
                        color="primary.main"
                        mr="0.5rem"
                      >
                        ${Math.ceil(item.price).toLocaleString()}
                      </H4>

                      <H4 fontWeight="600" fontSize="14px" color="text.muted">
                        <del>${Math.ceil(item.price).toLocaleString()}</del>
                      </H4>
                    </FlexBox>
                  </a>
                </Link>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

export default Section13;
