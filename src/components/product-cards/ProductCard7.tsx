import Box from "@component/Box";
import Image from "@component/Image";
import LoginPopup from "@component/LoginPopup";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import {
  BASE_URL,
  Customer_decrease_Quantity,
  Customer_Increase_Quantity,
  Customer_Order_Remove_Item
} from "@data/constants";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { SpaceProps } from "styled-system";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import { StyledProductCard7 } from "./ProductCardStyle";

export interface ProductCard7Props {
  id: string | number;
  quantity: any;
  price: number;
  product: any;
  runReloadCart: () => void;
}

const ProductCard7: React.FC<ProductCard7Props & SpaceProps> = ({
  id,
  quantity,
  price,
  product,
  runReloadCart,
  ...props
}) => {
  const { dispatch } = useAppContext();

  const [openLogin, setOpenLogin] = useState(false)

  const closeLoginTab = () => {
    setOpenLogin(false)
  }

  const handleCartAmountChange = useCallback(
    (action) => () => {
      const { user_id, order_Id, isLogin } = useUserInf()

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
          axios
            .delete(`${Customer_Order_Remove_Item}${order_Id}/${item_id}`)
            .then((res) => {
              console.log("CproductDeleteRes", res);
              runReloadCart();
              dispatch({
                type: "CHANGE_CART_QUANTITY",
                payload: Math.random(),
              });
            }).catch(() => { });

        } else if (action == "increase") {
          console.log("increaseData", orderData);
          axios
            .put(`${Customer_Increase_Quantity}${order_Id}/${item_id}`, orderData)
            .then((res) => {
              console.log("itemIncreaseRes", res);
              runReloadCart();
            }).catch(() => { });

        } else if (action == "decrease") {
          axios
            .put(`${Customer_decrease_Quantity}${order_Id}/${item_id}`, orderData)
            .then((res) => {
              console.log("itemDecreaseRes", res);
              runReloadCart();
            }).catch(() => { });
        }
      }
      else {
        setOpenLogin(true)
      }

    },

    []
  );

  return (
    <>
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
          <Link href={`/product/${id}`}>
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

          <FlexBox
            // width="100%"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <FlexBox flexWrap="wrap" alignItems="center">
              <Typography color="gray.600" mr="0.5rem">
                ${Number(price).toFixed(2)} x {quantity}
              </Typography>
              <Typography fontWeight={600} color="primary.main" mr="1rem">
                ${(price * quantity).toFixed(2)}
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
