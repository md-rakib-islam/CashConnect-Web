import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import NavbarLayout from "@component/layout/NavbarLayout";
import LazyImage from "@component/LazyImage";
import Pagination from "@component/pagination/Pagination";
import PaginationRow from "@component/pagination/PaginationRow";
import ShowingItemNumber from "@component/pagination/ShowingItemNumber";
import ProductCard5 from "@component/product-cards/ProductCard5";
import ProductCard6 from "@component/product-cards/ProductCard6";
import Typography, { SemiSpan } from "@component/Typography";
import useFormattedProductData from "@customHook/useFormattedProductData";
import { BASE_URL, Brand_Featured, Category_Top_All, Category_Wth_Name_Img } from "@data/constants";
import axios from "axios";
import { GetServerSideProps } from 'next';
import React from "react";

const ViewAll = ({ topCategoryLists, CategoryLists, featuredBrandLists, type, totalPage, totalProduct }) => {

    if (type === "top_category") {
        var product_per_page_options = [
            { id: 30, name: 30 },
            { id: 60, name: 60 },
            { id: 90, name: 90 },
        ]
    }
    if (type === "categories") {
        var product_per_page_options = [
            { id: 30, name: 30 },
            { id: 60, name: 60 },
            { id: 90, name: 90 },
        ]
    }
    if (type === "featured_brands") {
        var product_per_page_options = [
            { id: 16, name: 16 },
            { id: 32, name: 32 },
            { id: 48, name: 48 },
        ]
    }


    return (
        <Box pt="20px" pb="80px">

            {type === "top_category" && (<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
                {topCategoryLists.map((item) => (
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
                    {featuredBrandLists.map((item, key) => (
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
            <FlexBox
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
                mt="32px"
            >
                <SemiSpan>Showing <ShowingItemNumber initialNumber={product_per_page_options[0].id} totalItem={totalProduct} /> of {totalProduct} {type === "featured_brands" ? "Brands" : "Categories"}</SemiSpan>
                <Pagination pageCount={totalPage} />
                <PaginationRow product_per_page_option={product_per_page_options} name={type === "featured_brands" ? "brand" : "category"} />
            </FlexBox>
        </Box>
    );
};

ViewAll.layout = NavbarLayout;

export default ViewAll;



export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {

    if (params.type === "top_category") {
        try {
            const res = await axios.get(`${Category_Top_All}?page=${query.page || 1}&size=${query.size || 30}`)
            var topCategoryLists: any[] = await res.data.categories
            var totalPage: number = await res.data.total_pages
            var totalProduct: number = await res.data.total_elements
            var type = "top_category"

        } catch (error) {
            var topCategoryLists = []
            var totalProduct = 0
            var totalPage = 0
            var type = "top_category"
        }
    } else {
        var topCategoryLists = []
    }

    if (params.type === "categories") {
        try {
            const res = await axios.get(`${Category_Wth_Name_Img}?page=${query.page || 1}&size=${query.size || 30}`)
            var CategoryLists: any[] = await res.data.categories
            var totalPage: number = await res.data.total_pages
            var totalProduct: number = await res.data.total_elements
            var type = "categories"

        } catch (error) {
            var CategoryLists = []
            var totalProduct = 0
            var totalPage = 0
            var type = "categories"
        }
    } else {
        var CategoryLists = []
    }

    if (params.type === "featured_brands") {
        try {
            const res = await axios.get(`${Brand_Featured}?page=${query.page || 1}&size=${query.size || 16}`)
            var featuredBrandList: any[] = await res.data.brands
            var [featuredBrandLists] = useFormattedProductData(featuredBrandList, "FeaturedBrands")
            var totalPage: number = await res.data.total_pages
            var totalProduct: number = await res.data.total_elements
            var type = "featured_brands"
            console.log("featuredBrandLists", res.data)

        } catch (error) {
            var featuredBrandLists = []
            var totalProduct = 0
            var totalPage = 0
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
            totalProduct,
            totalPage,
            type,
        },
    }

}