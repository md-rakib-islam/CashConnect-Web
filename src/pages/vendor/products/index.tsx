import Avatar from "@component/avatar/Avatar";
import Currency from "@component/Currency";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import Pagination from "@component/pagination/Pagination";
import PaginationRow from "@component/pagination/PaginationRow";
import ShowingItemNumber from "@component/pagination/ShowingItemNumber";
import TableRow from "@component/TableRow";
import Typography, { H5, SemiSpan } from "@component/Typography";
import useUserInf from "@customHook/useUserInf";
import { BASE_URL, Purchase_Products_By_Vendor_Id } from "@data/constants";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [productList, setProductList] = useState([])
  const [totalProduct, setTotalProduct] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  const router = useRouter()
  const { page, size } = router.query

  useEffect(() => {
    const { user_id, authTOKEN } = useUserInf()
    axios.get(`${Purchase_Products_By_Vendor_Id}${user_id}?size=${size || 10}&page=${page || 1}`, authTOKEN).then(res => {
      console.log("Purchase_Products_By_Vendor_Id", res)
      setProductList(res?.data?.purchase_request_items)
      setTotalPage(res?.data?.total_pages)
      setTotalProduct(res?.data?.total_elements)
    }).catch((err) => { console.log("error", err) })
  }, [size, page])

  return (
    <div>
      <DashboardPageHeader title="Products" iconName="delivery-box" />

      <Hidden down={769}>
        <TableRow padding="0px 0px" mb="-0.125rem" boxShadow="none" bg="none">

          <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "flex-start", alignItems: "center", height: "36px", padding: "6px 0px", flexBasis: "25%" }}>
            <H5 ml="70px" color="text.muted" textAlign="left">
              Name
            </H5>
          </div>

          <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "space-between", flexBasis: "25%" }}>
            <H5 color="text.muted" my="0px" ml="30px" textAlign="left">
              sell#
            </H5>
            <H5 color="text.muted" my="0px" mr="50px" textAlign="left">
              Date
            </H5>
          </div>

          <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "space-around", flexBasis: "40%" }}>
            <H5 color="text.muted" my="0px" mx="6px" textAlign="center">
              Quantity
            </H5>
            <H5 color="text.muted" my="0px" mr="6px" textAlign="center">
              Regular price
            </H5>
            <H5 color="text.muted" my="0px" mx="6px" textAlign="center">
              Status
            </H5>
          </div>
        </TableRow>
      </Hidden>

      {productList.map((item) => (
        <TableRow key={item?.id} as="a" href={item.href} my="1rem" padding="6px 0px">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "center", minHeight: "36px", padding: "6px 0px", flexBasis: "25%" }}>
            <Avatar src={`${BASE_URL}${item?.purchase_request_item_images[0]?.image}`} size={36} ml="20px" />
            <Typography textAlign="center" ml="15px">
              {item?.name}
              {/* {item?.name && (item?.name?.length > 20? `${item?.name?.slice(0,20)}...` : item?.name)} */}
            </Typography>
          </div>

          <div style={{ display: "flex", flexWrap: "nowrap", flexDirection: "row", justifyContent: "space-between", alignItems: "center", minHeight: "36px", padding: "6px 0px", flexBasis: "25%" }}>
            <Typography textAlign="left" ml="30px" mr="15px">
              {item?.purchase_req}
            </Typography>
            <Typography textAlign="center" mr="30px" flexWrap="nowrap">
              {item?.created_at && format(new Date(item?.created_at), "MMM dd, yyyy")}
            </Typography>
          </div>
          <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", minHeight: "36px", padding: "6px 0px", flexBasis: "40%" }}>
            <H5
              ml="30px"
              textAlign="center"
              fontWeight="600"
              color={item.quantity < 6 ? "error.main" : "inherit"}
            >
              {item?.quantity?.toString()?.padStart(2, "0")}
            </H5>
            <H5 ml="10px" textAlign="center" fontWeight="400">
              <Currency>{item.unit_price}</Currency>
            </H5>
            <div style={{ minWidth: "80px" }}>
              <Typography textAlign="center" mr="10px">
                {/* {item?.name} */}
                {item?.status ? item?.status : "_"}
              </Typography>
            </div>
          </div>
        </TableRow>

      ))}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-around"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing <ShowingItemNumber initialNumber={10} totalItem={totalProduct} /> of {totalProduct} Products</SemiSpan>

        <Pagination pageCount={totalPage} />

        <PaginationRow product_per_page_option={product_per_page_options} name="Parchase" />
      </FlexBox>
    </div>
  );
};

Products.layout = VendorDashboardLayout;

const product_per_page_options = [
  { id: 10, name: 10 },
  { id: 30, name: 30 },
  { id: 50, name: 50 },
]

export default Products;
