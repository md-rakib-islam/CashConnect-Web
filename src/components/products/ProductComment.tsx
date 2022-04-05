import { BASE_URL } from "@data/constants";
import React from "react";
import { getDateDifference } from "../../utils/utils";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import FlexBox from "../FlexBox";
import Rating from "../rating/Rating";
import { H5, H6, Paragraph, SemiSpan } from "../Typography";

export interface ProductCommentProps {
  name;
  imgUrl: string;
  rating: number;
  created_at: string;
  review: string;
  user: {
    first_name: string;
    last_name: string;
    image: string;
  };
}

const ProductComment: React.FC<ProductCommentProps> = ({
  rating,
  created_at,
  review,
  user,
}) => {

  return (
    <Box mb="32px" maxWidth="600px">
      <FlexBox alignItems="center" mb="1rem">
        <Avatar src={user?.image ? `${BASE_URL}${user.image}` : null} />
        <Box ml="1rem">
          <H5 mb="4px">{`${user.first_name} ${user.last_name}`}</H5>
          <FlexBox alignItems="center">
            <Rating value={rating} color="warn" readonly />
            <H6 mx="10px">{rating}</H6>
            <SemiSpan>{getDateDifference(created_at)}</SemiSpan>
          </FlexBox>
        </Box>
      </FlexBox>

      <Paragraph color="gray.700">{review}</Paragraph>
    </Box>
  );
};

export default ProductComment;
