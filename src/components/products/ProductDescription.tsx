import { useAppContext } from "@context/app/AppContext";
import React from "react";
import Box from "../Box";
import Typography, { H3 } from "../Typography";

export interface ProductDescriptionProps {}

const ProductDescription: React.FC<ProductDescriptionProps> = () => {
  const { state } = useAppContext();
  return (
    <Box>
      <H3 mb="1rem">Specification:</H3>
      <Typography>
        <pre>{state.product?.productDetails?.full_desc}</pre>
      </Typography>
    </Box>
  );
};

export default ProductDescription;
