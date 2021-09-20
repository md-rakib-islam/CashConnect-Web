import Card from "@component/Card";
import useFormattedProductData from "@customHook/useFormattedProductData";
import { Brand_Featured, Product_Top_Rated } from "@data/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Box from "../Box";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import ProductCard4 from "../product-cards/ProductCard4";
import ProductCard5 from "../product-cards/ProductCard5";

const Section4: React.FC = () => {

  const [productData, setProductData] = useState([]);
  const [brandData, setBrandData] = useState([])

  const [formattedProductData] = useFormattedProductData(productData, "TopRated")

  const [formattedBrandData] = useFormattedProductData(brandData, "FeaturedBrands")

  useEffect(() => {
    axios.get(`${Product_Top_Rated}`).then(res => {
      console.log("Product_Top_RatedRes", res.data?.top_rating_products)
      setProductData(res.data?.top_rating_products)
    })

    axios.get(`${Brand_Featured}`).then(res => {
      console.log("Brand_FeaturedRes", res.data)
      setBrandData(res.data)
    })
  }, [])

  console.log("formattedBrandData", formattedBrandData)

  return (
    <Box mb="3.75rem">
      <Container>
        <Box>
          <Grid container spacing={6}>
            <Grid item lg={6} xs={12}>
              <CategorySectionHeader
                iconName="ranking-1"
                title="Top Ratings"
                seeMoreLink="#"
              />
              <Card p="1rem">
                <Grid container spacing={4}>
                  {formattedProductData.slice(0, 4).map((item, key) => (
                    <Grid item md={3} sm={6} xs={6} key={key}>
                      <Link href={item.productUrl}>
                        <a>
                          <ProductCard4 {...item} />
                        </a>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <CategorySectionHeader
                iconName="Group"
                title="Featured Brands"
                seeMoreLink="#"
              />
              <Card p="1rem">
                <Grid container spacing={4}>
                  {formattedBrandData.slice(0, 2).map((item, key) => (
                    <Grid item sm={6} xs={12} key={key}>
                      <Link href={item.productUrl}>
                        <a>
                          <ProductCard5 {...item} />
                        </a>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

const brandList = [
  {
    imgUrl: "/assets/images/products/london-britches.png",
    title: "London Britches",
    productUrl: "/product/e1",
  },
  {
    imgUrl: "/assets/images/products/jim and jiko.png",
    title: "Jim & Jago",
    productUrl: "/product/e14",
  },
];

export default Section4;
