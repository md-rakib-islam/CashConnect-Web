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
import { BASE_URL, Category_By_Id, ProductByCategoryId, Product_Arrival, Product_Discount, Product_Filter, Product_Flash_Deals, Product_For_You, Product_Search, Product_Top_Rated } from "@data/constants";
import axios from "axios";
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";

const ProductSearchResult = ({ productLists, totalProduct }) => {
  const [searchingFor, setSearchingFor] = useState("");
  const [totalProducts, setTotalProducts] = useState(totalProduct);
  const [productList, setProductList] = useState(productLists)

  const [view, setView] = useState("grid");
  const width = useWindowSize();
  const isTablet = width < 1025;

  const router = useRouter();

  var id = router.query.categoryId;

  const setFilteredProduct = (products, totalProduct) => {
    setProductList(products)
    setTotalProducts(totalProduct)
  }

  const toggleView = useCallback(
    (v) => () => {
      setView(v);
    },
    []
  );

  useEffect(() => {
    const type = router.query.type
    if (type === "productByCategory") {
      if (id) {
        fetch(`${BASE_URL}${Category_By_Id}${id}`)
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
      const searchKey: any = router.query.searchKey
      setSearchingFor(searchKey)
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
    // <AppContext.Provider value="sakib">
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
              <ProductFilterCard setFilteredProduct={setFilteredProduct} />
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <ProductFilterCard setFilteredProduct={setFilteredProduct} />
        </Hidden>

        <Grid item lg={9} xs={12}>
          {view === "grid" ? (
            <ProductCard1List productList={productList} />
          ) : (
            <ProductCard9List productList={productList} />
          )}
        </Grid>
      </Grid>
    </Box>
    // </AppContext.Provider>
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

  const category = query.categoryId

  if ((params.type === "productByCategory") || (params.type === "search_for")) {
    const res = await fetch(`${BASE_URL}${ProductByCategoryId}${category}`)
    var json = await res.json()
    var data: any[] = await json.products
    var totalProduct: number = await json.total_elements
  }

  else if (params.type === "search_by_product_name") {
    try {

      const res = await axios.get(`${Product_Search}`, { params: { name: query.searchKey, category } })
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements
    }
    catch (err) {
      var data = []
      var totalProduct = 0
    }
  }
  else if (params.type === "filter") {
    try {
      const brandIds = JSON.parse(query.brand)
      const ratingIds = JSON.parse(query.rating)

      var params = new URLSearchParams();
      params.append("category", category);
      params.append("min_price", query.min_price);
      params.append("max_price", query.max_price);
      brandIds.map((brand) => {
        params.append("brand", brand);
      })
      ratingIds.map((rating) => {
        params.append("rating", rating);
      })


      var request = {
        params: params
      };

      const res = await axios.get(`${Product_Filter}`, request)
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements
    }
    catch (err) {
      var data = []
      var totalProduct = 0
    }
  }
  else if (params.type === "flash_deals_all") {
    try {
      const res = await axios.get(`${Product_Flash_Deals}`)
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements

    } catch (error) {
      var data = []
      var totalProduct = 0
    }
  }
  else if (params.type === "top_ratings_all") {
    try {
      const res = await axios.get(`${Product_Top_Rated}`)
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements

    } catch (error) {
      var data = []
      var totalProduct = 0
    }
  }
  else if (params.type === "new_arrivals_all") {
    try {
      const res = await axios.get(`${Product_Arrival}`)
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements

    } catch (error) {
      var data = []
      var totalProduct = 0
    }
  }
  else if (params.type === "big_discounts_all") {
    try {
      const res = await axios.get(`${Product_Discount}`)
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements

    } catch (error) {
      var data = []
      var totalProduct = 0
    }
  }
  else if (params.type === "more_for_you_all") {
    try {
      const res = await axios.get(`${Product_For_You}`)
      var data: any[] = await res.data.products
      var totalProduct: number = await res.data.total_elements

    } catch (error) {
      var data = []
      var totalProduct = 0
    }
  }

  else {
    var data = []
    var totalProduct = 0
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
    },
  }
}