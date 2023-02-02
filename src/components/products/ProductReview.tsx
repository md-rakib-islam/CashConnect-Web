import Avatar from "@component/avatar/Avatar";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import useUserInf from "@customHook/useUserInf";
import {
  Review_By_Product_Id,
  Review_Create,
  Review_Permission,
} from "@data/constants";
import jsonToFormData from "@helper/jsonToFormData";
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

type TIMG = any[];
export interface ProductReviewProps {
  product_id: string | number;
  setReviews: any;
}

const ProductReview: React.FC<ProductReviewProps> = ({
  product_id,
  setReviews,
}) => {
  const [commentList, setCommentList] = useState([]);
  const [reloadreviews, setReloadreviews] = useState(0);
  const [reviewPermission, setReviewPermission] = useState(false);
  const [reCheackReviewPermission, setReCheackReviewPermission] = useState(0);
  const [previewImage, setPreviewImage] = useState([]);
  const [images, setImages] = useState<TIMG>([[]]);
  const [_reRender, setReRender] = useState(0);

  const { user_id, authTOKEN, isLogin } = useUserInf();

  const { query, push } = useRouter();

  const review = query?.review;

  const cancelAImage = (imgId) => {
    let newPreImgs = [...previewImage];
    newPreImgs.splice(imgId, 1);
    setPreviewImage(newPreImgs);

    let newImages = [...images];
    newImages.splice(imgId, 1);
    setImages(newImages);

    setReRender(Math.random());
  };
  const handleFormSubmit = async (values, { resetForm }) => {
    if (isLogin) {
      if (reviewPermission) {
        setReCheackReviewPermission(Math.random());
        const reviewData = {
          ...values,
          user: user_id,
          product: product_id,
          image: images,
        };
        const [newReviewData] = jsonToFormData(reviewData);

        axios.post(`${Review_Create}`, newReviewData, authTOKEN).then((res) => {
          setReCheackReviewPermission(Math.random());
          console.log("reviewCreateRe", res);
          resetForm();
          setFieldValue("image", "");
          setPreviewImage([]);
          setReloadreviews(Math.random());
        });
      }
    } else {
      push("/login");
      localStorage.setItem(
        "backAfterLogin",
        `/product/${query?.id}?review=write`
      );
    }
  };

  useEffect(() => {
    axios
      .get(`${Review_By_Product_Id}${product_id}`)
      .then((res) => {
        console.log("ReviewAllRes", res);
        setCommentList(res?.data);
        setReviews(res?.data?.length);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [reloadreviews, query, product_id]);

  useEffect(() => {
    if (authTOKEN) {
      axios
        .post(`${Review_Permission}`, { product_id }, authTOKEN)
        .then((res) => {
          console.log("reviewPermissionRes", res);
          const canReview =
            res.data.can_user_review_and_rating === "no" ? false : true;
          setReviewPermission(canReview);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [authTOKEN, reCheackReviewPermission, product_id]);

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
        <ProductComment {...item} key={item?.id || ind} />
      ))}

      {reviewPermission && (
        <>
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

            <Box
              width="80%"
              mt="25px"
              display="flex"
              style={{ gap: "20px" }}
              justifyContent="center"
              flexWrap="wrap"
            >
              {previewImage?.map((src, id) => {
                return (
                  <>
                    <Box display="flex" width="fit-content" position="relative">
                      <div
                        id="cancelIcon"
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          zIndex: 1,
                          color: "red",
                        }}
                      >
                        <Icon
                          onClick={() => {
                            cancelAImage(id);
                          }}
                        >
                          cancel
                        </Icon>
                      </div>
                      <Avatar
                        float="left"
                        radius={10}
                        // ml="15px"
                        src={src}
                        size={50}
                        // loader={() => previewImage}
                      />
                    </Box>
                  </>
                );
              })}
            </Box>

            <Box width="80%" mt="10px">
              <Box zIndex={1}>
                <label htmlFor="image">
                  <Button
                    as="span"
                    size="small"
                    bg="gray.300"
                    color="secondary"
                    height="auto"
                    p="6px"
                    borderRadius="50%"
                  >
                    <Icon>upload</Icon>
                  </Button>
                </label>
              </Box>
              <Box display="flex" justifyContent="center">
                Upload Image{" "}
              </Box>
              <Hidden>
                <input
                  multiple
                  className="hidden"
                  onChange={async (e) => {
                    const reader: any = new FileReader();
                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        let newImg = [...previewImage];
                        newImg.push(reader.result);
                        setPreviewImage(newImg);
                      }
                    };
                    reader.readAsDataURL(e.target.files[0]);

                    const file = e.target.files[0];
                    let newImgFile = [...images];

                    newImgFile.push(file);

                    setImages(newImgFile);
                    // onChange(file);
                  }}
                  id="image"
                  name="image"
                  accept="image/*"
                  type="file"
                />
              </Hidden>
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
              disabled={!(dirty && isValid) || !reviewPermission}
            >
              Submit
            </Button>
          </form>
        </>
      )}
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
