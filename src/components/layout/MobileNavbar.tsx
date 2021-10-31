import Accordion from "@component/accordion/Accordion";
import AccordionHeader from "@component/accordion/AccordionHeader";
import Divider from "@component/Divider";
import NavLink from "@component/nav-link/NavLink";
import React, { Fragment } from "react";
import Typography, { Paragraph } from "../Typography";

const MobileNavbar = () => {

  return (
    <>
      {linkLists.map((item, ind) => (
        <Fragment key={ind}>
          <Divider />
          {item.list ? (
            <Accordion>
              <AccordionHeader px="0px" py="10px">
                <Typography fontWeight="600" fontSize="15px">
                  {item.title}
                </Typography>
              </AccordionHeader>

              {item.list?.map((item, ind) => (
                <NavLink className="nav-link" href={item.href} key={ind}>
                  <Paragraph
                    className="cursor-pointer"
                    fontSize="14px"
                    fontWeight="600"
                    pl="20px"
                    py="6px"
                  >
                    {item.title}
                  </Paragraph>
                </NavLink>
              ))}
            </Accordion>
          ) : (
            <NavLink className="nav-link" href={item.href} key={ind}>
              <Paragraph
                className="cursor-pointer"
                fontSize="14px"
                fontWeight="600"
                py="6px"
              >
                {item.title}
              </Paragraph>
            </NavLink>
          )}

        </Fragment>
      ))
      }
    </>
  )
};


const linkLists = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/",
  },
  {
    title: "Shop Now",
    href: "/",
  },
  {
    title: "Sell",
    list: [
      {
        href: "/sell/youritems",
        title: "Sell Online",
      },
      {
        href: "/",
        title: "Sell In Branch",
      }
    ],
  },
  {
    title: "Get A Loan",
    href: "/",
  },
  {
    title: "Contact Us",
    href: "/",
  },
];


export default MobileNavbar;
