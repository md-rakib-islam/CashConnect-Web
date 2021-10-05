import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import NavbarLayout from "@component/layout/NavbarLayout";
import LazyImage from "@component/LazyImage";
import Pagination from "@component/pagination/Pagination";
import ProductCard5 from "@component/product-cards/ProductCard5";
import ProductCard6 from "@component/product-cards/ProductCard6";
import Typography, { SemiSpan } from "@component/Typography";
import useFormattedProductData from "@customHook/useFormattedProductData";
import { BASE_URL, Brand_Featured, Category_Top_All, Category_Wth_Name_Img } from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import React from "react";

const ViewAll = ({ topCategoryLists, CategoryLists, featuredBrandLists, type }) => {

    const width = useWindowSize();
    const isTablet = width < 1025;

    const router = useRouter();

    var id = router.query.categoryId;

    const [formattedBrandData] = useFormattedProductData(featuredBrandLists, "FeaturedBrands")

    return (
        <Box pt="20px" pb="80px">

            {type === "top_category" && (<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
                {topCategoryLists.map((item, ind) => (
                    // <Link href={`product/search/${item?.id}`} key={ind}>
                    <div style={{ flexBasis: "150px", flexGrow: 1, maxWidth: "200px", margin: "10px" }}>
                        <Card p="1rem">
                            <ProductCard6
                                title={item?.name}
                                subtitle={"3k orders in this week"}
                                imgUrl={`${BASE_URL}${item?.image}`}
                            />
                        </Card>
                    </div>
                    // </Link>
                ))}
            </div>)}
            {type === "categories" && (<Grid container spacing={6}>
                {CategoryLists?.map((item, ind) => (
                    <Grid item lg={2} md={3} sm={4} xs={12} key={ind}>
                        {/* <Link href="/"> */}
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
                        {/* </Link> */}
                    </Grid>
                ))}
            </Grid>)}
            {type === "featured_brands" && (<Card p="1rem">
                <Grid container spacing={4}>
                    {formattedBrandData.map((item, key) => (
                        <Grid item sm={3} xs={12} key={key}>
                            {/* <Link href={item.productUrl}> */}
                            <a>
                                <ProductCard5 {...item} />
                            </a>
                            {/* </Link> */}
                        </Grid>
                    ))}
                </Grid>
            </Card>)}
            <div style={{ marginTop: "40px", width: "100%", display: "flex", justifyContent: "space-between" }}>
                <SemiSpan>Showing 1-10 of {100} Products</SemiSpan>
                <Pagination pageCount={10} /></div>
        </Box>
    );
};

ViewAll.layout = NavbarLayout;

export default ViewAll;


export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {

    // const category = query.categoryId


    if (params.type === "top_category") {
        try {
            const res = await axios.get(`${Category_Top_All}`)
            var topCategoryLists: any[] = await res.data.categories
            var type = "top_category"

        } catch (error) {
            var topCategoryLists = []
            var type = "top_category"
        }
    } else {
        var topCategoryLists = []
    }

    if (params.type === "categories") {
        try {
            const res = await axios.get(`${Category_Wth_Name_Img}`)
            var CategoryLists: any[] = await res.data.categories
            var type = "categories"

        } catch (error) {
            var CategoryLists = []
            var type = "categories"
        }
    } else {
        var CategoryLists = []
    }

    if (params.type === "featured_brands") {
        try {
            const res = await axios.get(`${Brand_Featured}`)
            var featuredBrandLists: any[] = await res.data
            var type = "featured_brands"

        } catch (error) {
            var featuredBrandLists = []
            var type = "featured_brands"
        }
    } else {
        var featuredBrandLists = []
    }

    return {
        props: {
            topCategoryLists,
            CategoryLists,
            featuredBrandLists,
            type,
        },
    }

}