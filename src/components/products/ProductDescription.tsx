import React from "react";
import Box from "../Box";
import Typography, { H3 } from "../Typography";

export interface ProductDescriptionProps {
  fullDes: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ fullDes }) => {
  // const { state } = useAppContext();
  return (
    <Box>
      <H3 mb="1rem">Specification:</H3>
      <Typography>
        <pre>{fullDes}</pre>
      </Typography>
    </Box>
  );
};

export default ProductDescription;
