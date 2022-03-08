import PaginationRow from "@component/pagination/PaginationRow";
import ShowingItemNumber from "@component/pagination/ShowingItemNumber";
import useUserInf from "@customHook/useUserInf";
import { Purchase_All_By_Vendor_id } from "@data/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import FlexBox from "../FlexBox";
import Hidden from "../hidden/Hidden";
import Pagination from "../pagination/Pagination";
import TableRow from "../TableRow";
import { H5, SemiSpan } from "../Typography";
import ParchaseRow from "./PurchaseRow";

export interface VendorOrderListProps { }

const VendorOrderList: React.FC<VendorOrderListProps> = () => {

  const [purchaseList, setPurchaseList] = useState([])
  const [totalPurchase, setTotalPurchase] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  const router = useRouter()
  const { page, size } = router.query

  const { user_id } = useUserInf()

  useEffect(() => {
    if (user_id) {
      axios.get(`${Purchase_All_By_Vendor_id}${user_id}?size=${size || 10}&page=${page || 1}`).then(res => {
        console.log("purchaseAll", res)
        setPurchaseList(res?.data?.purchaserequests)
        setTotalPurchase(res?.data?.total_elements)
        setTotalPage(res?.data?.total_pages)
      }).catch((err) => { console.log("error", err) })
    }
  }, [size, page, user_id])

  const product_per_page_options = [
    { id: 10, name: 10 },
    { id: 30, name: 30 },
    { id: 50, name: 50 },
    { id: 100, name: 100 },
  ]


  return (
    <Fragment>
      <Hidden down={769}>
        <TableRow padding="0px 18px" boxShadow="none" bg="none">
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Sell #
          </H5>
          <H5 color="text.muted" my="0px" ml="12px" textAlign="left">
            Status
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Date
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Total
          </H5>
          <H5
            flex="0 0 0 !important"
            color="text.muted"
            px="22px"
            my="0px"
          ></H5>
        </TableRow>
      </Hidden>

      {purchaseList.map((item, ind) => (
        <ParchaseRow item={item} key={item?.id || ind} />
      ))}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-around"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing <ShowingItemNumber initialNumber={10} totalItem={totalPurchase} /> of {totalPurchase} sells</SemiSpan>

        <Pagination pageCount={totalPage} />

        <PaginationRow product_per_page_option={product_per_page_options} name="sell" />
      </FlexBox>
    </Fragment>
  );
};


export default VendorOrderList;
