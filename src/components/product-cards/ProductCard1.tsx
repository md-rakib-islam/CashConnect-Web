import Currency from "@component/Currency";
import LazyImage from "@component/LazyImage";
import ProductIntroEye from "@component/products/ProductIntroEye";
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
import Rating from "../rating/Rating";
import { H3, H4, SemiSpan } from "../Typography";
import { StyledProductCard1 } from "./ProductCardStyle";

export interface ProductCard1Props extends CardProps {
  className?: string;
  style?: CSSProperties;
  imgUrl?: string;
  short_desc?: string;
  title?: string;
  flash?: string;
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
  flash,
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
  // const [loading, setLoading] = useState(false);
  const [stockQuantity, setStockQuantity] = useState(0);

  const cartCanged = state.cart.chartQuantity;

  const { user_id, order_Id, authTOKEN } = useUserInf();

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  console.log("product spacific ID", id);

  useEffect(() => {
    axios
      .get(`${Check_Stock}${id}`)

      .then((res) => {
        console.log("Morsalin", res.data);
        setStockQuantity(res.data.in_stock);

        setStock(res.data.is_in_stock);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [cartCanged, id]);

  useEffect(() => {
    axios
      .get(`${Product_Discount_By_Id}${id}`)
      .then((res) => {
        if (res.data.discounts?.discounted_price) {
          setsellablePrice(res.data.discounts?.discounted_price);
          setorginalPrice(Number(res.data.discounts?.product.unit_price));
          setdiscountedPercent(res.data.discounts?.discount_percent);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  useEffect(() => {
    if (order_Id) {
      axios
        .get(`${Customer_Order_Item_By_Product_Id}${order_Id}/${id}`, authTOKEN)
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
          .get(
            `${Customer_Order_Item_By_Product_Id}${order_Id}/${id}`,
            authTOKEN
          )
          .then((item) => {
            setItemId(item?.data?.order_item?.id);
            setCartQuantity(item?.data?.order_item?.quantity);
          })
          .catch(() => {
            setCartQuantity(0);
          });
      }
    }
  }, [order_Id, cartCanged, id]);

  console.log("checkFlash", flash);

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
      branch: 1,
      user: user_id,
    };

    //add to cart
    if (action == "increase" && amount == 1) {
      // setLoading(true);
      dispatch({
        type: "CHANGE_ALERT",
        payload: {
          alertLoading: true,
        },
      });

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
            // setLoading(false);
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alertLoading: false,
              },
            });
          })
          .catch((err) => {
            // setLoading(false);
            dispatch({
              type: "CHANGE_ALERT",
              payload: {
                alertLoading: false,
              },
            });

            console.log("error", err);
          });
      } else {
        localStorage.setItem("backAfterLogin", `/product/${id}`);
        router.push({
          pathname: "/login",
        });
        // .then(() => router.reload());
      }
    }

