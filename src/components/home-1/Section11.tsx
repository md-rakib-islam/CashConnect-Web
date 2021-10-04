import useFormattedProductData from "@customHook/useFormattedProductData";
import { Product_For_You } from "@data/constants";
import React, { useEffect, useState } from "react";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import ProductCard1 from "../product-cards/ProductCard1";

const Section11: React.FC = () => {

  const [productList, setProductList] = useState([])
  const [productForYouList] = useFormattedProductData(productList.slice(0, 12));

  useEffect(() => {
    fetch(`${Product_For_You}`).then(res => res.json()).then(res => {
      console.log("Product_For_YouRes", res.products)
      setProductList(res.products)
    }).catch(() => { })
  }, [])

  return (
    <Container mb="70px">
      <CategorySectionHeader title="More For You" seeMoreLink="product/search/moreForYouAll" />
      <Grid container spacing={6}>
        {productForYouList.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1 off={0} hoverEffect {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section11;
