import Currency from "@component/Currency";
import LazyImage from "@component/LazyImage";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import {
  Customer_decrease_Quantity,
  Customer_Increase_Quantity,
  Customer_Order_Create,
  Customer_Order_Item_By_Product_Id, Customer_Order_Remove_Item
} from "@data/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useCallback, useEffect, useLayoutEffect, useState } from "react";
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
  reviewCount?: string | number;
}

const ProductCard1: React.FC<ProductCard1Props> = ({
  id,
  imgUrl,
  title,
  price,
  brand,
  off,
  rating,
  reviewCount,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { dispatch } = useAppContext();

  const [cartQuantity, setCartQuantity] = useState(0);
  const [itemId, setItemId] = useState(0);
  const [getItemId, setGetItemId] = useState(0);
  const [getChartquantity, setGetChartquantity] = useState(0)
  const [stock, setStock] = useState(true)

  const { state } = useAppContext();
  const cartCanged = state.cart.chartQuantity;

  useEffect(() => {
    setTimeout(() => {
      setStock(false)
    }, 5000);
  }, [])


  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  useLayoutEffect(() => {
    const { order_Id } = useUserInf()

    if (id) {
      if (id) {
        axios
          .get(`${Customer_Order_Item_By_Product_Id}${order_Id}/${id}`)
          .then((item) => {
            setItemId(item?.data?.order_item?.id);
            setCartQuantity(item?.data?.order_item?.quantity);
          })
          .catch(() => setCartQuantity(0));
      }
    }
  }, [getItemId, id, getChartquantity]);

  useEffect(() => {
    if (id) {
      if (state.cart.prductId == id) {
        const { order_Id } = useUserInf()
        axios
          .get(`${Customer_Order_Item_By_Product_Id}${order_Id}/${id}`)
          .then((item) => {
            setItemId(item?.data?.order_item?.id);
            setCartQuantity(item?.data?.order_item?.quantity);
          })
          .catch(() => { setCartQuantity(0) });
      }
    }
  }, [cartCanged])

  const handleCartAmountChange = (amount, action) => {
    const { user_id, order_Id } = useUserInf()

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
      user_id: user_id,
    };

    //add to cart
    if ((action == "increase") && (amount == 1)) {
      if (user_id) {
        console.log("orderData", orderData);
        axios.post(`${Customer_Order_Create}`, orderData).then((res) => {
          console.log("orderRes", res);

          localStorage.setItem("OrderId", res.data.order_details.id);
          setGetItemId(Math.random());
          dispatch({
            type: "CHANGE_CART_QUANTITY",
            payload: { chartQuantity: Math.random() },
          });
        }).catch(() => { });

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
          setGetChartquantity(Math.random())
        }).catch(() => { });
    }

    //romove
    else if (amount == 0 && action == "decrease") {
      axios
        .delete(`${Customer_Order_Remove_Item}${order_Id}/${itemId}`)
        .then((res) => {
          console.log("removeRes", res);
          setGetChartquantity(Math.random())
          dispatch({
            type: "CHANGE_CART_QUANTITY",
            payload: { chartQuantity: Math.random() },
          });
        }).catch(() => { });
    }

    //decrease
    else if (action == "decrease") {
      axios
        .put(`${Customer_decrease_Quantity}${order_Id}/${itemId}`, orderData)
        .then((res) => {
          console.log("decreaseRes", res);
          setGetChartquantity(Math.random())
        });
    }
  };


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
        </FlexBox>

        <Link href={`/product/${id}`}>
          <a>
            <LazyImage
              src={imgUrl}
              width="100%"
              height="auto"
              layout="responsive"
              loader={() => imgUrl}
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

            {stock || (<SemiSpan fontWeight="bold" color="primary.main" mt="2px">Out Of Stock</SemiSpan>)}

            <FlexBox alignItems="center" mt={stock ? "10px" : "0px"}>
              <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                <Currency>{(price - (price * off) / 100).toFixed(2)}</Currency>
              </SemiSpan>
              {!!off && (
                <SemiSpan color="text.muted" fontWeight="600">
                  <del><Currency>{price?.toFixed(2)}</Currency></del>
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
            <Button
              variant="outlined"
              color="primary"
              padding="3px"
              size="none"
              borderColor="primary.light"
              disabled={!stock}
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
                  // disabled={!stock}
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
            rating={rating}
            reviewCount={reviewCount}
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
  imgUrl: "",
  off: 0,
  price: 450,
  rating: 0,
  brand: "Unknown",
};

export default ProductCard1;
