import Button from "@component/buttons/Button";
import FlexBox from "@component/FlexBox";
import DashboardLayout from "@component/layout/FooterLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import { Small } from "@component/Typography";
// import useUserInf from "@customHook/useUserInf";
// import { BASE_URL, Customer_By_Id, User_Order_Details } from "@data/constants";
// import axios from "axios";
// import { format } from "date-fns";
import Link from "next/link";
import React from "react";

const Career = () => {
  // const [preViewImg, setpreViewImg] = useState("");
  // const [first_name, setfirst_name] = useState("");
  // const [last_name, setlast_name] = useState("");
  // const [email, setemail] = useState("");
  // const [phone, setphone] = useState("");
  // const [birth_day, setbirth_day] = useState("");
  // const [balance, setBalance]= useState([])
  // const [total_orders, setTotal_orders]= useState([])
  // const [pending_orders, setPending_orders]= useState([])
  // const [unpaid_orders, setUnpaid_orders]= useState([])
  // const [deliverable_orders, setDeliverable_orders]= useState([])

  // const { user_id, authTOKEN } = useUserInf()

  // useEffect(() => {
  //   if (user_id) {
  //     axios.get(`${Customer_By_Id}${user_id}`, authTOKEN).then((user) => {
  //       const { data } = user;
  //       setpreViewImg(`${BASE_URL}${data.image}`);
  //       setfirst_name(data.first_name);
  //       setlast_name(data.last_name);
  //       setemail(data.email);
  //       setphone(data.primary_phone);
  //       setbirth_day(data.date_of_birth);
  //     }).catch((err) => { console.log("error", err) });
  //   }
  // }, [user_id]);
  // useEffect(() => {
  //   if (user_id) {
  //     axios.get(`${User_Order_Details}${user_id}`, authTOKEN).then((user) => {
  //       console.log('userDetails', user.data)
  //       setBalance(user.data.balance);
  //       setTotal_orders(user.data.total_orders);
  //       setPending_orders(user.data.pending_orders);
  //       setUnpaid_orders(user.data.unpaid_orders);
  //       setDeliverable_orders(user.data.deliverable_orders);
  //     }).catch((err) => { console.log("error", err) });
  //   }
  // }, [user_id]);
  return (
    <div>
      <DashboardPageHeader
        iconName="work"
        title="Careers with cashconnectBD LTD"
        button={
          <Link href="/">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to home
            </Button>
          </Link>
        }
      />

      {/* <Box mb="30px">
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
                            <span style={{fontWeight: 800,}}>৳</span> {balance}
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
                <Grid item lg={3} sm={6} xs={6}>
                  <FlexBox
                    as={Card}
                    flexDirection="column"
                    alignItems="center"
                    height="100%"
                    p="1rem 1.25rem"
                  >
                    <H3 color="primary.main" my="0px" fontWeight="600">{total_orders}</H3>
                    <Small color="text.muted" textAlign="center">Total Orders</Small>
                  </FlexBox>
                </Grid>
                <Grid item lg={3} sm={6} xs={6}>
                  <FlexBox
                    as={Card}
                    flexDirection="column"
                    alignItems="center"
                    height="100%"
                    p="1rem 1.25rem"
                  >
                    <H3 color="primary.main" my="0px" fontWeight="600">{pending_orders}</H3>
                    <Small color="text.muted" textAlign="center">Pending Orders</Small>
                  </FlexBox>
                </Grid>
                <Grid item lg={3} sm={6} xs={6}>
                  <FlexBox
                    as={Card}
                    flexDirection="column"
                    alignItems="center"
                    height="100%"
                    p="1rem 1.25rem"
                  >
                    <H3 color="primary.main" my="0px" fontWeight="600">{unpaid_orders}</H3>
                    <Small color="text.muted" textAlign="center">Unpaid Orders</Small>
                  </FlexBox>
                </Grid>
                <Grid item lg={3} sm={6} xs={6}>
                  <FlexBox
                    as={Card}
                    flexDirection="column"
                    alignItems="center"
                    height="100%"
                    p="1rem 1.25rem"
                  >
                    <H3 color="primary.main" my="0px" fontWeight="600">{deliverable_orders}</H3>
                    <Small color="text.muted" textAlign="center">Delivered Orders</Small>
                  </FlexBox>
                </Grid>
              
            </Grid>
          </Grid>
        </Grid>
      </Box> */}

      <TableRow p="0.75rem 1.5rem" mb={"10px"}>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Job type
          </Small>
          <span>Full Time</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Position Title
          </Small>
          <span>Frontend Developer,UK</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="1.5rem">
          <Button
            color="primary"
            bg="primary.light"
            borderRadius={"20px"}
            width={"40%"}
          >
            Apply Now
          </Button>
        </FlexBox>
      </TableRow>
      <TableRow p="0.75rem 1.5rem" mb={"10px"}>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Job type
          </Small>
          <span>Full Time</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Position Title
          </Small>
          <span>Frontend Developer,UK</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="1.5rem">
          <Button
            color="primary"
            bg="primary.light"
            borderRadius={"20px"}
            width={"40%"}
          >
            Apply Now
          </Button>
        </FlexBox>
      </TableRow>
      <TableRow p="0.75rem 1.5rem" mb={"10px"}>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Job type
          </Small>
          <span>Full Time</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Position Title
          </Small>
          <span>Frontend Developer,UK</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="1.5rem">
          <Button
            color="primary"
            bg="primary.light"
            borderRadius={"20px"}
            width={"40%"}
          >
            Apply Now
          </Button>
        </FlexBox>
      </TableRow>
      <TableRow p="0.75rem 1.5rem" mb={"10px"}>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Job type
          </Small>
          <span>Full Time</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Position Title
          </Small>
          <span>Frontend Developer,UK</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="1.5rem">
          <Button
            color="primary"
            bg="primary.light"
            borderRadius={"20px"}
            width={"40%"}
          >
            Apply Now
          </Button>
        </FlexBox>
      </TableRow>
    </div>
  );
};

Career.layout = DashboardLayout;

export default Career;
