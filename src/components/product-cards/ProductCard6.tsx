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
    <Card position="relative">
      <Chip
        // bg="white"
        position="absolute"
        color="secondary.main"
        fontWeight="800"
        fontSize="12px"
        top="9.4rem"
        left="0.875rem"
        zIndex={2}
      >
        {title.length >= 20 ? `${title.slice(0, 20)}` : title}
      </Chip>

      <HoverBox height="140px" borderRadius={8}>
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
