// export type child1 = any[];

function useFormattedNavigationData(navigationData) {
  const formattedNavigationData = navigationData.map((parent) => {
    let category = {
      icon: "dress",
      title: parent.name,
      href: `/product/search/${parent.id}`,
      menuComponent: "MegaMenu1",
      menuData: {
        categories: [],
      },
      // parent.children.map()
    };

    parent?.children?.map((child1) => {
      let categories = {
        title: child1.name,
        href: `/product/search/${child1.id}`,
        subCategories: [],
      };

      child1?.children?.map((child2) => {
        let subCategories = {
          title: child2.name,
          href: `/product/search/${child2.id}`,
        };
        categories.subCategories.push(subCategories);
      });

      category.menuData.categories.push(categories);
    });

    return category;
  });

  var formattedNavigationDatas = { formattedNavigationData };

  return formattedNavigationDatas;
}

export default useFormattedNavigationData;
