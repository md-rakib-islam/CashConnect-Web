import Box from "@component/Box";
import Carousel from "@component/carousel/Carousel";
import ProductCard1 from "@component/product-cards/ProductCard1";
import { Product_Arrival } from "@data/constants";
import getFormattedProductData2 from "@helper/getFormattedProductData2";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";
// import Grid from "../grid/Grid";

const Section5 = ({ newArrivalList }) => {
  const [newArrivalLists, setNewArrivalLists] = useState([]);
  const [page, setPage] = useState(1);
  const [pageEnd, setpageEnd] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(5);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  useEffect(() => {
    setNewArrivalLists(newArrivalList);
  }, [newArrivalList]);

  const getMoreItem = () => {
    if (!pageEnd) {
      console.log("hitGetMoreItem");
      axios.get(`${Product_Arrival}?page=${page + 1}&size=${6}`).then((res) => {
        console.log("res.data.products", res.data.products);
        const newItem = getFormattedProductData2(res.data.products);
        if (res.data.total_pages > 1) {
          const newArrivalState = newArrivalList;
          setNewArrivalLists(newArrivalState.concat(newItem));

          setPage(page + 1);
        }
        if (res.data.total_pages == page + 1) {
          setpageEnd(true);
        }
      });
    } else {
      console.log("NoMreItem");
    }
  };

  useEffect(() => {
    getMoreItem();
  }, []);

  const new_arrival_list = (
    <CategorySectionCreator
      iconName="new-product-1"
      title="New Arrivals"
      seeMoreLink="product/search/new_arrivals_all"
    >
      {/* <Card p="1rem"> */}

      <Box mt="-0.25rem" mb="-0.25rem">
        <Carousel
          totalSlides={newArrivalLists?.length}
          visibleSlides={visibleSlides}
          step={visibleSlides}
          getMoreItem={getMoreItem}
        >
          {newArrivalLists?.map((item) => (
            <Box py="0.25rem" key={item.id}>
              <ProductCard1 hoverEffect {...item} />
            </Box>
          ))}
        </Carousel>
      </Box>
      {/* <Grid container spacing={4}>
        {newArrivalList?.slice(0, 5)?.map((item) => (
          <Grid item lg={2} md={3} sm={4} xs={6} key={item.id}>
            <ProductCard1 hoverEffect {...item} />
          </Grid>
        ))}
      </Grid> */}
      {/* </Card> */}
    </CategorySectionCreator>
  );

  const returnableData = _.isEmpty(newArrivalList) ? null : new_arrival_list;

  return returnableData;
};

export default Section5;
