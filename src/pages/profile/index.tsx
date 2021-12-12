import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import Currency from "@component/Currency";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H3, H5, Small } from "@component/Typography";
import useUserInf from "@customHook/useUserInf";
import { BASE_URL, Customer_By_Id } from "@data/constants";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [preViewImg, setpreViewImg] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [birth_day, setbirth_day] = useState("");

  const { user_id, authTOKEN } = useUserInf()

  useEffect(() => {
    axios.get(`${Customer_By_Id}${user_id}`, authTOKEN).then((user) => {
      const { data } = user;
      setpreViewImg(`${BASE_URL}${data.image}`);
      setfirst_name(data.first_name);
      setlast_name(data.last_name);
      setemail(data.email);
      setphone(data.primary_phone);
      setbirth_day(data.date_of_birth);
    }).catch((err) => { console.log("error", err) });
  }, [user_id]);
  return (
    <div>
      <DashboardPageHeader
        iconName="user_filled"
        title="My Profile"
        button={
          <Link href="/profile/edit">
            <Button color="primary" bg="primary.light" px="2rem">
              Edit Profile
            </Button>
          </Link>
        }
      />

      <Box mb="30px">
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FlexBox as={Card} p="14px 32px" height="100%" alignItems="center">
              <Avatar src={preViewImg} size={64} />
              <Box ml="12px" flex="1 1 0">
                <FlexBox
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <H5 my="0px">{`${first_name} ${last_name}`}</H5>
                    <FlexBox alignItems="center">
                      <Typography fontSize="14px" color="text.hint">
                        Balance:
                      </Typography>
                      <Typography ml="4px" fontSize="14px" color="primary.main">
                        <Currency>{500}</Currency>
                      </Typography>
                    </FlexBox>
                  </div>

                  <Typography
                    ontSize="14px"
                    color="text.hint"
                    letterSpacing="0.2em"
                  >
                    SILVER USER
                  </Typography>
                </FlexBox>
              </Box>
            </FlexBox>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item, idx) => (
                <Grid item lg={3} sm={6} xs={6} key={idx}>
                  <FlexBox
                    as={Card}
                    flexDirection="column"
                    alignItems="center"
                    height="100%"
                    p="1rem 1.25rem"
                  >
                    <H3 color="primary.main" my="0px" fontWeight="600">
                      {item.title}
                    </H3>
                    <Small color="text.muted" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </FlexBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow p="0.75rem 1.5rem">
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            First Name
          </Small>
          <span>{first_name}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Last Name
          </Small>
          <span>{last_name}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Email
          </Small>
          <span>{email}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            phone
          </Small>
          <span>{phone}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Birth date
          </Small>
          <span className="pre">
            {/* {format(new Date(1996 / 11 / 16), "dd MMM, yyyy")} */}
            {birth_day && format(new Date(birth_day), "dd MMM, yyyy")}
          </span>
        </FlexBox>
      </TableRow>
    </div>
  );
};

const infoList = [
  {
    title: "16",
    subtitle: "All Orders",
  },
  {
    title: "02",
    subtitle: "Awaiting Payments",
  },
  {
    title: "00",
    subtitle: "Awaiting Shipment",
  },
  {
    title: "01",
    subtitle: "Awaiting Delivery",
  },
];

Profile.layout = DashboardLayout;

export default Profile;
