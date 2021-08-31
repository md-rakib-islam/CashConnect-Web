
function useFormattedNavigationData(navigationData) {
  //  const [formattedNavigationData, setNavigation] = useState([]);
  const formattedNavigationData = navigationData.map(data => {
    return {
      icon: "dress",
      title: data.name,
      href: `/product/search/${data.name}`,
      menuComponent: "MegaMenu1",
    }
  }
  )

  return [formattedNavigationData];
}

export default useFormattedNavigationData;
