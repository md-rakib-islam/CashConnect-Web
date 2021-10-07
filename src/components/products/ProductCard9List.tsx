import Select from "@component/Select";
import { product_per_page_options } from "@data/data";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
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

  const router = useRouter()

  useEffect(() => {
    if (router.query.size) {
      setFieldValue("productPerPage", router.query.size);
    }
  }, [router.query.size])

  useEffect(() => {
    setProductData(productList);
  }, [productList]);

  const handleFormSubmit = () => { }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  });

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

        <div style={{ display: "flex", width: "fit-contect", flexWrap: "nowrap", alignItems: "center" }}>
          <SemiSpan>product per page</SemiSpan>
          <Select
            width="80px"
            ml="1rem"
            options={product_per_page_options}
            value={values.productPerPage || ""}
            onChange={(productPerPage) => {
              setFieldValue("productPerPage", productPerPage);
              const query = router.query
              router.push({
                pathname: `${router.pathname}`,
                query: { ...query, size: productPerPage.id },
              })
            }}
            errorText={touched.productPerPage && errors.productPerPage}
          />
        </div>
      </FlexBox>
    </div>
  );
};

export default ProductCard9List;

const initialValues = {
  productPerPage: { id: 9, name: 9 },
}

const checkoutSchema = yup.object().shape({})
