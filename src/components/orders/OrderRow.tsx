import Currency from "@component/Currency";
import { order_Status_All } from "@data/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Box from "../Box";
import IconButton from "../buttons/IconButton";
import { Chip } from "../Chip";
import Hidden from "../hidden/Hidden";
import Icon from "../icon/Icon";
import TableRow from "../TableRow";
import Typography, { H5, Small } from "../Typography";

export interface OrderRowProps {
  item: {
    order_no?: any;
    order_status?: string;
    paid_at?: string;
    net_amount?: number | string;
    href?: string;
  };
}

const OrderRow: React.FC<OrderRowProps> = ({ item }) => {
  const [orderStatus, setOrderStatus] = useState([]);
  const getColor = (status) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "processing":
        return "secondary";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "";
    }
  };

  try {
    var authTOKEN = {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("jwt_access_token"),
      },
    };
  } catch (err) {
    authTOKEN = null;
  }

  useEffect(() => {
    axios.get(`${order_Status_All}`, authTOKEN).then((order_statuss) => {
      console.log("order_status", order_statuss.data.orderstatuses);
      console.log("ord_status", item.order_status);

      setOrderStatus(order_statuss.data.orderstatuses);
    }).catch(() => { });
  }, []);

  return (
    <Link href={item.href}>
      <TableRow as="a" href={item.href} my="1rem" padding="6px 18px">
        <H5 m="6px" textAlign="left">
          {item.order_no}
        </H5>
        <Box m="6px">
          <Chip
            p="0.25rem 1rem"
            bg={`${getColor(
              orderStatus.find((orders) => item.order_status == orders.id)?.name
            )}.light`}
          >
            <Small
              color={`${getColor(
                orderStatus.find((orders) => item.order_status == orders.id)
                  ?.name
              )}.main`}
            >
              {
                orderStatus.find((orders) => item.order_status == orders.id)
                  ?.name
              }
            </Small>
          </Chip>
        </Box>
        <Typography className="flex-grow pre" m="6px" textAlign="left">
          {item?.paid_at?.slice(0, 10)}
        </Typography>
        <Typography m="6px" textAlign="left">
          <Currency>{Number(item.net_amount).toFixed(2)}</Currency>
        </Typography>

        <Hidden flex="0 0 0 !important" down={769}>
          <Typography textAlign="center" color="text.muted">
            <IconButton size="small">
              <Icon variant="small" defaultcolor="currentColor">
                arrow-right
              </Icon>
            </IconButton>
          </Typography>
        </Hidden>
      </TableRow>
    </Link>
  );
};

export default OrderRow;
