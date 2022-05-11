import Button from "@component/buttons/Button";
import DashboardLayout from "@component/layout/FooterLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import { H2, H6 } from "@component/Typography";
import Link from "next/link";
import React from "react";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";

const Profile = () => {
  return (
    <div>
      <DashboardPageHeader
        
        iconName="help-center"
        title="Help Center"
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
              
              

              
              <Grid item lg={4} md={6} sm={12} xs={12}>

                <Image  src="assets/images/customerCare/call.svg"
                width="150px"
                height="150px"
                mt="15px"
                style={{marginLeft:"auto", marginRight:"auto"}}
                />
                <H2 m="15px 0" color="primary.main"  fontWeight="600" style={{textAlign:'center'}} > 
                Call Us
              
                </H2>
                <H6 mb="15px" style={{textAlign:'center'}}>Do not hesitate to call us,<br/> anytime readily</H6>
                <H2 mb="15px"color="#0f3460" fontWeight="600" style={{textAlign:'center' , fontFamily: 'cursive'}} > 
                16247
              
                </H2>
              </Grid>
            
              <Grid item lg={4} md={6} sm={12} xs={12}>

                <Image  src="assets/images/customerCare/email.svg"
                width="150px"
                height="150px"
                mt="15px"
                style={{marginLeft:"auto", marginRight:"auto"}}
                />
                <H2 m="15px 0" color="primary.main"  fontWeight="600" style={{textAlign:'center'}} > 
                Email Us
              
                </H2>
                <H6 mb="15px" style={{textAlign:'center'}}>Question, Comment or Concern? <br/>All of them important to us.</H6>
                <H2 mb="15px" color="#0f3460" fontWeight="600" style={{textAlign:'center', fontFamily: 'cursive'}} > 
                admin@cashconnectbd.com
              
                </H2>
              </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>

                <Image  src="assets/images/customerCare/chat.svg"
                width="150px"
                height="150px"
                mt="15px"
                style={{marginLeft:"auto", marginRight:"auto"}}
                />
                <H2 m="15px 0" color="primary.main"  fontWeight="600" style={{textAlign:'center'}} > 
                Live Chat
              
                </H2>
                <H6 mb="15px" style={{textAlign:'center'} }>Hi, we are online,<br/>  any help needed?</H6>
               
              </Grid>
            
             

          </Grid>
        </TableRow>
    </div>
  );
};



Profile.layout = DashboardLayout;

export default Profile;
