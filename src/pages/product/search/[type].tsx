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
import Link from "next/link";
// import Select from "@component/Select";
import Sidenav from "@component/sidenav/Sidenav";
import { H5, H6, Paragraph } from "@component/Typography";
import {
  Category_All_Without_Pg,
  New_product_using,
  Product_Arrival,
  Product_Discount,
  Product_Filter,
  Product_Flash_Deals,
  Product_For_You,
  Product_Top_Rated,
  Used_product_using,
} from "@data/constants";
import axios from "axios";
// import { useFormik } from "formik";
import _ from "lodash";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
// import * as yup from "yup";
import useWindowSize from "../../../hooks/useWindowSize";

const ProductSearchResult = ({
  productLists,
  totalProduct,
  totalPage,
  categoryPath,
}) => {
  const [searchingFor, setSearchingFor] = useState("");
  const [totalProducts, setTotalProducts] = useState(totalProduct);
  const [categoryPaths, setCategoryPaths] = useState(categoryPath);
  // const [categoryPathsStyle, setCategoryPathsStyle] = useState(false);
  const [productList, setProductList] = useState(productLists);
  const [categories, setCategories] = useState([]);

  const [view, setView] = useState("grid");
  const width = useWindowSize();
  const isTablet = width < 1025;

  const router = useRouter();

  const id = router.query.categoryId;

  const toggleView = useCallback(
    (v) => () => {
      setView(v);
    },
    []
  );
  // const categoryStyle = {
  //   color: categoryPathsStyle ? "#e84262" : "#7D879C",
  // };
  console.log("categoryPath", categoryPaths);

  // const handleFormSubmit = (e) => {
  //   console.log("shotrbay", e);
  // };

  useEffect(() => {
    const type = router.query.type;
    const { categoryId } = router.query;

    console.log("type", type);

    if (type) {
      if (type === "product_by_category") {
        if (categoryId) {
          if (!_.isEmpty(categories)) {
            setSearchingFor(
              categories.find((deta) => deta.id == categoryId)?.name || ""
            );
          } else {
            fetch(`${Category_All_Without_Pg}`)
              .then((res) => res.json())
              .then((data) => {
                setCategories(data?.categories || []);
                _.isArray(data?.categories) &&
                  setSearchingFor(
                    data?.categories.find((deta) => deta.id == categoryId)
                      ?.name || ""
                  );
              })
              .catch(() => {
                setSearchingFor("");
              });
          }
        }
      }
      if (type === "filter") {
        if (categoryId) {
          if (!_.isEmpty(categories)) {
            setSearchingFor(
              categories.find((deta) => deta.id == categoryId)?.name || ""
            );
          } else {
            fetch(`${Category_All_Without_Pg}`)
              .then((res) => res.json())
              .then((data) => {
                setCategories(data?.categories || []);
                _.isArray(data?.categories) &&
                  setSearchingFor(
                    data?.categories.find((deta) => deta.id == categoryId)
                      ?.name || ""
                  );
              })
              .catch(() => {
                setSearchingFor("");
              });
          }
        }
      } else if (type === "search_by_product_name") {
        const name: any = router.query.name;

        setSearchingFor(name);
      } else if (type === "shop_now") {
        if (router.query.condition === "new") {
          setSearchingFor("New Product");
        } else {
          setSearchingFor("Old Product");
        }
      } else if (type === "flash_deals_all") {
        setSearchingFor("Flash Deals");
      } else if (type === "top_ratings_all") {
        setSearchingFor("Top Ratings");
      } else if (type === "new_arrivals_all") {
        setSearchingFor("New Arrivals");
      } else if (type === "big_discounts_all") {
        setSearchingFor("Big Discounts");
      } else if (type === "more_for_you_all") {
        setSearchingFor("Just For You");
      }
    }
  }, [id, router.query.name]);

  useEffect(() => {
    setProductList(productLists);
    setTotalProducts(totalProduct);
    if (router.query.type === "product_by_category") {
      setCategoryPaths(categoryPath);
    }
  }, [productLists, totalProduct, categoryPath]);

  const categoriesPath = (f, e) => {
    console.log("categoriesPathValue", f, e);
    // if (e.id) {
    //   // setCategoryPathsStyle(true);
    // }
  };

  // const { values, setFieldValue } = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: checkoutSchema,
  //   onSubmit: handleFormSubmit,
  // });
  return (
    <>
      {router.query.type === "product_by_category" && (
        <Box>
          <FlexBox>
            <Link href={`/`}>
              <a style={{ fontSize: "12px", marginInline: "10px" }}>
                <Icon variant="small" color="primary">
                  home
                </Icon>
              </a>
            </Link>

            {categoryPaths?.map((e: any) => (
              <div key={e.id}>
                <Link
                  href={`/product/search/product_by_category?categoryId=${e?.id}`}
                >
                  <a>
                    <H6
                      onClick={(f) => categoriesPath(f, e)}
                      color={"text.muted"}
                      pl={"5px"}
                    >
                      {`/${" " + e.name.trim() + " "}`}
                    </H6>
                  </a>
                </Link>
              </div>
            ))}
          </FlexBox>
        </Box>
      )}
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
            <Paragraph color="text.muted">
              {totalProducts} results found
            </Paragraph>
          </div>
          <FlexBox alignItems="center" flexWrap="wrap">
            {/* <Paragraph color="text.muted" mr="1rem">
            Short by:
          </Paragraph>
          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder="Short by"
              // defaultValue={sortOptions[0]}
              options={sortOptions}
              getOptionLabelBy="label"
              getOptionValueBy="value"
              value={values?.shortBy || ""}
              onSubmit={values?.shortBy}
              onChange={(shortBy: any) => {
                setFieldValue("shortBy", shortBy);
                if (router.query.type == "new_arrivals_all_filter") {
                  router.push({
                    pathname: "/product/search/new_arrivals_all_filter",
                    query: {
                      // categoryId: router.query.categoryId,
                      name: router?.query?.name,
                      ascending: `${shortBy?.value === "High" ? `no` : `yes`}`,
                      maxPrice: router?.query?.max_price || "",
                      minPrice: router?.query?.min_price || "",
                      brand: router?.query?.brand,
                      rating: router?.query?.rating,
                    },
                  });
                }
                if (router.query.type == "new_arrivals_all") {
                  router.push({
                    pathname: "/product/search/new_arrivals_all_filter",
                    query: {
                      // categoryId: type === "category" ? id : categoryId,
                      // name: router.query.name,
                      ascending: `${shortBy?.value === "High" ? `no` : `yes`}`,
                      maxPrice: router?.query?.max_price || "",
                      minPrice: router?.query?.min_price || "",
                      brand: router?.query?.brand,
                      rating: router?.query?.rating,
                    },
                  });
                }
                if (router.query.type == "flash_deals_all") {
                  router.push({
                    pathname: "/product/search/flash_deals_all_filter",
                    query: {
                      // categoryId: type === "category" ? id : categoryId,
                      // name: router.query.name,
                      ascending: `${shortBy?.value === "High" ? `no` : `yes`}`,
                      maxPrice: router?.query?.max_price || "",
                      minPrice: router?.query?.min_price || "",
                      brand: router?.query?.brand,
                      rating: router?.query?.rating,
                    },
                  });
                }

                if (router.query.type == "new_arrivals_all_filter") {
                  router.push({
                    pathname: "/product/search/new_arrivals_all_filter",
                    query: {
                      // categoryId: type === "category" ? id : categoryId,
                      // name: router.query.name,
                      ascending: `${shortBy?.value === "High" ? `no` : `yes`}`,
                      maxPrice: router?.query?.max_price || "",
                      minPrice: router?.query?.min_price || "",
                      brand: router?.query?.brand,
                      rating: router?.query?.rating,
                    },
                  });
                }
                if (router.query.type == "flash_deals_all_filter") {
                  router.push({
                    pathname: "/product/search/flash_deals_all_filter",
                    query: {
                      // categoryId: type === "category" ? id : categoryId,
                      // name: router.query.name,
                      ascending: `${shortBy?.value === "High" ? `no` : `yes`}`,
                      maxPrice: router?.query?.max_price || "",
                      minPrice: router?.query?.min_price || "",
                      brand: router?.query?.brand,
                      rating: router?.query?.rating,
                    },
                  });
                }

                if (router.query.type == "product_by_category") {
                  router.push({
                    pathname: "/product/search/filter",
                    query: {
                      categoryId: router.query.categoryId,
                      name: router.query.name,
                      ascending: `${shortBy?.value === "High" ? `no` : `yes`}`,
                      maxPrice: router?.query?.max_price || "",
                      minPrice: router?.query?.min_price || "",
                      brand: router?.query?.brand,
                      rating: router?.query?.rating,
                    },
                  });
                }
                if (router.query.type == "filter") {
                  router.push({
                    pathname: "/product/search/filter",
                    query: {
                      categoryId: router.query.categoryId,
                      name: router.query.name,
                      ascending: `${shortBy?.value === "High" ? `no` : `yes`}`,
                      maxPrice: router?.query?.max_price || "",
                      minPrice: router?.query?.min_price || "",
                      brand: router?.query?.brand,
                      rating: router?.query?.rating,
                    },
                  });
                }

                if (router.query.type == "search_by_product_name") {
                  router.push({
                    pathname: "/product/search/filter",
                    query: {
                      name: router.query.name,
                      ascending: `${shortBy?.value === "High" ? `no` : `yes`}`,
                      maxPrice: router?.query?.max_price || "",
                      minPrice: router?.query?.min_price || "",
                      brand: router?.query?.brand,
                      rating: router?.query?.rating,
                    },
                  });
                }

                console.log("shortBy", shortBy);
              }}
            />
          </Box> */}

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
                <ProductFilterCard productList={productList} />
              </Sidenav>
            )}
          </FlexBox>
        </FlexBox>

        <Grid container spacing={6}>
          <Hidden as={Grid} item lg={3} xs={12} down={1024}>
            <ProductFilterCard productList={productList} />
          </Hidden>

          <Grid item lg={9} xs={12}>
            {view === "grid" ? (
              <ProductCard1List
                productList={productList}
                totalPage={totalPage}
                totalProduct={totalProduct}
              />
            ) : (
              <ProductCard9List
                productList={productList}
                totalPage={totalPage}
                totalProduct={totalProduct}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

// const sortOptions = [
//   { label: "Price Low to High", value: "Low" },
//   { label: "Price High to Low", value: "High" },
// ];
// const initialValues = {
//   shortBy: "",
// };

// var checkoutSchema = yup.object().shape({});

ProductSearchResult.layout = NavbarLayout;

export default ProductSearchResult;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const category: any = query.categoryId ? query.categoryId : "";
  console.log("type", params.type);

  if (params.type === "product_by_category" || params.type === "search_for") {
    try {
      const res = await fetch(
        `${Product_Filter}?category=${category}&page=${query.page || 1}&size=${
          query.size || 12
        }`
      );
      var json = await res.json();
      var data: any[] = await json.products;
      var totalProduct: number = await json.total_elements;
      var totalPage: number = await json.total_pages;
      var categoryPath: any[] = (await json?.category_minimap) || null;
    } catch (err) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "search_by_product_name") {
    try {
      const name: any = query.name;
      const res = await axios.get(
        `${Product_Filter}?page=${query.page || 1}&size=${query.size || 12}`,
        {
          params: {
            name: name,
          },
        }
      );
      var data: any[] = await res.data.products;
      var totalProduct: number = await res.data.total_elements;
      var totalPage: number = await res.data.total_pages;
      var categoryPath: any[] = (await res.data?.category_minimap) || null;
    } catch (err) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "filter") {
    try {
      const brands: any = query.brand;
      const ratings: any = query.rating;
      const name: any = query.name ? query.name : "";
      const ascending: any = query.ascending ? query.ascending : "";

      const brandIds = JSON.parse(brands);
      const ratingIds = JSON.parse(ratings);

      let params = new URLSearchParams();

      const minPrice: any = query.min_price;
      const maxPrice: any = query.max_price;

      params.append("category", category);
      params.append("name", name);
      params.append("ascending", ascending);
      params.append("min_price", minPrice);
      params.append("max_price", maxPrice);
      brandIds.map((brand) => {
        params.append("brand", brand);
      });
      ratingIds.map((rating) => {
        params.append("rating", rating);
      });

      var request = {
        params: params,
      };

      const res = await axios.get(
        `${Product_Filter}?page=${query.page || 1}&size=${query.size || 12}`,
        request
      );
      var data: any[] = await res.data.products;
      var totalProduct: number = await res.data.total_elements;
      var totalPage: number = await res.data.total_pages;
      var categoryPath: any[] = (await res.data?.category_minimap) || null;
    } catch (err) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "flash_deals_all") {
    try {
      const res = await axios.get(
        `${Product_Flash_Deals}?page=${query.page || 1}&size=${
          query.size || 12
        }`
      );
      var data: any[] = await res.data.products;
      var totalProduct: number = await res.data.total_elements;
      var totalPage: number = await res.data.total_pages;
      var categoryPath: any[] = (await res.data?.category_minimap) || null;
    } catch (error) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "flash_deals_all_filter") {
    try {
      const brands: any = query.brand;
      const ratings: any = query.rating;
      const ascending: any = query.ascending ? query.ascending : "";

      const brandIds = JSON.parse(brands);
      const ratingIds = JSON.parse(ratings);

      let params = new URLSearchParams();

      const minPrice: any = query.min_price;
      const maxPrice: any = query.max_price;

      params.append("ascending", ascending);
      params.append("min_price", minPrice);
      params.append("max_price", maxPrice);
      brandIds.map((brand) => {
        params.append("brand", brand);
      });
      ratingIds.map((rating) => {
        params.append("rating", rating);
      });

      var request = {
        params: params,
      };

      const res = await axios.get(
        `${Product_Flash_Deals}?page=${query.page || 1}&size=${
          query.size || 12
        }`,
        request
      );
      var data: any[] = await res.data.products;
      var totalProduct: number = await res.data.total_elements;
      var totalPage: number = await res.data.total_pages;
      var categoryPath: any[] = (await res.data?.category_minimap) || null;
    } catch (error) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "top_ratings_all") {
    try {
      const res = await axios.get(
        `${Product_Top_Rated}?page=${query.page || 1}&size=${query.size || 12}`
      );
      var data: any[] = await res.data.products;
      var totalProduct: number = await res.data.total_elements;
      var totalPage: number = await res.data.total_pages;
      var categoryPath: any[] = (await res.data?.category_minimap) || null;
    } catch (error) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "top_ratings_all_filter") {
    try {
      const brands: any = query.brand;
      const ratings: any = query.rating;
      const ascending: any = query.ascending ? query.ascending : "";

      const brandIds = JSON.parse(brands);
      const ratingIds = JSON.parse(ratings);

      let params = new URLSearchParams();

      const minPrice: any = query.min_price;
      const maxPrice: any = query.max_price;

      params.append("ascending", ascending);
      params.append("min_price", minPrice);
      params.append("max_price", maxPrice);
      brandIds.map((brand) => {
        params.append("brand", brand);
      });
      ratingIds.map((rating) => {
        params.append("rating", rating);
      });

      var request = {
        params: params,
      };

      const res = await axios.get(
        `${Product_Top_Rated}?page=${query.page || 1}&size=${query.size || 12}`,
        request
      );
      var data: any[] = await res.data.products;
      var totalProduct: number = await res.data.total_elements;
      var totalPage: number = await res.data.total_pages;
      var categoryPath: any[] = (await res.data?.category_minimap) || null;
    } catch (error) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "new_arrivals_all") {
    try {
      const res = await axios.get(
        `${Product_Arrival}?page=${query.page || 1}&size=${query.size || 12}`
      );
      var data: any[] = await res.data.products;
      var totalProduct: number = await res.data.total_elements;
      var totalPage: number = await res.data.total_pages;
      var categoryPath: any[] = (await res.data?.category_minimap) || null;
    } catch (error) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "new_arrivals_all_filter") {
    try {
      const brands: any = query.brand;
      const ratings: any = query.rating;
      const ascending: any = query.ascending ? query.ascending : "";

      const brandIds = JSON.parse(brands);
      const ratingIds = JSON.parse(ratings);

      let params = new URLSearchParams();

      const minPrice: any = query.min_price;
      const maxPrice: any = query.max_price;

      params.append("ascending", ascending);
      params.append("min_price", minPrice);
      params.append("max_price", maxPrice);
      brandIds.map((brand) => {
        params.append("brand", brand);
      });
      ratingIds.map((rating) => {
        params.append("rating", rating);
      });

      var request = {
        params: params,
      };

      const res = await axios.get(
        `${Product_Arrival}?page=${query.page || 1}&size=${query.size || 12}`,
        request
      );
      var data: any[] = await res.data.products;
      var totalProduct: number = await res.data.total_elements;
      var totalPage: number = await res.data.total_pages;
      var categoryPath: any[] = (await res.data?.category_minimap) || null;
    } catch (error) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "big_discounts_all") {
    try {
      const res = await axios.get(
        `${Product_Discount}?page=${query.page || 1}&size=${query.size || 12}`
      );
      var data: any[] = await res.data.products;
      var totalProduct: number = await res.data.total_elements;
      var totalPage: number = await res.data.total_pages;
      var categoryPath: any[] = (await res.data?.category_minimap) || null;
    } catch (error) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "big_discounts_all_filter") {
    try {
      const brands: any = query.brand;
      const ratings: any = query.rating;
      const ascending: any = query.ascending ? query.ascending : "";

      const brandIds = JSON.parse(brands);
      const ratingIds = JSON.parse(ratings);

      let params = new URLSearchParams();

      const minPrice: any = query.min_price;
      const maxPrice: any = query.max_price;

      params.append("ascending", ascending);
      params.append("min_price", minPrice);
      params.append("max_price", maxPrice);
      brandIds.map((brand) => {
        params.append("brand", brand);
      });
      ratingIds.map((rating) => {
        params.append("rating", rating);
      });

      var request = {
        params: params,
      };

      const res = await axios.get(
        `${Product_Discount}?page=${query.page || 1}&size=${query.size || 12}`,
        request
      );
      var data: any[] = await res.data.products;
      var totalProduct: number = await res.data.total_elements;
      var totalPage: number = await res.data.total_pages;
      var categoryPath: any[] = (await res.data?.category_minimap) || null;
    } catch (error) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "more_for_you_all") {
    try {
      const res = await axios.get(
        `${Product_For_You}?page=${query.page || 1}&size=${query.size || 12}`
      );
      var data: any[] = await res.data.products;
      var totalProduct: number = await res.data.total_elements;
      var totalPage: number = await res.data.total_pages;
      var categoryPath: any[] = (await res.data?.category_minimap) || null;
    } catch (error) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "more_for_you_all_filter") {
    try {
      const brands: any = query.brand;
      const ratings: any = query.rating;
      const ascending: any = query.ascending ? query.ascending : "";

      const brandIds = JSON.parse(brands);
      const ratingIds = JSON.parse(ratings);

      let params = new URLSearchParams();

      const minPrice: any = query.min_price;
      const maxPrice: any = query.max_price;

      params.append("ascending", ascending);
      params.append("min_price", minPrice);
      params.append("max_price", maxPrice);
      brandIds.map((brand) => {
        params.append("brand", brand);
      });
      ratingIds.map((rating) => {
        params.append("rating", rating);
      });

      var request = {
        params: params,
      };

      const res = await axios.get(
        `${Product_For_You}?page=${query.page || 1}&size=${query.size || 12}`,
        request
      );
      var data: any[] = await res.data.products;
      var totalProduct: number = await res.data.total_elements;
      var totalPage: number = await res.data.total_pages;
      var categoryPath: any[] = (await res.data?.category_minimap) || null;
    } catch (error) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "product_by_brand") {
    try {
      const res = await axios.get(
        `${Product_Filter}?brand=${query.brandId}&page=${
          query.page || 1
        }&size=${query.size || 12}`
      );
      var data: any[] = await res.data.products;
      var totalProduct: number = await res.data.total_elements;
      var totalPage: number = await res.data.total_pages;
      var categoryPath: any[] = (await res.data?.category_minimap) || null;
    } catch (error) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else if (params.type === "shop_now") {
    console.log("shop_now");
    try {
      if (query.condition === "new") {
        console.log("new");
        const res = await axios.get(
          `${New_product_using}${category}?page=${query.page || 1}&size=${
            query.size || 12
          }`
        );
        console.log("New_product_using", res.data);
        var data: any[] = await res.data.products;
        var totalProduct: number = await res.data.total_elements;
        var totalPage: number = await res.data.total_pages;
      } else if (query.condition === "old") {
        const res = await axios.get(
          `${Used_product_using}${category}?page=${query.page || 1}&size=${
            query.size || 12
          }`
        );
        console.log("Old_product_using", res.data);

        var data: any[] = await res.data.products;
        var totalProduct: number = await res.data.total_elements;
        var totalPage: number = await res.data.total_pages;
        var categoryPath: any[] = (await res.data?.category_minimap) || null;
      } else {
        var data = [];
        var totalProduct = 0;
        var totalPage = 0;
        var categoryPath = [];
      }
    } catch (error) {
      var data = [];
      var totalProduct = 0;
      var totalPage = 0;
      var categoryPath = [];
    }
  } else {
    var data = [];
    var totalProduct = 0;
    var totalPage = 0;
    var categoryPath = [];
  }

  if (!data) {
    return {
      notFound: true,
    };
  }
  // if (!categoryPath) {
  //   return {
  //     notFound: false,
  //   };
  // }

  return {
    props: {
      productLists: data,
      categoryPath,
      totalProduct,
      totalPage,
    },
  };
};
