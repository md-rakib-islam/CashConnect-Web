import LazyImage from "@component/LazyImage";
import { useAppContext } from "@context/app/AppContext";
import {
  BASE_URL,
  Customer_Order_Details,
  loadingImg,
  notFoundImg,
} from "@data/constants";
import axios from "axios";
import Link from "next/link";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { CSSProperties } from "styled-components";
import Box from "../Box";
import Button from "../buttons/Button";
import Card, { CardProps } from "../Card";
import { Chip } from "../Chip";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Modal from "../modal/Modal";
import ProductIntro from "../products/ProductIntro";
import Rating from "../rating/Rating";
import { H3, SemiSpan } from "../Typography";
import { StyledProductCard1 } from "./ProductCardStyle";

export interface ProductCard1Props extends CardProps {
  className?: string;
  style?: CSSProperties;
  imgUrl?: string;
  title?: string;
  price?: number;
  off?: number;
  rating?: number;
  id?: string | number;
  brand?: string | number;
  // className?: string;
  // style?: CSSProperties;
  // imgUrl: string;
  // title: string;
  // price: number;
  // off: number;
  // rating?: number;
  // subcategories?: Array<{
  //   title: string;
  //   url: string;
  // }>;
}

const ProductCard1: React.FC<ProductCard1Props> = ({
  id,
  imgUrl,
  title,
  price,
  brand,
  off,
  rating,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const { dispatch } = useAppContext();
  const [cartProductLists, setCartProductLists] = useState([]);
  const cartProductList = cartProductLists.find((item) => item.id === id);

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const handleCartAmountChange = useCallback(
    () => () => {
      dispatch({
        type: "CHANGE_CART_QUANTITY",
        payload: Math.random(),
      });
    },
    []
  );

  useEffect(() => {
    const order_Id = localStorage.getItem("OrderId");

    axios.get(`${Customer_Order_Details}${order_Id}`).then((res) => {
      setCartProductLists(res.data);
    });
  }, []);

  // const notFoundImg = "/assets/images/products/notFoundImg.png";

  return (
    <StyledProductCard1 {...props}>
      <div className="image-holder">
        {!!off && (
          <Chip
            position="absolute"
            bg="primary.main"
            color="primary.text"
            fontSize="10px"
            fontWeight="600"
            p="5px 10px"
            top="10px"
            left="10px"
          >
            {off}% off
          </Chip>
        )}

        <FlexBox className="extra-icons">
          <Icon
            color="secondary"
            variant="small"
            mb="0.5rem"
            onClick={toggleDialog}
          >
            eye-alt
          </Icon>

          <Icon className="favorite-icon outlined-icon" variant="small">
            heart
          </Icon>
          {/* <Icon className="favorite-icon" color="primary" variant="small">
              heart-filled
            </Icon> */}
        </FlexBox>

        <Link href={`/product/${id}`}>
          <a>
            <LazyImage
              src={imgUrl != `${BASE_URL}${null}` ? imgUrl : notFoundImg}
              width="100%"
              height="auto"
              layout="responsive"
              loader={() =>
                imgUrl != `${BASE_URL}${null}` ? imgUrl : notFoundImg
              }
              alt={title}
            />
          </a>
        </Link>
      </div>
      <div className="details">
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
            <Link href={`/product/${id}`}>
              <a>
                <H3
                  className="title"
                  fontSize="14px"
                  textAlign="left"
                  fontWeight="600"
                  color="text.secondary"
                  mb="10px"
                  title={title}
                >
                  {title}
                </H3>
              </a>
            </Link>

            <Rating value={rating || 0} outof={5} color="warn" readonly />

            <FlexBox alignItems="center" mt="10px">
              <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                ${(price - (price * off) / 100).toFixed(2)}
              </SemiSpan>
              {!!off && (
                <SemiSpan color="text.muted" fontWeight="600">
                  <del>{price?.toFixed(2)}</del>
                </SemiSpan>
              )}
            </FlexBox>
          </Box>

          <FlexBox
            flexDirection="column-reverse"
            alignItems="center"
            justifyContent={
              !!cartProductList?.quantity ? "space-between" : "flex-start"
            }
            width="30px"
          >
            {/* <div className="add-cart"> */}
            <Button
              variant="outlined"
              color="primary"
              padding="3px"
              size="none"
              borderColor="primary.light"
              onClick={handleCartAmountChange()}
            >
              <Icon variant="small">plus</Icon>
            </Button>

            {!!cartProductList?.quantity && (
              <Fragment>
                <SemiSpan color="text.primary" fontWeight="600">
                  {cartProductList?.quantity}
                </SemiSpan>
                <Button
                  variant="outlined"
                  color="primary"
                  padding="3px"
                  size="none"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange()}
                >
                  <Icon variant="small">minus</Icon>
                </Button>
              </Fragment>
            )}
          </FlexBox>
        </FlexBox>
      </div>

      <Modal open={open} onClose={toggleDialog}>
        <Card p="1rem" position="relative">
          <ProductIntro
            imgUrl={[imgUrl]}
            title={title}
            price={price}
            id={id}
            brand={brand}
          />
          <Box
            position="absolute"
            top="0.75rem"
            right="0.75rem"
            cursor="pointer"
          >
            <Icon
              className="close"
              color="primary"
              variant="small"
              onClick={toggleDialog}
            >
              close
            </Icon>
          </Box>
        </Card>
      </Modal>
    </StyledProductCard1>
  );
};

ProductCard1.defaultProps = {
  id: "324321",
  title: "KSUS ROG Strix G15",
  imgUrl: loadingImg,
  off: 50,
  price: 450,
  rating: 0,
  brand: "Unknown",
};

export default ProductCard1;
