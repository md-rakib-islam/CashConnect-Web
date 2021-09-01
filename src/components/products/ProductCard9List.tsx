import { BASE_URL, ProductByCategoryId } from "@data/constants";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FlexBox from "../FlexBox";
import Pagination from "../pagination/Pagination";
import ProductCard9 from "../product-cards/ProductCard9";
import { SemiSpan } from "../Typography";
import useFormattedProductData from "./useFormattedProductData";

export interface ProductCard9ListProps {}

const ProductCard9List: React.FC<ProductCard9ListProps> = () => {
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
      {formattedProductData.map((item, ind) => (
        <ProductCard9 mb="1.25rem" key={ind} {...item} />
      ))}

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

export default ProductCard9List;
