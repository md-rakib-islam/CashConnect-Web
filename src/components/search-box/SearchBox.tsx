import Alert from "@component/alert/alert";
import Card from "@component/Card";
import { Span } from "@component/Typography";
import { Category_All, Product_Search } from "@data/constants";
import { requred } from "@data/data";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import Box from "../Box";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import TextField from "../text-field/TextField";
import StyledSearchBox from "./SearchBoxStyle";

export interface SearchBoxProps { }

const SearchBox: React.FC<SearchBoxProps> = () => {
  const [category, setCategory] = useState("All Categories");
  const [categoryId, setCategoryId] = useState(0)
  const [resultList, setResultList] = useState([]);
  const [categories, setCategories] = useState([])

  const router = useRouter()

  useEffect(() => {
      setFieldValue("search", router.query?.search_key || "")
  }, [router.query?.search_key])

  const handleFormSubmit = (values) => {
    router.push({
      pathname: '/product/search/search_by_product_name',
      query: { categoryId: categoryId, search_key: values.search },
    })
  }

  const handleCategoryChange = (cat) => () => {
    setCategory(cat.name);
    setCategoryId(cat.id);
  };


  const hanldeSearch = useCallback((event) => {
    event.persist();
  }, []);

  const handleAutoComplete = (e) => {
    const value = e.target?.value;
    axios.get(`${Product_Search}?page=${1}&size=${10}`, { params: { name: value || "", category: categoryId } }).then(res => {
      console.log("res", res.data.products)
      setResultList(res?.data?.products);
    }).catch(() => { setResultList([]) })
  }

  const handleDocumentClick = () => {
    setResultList([]);
  };

  const handeleSearch = (value) => {
    setFieldValue("search", value)
  }

  useEffect(() => {
    axios.get(`${Category_All}`).then(res => {
      console.log("Category_All", res.data.categories)
      let Categoriess = res.data.categories
      Categoriess?.unshift({ id: 0, name: "All Categories" })
      setCategories(Categoriess)
    }).catch(() => { })

    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <form onSubmit={handleSubmit}>
        <StyledSearchBox>
          <Icon className="search-icon" size="18px" onClick={() => handleSubmit()}>
            search
          </Icon>
          <TextField
            name="search"
            className="search-field"
            placeholder="Search and hit enter..."
            fullwidth
            onChange={(e) => {
              handleChange(e);
              hanldeSearch(e);
              handleAutoComplete(e);
            }
            }
            value={values.search || ""}
            errorText={touched.search && errors.search}
          />

          <Alert />
          <Menu
            className="category-dropdown"
            direction="right"
            handler={
              <FlexBox className="dropdown-handler" alignItems="center">
                <span>{category}</span>
                <Icon variant="small">chevron-down</Icon>
              </FlexBox>
            }
          >
            {categories?.map((item, key) => (
              <MenuItem key={key} onClick={handleCategoryChange(item)}>
                {item?.name}
              </MenuItem>
            ))}
          </Menu>
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
              <Link href={
                {
                  pathname: '/product/search/search_by_product_name',
                  query: { categoryId: categoryId, search_key: item?.name },
                }
              }>
                <MenuItem key={item?.id} onClick={() => handeleSearch(item?.name)}>
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
  search: yup.string().required("").nullable(requred)
})

export default SearchBox;
