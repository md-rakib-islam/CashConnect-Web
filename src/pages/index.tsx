import Section13 from "@component/home-1/Section13";
import {
  Brand_Featured,
  Category_Top_All,
  Category_With_Product_Brand,
  Category_Wth_Name_Img,
  Product_Arrival,
  Product_Discount,
  Product_Flash_Deals,
  Product_For_You,
  Product_Top_Rated,
  Slider_All,
} from "@data/constants";
import getFormattedProductData from "@helper/getFormattedProductData";
import axios from "axios";
import { GetServerSideProps } from "next";
import MessengerCustomerChat from "react-messenger-customer-chat";

import Section1 from "../components/home-1/Section1";
import Section10 from "../components/home-1/Section10";
import Section11 from "../components/home-1/Section11";
import Section12 from "../components/home-1/Section12";
import Section2 from "../components/home-1/Section2";
import Section3 from "../components/home-1/Section3";
import Section4 from "../components/home-1/Section4";
import Section5 from "../components/home-1/Section5";
import Section7 from "../components/home-1/Section7";
import AppLayout from "../components/layout/AppLayout";

const IndexPage = ({
  sliderList,
  flashDealsList,
  topCategoryList,
  topRatedList,
  featuredBrandList,
  newArrivalList,
  bigDiscountList,
  categoriesList,
  moreForYouList,
  categoryWithProductBrandList,
}) => {
  return (
    <main>
      <Section1 sliderList={sliderList} />
      <Section2 flashDealsList={flashDealsList} />
      <Section3 topCategoryList={topCategoryList} />
      <Section4
        topRatedList={topRatedList}
        featuredBrandList={featuredBrandList}
      />
      <Section5 newArrivalList={newArrivalList} />
      <Section13 bigDiscountList={bigDiscountList} />
      <Section7 categoryWithProductBrandList={categoryWithProductBrandList} />
      <Section10 categoriesList={categoriesList} />
      <Section11 moreForYouList={moreForYouList} />
      <Section12 />
      {/* <MessengerChat
        pageId="105787914880937"
        language="sv_SE"
        themeColor={"#e94560"}
        bottomSpacing={30}
        loggedInGreeting="loggedInGreeting"
        loggedOutGreeting="loggedOutGreeting"
        greetingDialogDisplay={"show"}
        debugMode={true}
        onMessengerShow={() => {
          console.log("onMessengerShow");
        }}
        onMessengerHide={() => {
          console.log("onMessengerHide");
        }}
        onMessengerDialogShow={() => {
          console.log("onMessengerDialogShow");
        }}
        onMessengerDialogHide={() => {
          console.log("onMessengerDialogHide");
        }}
        onMessengerMounted={() => {
          console.log("onMessengerMounted");
        }}
        onMessengerLoad={() => {
          console.log("onMessengerLoad");
        }}
      /> */}
      <MessengerCustomerChat pageId={105787914880937} appId={317421420602599} />
    </main>
  );
};

IndexPage.layout = AppLayout;

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    var sliderRes = await axios.get(`${Slider_All}`);
    var sliderList: any[] = await sliderRes.data.homepage_sliders;
    await sliderList.sort(function (a, b) {
      return a.serial_number - b.serial_number;
    });
  } catch (err) {
    var sliderList = [];
  }

  try {
    var flashDealsRes = await axios.get(
      `${Product_Flash_Deals}?page=${1}&size=${6}`
    );
    var flashDealsLists: any[] = await flashDealsRes.data.products;
    var flashDealsList = await getFormattedProductData(flashDealsLists);
  } catch (err) {
    var flashDealsList = [];
  }

  try {
    var topCategoryRes = await axios.get(
      `${Category_Top_All}?page=${1}&size=${6}`
    );
    var topCategoryList: any[] = await topCategoryRes.data.categories;
  } catch (err) {
    var topCategoryList = [];
  }

  try {
    var topRatedRes = await axios.get(
      `${Product_Top_Rated}?page=${1}&size=${4}`
    );
    var topRatedLists: any[] = await topRatedRes.data.products;
    var topRatedList = getFormattedProductData(topRatedLists, "TopRated");
  } catch (err) {
    var topRatedList = [];
  }

  try {
    const res = await axios.get(`${Brand_Featured}?page=${1}&size=${2}`);
    var featuredBrandLists: any[] = await res.data.brands;
    var featuredBrandList = getFormattedProductData(
      featuredBrandLists,
      "FeaturedBrands"
    );
  } catch (err) {
    var featuredBrandList = [];
  }

  try {
    var newArrivalRes = await axios.get(
      `${Product_Arrival}?page=${1}&size=${6}`
    );
    var newArrivalLists: any[] = await newArrivalRes.data.products;
    var newArrivalList = getFormattedProductData(newArrivalLists, "Arrivals");
  } catch (err) {
    var newArrivalList = [];
  }

  try {
    var bigDiscountRes = await axios.get(
      `${Product_Discount}?page=${1}&size=${6}`
    );
    var bigDiscountLists: any[] = await bigDiscountRes.data.products;

    console.log("bigDiscountLists", bigDiscountLists);
    var bigDiscountList = getFormattedProductData(
      bigDiscountLists,
      "bigdiscount"
    );
  } catch (err) {
    var bigDiscountList = [];
  }

  try {
    var categoriesRes = await axios.get(
      `${Category_Wth_Name_Img}?page=${1}&size=${12}`
    );
    var categoriesList: any[] = await categoriesRes.data.categories;
  } catch (err) {
    var categoriesList = [];
  }

  try {
    var moreForYouRes = await axios.get(
      `${Product_For_You}?page=${1}&size=${12}`
    );
    var moreForYouLists: any[] = await moreForYouRes.data.products;
    var moreForYouList = getFormattedProductData(moreForYouLists);
  } catch (err) {
    var moreForYouList = [];
  }

  try {
    var categoryWithProductBrandRes = await axios.get(
      `${Category_With_Product_Brand}?page=${1}&size=${10}`
    );
    var categoryWithProductBrandList: any[] = await categoryWithProductBrandRes
      .data.categories_with_products_and_brands;
  } catch (err) {
    var categoryWithProductBrandList = [];
  }

  return {
    props: {
      sliderList,
      flashDealsList,
      topCategoryList,
      topRatedList,
      featuredBrandList,
      newArrivalList,
      bigDiscountList,
      categoriesList,
      moreForYouList,
      categoryWithProductBrandList,
    },
  };
};
