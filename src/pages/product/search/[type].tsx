import Box from "@component/Box";
import IconButton from "@component/buttons/IconButton";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductCard1List from "@component/products/ProductCard1List";
import ProductCard9List from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import Select from "@component/Select";
import Sidenav from "@component/sidenav/Sidenav";
import { H5, Paragraph } from "@component/Typography";
import { Category_By_Id, Product_Arrival, Product_By_BrandId, product_by_categoryId, Product_Discount, Product_Filter, Product_Flash_Deals, Product_For_You, Product_Search, Product_Top_Rated } from "@data/constants";
import axios from "axios";
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";

const ProductSearchResult = ({ productLists, totalProduct, totalPage }) => {
  const [searchingFor, setSearchingFor] = useState("");
  const [totalProducts, setTotalProducts] = useState(totalProduct);
  const [productList, setProductList] = useState(productLists)

  const [view, setView] = useState("grid");
  const width = useWindowSize();
  const isTablet = width < 1025;

  const router = useRouter();

  var id = router.query.categoryId;

  const toggleView = useCallback(
    (v) => () => {
      setView(v);
    },
    []
  );


  useEffect(() => {
    const type = router.query.type
    if (type === "product_by_category") {
      if (id) {
        fetch(`${Category_By_Id}${id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("searchingFor", data.name);
            setSearchingFor(data.name);
          })
          .catch(() => {
            setSearchingFor("Not Found");
          });
      }
    }
    else if (type === "search_by_product_name") {
      const search_key: any = router.query.search_key
      setSearchingFor(search_key)
    }
    else if (type === "flash_deals_all") {
      setSearchingFor("Flash Deals")
    }
    else if (type === "top_ratings_all") {
      setSearchingFor("Top Ratings")
    }
    else if (type === "new_arrivals_all") {
      setSearchingFor("New Arrivals")
    }
    else if (type === "big_discounts_all") {
      setSearchingFor("Big Discounts")
    }
    else if (type === "more_for_you_all") {
      setSearchingFor("More For You")
    }
    else if (type === "search_by_product_name") {
      setSearchingFor("Top Ratings")
    }
  }, [id]);

  useEffect(() => {
    setProductList(productLists)
    setTotalProducts(totalProduct)
  }, [productLists, totalProduct])


  console.log("product_list", productList)
  console.log("router.query", router.query)
  return (
    <Box pt="20px">
      <FlexBox
        p="1.25rem"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mb="55px"
        elevation={5}
        as={Card}
      >
        <div>
          <H5>Searching for “ {searchingFor} ”</H5>
          <Paragraph color="text.muted">{totalProducts} results found</Paragraph>
        </div>
        <FlexBox alignItems="center" flexWrap="wrap">
          <Paragraph color="text.muted" mr="1rem">
            Short by:
          </Paragraph>
          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder="Short by"
              defaultValue={sortOptions[0]}
              options={sortOptions}
            />
          </Box>

          <Paragraph color="text.muted" mr="0.5rem">
            View:
          </Paragraph>
          <IconButton size="small" onClick={toggleView("grid")}>
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "grid" ? "primary" : "inherit"}
            >
              grid
            </Icon>
          </IconButton>
          <IconButton size="small" onClick={toggleView("list")}>
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "list" ? "primary" : "inherit"}
            >
              menu
            </Icon>
          </IconButton>

          {isTablet && (
            <Sidenav
              position="left"
              scroll={true}
              handle={
                <IconButton size="small">
                  <Icon>options</Icon>
                </IconButton>
              }
            >
              <ProductFilterCard />
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <ProductFilterCard />
        </Hidden>

        <Grid item lg={9} xs={12}>
          {view === "grid" ? (
            <ProductCard1List productList={productList} totalPage={totalPage} totalProduct={totalProduct} />
          ) : (
            <ProductCard9List productList={productList} totalPage={totalPage} totalProduct={totalProduct} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const sortOptions = [
  { label: "Relevance", value: "Relevance" },
  { label: "Date", value: "Date" },
  { label: "Price Low to High", value: "Price Low to High" },
  { label: "Price High to Low", value: "Price High to Low" },
];

ProductSearchResult.layout = NavbarLayout;

export default ProductSearchResult;


export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {

  const category: any = query.categoryId

  if ((params.type === "product_by_category") || (params.type === "search_for")) {

    try {
      const res = await fetch(`${product_by_categoryId}${category}?page=${query.page || 1}&size=${query.size || 9}`)
      var json = await res.json()
      var data: any[] = await json.products
      var totalProduct: number = await json.total_elements
      var totalPage: number = await json.total_pages
      console.log("categoryUrl", `${product_by_categoryId}${category}?page=${query.page || 1}&size=${query.size || 9}`)
    }
    catch (err) {
      var data = []
      var totalProduct = 0
      var totalPage = 0
    }
  }

  else if (params.type === "search_by_product_name") {
    try {

      const res = await axios.get(`${Product_Search}?page=${query.page || 1}&size=${query.size || 9}`, { params: { name: query.search_key, category } })
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements
      var totalPage: number = await res.data.total_pages
    }
    catch (err) {
      var data = []
      var totalProduct = 0
      var totalPage = 0
    }
  }
  else if (params.type === "filter") {
    try {
      const brand: any = query.brand
      const rating: any = query.rating

      const brandIds = JSON.parse(brand)
      const ratingIds = JSON.parse(rating)

      let params = new URLSearchParams();

      const minPrice: any = query.min_price
      const maxPrice: any = query.max_price

      params.append("category", category);
      params.append("min_price", minPrice);
      params.append("max_price", maxPrice);
      brandIds.map((brand) => {
        params.append("brand", brand);
      })
      ratingIds.map((rating) => {
        params.append("rating", rating);
      })


      var request = {
        params: params
      };

      const res = await axios.get(`${Product_Filter}?page=${query.page || 1}&size=${query.size || 9}`, request)
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements
      var totalPage: number = await res.data.total_pages

    }
    catch (err) {
      var data = []
      var totalProduct = 0
      var totalPage = 0
    }
  }
  else if (params.type === "flash_deals_all") {
    try {
      const res = await axios.get(`${Product_Flash_Deals}?page=${query.page || 1}&size=${query.size || 9}`)
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements
      var totalPage: number = await res.data.total_pages

    } catch (error) {
      var data = []
      var totalProduct = 0
      var totalPage = 0
    }
  }
  else if (params.type === "top_ratings_all") {
    try {
      const res = await axios.get(`${Product_Top_Rated}?page=${query.page || 1}&size=${query.size || 9}`)
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements
      var totalPage: number = await res.data.total_pages

    } catch (error) {
      var data = []
      var totalProduct = 0
      var totalPage = 0
    }
  }
  else if (params.type === "new_arrivals_all") {
    try {
      const res = await axios.get(`${Product_Arrival}?page=${query.page || 1}&size=${query.size || 9}`)
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements
      var totalPage: number = await res.data.total_pages

    } catch (error) {
      var data = []
      var totalProduct = 0
      var totalPage = 0
    }
  }
  else if (params.type === "big_discounts_all") {
    try {
      const res = await axios.get(`${Product_Discount}?page=${query.page || 1}&size=${query.size || 9}`)
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements
      var totalPage: number = await res.data.total_pages

    } catch (error) {
      var data = []
      var totalProduct = 0
      var totalPage = 0
    }
  }
  else if (params.type === "more_for_you_all") {
    try {
      const res = await axios.get(`${Product_For_You}?page=${query.page || 1}&size=${query.size || 9}`)
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements
      var totalPage: number = await res.data.total_pages

    } catch (error) {
      var data = []
      var totalProduct = 0
      var totalPage = 0
    }
  }
  else if (params.type === "product_by_brand") {
    try {
      const res = await axios.get(`${Product_By_BrandId}${query.brandId}?page=${query.page || 1}&size=${query.size || 9}`)
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements
      var totalPage: number = await res.data.total_pages

    } catch (error) {
      var data = []
      var totalProduct = 0
      var totalPage = 0
    }
  }



  else {
    var data = []
    var totalProduct = 0
    var totalPage = 0
  }

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      productLists: data,
      totalProduct,
      totalPage,
    },
  }
}