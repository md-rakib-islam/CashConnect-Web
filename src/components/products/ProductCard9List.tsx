import PaginationRow from "@component/pagination/PaginationRow";
import ShowingItemNumber from "@component/pagination/ShowingItemNumber";
import React, { useEffect } from "react";
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

  const [formattedProductData, setFormattedProductData] = useFormattedProductData([]);

  useEffect(() => {
    setFormattedProductData(productList);
  }, [productList]);

  return (
    <div>
      {formattedProductData?.map((item, ind) => (
        <ProductCard9 mb="1.25rem" key={item?.id || ind} {...item} />
      ))}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-around"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing <ShowingItemNumber initialNumber={12} totalItem={totalProduct} /> of {totalProduct} Products</SemiSpan>

        <Pagination pageCount={totalPage} />

        <PaginationRow />
      </FlexBox>
    </div>
  );
};

export default ProductCard9List;
