import Select from "@component/Select";
import useFormattedProductData from "@customHook/useFormattedProductData";
import { product_per_page_options } from "@data/data";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
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

  const router = useRouter()

  useEffect(() => {
    if (router.query.size) {
      setFieldValue("productPerPage", router.query.size);
    }
  }, [router.query.size])


  const handleFormSubmit = () => { }

  const {
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  });

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

export default ProductCard1List;

const initialValues = {
  productPerPage: { id: 9, name: 9 },
}

const checkoutSchema = yup.object().shape({})
