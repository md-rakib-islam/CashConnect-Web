import Card from "@component/Card";
import _ from "lodash";
import React from "react";
import CategorySectionCreator from "../CategorySectionCreator";
import Grid from "../grid/Grid";
import ProductCard2 from "../product-cards/ProductCard2";

const Section5 = ({ newArrivalList }) => {

  const new_arrival_list = (
    <CategorySectionCreator
      iconName="new-product-1"
      title="New Arrivals"
      seeMoreLink="product/search/new_arrivals_all"
    >
      <Card p="1rem">
        <Grid container spacing={6}>
          {newArrivalList?.slice(0, 6)?.map((item) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={item.id}>
              <ProductCard2 {...item} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </CategorySectionCreator>
  );

  const returnableData = _.isEmpty(newArrivalList) ? null : new_arrival_list

  return returnableData
};

export default Section5;
