
import Currency from "@component/Currency";
import FlexBox from "@component/FlexBox";
import LazyImage from "@component/LazyImage";
import LoginPopup from "@component/LoginPopup";
import { useAppContext } from "@context/app/AppContext";
import useUserInf from "@customHook/useUserInf";
import {
  Customer_decrease_Quantity,
  Customer_Increase_Quantity,
  Customer_Order_Pending_Details,
  Customer_Order_Remove_Item
} from "@data/constants";
import axios from "axios";
import Link from "next/link";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import Button from "../buttons/Button";
import Divider from "../Divider";
import Icon from "../icon/Icon";
import Typography, { Paragraph } from "../Typography";
import Item from "./Item";
import { StyledMiniCart } from "./MiniCartStyle";

type MiniCartProps = {
  toggleSidenav?: () => void;
};

type CartItem = {
  id: any;
  quantity: any;
  price: any;
  product: any;
};

const MiniCart: React.FC<MiniCartProps> = ({ toggleSidenav }) => {
  const { dispatch } = useAppContext();
  const [cartProductList, setCartProductList] = useState([]);
  const [reloadCart, setReloadCart] = useState(0);
  const [openLogin, setOpenLogin] = useState(false)

  const { user_id, order_Id, isLogin, authTOKEN } = useUserInf()

  const closeLoginTab = () => {
    setOpenLogin(false)
  }

  const handleCartAmountChange = useCallback(
    (product, action) => () => {
      if (isLogin) {
        if (order_Id) {

          const item_id = product?.id;
          const orderData = {
            product_id: product?.product?.id,
            quantity: 1,
            price: product?.price,
            branch_id: 1,
            user_id: user_id,
          };

          if (action == "remove") {
            axios
              .delete(`${Customer_Order_Remove_Item}${order_Id}/${item_id}`, authTOKEN)
              .then(() => {
                setReloadCart(Math.random());
                dispatch({
                  type: "CHANGE_CART_QUANTITY",
                  payload: {
                    chartQuantity: Math.random(),
                    prductId: product?.product?.id,
                  },
                });
              }).catch((err) => { console.log("error", err) });

          } else if (action == "increase") {
            axios
              .put(`${Customer_Increase_Quantity}${order_Id}/${item_id}`, orderData, authTOKEN)
              .then(() => {
                setReloadCart(Math.random());
                dispatch({
                  type: "CHANGE_CART_QUANTITY",
                  payload: { chartQuantity: Math.random(), prductId: product?.product?.id, },
                });
              }).catch((err) => { console.log("error", err) });

          } else if (action == "decrease") {
            axios
              .put(`${Customer_decrease_Quantity}${order_Id}/${item_id}`, orderData, authTOKEN)
              .then(() => {
                setReloadCart(Math.random());
                dispatch({
                  type: "CHANGE_CART_QUANTITY",
                  payload: { chartQuantity: Math.random(), prductId: product?.product?.id, },
                });
              }).catch((err) => { console.log("error", err) });
          }

        }
      }
      else {
        setOpenLogin(true)
      }
    },
    []
  );

  const getTotalPrice = () => {
    return (
      cartProductList.reduce(
        (accumulator, item) =>
          accumulator + item.price * item.quantity,
        0
      ) || 0
    );
  };

  useEffect(() => {
    if (order_Id) {
      axios.get(`${Customer_Order_Pending_Details}${order_Id}`).then((res) => {
        setCartProductList(res.data.order.order_items);
        console.log("miniCartLisdt", res.data.order.order_items);
      }).catch((err) => { console.log("error", err) });
    }
  }, [reloadCart, order_Id]);

  return (
    <>
      <LoginPopup open={openLogin} closeLoginDialog={closeLoginTab} />
      <StyledMiniCart>
        <div className="cart-list">
          <FlexBox alignItems="center" m="0px 20px" height="74px">
            <Icon size="1.75rem">bag</Icon>
            <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
              {cartProductList.length} item
            </Typography>
          </FlexBox>

          <Divider />

          {!!!cartProductList.length && (
            <FlexBox
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="calc(100% - 80px)"
            >
              <LazyImage
                src="/assets/images/logos/shopping-bag.svg"
                width="90px"
                height="100%"
              />
              <Paragraph
                mt="1rem"
                color="text.muted"
                textAlign="center"
                maxWidth="200px"
              >
                Your shopping bag is empty. Start shopping
              </Paragraph>
            </FlexBox>
          )}
          {cartProductList.map((item: CartItem) => <Item item={item} handleCartAmountChange={handleCartAmountChange} />)}
        </div>

        {!!cartProductList.length && (
          <Fragment>
            <Link href="/checkout">
              <Button
                variant="contained"
                color="primary"
                m="1rem 1rem 0.75rem"
                onClick={toggleSidenav}
              >
                <Typography fontWeight={600} display="flex" textAlign="center">
                  Checkout Now (<Currency>{getTotalPrice().toFixed(2)}</Currency>)
                </Typography>
              </Button>
            </Link>
            <Link href="/cart">
              <Button
                color="primary"
                variant="outlined"
                m="0px 1rem 0.75rem"
                onClick={toggleSidenav}
              >
                <Typography fontWeight={600}>View Cart</Typography>
              </Button>
            </Link>
          </Fragment>
        )}
      </StyledMiniCart>
    </>
  );
};

MiniCart.defaultProps = {
  toggleSidenav: () => { },
};

export default MiniCart;