    //increase
    else if (action == "increase") {
      // setLoading(true);
      dispatch({
        type: "CHANGE_ALERT",
        payload: {
          alertLoading: true,
        },
      });

      axios
        .put(
          `${Customer_Increase_Quantity}${order_Id}/${itemId}`,
          orderData,
          authTOKEN
        )
        .then((res) => {
          console.log("increaseRes", res);
          setGetChartquantity(Math.random());
          dispatch({
            type: "CHANGE_CART_QUANTITY",
            payload: {
              chartQuantity: Math.random(),
              prductId: id,
            },
          });
          // setLoading(false);
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertLoading: false,
            },
          });
        })
        .catch((err) => {
          // setLoading(false);
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertLoading: false,
            },
          });

          console.log("error", err);
        });
    }

    //romove
    else if (amount == 0 && action == "decrease") {
      // setLoading(true);
      dispatch({
        type: "CHANGE_ALERT",
        payload: {
          alertLoading: true,
        },
      });

      axios
        .delete(`${Customer_Order_Remove_Item}${order_Id}/${itemId}`, authTOKEN)
        .then((res) => {
          console.log("removeRes", res);
          setGetChartquantity(Math.random());
          // setLoading(false);
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertLoading: false,
            },
          });

          dispatch({
            type: "CHANGE_CART_QUANTITY",
            payload: { chartQuantity: Math.random() },
          });
        })
        .catch((err) => {
          // setLoading(false);
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertLoading: false,
            },
          });

          console.log("error", err);
        });
    }

    //decrease
    else if (action == "decrease") {
      // setLoading(true);
      dispatch({
        type: "CHANGE_ALERT",
        payload: {
          alertLoading: true,
        },
      });

      axios
        .put(
          `${Customer_decrease_Quantity}${order_Id}/${itemId}`,
          orderData,
          authTOKEN
        )
        .then((res) => {
          // setLoading(false);
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertLoading: false,
            },
          });

          console.log("decreaseRes", res);
          setGetChartquantity(Math.random());
          dispatch({
            type: "CHANGE_CART_QUANTITY",
            payload: {
              chartQuantity: Math.random(),
              prductId: id,
            },
          });
        })
        .catch((err) => {
          // setLoading(false);
          dispatch({
            type: "CHANGE_ALERT",
            payload: {
              alertLoading: false,
            },
          });

          console.log("error", err);
        });
    }
  };

  return (
    <StyledProductCard1 {...props}>
      {/* {loading && (
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            top: "0px",
            left: "0px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: " rgb(0 0 0 / 50%)",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <img
            style={{
              height: "100px",
              width: "100px",
              marginTop: "100pz",
            }}
            src="/assets/images/gif/loading.gif"
          />
        </div>
      )} */}
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

          {/* <Icon className="favorite-icon outlined-icon" variant="small">
            heart
          </Icon> */}
        </FlexBox>

        <Link href={`/product/${id}`}>
          <a>
            <LazyImage
              src={imgUrl ? imgUrl : "/assets/images/logos/shopping-bag.svg"}
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
                {title.length >= 35 ? (
                  <H3
                    className="title"
                    width="160px"
                    fontSize="14px"
                    textAlign="left"
                    fontWeight="600"
                    color="black"
                    mb="5px"
                    title={title}
                  >
                    {title.length >= 33 ? `${title.slice(0, 33)} ...` : title}
                    {/* {title} */}
                  </H3>
                ) : (
                  <>
                    <H3
                      className="title"
                      fontSize="14px"
                      width="160px"
                      textAlign="left"
                      fontWeight="600"
                      color="black"
                      mb="5px"
                      title={title}
                    >
                      {title}
                    </H3>
                    <H3
                      style={{
                        visibility: "hidden",
                        display: title.length >= 20 ? "none" : "block",
                      }}
                      className="title"
                      fontSize="14px"
                      width="160px"
                      textAlign="left"
                      fontWeight="600"
                      color="black"
                      title={title}
                    >
                      {title}
                    </H3>
                  </>
                )}
              </a>
            </Link>

            <Rating value={rating || 0} outof={5} color="warn" readonly />

            {!stock ? (
              <SemiSpan fontWeight="bold" color="primary.main" mt="2px">
                Out of Stock
              </SemiSpan>
            ) : (
              <SemiSpan
                fontWeight="bold"
                style={{
                  color: "white",
                  visibility: "hidden",
                }}
                mt="2px"
              >
                Available
              </SemiSpan>
            )}

            {/* <SemiSpan
              style={{
                visibility: "hidden",
              }}
              color="text.muted"
              fontWeight="600"
            >
              <del>
                <Currency>{orginalPrice?.toFixed(2)}</Currency>
              </del>
            </SemiSpan> */}
            <FlexBox>
              <SemiSpan mr="0.5rem" fontWeight="600" color="primary.main">
                <Currency>{sellablePrice.toFixed(2)}</Currency>
              </SemiSpan>
              {!!orginalPrice && (
                <SemiSpan
                  style={{ display: "flex", alignItems: "center" }}
                  color="text.muted"
                  fontSize="12px"
                  fontWeight="600"
                >
                  <del>
                    <Currency>{orginalPrice?.toFixed(2)}</Currency>
                  </del>
                </SemiSpan>
              )}
            </FlexBox>
            {/* <FlexBox alignItems="center" mt={stock ? "10px" : "0px"}>
           
            </FlexBox> */}
            <H4
              display="flex"
              className="title"
              fontSize="13px"
              fontWeight="600"
              color={
                condition === "new" ||
                condition === "New" ||
                condition === "NEW"
                  ? "primary.main"
                  : "secondary.main"
              }
            >
              {condition ? condition.toUpperCase() : ""}
            </H4>
          </Box>

          <FlexBox
            flexDirection="column-reverse"
            alignItems="center"
            justifyContent={!!cartQuantity ? "flex-start" : "flex-start"}
            width="30px"
          >
            <Button
              variant="outlined"
              className="icon-cart"
              color="primary"
              padding="3px"
              size="none"
              borderColor="primary.light"
              disabled={!stock || stockQuantity == 0}
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
                  className="icon-cart"
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
      </div>

      <Modal open={open} onClose={toggleDialog}>
        <Card p="1rem" style={{ width: "900px" }} position="relative">
          <ProductIntroEye
            {...props}
            imgUrl={[imgUrl]}
            short_desc={short_desc}
            title={title}
            price={sellablePrice}
            orginalprice={orginalPrice}
            id={id}
            brand={brand}
            rating={rating}
            reviewCount={reviewCount}
            condition={condition}
            parse={""}
            eye={true}
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
