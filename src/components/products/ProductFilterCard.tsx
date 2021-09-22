import { Brand_All, Product_Filter } from "@data/constants";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Accordion from "../accordion/Accordion";
import AccordionHeader from "../accordion/AccordionHeader";
import Avatar from "../avatar/Avatar";
import Card from "../Card";
import CheckBox from "../CheckBox";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Rating from "../rating/Rating";
import TextField from "../text-field/TextField";
import { H5, H6, Paragraph, SemiSpan } from "../Typography";


const ProductFilterCard = () => {
  const [brandlist, setBrandlist] = useState([])

  const handleFormSubmit = () => { }

  const filterProduct = (type, e) => {
    const value = e.target.value
    console.log("type", type)
    console.log("e", e.target.value)

    const min_price = type === "min_price" ? value : values.min_price
    const max_price = type === "max_price" ? value : values.max_price

    console.log("pram:", { min_price, max_price, brand: 1, })

    axios.get(`${Product_Filter}`, { params: { min_price, max_price, brand: [1, 2] } }).then(res => {
      console.log("Product_FilterRes", res.data.products)
    })
  }

  useEffect(() => {
    axios.get(`${Brand_All}`).then(res => {
      console.log("brands", res.data.brands)
      setBrandlist(res.data.brands)
    })
  }, [])

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
    <Card p="18px 27px" elevation={5}>
      <H6 mb="10px">Categories</H6>

      {categroyList.map((item) =>
        item.subCategories ? (
          <Accordion key={item.title} expanded>
            <AccordionHeader
              px="0px"
              py="6px"
              color="text.muted"
            // justifyContent="flex-start"
            >
              <SemiSpan className="cursor-pointer" mr="9px">
                {item.title}
              </SemiSpan>
            </AccordionHeader>
            {item.subCategories.map((name) => (
              <Paragraph
                className="cursor-pointer"
                fontSize="14px"
                color="text.muted"
                pl="22px"
                py="6px"
                key={name}
              >
                {name}
              </Paragraph>
            ))}
          </Accordion>
        ) : (
          <Paragraph
            className="cursor-pointer"
            fontSize="14px"
            color="text.muted"
            py="6px"
            key={item.title}
          >
            {item.title}
          </Paragraph>
        )
      )}

      <Divider mt="18px" mb="24px" />

      <H6 mb="16px">Price Range</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField
          name="min_price"
          placeholder="0"
          type="number"
          fullwidth
          onChange={(e) => {
            filterProduct("min_price", e);
            handleChange(e);
          }}
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
          fullwidth onChange={(e) => {
            filterProduct("max_price", e);
            handleChange(e)
          }}
          value={values.max_price || ""}
          errorText={touched.max_price && errors.max_price}
        />
      </FlexBox>

      <Divider my="24px" />

      <H6 mb="16px">Brands</H6>
      {brandlist.map((brand) => (
        <CheckBox
          key={brand.id}
          name={`brand${brand.id}`}
          value={`brand${brand.id}`}
          color="secondary"
          label={<SemiSpan color="inherit">{brand.name}</SemiSpan>}
          my="10px"
          onChange={(e) => {
            filterProduct("brand", `brand${brand.id}`);
            handleChange(e);
          }}
        />
      ))}

      <Divider my="24px" />

      {otherOptions.map((item) => (
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
      ))}

      <Divider my="24px" />

      <H6 mb="16px">Ratings</H6>
      {[5, 4, 3, 2, 1].map((item) => (
        <CheckBox
          key={item}
          value={item}
          color="secondary"
          label={<Rating value={item} outof={5} color="warn" />}
          my="10px"
          onChange={(e) => {
            console.log(e.target.value, e.target.checked);
          }}
        />
      ))}

      <Divider my="24px" />

      <H6 mb="16px">Colors</H6>
      <FlexBox mb="1rem">
        {colorList.map((item) => (
          <Avatar bg={item} size={25} mr="10px" style={{ cursor: "pointer" }} />
        ))}
      </FlexBox>
    </Card>
  );
};

const categroyList = [
  {
    title: "Bath Preparations",
    subCategories: ["Bubble Bath", "Bath Capsules", "Others"],
  },
  {
    title: "Eye Makeup Preparations",
  },
  {
    title: "Fragrance",
  },
  {
    title: "Hair Preparations",
  },
];

// const brandList = ["Maccs", "Karts", "Baars", "Bukks", "Luasis"];
const otherOptions = ["On Sale", "In Stock", "Featured"];
const colorList = [
  "#1C1C1C",
  "#FF7A7A",
  "#FFC672",
  "#84FFB5",
  "#70F6FF",
  "#6B7AFF",
];

const initialValues = {
  min_price: "",
  max_price: "",
}

const checkoutSchema: any = yup.object().shape({});

export default ProductFilterCard;
