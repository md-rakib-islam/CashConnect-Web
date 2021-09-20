import Box from "@component/Box";
import useFormattedProductData from "@customHook/useFormattedProductData";
import { Product_Flash_Deals } from "@data/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Carousel from "../carousel/Carousel";
import CategorySectionCreator from "../CategorySectionCreator";
import ProductCard1 from "../product-cards/ProductCard1";

const Section2: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(4);
  const width = useWindowSize();

  const [productList, setProductList] = useState([])
  const [productData, setProductData] = useState([{}]);
  const [formattedProductData] =
    productData != [] ? useFormattedProductData(productData) : [];

  useEffect(() => {
    setProductData(productList);
  }, [productList]);

  useEffect(() => {
    axios.get(`${Product_Flash_Deals}`).then(res => {
      console.log("Product_Flash_DealsRes", res.data.top_selling_products)
      setProductData(res.data.top_selling_products)
    })
  }, [])

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  return (
    <CategorySectionCreator
      iconName="light"
      title="Flash Deals"
      seeMoreLink="#"
    >
      <Box mt="-0.25rem" mb="-0.25rem">
        <Carousel totalSlides={10} visibleSlides={visibleSlides}>
          {formattedProductData.map((item) => (
            <Box py="0.25rem" key={item.id}>
              <ProductCard1
                id={item.id}
                imgUrl={item.imgUrl}
                title={item.title}
                rating={item.rating}
                price={item.price}
                off={0}
                key={item.id}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

const productList = [
  {
    imgUrl: "/assets/images/products/flash-1.png",
  },
  {
    imgUrl: "/assets/images/products/flash-2.png",
  },
  {
    imgUrl: "/assets/images/products/flash-3.png",
  },
  {
    imgUrl: "/assets/images/products/flash-4.png",
  },
  {
    imgUrl: "/assets/images/products/flash-1.png",
  },
  {
    imgUrl: "/assets/images/products/flash-2.png",
  },
  {
    imgUrl: "/assets/images/products/flash-3.png",
  },
  {
    imgUrl: "/assets/images/products/flash-4.png",
  },
  {
    imgUrl: "/assets/images/products/flash-1.png",
  },
  {
    imgUrl: "/assets/images/products/flash-2.png",
  },
];

export default Section2;
