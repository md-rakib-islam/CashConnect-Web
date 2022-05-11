import Button from "@component/buttons/Button";
import DashboardLayout from "@component/layout/FooterLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import   { H2, H6 } from "@component/Typography";

import Link from "next/link";
import React from "react";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Divider from "@component/Divider";

const Profile = () => {
  return (
    <div>
      <DashboardPageHeader
        
        iconName="policy"
        title="Privacy Policy"
        button={
          <Link href="/">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to home
            </Button>
          </Link>
        }
        
      />
        <TableRow  mb={"10px"} >
          
          <Grid container spacing={6}  >
              
              

              <Grid item lg={6} md={6} sm={12} xs={12}>

              
                <H6 p="2rem 2.75rem"  color="#0f3460"  fontWeight="500" style={{textAlign:'justify'}} > 
              
              <strong> CashConnect.com, </strong> respects your privacy. CashConnect knows that you care how information about you is used and shared,
               and we appreciate your trust that we will do so carefully and sensibly. <br/>
               <br/>
              <strong> You are advised to read the Privacy Policy carefully</strong><br/>
              By accessing the services provided by Rokomari.com you agree to the collection
              and use of your data by Rokomari.com in the manner provided in this Privacy Policy.
              

. 
              </H6>       
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>

                  <Image  src="/assets/images/aboutUs/policy/policy.jpg"
                width="100%"
                p="2rem 2.75rem"
                ></Image>
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
              <div>
                   <H2  p="0 1rem" style={{textAlign:"center"}} color="primary.main"  fontWeight="800" >We want you to</H2>

                   <Divider width="200px" mx="auto" /> 
                  <H6 p="2rem 2.75rem"  color="#0f3460" fontWeight="500" style={{textAlign:'justify'}}>
                    <ul>
                      <li>Feel our website trustworthy.</li>
                      <li>Feel comfortable using our website.</li>
                      <li>Feel secure to submit your informations.</li>
                      <li>Contact us with your questions or concerns about privacy on this site.</li>
                      <li>Know that by using our sites you are consenting to the collection of certain data.</li>
                    </ul> 
                    
                    
                   

                  </H6>
              </div>
              </Grid>

          </Grid>
        </TableRow>
    </div>
  );
};



Profile.layout = DashboardLayout;

export default Profile;
