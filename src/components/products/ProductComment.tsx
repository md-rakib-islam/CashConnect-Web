import { BASE_URL } from "@data/constants";
import React, { useState } from "react";
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
  review_rating_images: [
    {
      id: number;
      image: string;
    }
  ];
}

const ProductComment: React.FC<ProductCommentProps> = ({
  rating,
  created_at,
  review,
  review_rating_images,
  user,
}) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState();

  const [previewImage, setPreviewImage] = useState([]);

  const handleThunmbnailClick = (ind) => () => {
    console.log("clickedImage", ind);
    setSelectedThumbnail(ind);
    let mainImg = [];
    review_rating_images;

    review_rating_images?.map((data, index) => {
      if (index === ind) {
        mainImg.push(`${BASE_URL}${data?.image}`);
      }
    });

    console.log("reviewMultiimg", mainImg);
    setPreviewImage(mainImg);
  };
  console.log("review_rating_images", review_rating_images);
  return (
    <Box mb="32px" maxWidth="600px">
      <FlexBox alignItems="center" mb="1rem">
        <Avatar src={user?.image ? `${BASE_URL}${user?.image}` : null} />
        <Box ml="1rem">
          <H5 mb="4px">{`${user?.first_name} ${user?.last_name}`}</H5>
          <FlexBox alignItems="center">
            <Rating value={rating} color="warn" readonly />
            <H6 mx="10px">{rating}</H6>
            <SemiSpan>{getDateDifference(created_at)}</SemiSpan>
          </FlexBox>
        </Box>
      </FlexBox>

      <Paragraph color="gray.700">{review}</Paragraph>
      <br />
      {review_rating_images && (
        <FlexBox
          style={{ justifyContent: "flex-start", gap: "10px" }}
          maxWidth={260}
        >
          {review_rating_images.map((url, ind) => (
            <Box
              size={100}
              minWidth={100}
              bg="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              border="1px solid"
              key={url.id}
              // ml={ind === 0 && "auto"}
              // mr={ind === multipleUmg.length - 1 ? "auto" : "10px"}
              borderColor={
                selectedThumbnail === ind ? "primary.main" : "gray.400"
              }
              onClick={handleThunmbnailClick(ind)}
            >
              <Avatar src={`${BASE_URL}${url?.image}`} radius={1} size={94} />
            </Box>
          ))}
        </FlexBox>
      )}
      {previewImage && (
        <Box
          width="100%"
          mt="25px"
          display="flex"
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          {previewImage?.map((src) => {
            return (
              <>
                <Box display="flex" width="fit-content" position="relative">
                  <Avatar
                    float="left"
                    radius={1}
                    // ml="15px"
                    src={src}
                    size={500}
                    // loader={() => previewImage}
                  />
                </Box>
              </>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default ProductComment;
