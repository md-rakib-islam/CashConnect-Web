import Currency from "@component/Currency";
import { format } from "date-fns";
import Link from "next/link";
import React, { useMemo } from "react";
import Box from "../Box";
import IconButton from "../buttons/IconButton";
import { Chip } from "../Chip";
import Hidden from "../hidden/Hidden";
import Icon from "../icon/Icon";
import TableRow from "../TableRow";
import Typography, { H5, Small } from "../Typography";

export interface PurchaseRowProps {
  item: {
    id?: any;
    purchase_status?: { name: string };
    created_at?: string;
    total_price?: number | string;
    href?: string;
    invoice_no?: string;
  };
}

const PurchaseRow: React.FC<PurchaseRowProps> = ({ item }) => {
  const getColor = (status) => {
    console.log("status", status);
    switch (status) {
      case "pending" || "Pending":
        return "secondary";
      case "processing" || "Processing":
        return "secondary";
      case "submitted" || "Submitted":
        return "success";
      case "verified" || "Verified":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "";
    }
  };

  const memoizedGetColor = (status) => useMemo(() => getColor(status), []);

  try {
    var user_type: string = localStorage.getItem("userType");
  } catch (err) {
    var user_type = "";
  }

  return (
    <Link
      href={`${
        user_type === "vendor"
          ? `/vendor/sells/${item?.id}`
          : `/sells/${item?.id}`
      }`}
    >
      <TableRow as="a" href={item.href} my="1rem" padding="6px 18px">
        <H5 m="6px" textAlign="left">
          {item.invoice_no}
        </H5>
        <Box m="6px">
          <Chip
            p="0.25rem 1rem"
            bg={`${memoizedGetColor(item.purchase_status?.name)}.light`}
          >
            <Small
              color={`${memoizedGetColor(item.purchase_status?.name)}.main`}
            >
              {item.purchase_status?.name}
            </Small>
          </Chip>
        </Box>
        <Typography className="flex-grow pre" m="6px" textAlign="left">
          {item?.created_at &&
            format(new Date(item?.created_at), "MMM dd, yyyy")}
        </Typography>
        <Typography m="6px" textAlign="left">
          <Currency>{Number(item.total_price).toFixed(2)}</Currency>
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

export default PurchaseRow;
