import { useAppContext } from "@context/app/AppContext";
import React, { useEffect, useState } from "react";
import useFormattedProductData from "../../customHook/useFormattedProductData";
import FlexBox from "../FlexBox";
import Pagination from "../pagination/Pagination";
import ProductCard9 from "../product-cards/ProductCard9";
import { SemiSpan } from "../Typography";

export interface ProductCard9ListProps {}

const ProductCard9List: React.FC<ProductCard9ListProps> = () => {
  const { state } = useAppContext();

  const [productData, setProductData] = useState([]);
  const [formattedProductData] =
    productData != [] ? useFormattedProductData(productData) : [];

  useEffect(() => {
    setProductData(state.product.productList);
  }, [state.product.productList]);

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
        <SemiSpan>
          Showing 1-10 of {state.product.productList.length} Products
        </SemiSpan>
        <Pagination pageCount={10} />
      </FlexBox>
    </div>
  );
};

export default ProductCard9List;
