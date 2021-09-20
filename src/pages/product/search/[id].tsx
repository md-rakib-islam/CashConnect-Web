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
import { BASE_URL, Category_By_Id, ProductByCategoryId } from "@data/constants";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";

const ProductSearchResult = () => {
  const [view, setView] = useState("grid");
  const width = useWindowSize();
  const isTablet = width < 1025;
  const [categoryName, setcategoryName] = useState("Unknown");
  const [totalProduct, setTotalProduct] = useState(0);
  const [productList, setProductList] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  // const { dispatch } = useAppContext();

  const toggleView = useCallback(
    (v) => () => {
      setView(v);
    },
    []
  );

  useEffect(() => {
    if (id) {
      fetch(`${BASE_URL}${ProductByCategoryId}${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTotalProduct(data.length);

          setProductList(data);
        });
      fetch(`${BASE_URL}${Category_By_Id}${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("categoryName", data.name);
          setcategoryName(data.name);
        })
        .catch(() => {
          setcategoryName("Not Found");
        });
    }
  }, [id]);

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
          <H5>Searching for “ {categoryName} ”</H5>
          <Paragraph color="text.muted">{totalProduct} results found</Paragraph>
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
