import LazyImage from "@component/LazyImage";
import { BASE_URL } from "@data/constants";
import _ from "lodash";
import React from "react";
import Card from "../Card";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import Typography from "../Typography";
import Link from "next/link";

const Section10 = ({ categoriesList }) => {
  const categories_list = (
    <Container mb="70px">
      <CategorySectionHeader
        title="Categories"
        iconName="categories"
        seeMoreLink="/product/search/view_all/categories"
      />

      <Grid container spacing={6}>
        {categoriesList?.map((item, ind) => (
          <Grid item lg={2} md={3} sm={6} xs={6} key={ind}>
            <Link
              href={`product/search/product_by_category?categoryId=${item?.id}`}
              key={item?.id}
            >
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

  const returnableData = _.isEmpty(categoriesList) ? null : categories_list;

  return returnableData;
};

export default Section10;
