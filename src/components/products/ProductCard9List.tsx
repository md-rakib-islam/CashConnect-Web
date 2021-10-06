import React, { useEffect, useState } from "react";
import useFormattedProductData from "../../customHook/useFormattedProductData";
import FlexBox from "../FlexBox";
import Pagination from "../pagination/Pagination";
import ProductCard9 from "../product-cards/ProductCard9";
import { SemiSpan } from "../Typography";

export interface ProductCard9ListProps {
  productList?: any;
  totalPage?: number;
  totalProduct?: number;
}

const ProductCard9List: React.FC<ProductCard9ListProps> = ({ productList, totalPage, totalProduct }) => {
  const [productData, setProductData] = useState([]);
  const [formattedProductData] = useFormattedProductData(productData);

  useEffect(() => {
    setProductData(productList);
  }, [productList]);

  return (
    <div>
      {formattedProductData?.map((item, ind) => (
        <ProductCard9 mb="1.25rem" key={ind} {...item} />
      ))}

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

export default ProductCard9List;
