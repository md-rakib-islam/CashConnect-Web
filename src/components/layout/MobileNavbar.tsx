import Accordion from "@component/accordion/Accordion";
import AccordionHeader from "@component/accordion/AccordionHeader";
import Divider from "@component/Divider";
import NavLink from "@component/nav-link/NavLink";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Typography, { Paragraph } from "../Typography";

const MobileNavbar = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleLoadingComplete);
  }, [router.events]);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            top: "0px",
            left: "0px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: " rgb(0 0 0 / 50%)",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <img
            style={{
              height: "50px",
              width: "50px",
              marginTop: "100pz",
            }}
            src="/assets/images/gif/loading.gif"
          />
        </div>
      )}

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
                onClick={() => {
                  if (item?.title === "Home") {
                    setLoading(true);
                  }
                }}
              >
                {item.title}
              </Paragraph>
            </NavLink>
          )}
        </Fragment>
      ))}
    </>
  );
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
    list: [
      {
        href: "/",
        title: "Shop By Store",
      },
      {
        href: "/",
        title: "New",
      },
      {
        href: "/",
        title: "Pre Owned",
      },
    ],
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
      },
    ],
  },
  {
    title: "Get A Loan",
    href: "/",
  },
  {
    title: "Customer Care",
    href: "/help",
  },
];

export default MobileNavbar;
