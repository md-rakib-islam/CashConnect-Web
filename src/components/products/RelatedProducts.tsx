import useFormattedProductData from "@customHook/useFormattedProductData";
import React from "react";
import Box from "../Box";
import Grid from "../grid/Grid";
import ProductCard1 from "../product-cards/ProductCard1";
import { H3 } from "../Typography";

export interface RelatedProductsProps {
  relatedProduct: any[]
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ relatedProduct }) => {

  const [relatedProducts] = useFormattedProductData(relatedProduct)

  return (
    <Box mb="3.75rem">
      <H3 mb="1.5rem">Realted Products</H3>
      <Grid container spacing={8}>
        {relatedProducts?.map((item, ind) => (
          <Grid item lg={3} md={3} sm={4} xs={12} key={ind}>
            <ProductCard1 {...item} hoverEffect />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;
