import React from "react";
import Box from "../Box";
import Typography, { H3 } from "../Typography";

const parse = require("html-react-parser");

export interface ProductFeaturesProps {
  fullFeatures: string;
  parse: string;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ fullFeatures }) => {
  return (
    <Box>
      <H3 mb="1rem">Specification</H3>
      <Typography>{fullFeatures ? parse(fullFeatures) : "_"}</Typography>
    </Box>
  );
};

export default ProductFeatures;
