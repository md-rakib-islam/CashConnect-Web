import Card from "@component/Card";
import useFormattedProductData from "@customHook/useFormattedProductData";
import { Product_Arrival } from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";
import Grid from "../grid/Grid";
import ProductCard2 from "../product-cards/ProductCard2";

const Section5: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();

  const [productData, setProductData] = useState([]);
  const [formattedProductData] = useFormattedProductData(productData, "Arrivals");

  useEffect(() => {
    axios.get(`${Product_Arrival}`).then(res => {
      console.log("Product_ArrivalRes", res)
      setProductData(res.data.products)
    }).catch(() => { })
  }, [])

  useEffect(() => {
    if (width < 650) setVisibleSlides(6);
    else if (width < 950) setVisibleSlides(6);
    else setVisibleSlides(6);
  }, [width]);

  return (
    <CategorySectionCreator
      iconName="new-product-1"
      title="New Arrivals"
      seeMoreLink="product/search/newArrivalsAll"
    >
      <Card p="1rem">
        <Grid container spacing={6}>
          {formattedProductData?.slice(0, 6)?.map((item) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={item.id}>
              <ProductCard2 {...item} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </CategorySectionCreator>
  );
};

export default Section5;
