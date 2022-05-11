import Button from "@component/buttons/Button";
import FlexBox from "@component/FlexBox";
import DashboardLayout from "@component/layout/FooterLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import   {  H4 } from "@component/Typography";

import Link from "next/link";
import React from "react";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";

const Profile = () => {
  return (
    <div>
      <DashboardPageHeader
        
        iconName="story"
        title="Our Story"
        button={
          <Link href="/">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to home
            </Button>
          </Link>
        }
      />
      <TableRow p="0.75rem 1.5rem" mb={"10px"} >
        <Grid item lg={6} sm={12} xs={12}>

        <FlexBox  p="0.5rem">
        
          <H4 color="#0f3460" my="0px" fontWeight="600" style={{textAlign:'justify'}}> 
         
          Every business has an origin story worth telling, and usually, one that justifies why you even do business and have clients. 
          Some centennial enterprises have pages of content that can fit in this section,
           while startups can tell the story of how the company was born, its challenges, and its vision for the future.</H4>
         
         
        </FlexBox>
        </Grid>
       <Grid item lg={6} sm={12} xs={12}>

          <FlexBox  p="1.5rem">
            <Image  src="/assets/images/aboutUs/story/story.png"
          maxWidth="400px"
          width="100%"
          height="350px"
          mb="2rem"></Image>
          </FlexBox>
        </Grid>
      </TableRow>
       
    </div>
  );
};



Profile.layout = DashboardLayout;

export default Profile;
