import useFormattedCategoryData from "@customHook/useFormattedCategoryData";
import { Brands_By_Category, Category_All_With_Child } from "@data/constants";
import axios from "axios";
import { useFormik } from "formik";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Accordion from "../accordion/Accordion";
import AccordionHeader from "../accordion/AccordionHeader";
import Card from "../Card";
import CheckBox from "../CheckBox";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Rating from "../rating/Rating";
import TextField from "../text-field/TextField";
import { H5, H6, Paragraph, SemiSpan } from "../Typography";

const ProductFilterCard = ({ productList }) => {
  const [brandlist, setBrandlist] = useState([]);
  const [brandIds, setBrandIds] = useState({});
  const [ratingIds, setRatingIds] = useState({});
  const [categoryId, setCategoryId] = useState<any>("");

  const [formattedCategoryData, setFormattedCategoryData] =
    useFormattedCategoryData();

  console.log(
    "productList Filter",
    productList.map((n) => n.brand)
  );
  const newItem = productList.map((n) => n.brand);
  const uniqueBrands: any = [];
  console.log("uniqueItems", uniqueBrands);

  useEffect(() => {
    localStorage.setItem("uniqueBrands", JSON.stringify(uniqueBrands));
  }, [uniqueBrands]);

  function removeDuplicates(arr) {
    var unique = [];

    arr.forEach((element) => {
      if (!unique.includes(element.id)) {
        unique.push(element.id);
        uniqueBrands.push(element);
      }
    });
    return unique;
  }

  removeDuplicates(newItem);

  const router = useRouter();

  const handleFormSubmit = () => {};

  console.log("router", router.query.type);
  const filterProduct = (type, e, id?: string | number) => {
    // if (router.query.type !== "search_by_product_name") {
    const value = e.target.value;

    const min_price =
      type === "min_price" ? (value ? value : "") : values.min_price;
    const max_price =
      type === "max_price" ? (value ? value : "") : values.max_price;

    if (type === "brand") {
      setBrandIds({
        ...brandIds,
        [`brand${id}`]: brandIds[`brand${id}`] ? 0 : id,
      });
      var brandIDs = {
        ...brandIds,
        [`brand${id}`]: brandIds[`brand${id}`] ? 0 : id,
      };
      var brand = [];
      for (let x in brandIDs) {
        if (brandIDs[x]) {
          brand.push(brandIDs[x]);
        }
      }
    } else {
      var brand = [];
      for (let x in brandIds) {
        if (brandIds[x]) {
          brand.push(brandIds[x]);
        }
      }
    }

    if (type === "rating") {
      setRatingIds({
        ...ratingIds,
        [`rating${id}`]: ratingIds[`rating${id}`] ? 0 : id,
      });
      var ratingIDs = {
        ...ratingIds,
        [`rating${id}`]: ratingIds[`rating${id}`] ? 0 : id,
      };
      var rating = [];
      for (let x in ratingIDs) {
        if (ratingIDs[x]) {
          rating.push(ratingIDs[x]);
        }
      }
    } else {
      var rating = [];
      for (let x in ratingIds) {
        if (ratingIds[x]) {
          rating.push(ratingIds[x]);
        }
      }
    }

    if (type === "category") {
      setCategoryId(id);
    }
    console.log("brandProductSearch", router.query);
    router.push({
      pathname: "/product/search/filter",
      query: {
        categoryId: type === "category" ? id : categoryId,
        name: router.query.name,
        min_price,
        max_price,
        brand: JSON.stringify(brand),
        rating: JSON.stringify(rating),
      },
    });
    // } else {
    //   const value = e.target.value;

    //   const min_price =
    //     type === "min_price" ? (value ? value : "") : values.min_price;
    //   const max_price =
    //     type === "max_price" ? (value ? value : "") : values.max_price;

    //   if (type === "brand") {
    //     setBrandIds({
    //       ...brandIds,
    //       [`brand${id}`]: brandIds[`brand${id}`] ? 0 : id,
    //     });
    //     var brandIDs = {
    //       ...brandIds,
    //       [`brand${id}`]: brandIds[`brand${id}`] ? 0 : id,
    //     };
    //     var brand = [];
    //     for (let x in brandIDs) {
    //       if (brandIDs[x]) {
    //         brand.push(brandIDs[x]);
    //       }
    //     }
    //   } else {
    //     var brand = [];
    //     for (let x in brandIds) {
    //       if (brandIds[x]) {
    //         brand.push(brandIds[x]);
    //       }
    //     }
    //   }

    //   if (type === "rating") {
    //     setRatingIds({
    //       ...ratingIds,
    //       [`rating${id}`]: ratingIds[`rating${id}`] ? 0 : id,
    //     });
    //     var ratingIDs = {
    //       ...ratingIds,
    //       [`rating${id}`]: ratingIds[`rating${id}`] ? 0 : id,
    //     };
    //     var rating = [];
    //     for (let x in ratingIDs) {
    //       if (ratingIDs[x]) {
    //         rating.push(ratingIDs[x]);
    //       }
    //     }
    //   } else {
    //     var rating = [];
    //     for (let x in ratingIds) {
    //       if (ratingIds[x]) {
    //         rating.push(ratingIds[x]);
    //       }
    //     }
    //   }

    //   if (type === "category") {
    //     setCategoryId(id);
    //   }
    //   console.log("brandProductSearch", router.query);
    //   router.push({
    //     pathname: "/product/search/search_by_product_name",
    //     query: {
    //       // categoryId: type === "category" ? id : categoryId,
    //       name: router.query.name,
    //       min_price,
    //       max_price,
    //       brand: JSON.stringify(brand),
    //       // rating: JSON.stringify(rating),
    //     },
    //   });
    // }
  };

  console.log("brandProductSearch", router.query);

  useEffect(() => {
    axios
      .get(`${Category_All_With_Child}`)
      .then((res) => {
        setFormattedCategoryData(res.data.categories);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    if (router.query.categoryId) {
      setCategoryId(router.query.categoryId);

      axios
        .get(`${Brands_By_Category}${router.query.categoryId}`)
        .then((res) => {
          console.log("brandBasedCategory", res.data.brands);
          setBrandlist(res.data.brands);
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
      const updatedBrand: any = localStorage.getItem("uniqueBrands");
      console.log("updatedBrand");
      setBrandlist(JSON.parse(updatedBrand));
    }
  }, [router.query, productList]);

  console.log("categoryId", categoryId);
  const { values, errors, touched, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  });

  console.log("categoryId", categoryId);

  return (
    <Card p="18px 27px" elevation={5}>
      <H6 mb="10px">Categories</H6>

      {!_.isEmpty(formattedCategoryData)
        ? formattedCategoryData.map((item) => {
            return !_.isEmpty(item.menuData.categories) ? (
              <Accordion key={item.id} expanded>
                <AccordionHeader
                  px="0px"
                  py="6px"
                  color="text.muted"
                  // justifyContent="flex-start"
                >
                  <SemiSpan
                    className="cursor-pointer"
                    mr="9px"
                    // onClick={(e) => filterProduct("category", e, item.id)}
                    bg={`${categoryId == item.id && "#d4d4d4"}`}
                    onClick={(e) => filterProduct("category", e, item.id)}
                  >
                    {item.title}
                  </SemiSpan>
                </AccordionHeader>
                {item?.menuData?.categories?.map((category) => {
                  return !_.isEmpty(category.subCategories) ? (
                    <Accordion key={category.id} pl="22px" expanded>
                      <AccordionHeader
                        px="0px"
                        py="6px"
                        color="text.muted"
                        // justifyContent="flex-start"
                      >
                        <SemiSpan
                          className="cursor-pointer"
                          mr="9px"
                          // onClick={(e) => filterProduct("category", e, category.id)}
                          bg={`${categoryId == category.id && "#d4d4d4"}`}
                          onClick={(e) =>
                            filterProduct("category", e, category.id)
                          }
                        >
                          {category.title}
                        </SemiSpan>
                      </AccordionHeader>
                      {category.subCategories.map((subCaterory) => (
                        <Paragraph
                          className="cursor-pointer"
                          fontSize="14px"
                          color="text.muted"
                          pl="22px"
                          py="6px"
                          borderRadius={5}
                          bg={`${categoryId == subCaterory.id && "#d4d4d4"}`}
                          key={subCaterory.id}
                          onClick={(e) =>
                            filterProduct("category", e, subCaterory.id)
                          }
                        >
                          {subCaterory.title}
                        </Paragraph>
                      ))}
                    </Accordion>
                  ) : (
                    <Paragraph
                      className="cursor-pointer"
                      fontSize="14px"
                      color="text.muted"
                      pl="22px"
                      py="6px"
                      borderRadius={5}
                      bg={`${categoryId == category.id && "#d4d4d4"}`}
                      key={category.id}
                      onClick={(e) => filterProduct("category", e, category.id)}
                    >
                      {category.title}
                    </Paragraph>
                  );
                })}
              </Accordion>
            ) : (
              <Paragraph
                className="cursor-pointer"
                fontSize="14px"
                color="text.muted"
                py="6px"
                key={item.id}
                borderRadius={5}
                bg={`${categoryId == item.id && "#d4d4d4"}`}
                onClick={(e) => filterProduct("category", e, item.id)}
              >
                {item.title}
              </Paragraph>
            );
          })
        : ""}

      <Divider mt="18px" mb="24px" />

      <H6 mb="16px">Price Range</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField
          name="min_price"
          placeholder="0"
          type="number"
          fullwidth
          onChange={(e) => {
            handleChange(e);
          }}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              filterProduct("min_price", e);
            }
          }}
          // onBlur={(e) => filterProduct("min_price", e)}
          value={values.min_price || ""}
          errorText={touched.min_price && errors.min_price}
        />
        <H5 color="text.muted" px="0.5rem">
          -
        </H5>
        <TextField
          name="max_price"
          placeholder="250"
          type="number"
          onChange={(e) => {
            handleChange(e);
          }}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              filterProduct("max_price", e);
            }
          }}
          onBlur={(e) => filterProduct("max_price", e)}
          value={values.max_price || ""}
          errorText={touched.max_price && errors.max_price}
          fullwidth
        />
      </FlexBox>

      <Divider my="24px" />

      <H6 mb="16px">Brands</H6>
      {brandlist?.map((brand) => (
        <CheckBox
          key={brand.id}
          name={`brand${brand.id}`}
          checked={brandIds[`brand${brand.id}`]}
          color="secondary"
          label={<SemiSpan color="inherit">{brand.name}</SemiSpan>}
          my="10px"
          onChange={(e) => {
            filterProduct("brand", e, brand.id);
          }}
        />
      ))}

      <Divider my="24px" />

      {/* {otherOptions.map((item) => (
        <CheckBox
          key={item}
          name={item}
          value={item}
          color="secondary"
          label={<SemiSpan color="inherit">{item}</SemiSpan>}
          my="10px"
          onChange={(e) => {
            console.log(e.target.value, e.target.checked);
          }}
        />
      ))} */}

      <Divider my="24px" />

      <H6 mb="16px">Ratings</H6>
      {[5, 4, 3, 2, 1].map((rating) => (
        <CheckBox
          key={rating}
          checked={ratingIds[`rating${rating}`]}
          color="secondary"
          label={<Rating value={rating} outof={5} color="warn" />}
          my="10px"
          onChange={(e) => {
            filterProduct("rating", e, rating);
          }}
        />
      ))}

      <Divider my="24px" />

      {/* <H6 mb="16px">Colors</H6>
      <FlexBox mb="1rem">
        {colorList.map((item) => (
          <Avatar bg={item} size={25} mr="10px" style={{ cursor: "pointer" }} />
        ))}
      </FlexBox> */}
    </Card>
  );
};

// const brandList = ["Maccs", "Karts", "Baars", "Bukks", "Luasis"];
// const otherOptions = ["On Sale", "In Stock", "Featured"];
// const colorList = [
//   "#1C1C1C",
//   "#FF7A7A",
//   "#FFC672",
//   "#84FFB5",
//   "#70F6FF",
//   "#6B7AFF",
// ];

const initialValues = {
  min_price: "",
  max_price: "",
};

const checkoutSchema: any = yup.object().shape({});

export default ProductFilterCard;
