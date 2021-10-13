import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductDescription from "@component/products/ProductDescription";
import ProductIntro from "@component/products/ProductIntro";
import ProductReview from "@component/products/ProductReview";
import RelatedProducts from "@component/products/RelatedProducts";
import { H5 } from "@component/Typography";
import { BASE_URL, product_by_categoryId, Product_by_id } from "@data/constants";
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useState } from "react";

const ProductDetails = ({ id, title, price, imgUrl, brand, rating, initialReviewsQuantity, fullDes, relatedProduct }) => {

  const [reviewsQuantity, setreviewsQuantity] = useState(initialReviewsQuantity)


  const setNumOfReviews = (quantity = 0) => {
    setreviewsQuantity(quantity)
  }

  const [selectedOption, setSelectedOption] = useState("description");

  const handleOptionClick = (opt) => () => {
    setSelectedOption(opt);
  };


  return (
    <div>
      <ProductIntro
        title={title}
        price={price}
        imgUrl={[imgUrl]}
        id={id}
        brand={brand}
        rating={rating}
        reviewCount={initialReviewsQuantity}
      />

      <FlexBox
        borderBottom="1px solid"
        borderColor="gray.400"
        mt="80px"
        mb="26px"
      >
        <H5
          className="cursor-pointer"
          mr="25px"
          p="4px 10px"
          color={
            selectedOption === "description" ? "primary.main" : "text.muted"
          }
          borderBottom={selectedOption === "description" && "2px solid"}
          borderColor="primary.main"
          onClick={handleOptionClick("description")}
        >
          Description
        </H5>
        <H5
          className="cursor-pointer"
          p="4px 10px"
          color={selectedOption === "review" ? "primary.main" : "text.muted"}
          onClick={handleOptionClick("review")}
          borderBottom={selectedOption === "review" && "2px solid"}
          borderColor="primary.main"
        >
          Review {initialReviewsQuantity}
        </H5>
      </FlexBox>

      <Box mb="50px">
        {selectedOption === "description" && <ProductDescription fullDes={fullDes} />}
        {selectedOption === "review" && <ProductReview productId={id} setReviews={setNumOfReviews} />}
      </Box>

      {/* <FrequentlyBought />

      <AvailableShops /> */}

      <RelatedProducts relatedProduct={relatedProduct} />
    </div>
  );
};

ProductDetails.layout = NavbarLayout;

export default ProductDetails;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  try {
    const res = await axios.get(`${BASE_URL}${Product_by_id}${params.id}`)
    var data: any = await res.data
  }
  catch (err) {
    var data: any = {}
  }

  try {
    const relatedProductRes = await fetch(`${BASE_URL}${product_by_categoryId}${data.category}`)
    var relatedProductjson = await relatedProductRes.json()
    var relatedProduct: any[] = await relatedProductjson.products
  }
  catch (err) {
    var relatedProduct = []
  }

  console.log("relatedProduct", relatedProduct)
  return {
    props: {
      id: params.id,
      title: data.name,
      price: data?.unit_price,
      imgUrl: `${BASE_URL}${data?.thumbnail}`,
      brand: data?.brand,
      fullDes: data?.full_desc,
      initialReviewsQuantity: data?.num_reviews,
      rating: data?.rating,
      relatedProduct
    },
  }
}
