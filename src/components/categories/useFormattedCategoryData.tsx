function useFormattedNavigationData(navigationData) {
  const formattedNavigationData = navigationData.map((data) => {
    return {
      icon: "dress",
      title: data.name,
      href: `/product/search/${data.id}`,
      menuComponent: "MegaMenu1",
    };
  });

  return [formattedNavigationData];
}

export default useFormattedNavigationData;
