import _ from "lodash";
import React from "react";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import ProductCard1 from "../product-cards/ProductCard1";

const Section11 = ({ moreForYouList }) => {
  const moreForYouLists = (
    <Container mb="70px">
      <CategorySectionHeader
        title="Just For You"
        seeMoreLink="product/search/more_for_you_all"
      />
      <Grid container spacing={6}>
        {moreForYouList.map((item, ind) => (
          <Grid item lg={2} md={3} sm={4} xs={12} key={item?.id || ind}>
            <ProductCard1 off={0} hoverEffect {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  const returnableData = _.isEmpty(moreForYouList) ? null : moreForYouLists;

  return returnableData;
};

export default Section11;
