import Box from "@component/Box";
import { Chip } from "@component/Chip";
import Currency from "@component/Currency";
import HoverBox from "@component/HoverBox";
import LazyImage from "@component/LazyImage";
import { H3, SemiSpan, Small } from "@component/Typography";
import { Check_Stock, Product_Discount_By_Id } from "@data/constants";
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
  const [sellablePrice, setsellablePrice] = useState(Number(price));
  const [orginalPrice, setorginalPrice] = useState(0);
  const [discountedPercent, setdiscountedPercent] = useState(0);
  const [stock, setStock] = useState(true);

  useEffect(() => {
    axios
      .get(`${Product_Discount_By_Id}${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("jwt_access_token"),
        },
      })
      .then((res) => {
        console.log("descountRes", res);
        if (res.data.discounts?.discounted_price) {
          setsellablePrice(res.data.discounts?.discounted_price);
          setorginalPrice(Number(res.data.discounts?.product.unit_price));

          setdiscountedPercent(res.data.discounts?.discount_percent);
        }
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${Check_Stock}${id}`)
      .then((res) => {
        if (!res.data.is_in_stock) {
          setStock(false);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [id]);
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
          src={imgUrl ? imgUrl : "/assets/images/logos/shopping-bag.svg"}
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
      {stock || (
        <SemiSpan fontWeight="bold" color="primary.main" mt="2px">
          Out Of Stock
        </SemiSpan>
      )}
      {!!orginalPrice && (
        <SemiSpan color="text.muted" fontWeight="600">
          <del>
            <Currency>{orginalPrice?.toFixed(2)}</Currency>
          </del>
        </SemiSpan>
      )}
      <H3
        fontWeight="600"
        fontSize="14px"
        textAlign="center"
        color="primary.main"
      >
        <Currency>{sellablePrice.toFixed(2)}</Currency>
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
