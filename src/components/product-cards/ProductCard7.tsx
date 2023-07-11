import Box from "@component/Box";
import Currency from "@component/Currency";
import Image from "@component/Image";
import LoginPopup from "@component/LoginPopup";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import {
  BASE_URL,
  Check_Stock,
  Customer_decrease_Quantity,
  Customer_Increase_Quantity,
  Customer_Order_Remove_Item,
} from "@data/constants";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { SpaceProps } from "styled-system";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography, { H4, SemiSpan } from "../Typography";
import { StyledProductCard7 } from "./ProductCardStyle";

export interface ProductCard7Props {
  id: string | number;
  quantity: any;
  price: number;
  product: any;
  condition: string;
  runReloadCart: () => void;
}

const ProductCard7: React.FC<ProductCard7Props & SpaceProps> = ({
  id,
  quantity,
  price,
  product,
  condition,
  runReloadCart,
  ...props
}) => {
  const { dispatch, state } = useAppContext();

  const [openLogin, setOpenLogin] = useState(false);
  const [stock, setStock] = useState(true);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const cartCanged = state.cart.chartQuantity;

  const { user_id, order_Id, isLogin, authTOKEN } = useUserInf();

  useEffect(() => {
    axios
      .get(`${Check_Stock}${product?.id}`)
      .then((res) => {
        setStockQuantity(res.data.in_stock);
        setStock(res.data.is_in_stock);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [cartCanged]);

  const closeLoginTab = () => {
    setOpenLogin(false);
  };

  const handleCartAmountChange = useCallback(
    (action) => () => {
      if (isLogin) {
        const item_id = id;
        const orderData = {
          product_id: product?.id,
          quantity: 1,
          price: price,
          branch_id: 1,
          user_id: user_id,
        };

        console.log("orderData", orderData);

        if (action == "remove") {
          setLoading(true);

          axios
            .delete(
              `${Customer_Order_Remove_Item}${order_Id}/${item_id}`,
              authTOKEN
            )
            .then((res) => {
              console.log("CproductDeleteRes", res);
              runReloadCart();
              dispatch({
                type: "CHANGE_CART_QUANTITY",
                payload: { chartQuantity: Math.random() },
              });
              setLoading(false);
            })
            .catch((err) => {
              console.log("error", err);
            });
        } else if (action == "increase") {
          setLoading(true);

          console.log("increaseData", orderData);
          axios
            .put(
              `${Customer_Increase_Quantity}${order_Id}/${item_id}`,
              orderData,
              authTOKEN
            )
            .then((res) => {
              console.log("itemIncreaseRes", res);
              runReloadCart();
              dispatch({
                type: "CHANGE_CART_QUANTITY",
                payload: {
                  chartQuantity: Math.random(),
                  prductId: product?.id,
                },
              });
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);

              console.log("error", err);
            });
        } else if (action == "decrease") {
          setLoading(true);

          axios
            .put(
              `${Customer_decrease_Quantity}${order_Id}/${item_id}`,
              orderData,
              authTOKEN
            )
            .then((res) => {
              console.log("itemDecreaseRes", res);
              runReloadCart();
              dispatch({
                type: "CHANGE_CART_QUANTITY",
                payload: {
                  chartQuantity: Math.random(),
                  prductId: product?.id,
                },
              });
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);

              console.log("error", err);
            });
        }
      } else {
        setOpenLogin(true);
      }
    },

    [user_id, order_Id, isLogin, authTOKEN]
  );

  return (
    <>
      {loading && (
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
      )}
      <LoginPopup open={openLogin} closeLoginDialog={closeLoginTab} />
      <StyledProductCard7 {...props}>
        <Image
          src={`${BASE_URL}${product.thumbnail}`}
          size={140}
          display="block"
          alt={product.name}
        />
        <FlexBox
          className="product-details"
          flexDirection="column"
          justifyContent="space-between"
          minWidth="0px"
          width="100%"
        >
          <Link href={`/product/${product.id}`}>
            <a>
              <Typography
                className="title"
                fontWeight="600"
                fontSize="18px"
                mb="0.5rem"
              >
                {product.name}
              </Typography>
            </a>
          </Link>
          <Box position="absolute" right="1rem" top="1rem">
            <IconButton
              padding="4px"
              ml="12px"
              size="small"
              onClick={handleCartAmountChange("remove")}
            >
              <Icon size="1.25rem">close</Icon>
            </IconButton>
          </Box>

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

          {stock || (
            <SemiSpan fontWeight="bold" color="primary.main" ml="1px">
              Out of Stock
            </SemiSpan>
          )}

          <FlexBox
            // width="100%"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <FlexBox flexWrap="wrap" alignItems="center">
              <Typography color="gray.600" mr="0.5rem" display="flex">
                <Currency>{Number(price).toFixed(2)}</Currency> x {quantity}
              </Typography>
              <Typography fontWeight={600} color="primary.main" mr="1rem">
                <Currency>{(price * quantity).toFixed(2)}</Currency>
              </Typography>
            </FlexBox>

            <FlexBox alignItems="center">
              <Button
                variant="outlined"
                color="primary"
                padding="5px"
                size="none"
                borderColor="primary.light"
                onClick={handleCartAmountChange("decrease")}
                disabled={quantity === 1}
              >
                <Icon variant="small">minus</Icon>
              </Button>
              <Typography mx="0.5rem" fontWeight="600" fontSize="15px">
                {quantity}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                padding="5px"
                size="none"
                borderColor="primary.light"
                disabled={!stock || stockQuantity == 0}
                onClick={handleCartAmountChange("increase")}
              >
                <Icon variant="small">plus</Icon>
              </Button>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </StyledProductCard7>
    </>
  );
};

export default ProductCard7;
