import Card from '@component/Card';
import { Chip } from '@component/Chip';
import HoverBox from '@component/HoverBox';
import LazyImage from '@component/LazyImage';
import React from 'react';

export interface ProductCard6Props {
  imgUrl: string;
  title: string;
  subtitle: string;
}


const ProductCard6: React.FC<ProductCard6Props> = ({
  title,
  imgUrl,
}) => {
  return (
    <Card position="relative">
      <Chip
        bg="secondary.main"
        position="absolute"
        color="white"
        fontWeight="600"
        fontSize="10px"
        p="4px 10px"
        top="0.875rem"
        left="0.875rem"
        zIndex={2}
      >
        {title}
      </Chip>

      <HoverBox height="120px" borderRadius={8}>
        <LazyImage src={imgUrl} layout="fill" objectFit="cover" loader={() => imgUrl} />
      </HoverBox>
    </Card>
  );
};

export default ProductCard6;
