import Box from "@component/Box";
import { Chip } from "@component/Chip";
import Currency from "@component/Currency";
import HoverBox from "@component/HoverBox";
import LazyImage from "@component/LazyImage";
import { H3, Small } from "@component/Typography";
import { Product_Discount_By_Id } from "@data/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CSSProperties } from "styled-components";
import FlexBox from "../FlexBox";
import Rating from "../rating/Rating";

export interface ProductCard4Props {
  className?: string;
  style?: CSSProperties;
  imgUrl: string;
  rating: number;
  id: number;
  title: string;
  price: number | string;
  reviewCount: number;
  condition: string;
}

const ProductCard4: React.FC<ProductCard4Props> = ({
  id,
  imgUrl,
  rating,
  title,
  price,
  reviewCount,
  condition,
}) => {
  const [discountedPercent, setdiscountedPercent] = useState(0);

  useEffect(() => {
    axios.get(`${Product_Discount_By_Id}${id}`).then((res) => {
      console.log("descountRes", res);
      if (res.data.discounts?.discounted_price) {
        setdiscountedPercent(res.data.discounts?.discount_percent);
      }
    });
  }, []);
  return (
    <Box>
      <HoverBox mb="1rem" mx="auto" borderRadius={8}>
        {!!discountedPercent && (
          <Chip
            position="absolute"
            bg="primary.main"
            color="primary.text"
            fontSize="10px"
            fontWeight="600"
            p="5px 10px"
            top="0"
            left="0"
            zIndex={2}
          >
            {discountedPercent}% off
          </Chip>
        )}
        <LazyImage
          src={imgUrl}
          loader={() => imgUrl}
          width="100%"
          height="auto"
          layout="responsive"
          alt={title}
          mx="auto"
        />
      </HoverBox>

      <FlexBox justifyContent="center" alignItems="center" mb="0.25rem">
        <Rating value={rating} color="warn" />
        <Small fontWeight="600" pl="0.25rem">
          ({reviewCount})
        </Small>
      </FlexBox>

      <H3
        className="title"
        fontWeight="600"
        fontSize="14px"
        mb="0.25rem"
        title={title}
        ellipsis
      >
        {title}
      </H3>
      <H3
        fontWeight="600"
        fontSize="14px"
        textAlign="center"
        color="primary.main"
      >
        <Currency>{Number(price).toFixed(2)}</Currency>
      </H3>
      <H3
        display="flex"
        className="title"
        fontSize="13px"
        fontWeight="600"
        color={
          condition === "new" || condition === "New" || condition === "NEW"
            ? "primary.main"
            : "secondary.main"
        }
      >
        {condition || ""}
      </H3>
    </Box>
  );
};

export default ProductCard4;
