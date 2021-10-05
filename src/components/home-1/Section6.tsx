import LazyImage from "@component/LazyImage";
import ProductCard1 from "@component/product-cards/ProductCard1";
import useFormattedProductData from "@customHook/useFormattedProductData";
import { BASE_URL } from "@data/constants";
import React, { useState } from "react";
import Box from "../Box";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Hidden from "../hidden/Hidden";
import StyledProductCategory from "./ProductCategoryStyle";

export interface Section6Props {
  data?: any;
}

const Section6: React.FC<Section6Props> = ({ data }) => {
  const [selected, setSelected] = useState("");

  const [productList] = useFormattedProductData(data.products)

  const handleCategoryClick = ({ target: { id: brand } }) => {
    if (selected.match(brand)) {
      setSelected("");
    } else setSelected(brand);
  };


  return (
    <Container mb="80px">
      <FlexBox>
        <Hidden down={768} mr="1.75rem">
          <Box shadow={6} borderRadius={10} padding="1.25rem" bg="white">
            {data?.brands?.slice(0.9)?.map((brand, ind) => (
              <StyledProductCategory
                key={brand?.id}
                id={brand?.id}
                mb="0.75rem"
                bg={selected.match(brand?.name) ? "white" : "gray.100"}
                shadow={selected.match(brand?.name) ? 4 : null}
                onClick={handleCategoryClick}
              >
                <LazyImage
                  width="20px"
                  height="20px"
                  layout="fixed"
                  objectFit="contain"
                  src={`${BASE_URL}${brand?.image}`}
                  loader={() => `${BASE_URL}${brand?.image}`}
                  alt="apple"
                />
                <span className="product-category-title">{brand?.name}</span>
              </StyledProductCategory>
            ))}

            <StyledProductCategory
              id="all"
              mt="4rem"
              bg={selected.match("all") ? "white" : "gray.100"}
              shadow={selected.match("all") ? 4 : null}
              onClick={handleCategoryClick}
            >
              <span id="all" className="product-category-title show-all">
                View All Brands
              </span>
            </StyledProductCategory>
          </Box>
        </Hidden>

        <Box flex="1 1 0" minWidth="0px">
          <CategorySectionHeader title={data?.category?.name} categoryId={data?.category?.id} />
          <Grid container spacing={6}>
            {productList.map((item, ind) => (
              <Grid item lg={4} sm={6} xs={12} key={ind}>
                <ProductCard1 hoverEffect {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </FlexBox>
    </Container>
  );
};

const brandList = ["zerrari", "fesla", "btw", "boyota", "gini", "lord"];

export default Section6;
