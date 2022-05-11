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
        
        iconName="terms"
        title="Terms & Conditions"
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
              
              Welcome to <strong> CashConnect.com, </strong> <br/> CashConnect provides website features and other products and
              services to you when you visit or shop at CashConnect.com <br/>
              <strong> By using CashConnect Services, you agree to these conditions. Please read them carefully.</strong><br/>
              By subscribing to or using any of our services you agree that you have read, 
              understood and are bound by the Terms, regardless of how you subscribe to or use the services.
              In these Terms, references to "you", "User" shall mean the user end, "Service Providers" mean 
              independent third party service providers, and "we", "us" and "our" shall mean Onnorokom 
              Web Services Limited, its franchisor, affiliates and partners.
              </H6>       
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>

                  <Image  src="/assets/images/aboutUs/terms/terms.jpg"
                width="100%"
                p="2rem 2.75rem"
                ></Image>
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
              <div>
                   <H2  p="0 1rem" style={{textAlign:"center"}} color="primary.main"  fontWeight="800" >Rokomari Terms of Use</H2>

                   <Divider width="300px" mx="auto" /> 
                  <H6 p="2rem 2.75rem"  color="#0f3460" fontWeight="500" style={{textAlign:'justify'}}>
                    By subscribing to or using any of our services you agree that you have read, understood and are bound by the Terms, regardless of how you subscribe to or use the services. In these Terms, references to "you", "User" shall mean the user end, "Service Providers" mean independent third party service providers, and "we", "us" and "our" shall mean Onnorokom Web Services Limited, its franchisor, affiliates and partners.

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
