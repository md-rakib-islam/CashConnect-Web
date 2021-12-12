import Currency from "@component/Currency";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
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
    created_at?: string;
    net_amount?: number | string;
    href?: string;
  };
}

const OrderRow: React.FC<OrderRowProps> = ({ item }) => {
  const getColor = (status) => {
    switch (status) {
      case ("pending" || "Pending"):
        return "secondary";
      case ("processing" || "Processing"):
        return "secondary";
      case ("cancelled" || "Cancelled"):
        return "error";
      case ("delivered" || "Delivered" || "on_the_way" || "on the way" || "Nn the way" || "On The Way"):
        return "success";
      default:
        return "";
    }
  };


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
              item.order_status
            )}.light`}
          >
            <Small
              color={`${getColor(
                item.order_status
              )}.main`}
            >
              {
                item.order_status
              }
            </Small>
          </Chip>
        </Box>
        <Typography className="flex-grow pre" m="6px" textAlign="left">
          {item?.created_at && format(new Date(item?.created_at), "MMM dd, yyyy")}
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
