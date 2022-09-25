import Currency from "@component/Currency";
import LazyImage from "@component/LazyImage";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import {
  Check_Stock,
  Customer_decrease_Quantity,
  Customer_Increase_Quantity,
  Customer_Order_Create,
  Customer_Order_Item_By_Product_Id,
  Customer_Order_Remove_Item,
  Product_Discount_By_Id,
} from "@data/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
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
import { H3, H4, SemiSpan } from "../Typography";
import { StyledProductCard1 } from "./ProductCardStyle";

export interface ProductCard1Props extends CardProps {
  className?: string;
  style?: CSSProperties;
  imgUrl?: string;
  short_desc?: string;
  title?: string;
  price?: number;
  off?: number;
  rating?: number;
  id?: string | number;
  brand?: string | number;
  reviewCount?: string | number;
  condition?: string;
}

const ProductCard1: React.FC<ProductCard1Props> = ({
  id,
  imgUrl,
  short_desc,
  title,
  price,
  brand,
  off,
  rating,
  reviewCount,
  condition,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const [sellablePrice, setsellablePrice] = useState(Number(price));
  const [orginalPrice, setorginalPrice] = useState(0);
  const [discountedPercent, setdiscountedPercent] = useState(0);

  const router = useRouter();

  const { dispatch, state } = useAppContext();

  const [cartQuantity, setCartQuantity] = useState(0);
  const [itemId, setItemId] = useState(0);
  const [getItemId, setGetItemId] = useState(0);
  const [getChartquantity, setGetChartquantity] = useState(0);
  const [stock, setStock] = useState(true);

  const cartCanged = state.cart.chartQuantity;

  const { user_id, order_Id, authTOKEN } = useUserInf();

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  useEffect(() => {
    axios
      .get(`${Check_Stock}${id}`)
      .then((res) => {
        if (!res.data.is_in_stock) {
          setStock(false);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    axios.get(`${Product_Discount_By_Id}${id}`).then((res) => {
      console.log("descountRes", res);
      if (res.data.discounts?.discounted_price) {
        setsellablePrice(res.data.discounts?.discounted_price);
        setorginalPrice(Number(res.data.discounts?.product.unit_price));
        setdiscountedPercent(res.data.discounts?.discount_percent);
      }
    });
  }, []);

  useEffect(() => {
    if (order_Id) {
      axios
        .get(`${Customer_Order_Item_By_Product_Id}${order_Id}/${id}`)
        .then((item) => {
          setItemId(item?.data?.order_item?.id);
          setCartQuantity(item?.data?.order_item?.quantity);
        })
        .catch(() => setCartQuantity(0));
    }
  }, [order_Id, getItemId, id, getChartquantity]);

  useEffect(() => {
    if (id && order_Id) {
      if (state.cart.prductId == id) {
        axios
          .get(`${Customer_Order_Item_By_Product_Id}${order_Id}/${id}`)
          .then((item) => {
            setItemId(item?.data?.order_item?.id);
            setCartQuantity(item?.data?.order_item?.quantity);
          })
          .catch(() => {
            setCartQuantity(0);
          });
      }
    }
  }, [order_Id, cartCanged]);

  const handleCartAmountChange = (amount, action) => {
    const dateObj: any = new Date();
    const currentDate =
      dateObj.getFullYear() +
      "-" +
      (dateObj.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      dateObj.getDate().toString().padStart(2, 0);

    const orderData = {
      product: id,
      quantity: 1,
      price: sellablePrice,
      order_date: currentDate,
      branch: 4,
      user: user_id,
    };

    //add to cart
    if (action == "increase" && amount == 1) {
      if (user_id) {
        console.log("orderData", orderData);
        axios
          .post(`${Customer_Order_Create}`, orderData, authTOKEN)
          .then((res) => {
            console.log("orderRes", res);

            localStorage.setItem("OrderId", res.data.order_details.id);
            setGetItemId(Math.random());
            dispatch({
              type: "CHANGE_CART_QUANTITY",
              payload: { chartQuantity: Math.random() },
            });
          })
          .catch((err) => {
            console.log("error", err);
          });
      } else {
        localStorage.setItem("backAfterLogin", `/product/${id}`);
        router
          .push({
            pathname: "/login",
          })
          .then(() => router.reload());
      }
    }

    //increase
    else if (action == "increase") {
      axios
        .put(
          `${Customer_Increase_Quantity}${order_Id}/${itemId}`,
          orderData,
          authTOKEN
        )
        .then((res) => {
          console.log("increaseRes", res);
          setGetChartquantity(Math.random());
        })
        .catch((err) => {
          console.log("error", err);
        });
    }

    //romove
    else if (amount == 0 && action == "decrease") {
      axios
        .delete(`${Customer_Order_Remove_Item}${order_Id}/${itemId}`, authTOKEN)
        .then((res) => {
          console.log("removeRes", res);
          setGetChartquantity(Math.random());
          dispatch({
            type: "CHANGE_CART_QUANTITY",
            payload: { chartQuantity: Math.random() },
          });
        })
        .catch((err) => {
          console.log("error", err);
        });
    }

    //decrease
    else if (action == "decrease") {
      axios
        .put(
          `${Customer_decrease_Quantity}${order_Id}/${itemId}`,
          orderData,
          authTOKEN
        )
        .then((res) => {
          console.log("decreaseRes", res);
          setGetChartquantity(Math.random());
        });
    }
  };

  return (
    <StyledProductCard1 {...props}>
      <div className="image-holder">
        {!!discountedPercent && (
          <Chip
            position="absolute"
            bg="primary.main"
            color="primary.text"
            fontSize="10px"
            fontWeight="600"
            p="5px 10px"
            top="10px"
            left="10px"
            zIndex={2}
          >
            {discountedPercent}% off
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
                  mb="5px"
                  title={title}
                >
                  {title}
                </H3>
              </a>
            </Link>

            <Rating value={rating || 0} outof={5} color="warn" readonly />

            {stock || (
              <SemiSpan fontWeight="bold" color="primary.main" mt="2px">
                Out Of Stock
              </SemiSpan>
            )}

            <FlexBox alignItems="center" mt={stock ? "10px" : "0px"}>
              <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                <Currency>{sellablePrice.toFixed(2)}</Currency>
              </SemiSpan>
              {!!orginalPrice && (
                <SemiSpan color="text.muted" fontWeight="600">
                  <del>
                    <Currency>{orginalPrice?.toFixed(2)}</Currency>
                  </del>
                </SemiSpan>
              )}
            </FlexBox>
          </Box>

          <FlexBox
            flexDirection="column-reverse"
            alignItems="center"
            justifyContent={!!cartQuantity ? "space-between" : "flex-start"}
            width="30px"
          >
            <Button
              variant="outlined"
              color="primary"
              padding="3px"
              size="none"
              borderColor="primary.light"
              disabled={!stock}
              onClick={() =>
                handleCartAmountChange(cartQuantity + 1, "increase")
              }
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
                  onClick={() =>
                    handleCartAmountChange(cartQuantity - 1, "decrease")
                  }
                >
                  <Icon variant="small">minus</Icon>
                </Button>
              </Fragment>
            ) : (
              ""
            )}
          </FlexBox>
        </FlexBox>

        <H4
          display="flex"
          className="title"
          fontSize="13px"
          fontWeight="600"
          color={
            condition === "new" || condition === "New" || condition === "NEW"
              ? "primary.main"
              : "secondary.main"
          }
        >
          {condition || ""}
        </H4>
      </div>

      <Modal open={open} onClose={toggleDialog}>
        <Card p="1rem" position="relative">
          <ProductIntro
            imgUrl={[imgUrl]}
            short_desc={short_desc}
            title={title}
            price={sellablePrice}
            orginalrice={orginalPrice}
            id={id}
            brand={brand}
            rating={rating}
            reviewCount={reviewCount}
            condition={condition}
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

// ProductCard1.defaultProps = {
//   id: "324321",
//   title: "KSUS ROG Strix G15",
//   imgUrl: "",
//   off: 0,
//   price: 450,
//   rating: 0,
//   brand: "Unknown",
// };

export default ProductCard1;
