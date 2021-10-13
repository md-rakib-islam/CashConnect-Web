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

  const { query } = useRouter()

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);

    const { user_id, authTOKEN } = useUserInf()

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
  };

  useEffect(() => {
    axios.get(`${Review_By_Product_Id}${productId}`).then(res => {
      console.log("ReviewAllRes", res)
      setCommentList(res?.data)
      setReviews(res?.data?.length)
    }).catch(() => { })
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

// const commentList = [
//   {
//     name: "Jannie Schumm",
//     imgUrl: "/assets/images/faces/7.png",
//     rating: 4.7,
//     date: "2021-02-14",
//     review:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
//   },
//   {
//     name: "Joe Kenan",
//     imgUrl: "/assets/images/faces/6.png",
//     rating: 4.7,
//     date: "2019-08-10",
//     review:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
//   },
//   {
//     name: "Jenifer Tulio",
//     imgUrl: "/assets/images/faces/8.png",
//     rating: 4.7,
//     date: "2021-02-05",
//     review:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
//   },
// ];

const initialValues = {
  rating: "",
  review: "",
  date: new Date().toISOString(),
};

const reviewSchema = yup.object().shape({
  rating: yup.number().required("required"),
  // comment: yup.string().required("required"),
});

export default ProductReview;
