const navbarNavigations = [
  {
    title: "Home",
    url: "/",
    child: [],
  },
  {
    title: "About Us",
    url: "",
  },
  {
    title: "Shop Now",
    child: [
      {
       
        title: "Shop By Store",
        url: "/",
      },
      {
        title: "New",
        url: "/",
      },
      {
        title: "Old",
        url: "/",
      }
    ],
  },
  {
    title: "Sell",
    child: [
      {
        title: "Sell Online",
        url: "/sell/youritems",
      },
      {
        title: " Sell In Branch",
        url: "/",
      },
    ],
  },
  {
    title: "Get A Loan",
    url: "/",
  },
  {
    title: "Contact Us",
    url: "/",
  },
  
];

export default navbarNavigations;
