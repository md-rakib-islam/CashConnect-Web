import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import NavbarLayout from "@component/layout/NavbarLayout";
import AvailableShops from "@component/products/AvailableShops";
import FrequentlyBought from "@component/products/FrequentlyBought";
import ProductDescription from "@component/products/ProductDescription";
import ProductIntro from "@component/products/ProductIntro";
import ProductReview from "@component/products/ProductReview";
import RelatedProducts from "@component/products/RelatedProducts";
import { H5 } from "@component/Typography";
import { BASE_URL, Product_by_id } from "@data/constants";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProductDetails = () => {
  const router = useRouter();
  const id = router.query.id as string;
  // const { dispatch } = useAppContext();

  const [fullDes, setfullDes] = useState("")
  const [title, settitle] = useState("");
  const [price, setprice] = useState(0);
  const [imgUrl, setimgUrl] = useState(
    "/assets/images/products/loadingProduct.png"
  );
  const [brand, setbrand] = useState(0);

  useEffect(() => {
    if (id) {
      fetch(`${BASE_URL}${Product_by_id}${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("productById", data);
          settitle(data?.name);
          setprice(data?.unit_price);
          setimgUrl(`${BASE_URL}${data?.thumbnail}`);
          setbrand(data?.brand);
          setfullDes(data?.full_desc)

          // dispatch({
          //   type: "CHANGE_PRODUCT_DETAILS",
          //   payload: data,
          // });
        });
    }
  }, [id]);

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
          Review (3)
        </H5>
      </FlexBox>

      <Box mb="50px">
        {selectedOption === "description" && <ProductDescription fullDes={fullDes}/>}
        {selectedOption === "review" && <ProductReview />}
      </Box>

      <FrequentlyBought />

      <AvailableShops />

      <RelatedProducts />
    </div>
  );
};

ProductDetails.layout = NavbarLayout;

export default ProductDetails;
