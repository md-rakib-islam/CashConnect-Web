import Box from "@component/Box";
import Card from "@component/Card";
import Carousel from "@component/carousel/Carousel";
import Currency from "@component/Currency";
import FlexBox from "@component/FlexBox";
import HoverBox from "@component/HoverBox";
import LazyImage from "@component/LazyImage";
import { H4 } from "@component/Typography";
import useFormattedProductData from "@customHook/useFormattedProductData";
import { Product_Discount } from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import _ from "lodash";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";

const Section13 = ({ bigDiscountList }) => {
  const [bigDiscountLists, setbigDiscountLists] = useState(bigDiscountList)
  const [page, setPage] = useState(1)
  const [pageEnd, setpageEnd] = useState(false)
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(4);
    else if (width < 950) setVisibleSlides(6);
    else setVisibleSlides(6);
  }, [width]);

  const getMoreItem = () => {
    console.log("hitGetMore")
    if (!pageEnd) {
      axios.get(`${Product_Discount}?page=${page + 1}&size=${6}`).then(res => {

        if (res.data.total_pages > 1) {
          const [bigDiscountList] = useFormattedProductData(res.data.products, "bigdiscount")
          const bigDiscountListState = bigDiscountLists
          var bigDiscountListAll = bigDiscountListState.concat(bigDiscountList)
          setbigDiscountLists(bigDiscountListAll)
          console.log(bigDiscountListAll)
          setPage(page + 1)
        }
        if (res.data.total_pages == (page + 1)) {
          setpageEnd(true)
        }
      }
      )
    }
  }

  useEffect(() => {
    getMoreItem()
  }, [])

  const big_discount_list = (
    <CategorySectionCreator
      iconName="gift"
      title="Big Discounts"
      seeMoreLink="product/search/big_discounts_all"
    >
      <Box my="-0.25rem">
        <Carousel totalSlides={bigDiscountLists?.length} visibleSlides={visibleSlides} step={visibleSlides} getMoreItem={getMoreItem}>
          {bigDiscountLists?.map((item) => (
            <Box py="0.25rem" key={item.id}>
              <Card p="1rem">
                <Link href={`/product/${item.id}`}>
                  <a>
                    <HoverBox borderRadius={8} mb="0.5rem">
                      <LazyImage
                        src={item.imgUrl}
                        loader={() => item.imgUrl}
                        width="100%"
                        height="auto"
                        layout="responsive"
                        alt={item.title}
                      />
                    </HoverBox>
                    <H4 fontWeight="600" fontSize="14px" mb="0.25rem">
                      {item.title}
                    </H4>

                    <FlexBox>
                      <H4
                        fontWeight="600"
                        fontSize="14px"
                        color="primary.main"
                        mr="0.5rem"
                      >
                        <Currency>{Math.ceil(item.price).toLocaleString()}</Currency>
                      </H4>

                      <H4 fontWeight="600" fontSize="14px" color="text.muted">
                        <del><Currency>{Math.ceil(item.oldPrice).toLocaleString()}</Currency></del>
                      </H4>
                    </FlexBox>
                  </a>
                </Link>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );

  const returnableData = _.isEmpty(bigDiscountList) ? null : big_discount_list

  return returnableData
};

export default Section13;
