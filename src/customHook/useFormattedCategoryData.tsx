import _ from "lodash";

function useFormattedNavigationData(navigationData) {

  if (!_.isEmpty(navigationData)) {

    var formattedNavigationData: any = navigationData.map((parent) => {
      let category = {
        id: parent.id,
        icon: "dress",
        title: parent.name,
        href: `/product/search/productByCategory?categoryId=${parent.id}`,
        menuComponent: "MegaMenu1",
        menuData: {
          categories: [],
        },
      };

      parent?.children?.map((child1) => {
        let categories = {
          id: child1.id,
          title: child1.name,
          href: `/product/search/productByCategory?categoryId=${child1.id}`,
          subCategories: [],
        };

        child1?.children?.map((child2) => {
          let subCategories = {
            id: child2.id,
            title: child2.name,
            href: `/product/search/productByCategory?categoryId=${child2.id}`,
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
