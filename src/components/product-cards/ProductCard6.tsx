import Card from "@component/Card";
import { Chip } from "@component/Chip";
import HoverBox from "@component/HoverBox";
import LazyImage from "@component/LazyImage";
import React from "react";

export interface ProductCard6Props {
  imgUrl: string;
  title: string;
  subtitle: string;
}

const ProductCard6: React.FC<ProductCard6Props> = ({ title, imgUrl }) => {
  return (
    <Card
      width="100px"
      backgroundColor="none"
      position="relative"
      style={{ boxShadow: "none", height: "100px" }}
    >
      <Chip
        // bg="white"
        textAlign="center"
        position="absolute"
        style={{ width: "100%" }}
        color="secondary.main"
        fontWeight="800"
        fontSize="14px"
        top="5.6rem"
        zIndex={2}
      >
        {title.length > 23 ? `${title.slice(0, 23)}..` : title}
      </Chip>

      <HoverBox
        style={{ marginLeft: "auto", marginRight: "auto" }}
        height="80px"
        width="80px"
        borderRadius={8}
      >
        <LazyImage
          src={imgUrl ? imgUrl : "/assets/images/logos/shopping-bag.svg"}
          layout="fill"
          objectFit="cover"
          loader={() => imgUrl}
        />
      </HoverBox>
    </Card>
  );
};

export default ProductCard6;
