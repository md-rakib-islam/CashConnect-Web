
import Currency from "@component/Currency";
import useUserInf from "@customHook/useUserInf";
import { Purchase_Status_all } from "@data/constants";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
        purchase_status?: string;
        created_at?: string;
        total_price?: number | string;
        href?: string;
    };
}

const PurchaseRow: React.FC<PurchaseRowProps> = ({ item }) => {
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

    const { authTOKEN } = useUserInf()

    useEffect(() => {
        axios.get(`${Purchase_Status_all}`, authTOKEN).then((order_statuss) => {
            setOrderStatus(order_statuss?.data?.purchase_statuses);
        }).catch((err) => { console.log("error", err) });
    }, []);

    try {
        var user_type: string = localStorage.getItem("userType")
    } catch (err) {
        var user_type = "";
    }


    return (
        <Link href={`${user_type === "vendor" ? `/vendor/sells/${item?.id}` : `/sells/${item?.id}`}`}>
            <TableRow as="a" href={item.href} my="1rem" padding="6px 18px">
                <H5 m="6px" textAlign="left">
                    {item.id}
                </H5>
                <Box m="6px">
                    <Chip
                        p="0.25rem 1rem"
                        bg={`${getColor(
                            orderStatus.find((orders) => item.purchase_status == orders.id)?.name
                        )}.light`}
                    >
                        <Small
                            color={`${getColor(
                                orderStatus.find((orders) => item.purchase_status == orders.id)
                                    ?.name
                            )}.main`}
                        >
                            {
                                orderStatus.find((orders) => item.purchase_status == orders.id)
                                    ?.name
                            }
                        </Small>
                    </Chip>
                </Box>
                <Typography className="flex-grow pre" m="6px" textAlign="left">
                    {format(new Date(item?.created_at), "MMM dd, yyyy")}
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

export default PurchaseRow
