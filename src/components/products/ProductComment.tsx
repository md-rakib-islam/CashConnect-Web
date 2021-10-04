import { BASE_URL, User_By_Id } from "@data/constants";
import React, { useEffect, useState } from "react";
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
  comment: string;
  user: number | string;
}

const ProductComment: React.FC<ProductCommentProps> = ({

  rating,
  created_at,
  comment,
  user,
}) => {
  const [userName, setUserName] = useState("")
  const [userImg, setUserImg] = useState("")

  useEffect(() => {
    fetch(`${User_By_Id}${user}`).then(res => res.json()).then(userEes => {
      console.log("userRes", userEes)
      const { first_name, last_name, image } = userEes
      setUserName(`${first_name} ${last_name}`)
      setUserImg(image)
    }).catch(() => { })
  }, [])
  return (
    <Box mb="32px" maxWidth="600px">
      <FlexBox alignItems="center" mb="1rem">
        <Avatar src={`${BASE_URL}${userImg}`} />
        <Box ml="1rem">
          <H5 mb="4px">{userName}</H5>
          <FlexBox alignItems="center">
            <Rating value={rating} color="warn" readonly />
            <H6 mx="10px">{rating}</H6>
            <SemiSpan>{getDateDifference(created_at)}</SemiSpan>
          </FlexBox>
        </Box>
      </FlexBox>

      <Paragraph color="gray.700">{comment}</Paragraph>
    </Box>
  );
};

export default ProductComment;
