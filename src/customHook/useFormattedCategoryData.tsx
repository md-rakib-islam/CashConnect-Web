import { BASE_URL } from "@data/constants";
import _ from "lodash";

function useFormattedNavigationData(navigationData) {

  if (!_.isEmpty(navigationData)) {

    var formattedNavigationData: any = navigationData.map((parent) => {
      let category = {
        id: parent.id,
        icon: `${BASE_URL}${parent?.icon}`,
        title: parent.name,
        href: `/product/search/product_by_category?categoryId=${parent.id}`,
        imgUrl: `${BASE_URL}${parent?.image}`,
        menuComponent: "MegaMenu1",
        menuData: {
          categories: [],
        },
      };

      parent?.children?.map((child1) => {
        let categories = {
          id: child1.id,
          icon: `${BASE_URL}${child1?.icon}`,
          title: child1.name,
          href: `/product/search/product_by_category?categoryId=${child1.id}`,
          imgUrl: `${BASE_URL}${child1?.image}`,
          subCategories: [],
        };

        child1?.children?.map((child2) => {
          let subCategories = {
            id: child2.id,
            title: child2.name,
            icon: `${BASE_URL}${child2?.icon}`,
            href: `/product/search/product_by_category?categoryId=${child2.id}`,
            imgUrl: `${BASE_URL}${child2?.image}`,
          };
          categories?.subCategories?.push(subCategories);
        });

        category?.menuData?.categories?.push(categories);
      });

      return category;
    });
  }
  else {
    var formattedNavigationData: any = []
  }


  return [formattedNavigationData];
}

export default useFormattedNavigationData;
