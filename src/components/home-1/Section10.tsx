import LazyImage from "@component/LazyImage";
import { BASE_URL, Category_Wth_Name_Img } from "@data/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "../Card";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import Typography from "../Typography";

const Section10: React.FC = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios.get(`${Category_Wth_Name_Img}`).then(res => {
      console.log("Category_Wth_Name_ImgRes", res)
      setCategories(res.data.categories)
    })
  }, [])

  return (
    <Container mb="70px">
      <CategorySectionHeader
        title="Categories"
        iconName="categories"
        seeMoreLink="#"
      />

      <Grid container spacing={6}>
        {categories.map((item, ind) => (
          <Grid item lg={2} md={3} sm={4} xs={12} key={ind}>
            <Link href="/">
              <a>
                <Card
                  display="flex"
                  alignItems="center"
                  p="0.75rem"
                  boxShadow="small"
                  borderRadius={8}
                  hoverEffect
                >
                  <LazyImage
                    src={`${BASE_URL}${item.image}`}
                    loader={() => `${BASE_URL}${item.image}`}
                    alt="fashion"
                    height="40px"
                    width="40px"
                    objectFit="contain"
                    borderRadius={8}
                  />
                  <Typography fontWeight="600" fontSize="14px" ml="10px">
                    {item.name}
                  </Typography>
                </Card>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const categoryList = [
  "Automobile",
  "Car",
  "Fashion",
  "Electronics",
  "Mobile",
  "Laptop",
  "Desktop",
  "Tablet",
  "Fashion",
  "Electronics",
  "Furniture",
  "Camera",
];

export default Section10;
