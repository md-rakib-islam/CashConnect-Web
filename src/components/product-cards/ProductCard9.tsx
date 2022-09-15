import { Chip } from "@component/Chip";
import Currency from "@component/Currency";
import Image from "@component/Image";
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
import Card from "../Card";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Hidden from "../hidden/Hidden";
import Icon from "../icon/Icon";
import Modal from "../modal/Modal";
import NavLink from "../nav-link/NavLink";
import ProductIntro from "../products/ProductIntro";
import Rating from "../rating/Rating";
import { H4, H5, SemiSpan } from "../Typography";
import { StyledProductCard9 } from "./ProductCardStyle";

export interface ProductCard9Props {
  className?: string;
  style?: CSSProperties;
  imgUrl?: string;
  title?: string;
  price?: number;
  brand?: string | number;
  off?: number;
  rating?: number;
  id?: string | number;
  subcategories?: Array<{
    title: string;
    url: string;
  }>;
  [key: string]: unknown;
  reviewCount?: string | number;
  condition: string;
}

const ProductCard9: React.FC<ProductCard9Props> = ({
  imgUrl,
  title,
  price,
  off,
  subcategories,
  rating,
  brand,
  id,
  reviewCount,
  condition,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const [sellablePrice, setsellablePrice] = useState(Number(price));
  const [orginalPrice, setorginalPrice] = useState(0);
  const [discountedPercent, setdiscountedPercent] = useState(0);

  const router = useRouter();

  const { state, dispatch } = useAppContext();

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
    <StyledProductCard9 overflow="hidden" width="100%" {...props}>
      <Grid container spacing={1}>
        <Grid item md={3} sm={4} xs={12}>
          <Box position="relative">
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
              >
                {discountedPercent}% off
              </Chip>
            )}
            <Icon
              color="secondary"
              variant="small"
              className="quick-view"
              onClick={toggleDialog}
            >
              eye-alt
            </Icon>
            <Image
              src={imgUrl}
              alt={title}
              width="100%"
              borderRadius="0.5rem"
            />
          </Box>
        </Grid>

        <Grid item md={8} sm={8} xs={12}>
          <FlexBox
            flexDirection="column"
            justifyContent="center"
            height="100%"
            p="1rem"
          >
            <div className="categories">
              {subcategories?.map((item) => (
                <NavLink className="link" href={item.url} key={item.title}>
                  {item.title}
                </NavLink>
              ))}
            </div>

            <Link href="/product/34324321">
              <a>
                <H5 fontWeight="600" my="0.5rem">
                  {title}
                </H5>
              </a>
            </Link>

            <Rating
              value={rating || 0}
              outof={5}
              color="warn"
              onChange={(value) => {
                console.log(value, "from rating");
              }}
            />

            {stock || (
              <SemiSpan fontWeight="bold" color="primary.main" mt="5px">
                Out Of Stock
              </SemiSpan>
            )}

            <FlexBox mt="0.5rem" alignItems="center">
              <H5 fontWeight={600} color="primary.main" mr="0.5rem">
                <Currency>{sellablePrice.toFixed(2)}</Currency>
              </H5>
              {!!orginalPrice && (
                <SemiSpan fontWeight="600">
                  <del>
                    <Currency>{orginalPrice?.toFixed(2)}</Currency>
                  </del>
                </SemiSpan>
              )}
            </FlexBox>

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
              {condition || ""}
            </H4>

            <Hidden up="sm">
              <FlexBox
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row-reverse"
                height="30px"
              >
                <Icon className="favorite-icon outlined-icon" variant="small">
                  heart
                </Icon>

                <FlexBox alignItems="center" flexDirection="row-reverse">
                  <Button
                    variant="outlined"
                    color="primary"
                    padding="5px"
                    size="none"
                    borderColor="primary.light"
                    onClick={() =>
                      handleCartAmountChange(cartQuantity + 1, "increase")
                    }
                  >
                    <Icon variant="small">plus</Icon>
                  </Button>

                  {!!cartQuantity && (
                    <Fragment>
                      <H5 fontWeight="600" fontSize="15px" mx="0.75rem">
                        {cartQuantity}
                      </H5>
                      <Button
                        variant="outlined"
                        color="primary"
                        padding="5px"
                        size="none"
                        borderColor="primary.light"
                        onClick={() =>
                          handleCartAmountChange(cartQuantity - 1, "decrease")
                        }
                      >
                        <Icon variant="small">minus</Icon>
                      </Button>
                    </Fragment>
                  )}
                </FlexBox>
              </FlexBox>
            </Hidden>
          </FlexBox>
        </Grid>

        <Hidden as={Grid} down="sm" item md={1} xs={12}>
          <FlexBox
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            minWidth="30px"
            height="100%"
            p="1rem 0rem"
            ml="auto"
          >
            <Icon className="favorite-icon outlined-icon" variant="small">
              heart
            </Icon>

            <FlexBox
              className="add-cart"
              alignItems="center"
              flexDirection={!!!cartQuantity ? "column" : "column-reverse"}
            >
              <Button
                variant="outlined"
                color="primary"
                padding="5px"
                size="none"
                borderColor="primary.light"
                disabled={!stock}
                onClick={() =>
                  handleCartAmountChange(cartQuantity + 1, "increase")
                }
              >
                <Icon variant="small">plus</Icon>
              </Button>
              {!!cartQuantity && (
                <Fragment>
                  <H5 fontWeight="600" fontSize="15px" m="0.5rem">
                    {cartQuantity}
                  </H5>
                  <Button
                    variant="outlined"
                    color="primary"
                    padding="5px"
                    size="none"
                    borderColor="primary.light"
                    //disabled={!stock}
                    onClick={() =>
                      handleCartAmountChange(cartQuantity - 1, "decrease")
                    }
                  >
                    <Icon variant="small">minus</Icon>
                  </Button>
                </Fragment>
              )}
            </FlexBox>
          </FlexBox>
        </Hidden>
      </Grid>

      <Modal open={open} onClose={toggleDialog}>
        <Card p="1rem" position="relative">
          <ProductIntro
            imgUrl={[imgUrl]}
            title={title}
            price={sellablePrice}
            orginalrice={orginalPrice}
            brand={brand}
            id={id}
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
    </StyledProductCard9>
  );
};

// ProductCard9.defaultProps = {
//   id: "30",
//   title: "Product",
//   imgUrl: "/assets/images/products/loadingProduct.png",
//   off: null,
//   price: 0.00,
//   rating: 0,
//   brand: "Unknown",
// };

export default ProductCard9;
