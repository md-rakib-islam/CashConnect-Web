import AppStore from "@component/AppStore";
import Image from "@component/Image";
import { Site_Setting_All } from "@data/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTheme } from "../../utils/utils";
import Box from "../Box";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import Typography, { Paragraph } from "../Typography";

const StyledLink = styled.a`
  position: relative;
  display: block;
  padding: 0.3rem 0rem;
  color: ${getTheme("colors.gray.500")};
  cursor: pointer;
  border-radius: 4px;
  :hover {
    color: ${getTheme("colors.gray.100")};
  }
`;

const initialIconLists = [
  { iconName: "facebook", url: "https://facebook.com/bonik" },
  { iconName: "twitter", url: "https://twitter.com/bonik" },
  { iconName: "instagram", url: "https://www.instagram.com/bonik/" },
];

const Footer: React.FC = () => {
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const [iconList, setIconList] = useState(initialIconLists)

  useEffect(() => {
    fetch(`${Site_Setting_All}`).then(res => res.json()).then(res => {
      const data = res?.general_settings[0]
      setAddress(data?.address)
      setPhone(data?.phone)
      setEmail(data?.email)

      let newIconList = []
      newIconList.push({ iconName: "facebook", url: data?.facebook_url })
      newIconList.push({ iconName: "twitter", url: data?.twitter_url })
      newIconList.push({ iconName: "instagram", url: data?.instagram_url })
      setIconList(newIconList)
    }).catch((err) => { console.log("error", err) })
  }, [])

  return (
    <footer>
      <Box bg="#0F3460">
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={6}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <a>
                    <Image
                      mb="1.25rem"
                      src='/assets/images/logos/footer.png' alt="logo" height="50" width="auto" 
                    />
                  </a>
                </Link>

                <Paragraph mb="1.25rem" color="gray.500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Auctor libero id et, in gravida. Sit diam duis mauris nulla
                  cursus. Erat et lectus vel ut sollicitudin elit at amet.
                </Paragraph>

                <AppStore />
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  About Us
                </Typography>

                <div>
                   <Link href="/careers" >
                    <StyledLink> Careers </StyledLink>
                    </Link>

                   <Link href="/story" >
                    <StyledLink> Our Stories </StyledLink>
                    </Link>

                   <Link href="/terms" >
                    <StyledLink> Terms & Conditions </StyledLink>
                    </Link>
                   <Link href="/policy" >
                    <StyledLink>Privacy Policy</StyledLink>
                    </Link>

                  
                 
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Customer Care
                </Typography>

                <div>
                  <Link href="/help" >
                    <StyledLink> Help Center </StyledLink>
                  </Link>
                  <Link href="/buy_help" >
                    <StyledLink> How to Buy </StyledLink>
                  </Link>
                  <Link href="/track" >
                    <StyledLink> Track Your Order </StyledLink>
                  </Link>
                  <Link href="/purchasing" >
                    <StyledLink> Corporate & Bulk Purchasing </StyledLink>
                  </Link>
                  <Link href="/returns" >
                    <StyledLink> Returns & Refunds</StyledLink>
                  </Link>
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Contact Us
                </Typography>
                <Typography py="0.3rem" color="gray.500">
                  {address}
                </Typography>
                <Typography py="0.3rem" color="gray.500">
                  {email}
                </Typography>
                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  {phone}
                </Typography>

                <FlexBox className="flex" mx="-5px">
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={item.iconName}
                    >
                      <Box
                        m="5px"
                        size="small"
                        p="10px"
                        bg="rgba(0,0,0,0.2)"
                        borderRadius="50%"
                      >
                        <Icon size="12px" defaultcolor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

// const aboutLinks = [
//   "Careers",
//   "Our Stores",
//   "Our Cares",
//   "Terms & Conditions",
//   "Privacy Policy",
// ];

// const customerCareLinks = [
//   "Help Center",
//   "How to Buy",
//   "Track Your Order",
//   "Corporate & Bulk Purchasing",
//   "Returns & Refunds",
// ];

export default Footer;
