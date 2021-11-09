import Currency from "@component/Currency";
import HoverBox from "@component/HoverBox";
import LazyImage from "@component/LazyImage";
import { H4 } from "@component/Typography";
import Link from "next/link";
import React from "react";

export interface ProductCard2Props {
  imgUrl: string;
  title: string;
  price: number;
  productUrl: string;
  condition: string;
}

const ProductCard2: React.FC<ProductCard2Props> = ({
  imgUrl,
  title,
  price,
  productUrl,
  condition
}) => {
  return (
    <Link href={productUrl}>
      <a>
        <HoverBox borderRadius={8} mb="0.5rem">
          <LazyImage
            src={imgUrl}
            loader={() =>
              imgUrl
            }
            width="100%"
            height="auto"
            layout="responsive"
            alt={title}
          />
        </HoverBox>
        <H4 fontWeight="600" fontSize="14px" mb="0.25rem">
          {title}
        </H4>
        <H4 fontWeight="600" fontSize="14px" color="primary.main">
          <Currency>{Math.ceil(price).toLocaleString()}</Currency>
        </H4>
        <H4
          display="flex"
          className="title"
          fontSize="15px"
          fontWeight="600"
          color={(condition === "new" || condition === "New") ? "primary.main" : "secondary.main"}
        >{condition || ""}
        </H4>
      </a>
    </Link>
  );
};

export default ProductCard2;
