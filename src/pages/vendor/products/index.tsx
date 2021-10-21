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
import { Purchase_Items_By_Purchase_Id } from "@data/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [productList, setProductList] = useState([])
  const [totalProduct, setTotalProduct] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  const router = useRouter()
  const { page, size } = router.query

  useEffect(() => {
    axios.get(`${Purchase_Items_By_Purchase_Id}?size=${size || 10}&page=${page || 1}`).then(res => {
      console.log("Purchase_Items_By_Purchase_Id", res)
      setProductList(res?.data?.purchase_req_items)
      setTotalPage(res?.data?.total_pages)
      setTotalProduct(res?.data?.total_elements)
    }).catch(() => { })
  }, [size, page])

  return (
    <div>
      <DashboardPageHeader title="Products" iconName="delivery-box" />

      <Hidden down={769}>
        <TableRow padding="0px 18px" mb="-0.125rem" boxShadow="none" bg="none">
          <FlexBox my="0px" mx="6px" flex="2 2 0px !important">
            <H5 ml="56px" color="text.muted" textAlign="left">
              Name
            </H5>
          </FlexBox>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Purchase#
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="center">
            Date
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="center">
            Stock
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="center">
            Regular price
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="center">
            Status
          </H5>
        </TableRow>
      </Hidden>

      {productList.map((item) => (
        <TableRow key={item?.id} as="a" href={item.href} my="1rem" padding="6px 18px">
          <FlexBox alignItems="center" m="6px" flex="2 2 0px !important">
            <Avatar src="/assets/images/products/imageshoes.png" size={36} />
            <Typography textAlign="left" ml="20px">
              {item?.name}
            </Typography>
          </FlexBox>
          <Typography textAlign="left" mx="6px">
            {"100"}
          </Typography>
          <Typography textAlign="center" mx="6px">
            {"10 oct. 2021"}
          </Typography>
          <H5
            mx="6px"
            textAlign="center"
            fontWeight="600"
            color={item.quantity < 6 ? "error.main" : "inherit"}
          >
            {item?.quantity?.toString()?.padStart(2, "0")}
          </H5>
          <H5 mx="6px" textAlign="center" fontWeight="400">
            <Currency>{item.unit_price}</Currency>
          </H5>
          <Typography textAlign="center">
            {/* {item?.name} */}
            {"pending"}
          </Typography>
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
