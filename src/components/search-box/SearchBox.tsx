import Alert from "@component/alert/alert";
// import IconButton from "@component/buttons/IconButton";
import Card from "@component/Card";
import { Span } from "@component/Typography";
import { Product_Filter } from "@data/constants";
import { requred } from "@data/data";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import Box from "../Box";
import Icon from "../icon/Icon";
import MenuItem from "../MenuItem";
import TextField from "../text-field/TextField";
import StyledSearchBox from "./SearchBoxStyle";

export interface SearchBoxProps {}

const SearchBox: React.FC<SearchBoxProps> = () => {
  // const [category] = useState("Categories");
  // const [categoryId] = useState(0);
  const [resultList, setResultList] = useState([]);
  // const [categories, setCategories] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setFieldValue("search", router.query?.name || "");
  }, [router.query?.name]);

  const handleFormSubmit = (values) => {
    router.push({
      pathname: "/product/search/search_by_product_name",
      query: { name: values.search },
    });
  };

  // const handleCategoryChange = (cat) => () => {
  //   setCategory(cat.name);
  //   setCategoryId(cat.id);
  // };

  const hanldeSearch = useCallback((event) => {
    event.persist();
  }, []);

  const handleAutoComplete = (e) => {
    const value = e.target?.value;
    axios
      .get(`${Product_Filter}?page=${1}&size=${10}`, {
        params: { name: value || "" },
      })
      .then((res) => {
        console.log("resSearchProduct", res.data.products);
        setResultList(res?.data?.products);
      })
      .catch(() => {
        setResultList([]);
      });
  };

  const handleDocumentClick = () => {
    setResultList([]);
  };

  const handeleSearch = (value) => {
    setFieldValue("search", value);
  };

  useEffect(() => {
    // axios
    //   .get(`${Category_All_With_Child}`)
    //   .then((res) => {
    //     console.log("Category_All_With_Child", res.data.categories);
    //     let Categoriess = res.data.categories;
    //     // Categoriess?.unshift({ id: 0, name: "All Categories" })
    //     setCategories(Categoriess);
    //   })
    //   .catch((err) => {
    //     console.log("error", err);
    //   });

    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  console.log("resultList", resultList);

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: checkoutSchema,
      onSubmit: handleFormSubmit,
    });

  return (
    <Box
      position="relative"
      // flex="1 1 0"
      // maxWidth="470px"
      // mx="auto"
      display="flex"
    >
      <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
        <StyledSearchBox>
          <TextField
            name="search"
            // className="search-field"
            placeholder="Search for product, brand and more.."
            fullwidth
            autoComplete="off"
            onChange={(e) => {
              handleChange(e);
              hanldeSearch(e);
              handleAutoComplete(e);
            }}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                handleAutoComplete(e);
                handleChange(e);
                hanldeSearch(e);
              }
            }}
            endAdornment={
              // <IconButton
              //   size="small"
              //   type="button"
              //   // p="0.25rem"
              //   // mr="0.25rem"
              //   // color={passwordVisibility ? "gray.700" : "gray.600"}

              //   background="none"
              // >
              <Icon variant="small" onClick={() => handleSubmit()}>
                search
              </Icon>
              // </IconButton>
            }
            value={values.search || ""}
            errorText={touched.search && errors.search}
          />

          <Alert />
          {/* <Menu
            className="category-dropdown"
            direction="right"
            handler={
              <FlexBox className="dropdown-handler" alignItems="center">
                <span>{category}</span>
                <Icon variant="small">chevron-down</Icon>
              </FlexBox>
            }
          >
            {categories?.map((item) => (
              <Link
                key={item?.id}
                href={{
                  pathname: "/product/search/product_by_category",
                  query: { categoryId: item?.id },
                }}
              >
                <MenuItem>{item?.name}</MenuItem>
              </Link>
            ))}
          </Menu> */}
        </StyledSearchBox>

        {!!resultList.length && (
          <Card
            position="absolute"
            top="100%"
            py="0.5rem"
            width="100%"
            boxShadow="large"
            zIndex={99}
          >
            {resultList.map((item) => (
              <Link
                key={item?.id}
                href={{
                  pathname: "/product/search/search_by_product_name",
                  query: { name: item?.name },
                }}
              >
                <MenuItem onClick={() => handeleSearch(item?.name)}>
                  <Span fontSize="14px">{item?.name}</Span>
                </MenuItem>
              </Link>
            ))}
          </Card>
        )}
      </form>
    </Box>
  );
};

const initialValues = {
  search: "",
};

var checkoutSchema: any = yup.object().shape({
  search: yup.string().required("").nullable(requred),
});

export default SearchBox;
