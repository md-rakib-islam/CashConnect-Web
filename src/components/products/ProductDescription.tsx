import React from "react";
import Box from "../Box";
import Typography, { H3 } from "../Typography";


const parse = require('html-react-parser');

export interface ProductDescriptionProps {
  fullDes: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ fullDes }) => {
  return (
    <Box>
      <H3 mb="1rem">Specification:</H3>
      <Typography>
        <pre>{parse(fullDes)}</pre>
      </Typography>
    </Box>
  );
};

export default ProductDescription;
