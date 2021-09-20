import LazyImage from "@component/LazyImage";
import { useAppContext } from "@context/app/AppContext";
import {
  BASE_URL,
  Customer_decrease_Quantity,
  Customer_Increase_Quantity,
  Customer_Order_Create,
  Customer_Order_Item_By_Product_Id, Customer_Order_Remove_Item, loadingImg,
  notFoundImg
} from "@data/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useCallback, useLayoutEffect, useState } from "react";
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

  const router = useRouter();

  const { dispatch } = useAppContext();

  const [cartQuantity, setCartQuantity] = useState(0);
  const [itemId, setItemId] = useState(0);
  const [getItemId, setGetItemId] = useState(0);

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const handleCartAmountChange = (amount, action) => {
    var UserId: any = localStorage.getItem("UserId");

    const dateObj: any = new Date();
    const currentDate =
      dateObj.getFullYear() +
      "-" +
      (dateObj.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      dateObj.getDate().toString().padStart(2, 0);

    const orderData = {
      product_id: id,
      quantity: 1,
      price: price,
      order_date: currentDate,
      branch_id: 1,
      user_id: UserId,
    };

    const order_Id = localStorage.getItem("OrderId");

    //add to cart
    if ((action == "increase") && (amount == 1)) {
      if (UserId) {
        console.log("orderData", orderData);
        axios.post(`${Customer_Order_Create}`, orderData).then((res) => {
          console.log("orderRes", res);

          localStorage.setItem("OrderId", res.data.order_details.id);
          setGetItemId(Math.random());
          dispatch({
            type: "CHANGE_CART_QUANTITY",
            payload: Math.random(),
          });
        });
      } else {
        localStorage.setItem("backAfterLogin", `product/${id}`);
        router.push({
          pathname: "/login",
        });
      }
    }

    //increase
    else if (action == "increase") {
      axios
        .put(`${Customer_Increase_Quantity}${order_Id}/${itemId}`, orderData)
        .then((res) => {
          console.log("increaseRes", res);
          // setGetItemId(Math.random());
        });
    }

    //romove
    else if (amount == 0 && action == "decrease") {
      axios
        .delete(`${Customer_Order_Remove_Item}${order_Id}/${itemId}`)
        .then((res) => {
          console.log("removeRes", res);
          setCartQuantity(0);
          dispatch({
            type: "CHANGE_CART_QUANTITY",
            payload: Math.random(),
          });
        });
    }

    //decrease
    else if (action == "decrease") {
      axios
        .put(`${Customer_decrease_Quantity}${order_Id}/${itemId}`, orderData)
        .then((res) => {
          console.log("decreaseRes", res);
          // setGetItemId(Math.random());
        });
    }
  };


  useLayoutEffect(() => {
    const order_Id = localStorage.getItem("OrderId");

    if (id) {
      axios
        .get(`${Customer_Order_Item_By_Product_Id}${order_Id}/${id}`)
        .then((item) => {
          console.log("item", item?.data?.order_item);
          setItemId(item?.data?.order_item?.id);
          setCartQuantity(item?.data?.order_item?.quantity);
        })
        .catch(() => setCartQuantity(0));
    }
  }, [getItemId, id]);

  console.log("produtId", id)

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
              !!cartQuantity ? "space-between" : "flex-start"
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
              onClick={() => handleCartAmountChange(cartQuantity + 1, "increase")}
            >
              <Icon variant="small">plus</Icon>
            </Button>

            {cartQuantity ? (
              <Fragment>
                <SemiSpan color="text.primary" fontWeight="600">
                  {cartQuantity}
                </SemiSpan>
                <Button
                  variant="outlined"
                  color="primary"
                  padding="3px"
                  size="none"
                  borderColor="primary.light"
                  onClick={() => handleCartAmountChange(cartQuantity - 1, "decrease")}
                >
                  <Icon variant="small">minus</Icon>
                </Button>
              </Fragment>
            ) : ""}
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
