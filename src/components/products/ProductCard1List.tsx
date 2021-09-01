import { BASE_URL, ProductByCategoryId } from "@data/constants";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Pagination from "../pagination/Pagination";
import ProductCard1 from "../product-cards/ProductCard1";
import { SemiSpan } from "../Typography";
import useFormattedProductData from "./useFormattedProductData";

export interface ProductCard1ListProps {}

const ProductCard1List: React.FC<ProductCard1ListProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const [productData, setProductData] = useState([]);
  const [formattedProductData] =
    productData != [] ? useFormattedProductData(productData) : [];

  useEffect(() => {
    if (id) {
      fetch(`${BASE_URL}${ProductByCategoryId}${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProductData(data);
        });
    }
  }, [id]);

  console.log("pramid", id);
  console.log("productData", productData);
  console.log("FormettedProductData", formattedProductData);
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
        <SemiSpan>Showing 1-9 of 1.3k Products</SemiSpan>
        <Pagination pageCount={10} />
      </FlexBox>
    </div>
  );
};

export default ProductCard1List;
