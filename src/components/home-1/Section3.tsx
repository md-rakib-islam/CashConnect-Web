import Card from "@component/Card";
import Carousel from "@component/carousel/Carousel";
import { BASE_URL, Category_Top_All } from "@data/constants";
import useWindowSize from "@hook/useWindowSize";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";
import ProductCard6 from "../product-cards/ProductCard6";

const Section3: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();

  const [topCategorys, setTopCategorys] = useState([])

  useEffect(() => {
    fetch(`${Category_Top_All}`).then(res => res.json()).then(res => {
      console.log("Category_Top_AllRes", res.categories)
      setTopCategorys(res.categories)
    })
  }, [])

  useEffect(() => {
    if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(6);
  }, [width]);

  console.log("topCategorys", topCategorys)
  return (
    <CategorySectionCreator
      iconName="categories"
      title="Top Categories"
      seeMoreLink="#"
    >
      <Carousel totalSlides={topCategorys.length} visibleSlides={visibleSlides}>
        {topCategorys.map((item, ind) => (
          <Link href={`product/search/${item?.id}`} key={ind}>
            <a>
              <Card p="1rem">
                <ProductCard6
                  title={item?.name}
                  subtitle={"3k orders in this week"}
                  imgUrl={`${BASE_URL}${item?.image}`}
                />
              </Card>
            </a>
          </Link>
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
};

export default Section3;
