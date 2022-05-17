import Box from "@component/Box";
import Card from "@component/Card";
import MenuItem from "@component/MenuItem";
import { Get_all_parent_category_without_pagination } from "@data/constants";
import navbarNavigations from "@data/navbarNavigations";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import Categories from "../categories/Categories";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import NavLink from "../nav-link/NavLink";
import Typography, { Span } from "../Typography";
import DropDownStyle from "./DropDown.module.css";
import StyledNavbar from "./NavbarStyle";
export interface NavbarProps {
  navListOpen?: boolean;
}

interface Nav {
  title: string;
  url: string;
  child: Nav[];
  extLink?: boolean;
}


const Navbar: React.FC<NavbarProps> = ({ navListOpen }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  // top Category
  const [topCategory, setTopCategory] = useState([]);
  useEffect(() => {
    axios.get(Get_all_parent_category_without_pagination).then((res) => {
      console.log("topCategory", res.data);

      setTopCategory(res.data.parent_categories);
    });
  }, []);
  useEffect(() => {
    router.events.on("routeChangeComplete", handleLoadingComplete);
  }, [router.events]);

  const renderNestedNav = (list: any[], isRoot = false) => {
    return list?.map((nav: Nav) => {
      if (isRoot) {
        if (nav.url && nav.extLink)
          return (
            <>
              <NavLink
                className="nav-link"
                href={nav.url}
                key={nav.title}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (nav?.title === "Home") {
                    setLoading(true);
                  }
                }}
              >
                {nav.title}
              </NavLink>
            </>
          );
        else if (nav.url)
          return (
            <NavLink
              className="nav-link"
              href={nav.url}
              key={nav.title}
              onClick={() => {
                if (nav?.title === "Home") {
                  setLoading(true);
                }
              }}
            >
              {nav.title}
            </NavLink>
          );
        if (nav.child)
          return (
            <FlexBox
              className="root"
              position="relative"
              flexDirection="column"
              alignItems="center"
              key={nav.title}
            >
              <Span className="nav-link">{nav.title}</Span>
              <Box className="root-child">
                <Card
                  mt="1.25rem"
                  py="0.5rem"
                  boxShadow="large"
                  minWidth="230px"
                >
                  {renderNestedNav(nav.child)}
                </Card>
              </Box>
            </FlexBox>
          );
      } else {
        if (nav.url)
          return (
            <NavLink href={nav.url} key={nav.title}>
              <MenuItem>
                <Span fontSize="14px">{nav.title}</Span>
              </MenuItem>
            </NavLink>
          );

        if (nav.child)
          return (
            <Box
              className="parent"
              position="relative"
              minWidth="230px"
              key={nav.title}
            >
              <MenuItem color="gray.700">
                <Span flex="1 1 0" fontSize="14px">
                  {nav.title}
                </Span>
                <Icon size="8px" defaultcolor="currentColor">
                  right-arrow
                </Icon>
              </MenuItem>
              <Box className="child" pl="0.5rem">
                <Card py="0.5rem" boxShadow="large" minWidth="230px">
                  {renderNestedNav(nav.child)}
                </Card>
              </Box>
            </Box>
          );
      }
    });
  };

  return (
    <>
      {loading && (
         <div style={{
          position: 'fixed',
          height: '100%',
          width: '100%',
          top: '0px',
          left: '0px',
          display: 'flex',
          justifyContent: "center",
          backgroundColor: " rgb(0 0 0 / 50%)",
          alignItems: "center",
          zIndex: 100,
        }}>
          <img style={{
            height: "100px",
            width: "100px",
            marginTop: "100pz"
          }}
            src="/assets/images/gif/loading.gif" />
        </div>
      )}
      <StyledNavbar>
        <Container
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <Categories open={navListOpen}>
            <Button
              width="278px"
              height="40px"
              bg="body.default"
              variant="text"
            >
              <Icon>categories</Icon>
              <Typography
                fontWeight="600"
                textAlign="left"
                flex="1 1 0"
                ml="10px"
                color="text.muted"
              >
                Categories
              </Typography>
              <Icon className="dropdown-icon" variant="small">
                chevron-right
              </Icon>
            </Button>
          </Categories>

          <FlexBox>
      
            <div className={DropDownStyle.link}> 
            <NavLink
              className={DropDownStyle.home}
              href="/"
              onClick={() =>  setLoading(true)}
            >
              Home
            </NavLink>
            </div>
          
            <div className={DropDownStyle.dropdown}>
              <a className={DropDownStyle.dropbtn}>Shop Now</a>
              <div className={DropDownStyle.dropdown_content}>
                <div className={DropDownStyle.dropdown2}>
                  <button className={DropDownStyle.dropbtn2}>Show Branch</button>
                  <div className={DropDownStyle.dropdown_content2}>
                    {/* {topCategory.map((n) => (
                      <Link
                        href={`/product/search/shop_now?condition=new&categoryId=${n.id}`}
                      >
                        <a>{n.name}</a>
                      </Link>
                    ))} */}
                  </div>
                </div>

                <div className={DropDownStyle.dropdown2}>
                  <button className={DropDownStyle.dropbtn2}>New</button>
                  <div className={DropDownStyle.dropdown_content2}>
                    {topCategory.map((n) => (
                      <Link
                        href={`/product/search/shop_now?condition=new&categoryId=${n.id}`}
                      >
                        <a>{n.name}</a>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className={DropDownStyle.dropdown2}>
                  <button className={DropDownStyle.dropbtn2}>Old</button>
                  <div className={DropDownStyle.dropdown_content2}>
                    {topCategory.map((n) => (
                      <Link
                        href={`/product/search/shop_now?condition=old&categoryId=${n.id}`}
                      >
                        <a>{n.name}</a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {renderNestedNav(navbarNavigations, true)}
          </FlexBox>
        </Container>
      </StyledNavbar>
    </>
  );
};

export default Navbar;
