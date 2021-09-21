import Card from "@component/Card";
import { Span } from "@component/Typography";
import { Category_All } from "@data/constants";
import axios from "axios";
import { useFormik } from "formik";
import { debounce } from "lodash";
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

  const handleFormSubmit = (values) => {
    console.log("values", values)
    router.push(`${categoryId}/${values.search}`)
  }

  const handleCategoryChange = (cat) => () => {
    setCategory(cat.name);
    setCategoryId(cat.id);
  };

  const search = debounce((e) => {
    const value = e.target?.value;

    if (!value) setResultList([]);
    else setResultList(dummySearchResult);
  }, 200);

  const hanldeSearch = useCallback((event) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => {
    setResultList([]);
  };

  useEffect(() => {
    axios.get(`${Category_All}`).then(res => {
      console.log("Category_All", res.data.categories)
      let Categoriess = res.data.categories
      Categoriess.unshift({ id: 0, name: "All Categories" })
      setCategories(Categoriess)
    })

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
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <form onSubmit={handleSubmit}>
        <StyledSearchBox>
          <Icon className="search-icon" size="18px" onClick={handleSubmit}>
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
            }
            }
            value={values.search || ""}
            errorText={touched.search && errors.search}
          />
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
            {categories.map((item, key) => (
              <MenuItem key={key} onClick={handleCategoryChange(item)}>
                {item?.name}
              </MenuItem>
            ))}
          </Menu>
          {/* <Box className="menu-button" ml="14px" cursor="pointer">
          <Icon color="primary">menu</Icon>
        </Box> */}
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
              <Link href={`/product/search/${item}`} key={item}>
                <MenuItem key={item}>
                  <Span fontSize="14px">{item}</Span>
                </MenuItem>
              </Link>
            ))}
          </Card>
        )}
      </form>
    </Box>
  );
};

// const categories = [
//   "All Categories",
//   "Car",
//   "Clothes",
//   "Electronics",
//   "Laptop",
//   "Desktop",
//   "Camera",
//   "Toys",
// ];

const initialValues = {
  search: "",
};

const dummySearchResult = [
  "Macbook Air 13",
  "Ksus K555LA",
  "Acer Aspire X453",
  "iPad Mini 3",
];

var checkoutSchema: any = yup.object().shape({
  search: yup.string().required("")
})

export default SearchBox;
