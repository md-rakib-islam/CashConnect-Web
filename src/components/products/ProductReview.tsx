import useUserInf from "@customHook/useUserInf";
import { Review_By_Product_Id, Review_Create } from "@data/constants";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Rating from "../rating/Rating";
import TextArea from "../textarea/TextArea";
import { H2, H5 } from "../Typography";
import ProductComment from "./ProductComment";

export interface ProductReviewProps {
  productId: string | number;
  setReviews: any;
}

const ProductReview: React.FC<ProductReviewProps> = ({ productId, setReviews }) => {

  const [commentList, setCommentList] = useState([])
  const [reloadreviews, setReloadreviews] = useState(0)

  const { user_id, authTOKEN, isLogin } = useUserInf()

  const { query, push } = useRouter()

  const review = query?.review

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);

    if (isLogin) {
      const reviewData = {
        ...values,
        user: user_id,
        product: productId,
      }
      console.log("reviewData", reviewData)
      axios.post(`${Review_Create}`, reviewData, authTOKEN).then(res => {
        console.log("reviewCreateRe", res)
        resetForm();
        setReloadreviews(Math.random())
      })
    }
    else {
      push("/login")
      localStorage.setItem("backAfterLogin", `/product/${query?.id}?review=write`)
    }
  };

  useEffect(() => {
    axios.get(`${Review_By_Product_Id}${productId}`).then(res => {
      console.log("ReviewAllRes", res)
      setCommentList(res?.data)
      setReviews(res?.data?.length)
    }).catch((err) => { console.log("error", err) })
  }, [reloadreviews, query])

  const {
    values,
    errors,
    touched,
    dirty,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: reviewSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <Box>
      {commentList.map((item, ind) => (
        <ProductComment {...item} key={ind} />
      ))}

      <H2 fontWeight="600" mt="55px" mb="20">
        Write a Review for this product
      </H2>

      <form onSubmit={handleSubmit}>
        <Box mb="20px">
          <FlexBox mb="12px">
            <H5 color="gray.700" mr="6px">
              Your Rating
            </H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating
            outof={5}
            color="warn"
            size="medium"
            readonly={false}
            value={values.rating || 0}
            onChange={(value) => setFieldValue("rating", value)}
          />
        </Box>

        <Box mb="24px">
          <FlexBox mb="12px">
            <H5 color="gray.700" mr="6px">
              Your Review
            </H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextArea
            name="review"
            placeholder="Write a review here..."
            fullwidth
            rows={8}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.review || ""}
            errorText={touched.review && errors.review}
            autoFocus={review ? true : false}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          disabled={!(dirty && isValid)}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};


const initialValues = {
  rating: "",
  review: "",
  date: new Date().toISOString(),
};

const reviewSchema = yup.object().shape({
  rating: yup.number().required("required"),
});

export default ProductReview;
