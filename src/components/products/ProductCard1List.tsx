import useFormattedProductData from "@component/products/useFormattedProductData";
import { useAppContext } from "@context/app/AppContext";
import React, { useEffect, useState } from "react";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Pagination from "../pagination/Pagination";
import ProductCard1 from "../product-cards/ProductCard1";
import { SemiSpan } from "../Typography";

export interface ProductCard1ListProps {}

const ProductCard1List: React.FC<ProductCard1ListProps> = () => {
  const { state } = useAppContext();

  const [productData, setProductData] = useState([{}]);
  const [formattedProductData] =
    productData != [] ? useFormattedProductData(productData) : [];

  useEffect(() => {
    setProductData(state.product.productList);
  }, [state.product.productList]);

  return (
    <div>
      <Grid container spacing={6}>
        {formattedProductData.map((item, ind) => (
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
        <SemiSpan>
          Showing 1-10 of {state.product.productList.length} Products
        </SemiSpan>
        <Pagination pageCount={10} />
      </FlexBox>
    </div>
  );
};

export default ProductCard1List;
