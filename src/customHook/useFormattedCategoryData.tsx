import { BASE_URL } from "@data/constants";
import _ from "lodash";
import { useState } from "react";

function useFormattedCategoryData() {

  const [formattedCategoryData, setFormattedCategoryData] = useState([])


  const setFormattedData: any = (data = []) => {
    console.log("formattedData", data)
    if (!_.isEmpty(data) && _.isArray(data)) {

      var formattedData: any = data.map((parent) => {
        let category = {
          id: parent.id,
          icon: `${parent?.icon ? `${BASE_URL}${parent?.icon}` : ""}`,
          title: parent.name,
          href: `/product/search/product_by_category?categoryId=${parent.id}`,
          imgUrl: `${parent?.image ? `${BASE_URL}${parent?.image}` : ""}`,
          menuComponent: "MegaMenu1",
          menuData: {
            categories: [],
          },
        };

        parent?.children?.map((child1) => {
          let categories = {
            id: child1.id,
            icon: `${child1?.icon ? `${BASE_URL}${child1?.icon}` : ""}`,
            title: child1.name,
            href: `/product/search/product_by_category?categoryId=${child1.id}`,
            imgUrl: `${child1?.image ? `${BASE_URL}${child1?.image}` : ""}`,
            subCategories: [],
          };

          child1?.children?.map((child2) => {
            let subCategories = {
              id: child2.id,
              title: child2.name,
              icon: `${child2?.icon ? `${BASE_URL}${child2?.icon}` : ""}`,
              href: `/product/search/product_by_category?categoryId=${child2.id}`,
              imgUrl: `${child2?.image ? `${BASE_URL}${child2?.image}` : ""}`,
            };
            categories?.subCategories?.push(subCategories);
          });

          category?.menuData?.categories?.push(categories);
        });

        return category;
      });
    }
    else {
      var formattedData: any = []
    }

    setFormattedCategoryData(formattedData)

  }

  // const memoizedsetFormattedData = (data) => useCallback(() => setFormattedData(data), [],)

  return [formattedCategoryData, setFormattedData];
}

export default useFormattedCategoryData;
