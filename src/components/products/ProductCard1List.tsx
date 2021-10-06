import useFormattedProductData from "@customHook/useFormattedProductData";
import React, { useEffect, useState } from "react";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Pagination from "../pagination/Pagination";
import ProductCard1 from "../product-cards/ProductCard1";
import { SemiSpan } from "../Typography";

export interface ProductCard1ListProps {
  productList?: any;
  totalPage?: number;
  totalProduct?: number;
}

const ProductCard1List: React.FC<ProductCard1ListProps> = ({ productList, totalPage, totalProduct }) => {
  const [productData, setProductData] = useState([]);
  const [formattedProductData] = useFormattedProductData(productData);

  useEffect(() => {
    setProductData(productList);
  }, [productList]);

  console.log("productCard", formattedProductData)
  return (
    <div>
      <Grid container spacing={6}>
        {formattedProductData?.map((item, ind) => (
          <Grid item lg={4} sm={6} xs={12} key={ind}>
            <ProductCard1 {...item} />
          </Grid>
        ))}
      </Grid>

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing 1-10 of {totalProduct} Products</SemiSpan>
        <Pagination pageCount={totalPage} />
      </FlexBox>
    </div>
  );
};

export default ProductCard1List;
