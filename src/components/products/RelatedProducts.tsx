// import useFormattedProductData from "@customHook/useFormattedProductData";
import getFormattedProductData from "@helper/getFormattedProductData";
import React from "react";
import Box from "../Box";
import Grid from "../grid/Grid";
import ProductCard1 from "../product-cards/ProductCard1";
import { H3 } from "../Typography";

export interface RelatedProductsProps {
  relatedProduct: any[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  relatedProduct,
}) => {
  console.log("re_product_Data", relatedProduct);
  const relatedProducts = getFormattedProductData(relatedProduct);

  return (
    <Box mb="3.75rem">
      <H3 mb="1.5rem">Realted Products</H3>
      <Grid container spacing={8}>
        {relatedProducts?.map((item, ind) => (
          <Grid item lg={2.4} md={2.4} sm={6} xs={6} key={item?.id || ind}>
            <ProductCard1 hoverEffect {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;
