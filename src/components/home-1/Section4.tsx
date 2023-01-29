import ProductCard1 from "@component/product-cards/ProductCard1";
import _ from "lodash";
import Link from "next/link";
import React from "react";
import Box from "../Box";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";

const Section4 = ({ topRatedList, featuredBrandList }) => {
  return (
    <Box mb="3rem">
      <Container>
        <Box>
          <Grid container spacing={6}>
            {!_.isEmpty(topRatedList) ? (
              <Grid item lg={12} xs={12}>
                <CategorySectionHeader
                  iconName="ranking-1"
                  title="Top Ratings"
                  seeMoreLink="product/search/top_ratings_all"
                />
                {/* <Card p="1rem"> */}
                <Grid container spacing={6}>
                  {topRatedList?.slice(0, 5)?.map((item, key) => (
                    <Grid
                      item
                      lg={2.4}
                      md={4}
                      sm={6}
                      xs={6}
                      key={item?.id || key}
                    >
                      <Link href={item.productUrl}>
                        <a>
                          <ProductCard1 hoverEffect {...item} />
                        </a>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
                {/* </Card> */}
              </Grid>
            ) : (
              <div></div>
            )}
            {!_.isEmpty(featuredBrandList) ? (
              <Grid item md={6} xs={12}>
                <CategorySectionHeader
                  iconName="Group"
                  title="Featured Brands"
                  seeMoreLink="/product/search/view_all/featured_brands"
                />
                {/* <Card p="1rem"> */}
                <Grid container spacing={4}>
                  {featuredBrandList.map((item, key) => (
                    <Grid
                      style={{ width: "30%" }}
                      item
                      sm={6}
                      xs={12}
                      key={key}
                    >
                      <Link
                        href={`product/search/product_by_brand?brandId=${item?.id}`}
                        key={item?.id}
                      >
                        <a>
                          <ProductCard1 hoverEffect {...item} />
                        </a>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
                {/* </Card> */}
              </Grid>
            ) : (
              <div></div>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Section4;
