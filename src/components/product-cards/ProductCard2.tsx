import { Chip } from "@component/Chip";
import Currency from "@component/Currency";
import HoverBox from "@component/HoverBox";
import LazyImage from "@component/LazyImage";
import { H3, H4, SemiSpan } from "@component/Typography";
import { Check_Stock, Product_Discount_By_Id } from "@data/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export interface ProductCard2Props {
  imgUrl: string;
  title: string;
  price: number;
  productUrl: string;
  condition: string;
  id: number;
}

const ProductCard2: React.FC<ProductCard2Props> = ({
  imgUrl,
  title,
  price,
  productUrl,
  condition,
  id,
}) => {
  const [sellablePrice, setsellablePrice] = useState(Number(price));
  const [orginalPrice, setorginalPrice] = useState(0);
  const [discountedPercent, setdiscountedPercent] = useState(0);
  const [stock, setStock] = useState(true);

  useEffect(() => {
    axios.get(`${Product_Discount_By_Id}${id}`).then((res) => {
      console.log("descountRes", res);
      if (res.data.discounts?.discounted_price) {
        setsellablePrice(res.data.discounts?.discounted_price);

        setorginalPrice(Number(res.data.discounts?.product.unit_price));
        setdiscountedPercent(res.data.discounts?.discount_percent);
      }
    });
  }, []);

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
  }, []);
  return (
    <>
      <Link href={productUrl}>
        <a>
          <HoverBox borderRadius={8} mb="0.5rem">
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
            />
          </HoverBox>
          <H3
            className="title"
            fontSize="14px"
            textAlign="left"
            fontWeight="600"
            color="text.secondary"
            mb="5px"
            title={title}
          >
            {title.length >= 20 ? `${title.slice(0, 20)}...` : title}
          </H3>
          {stock || (
            <SemiSpan fontWeight="bold" color="primary.main" mt="2px">
              Out Of Stock
            </SemiSpan>
          )}
          <div style={{ display: "flex" }}>
            {!!orginalPrice && (
              <H4
                fontWeight="600"
                fontSize="14px"
                color="text.muted"
                style={{ marginRight: "5px" }}
              >
                <del>
                  <Currency>{orginalPrice?.toFixed(2)}</Currency>
                </del>
              </H4>
            )}
            <H4 fontWeight="600" fontSize="14px" color="primary.main">
              <Currency>{sellablePrice.toFixed(2)}</Currency>
            </H4>
          </div>
          {/* <Currency>{Math.ceil(price).toLocaleString()}</Currency> */}
          <H4
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
          </H4>
        </a>
      </Link>
    </>
  );
};

export default ProductCard2;
