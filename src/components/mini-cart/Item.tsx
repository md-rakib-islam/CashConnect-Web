import Avatar from "@component/avatar/Avatar";
import Button from "@component/buttons/Button";
import Currency from "@component/Currency";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Typography, { H5, SemiSpan, Tiny } from "@component/Typography";
import { useAppContext } from "@context/app/AppContext";
import { BASE_URL, Check_Stock } from "@data/constants";
import axios from "axios";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";

interface ItemProps {
  item: any;
  handleCartAmountChange: (product: any, action: any) => () => void;
}

const Item: React.FC<ItemProps> = ({ item, handleCartAmountChange }) => {
  const [stock, setStock] = useState(true);
  const [stockQuantity, setStockQuantity] = useState(0);
  const { state } = useAppContext();
  const cartCanged = state.cart.chartQuantity;

  useEffect(() => {
    axios
      .get(`${Check_Stock}${item?.product?.id}`)
      .then((res) => {
        setStockQuantity(res.data.in_stock);
        setStock(res.data.is_in_stock);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [cartCanged]);

  return (
    <Fragment key={item.id}>
      <div className="cart-item">
        <FlexBox alignItems="center" flexDirection="column">
          <Button
            variant="outlined"
            color="primary"
            padding="5px"
            size="none"
            borderColor="primary.light"
            borderRadius="300px"
            onClick={handleCartAmountChange(item, "increase")}
            disabled={!stock || stockQuantity == 0}
          >
            <Icon variant="small">plus</Icon>
          </Button>
          <Typography fontWeight={600} fontSize="15px" my="3px">
            {item.quantity}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            padding="5px"
            size="none"
            borderColor="primary.light"
            borderRadius="300px"
            onClick={handleCartAmountChange(item, "decrease")}
            disabled={item.quantity === 1}
          >
            <Icon variant="small">minus</Icon>
          </Button>
        </FlexBox>

        <Link href={`/product/${item?.product?.id}`}>
          <a>
            <Avatar
              src={`${BASE_URL}${item?.product?.thumbnail}`}
              mx="1rem"
              alt={item.product?.name}
              size={76}
            />
          </a>
        </Link>

        <div className="product-details">
          <Link href={`/product/${item.id}`}>
            <a>
              <H5 className="title" fontSize="14px">
                {item.product?.name}
              </H5>
            </a>
          </Link>
          <Tiny color="text.muted" key={item.id}>
            <Currency>{Number(item?.price).toFixed(2)}</Currency> x{" "}
            {item.quantity}
          </Tiny>
          <Typography
            fontWeight={600}
            fontSize="14px"
            color="primary.main"
            mt={stock ? "4px" : "0px"}
          >
            <Currency>
              {Number(item.quantity * item?.price).toFixed(2)}
            </Currency>
          </Typography>

          {stock || (
            <SemiSpan fontWeight="bold" color="primary.main" mt="0px">
              Out Of Stock
            </SemiSpan>
          )}
        </div>

        <Icon
          className="clear-icon"
          size="1rem"
          ml="1.25rem"
          onClick={handleCartAmountChange(item, "remove")}
        >
          close
        </Icon>
      </div>
      <Divider />
    </Fragment>
  );
};

export default Item;
