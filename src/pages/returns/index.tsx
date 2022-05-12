import Button from "@component/buttons/Button";
import DashboardLayout from "@component/layout/FooterLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import   {  H3, H6 } from "@component/Typography";

import Link from "next/link";
import React from "react";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Divider from "@component/Divider";

const Profile = () => {
  return (
    <div>
      <DashboardPageHeader
        
        iconName="refund"
        title="Returns and Refunds"
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
              
                  It's a rare case for cashconnect where customers didn't get their products unharmed. But sometimes
                   we may fail to fulfill your expectations, sometimes situations aren't by our side. But there is 
                   now a "Bond of Trust" between customers and cashconnect, So, for further ensuring and encouraging 
                   this "Bond of Trust" cashconnect.com brings you The "Happy Return" policy. Where customers can return 
                   their books or products only if there's something wrong (Torn, Pages missing, Wrong book/Product, etc)
                    with it. In that case cashconnect will give you fresh products in return. Because we believe that
                     happiness should be returned if that happiness can't give you a smile. So, We returned it with 
                     proper happiness. We always want to bring a smile in your face and make you happier. We call this
                      policy of ours "Happy Return".


              

. 
              </H6>       
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>

                  <Image  src="/assets/images/customerCare/return.png"
                width="100%"
                p="2rem 2.75rem"
                ></Image>
              </Grid>
              <Grid item lg={12} sm={12} xs={12}>
              <div>
                  
                  <H3  p="0 1rem" style={{textAlign:"center"}} color="primary.main"  fontWeight="800" >Happy Return & Replacement Policy</H3>

                  <Divider width="200px" mx="auto" /> 
                  <H6 p="2rem 2.75rem"  color="#0f3460" fontWeight="500" style={{textAlign:'justify'}}>
                    If for any reason you are unsatisfied with your order, you may return it as long as your item meets the following criteria:

                    <ul>
                      <li>It is within 03 Days from the delivery date.</li>
                      <li>All items to be returned or exchanged must be unused and in their original condition with all original tags and packaging intact and should not be broken or tampered with.</li>
                      <li>Refund/ replacement for products are subject to inspection and checking by cashconnect team.</li>
                      <li>Damages due to neglect, improper usage or Digital content such as e-books will not be covered under our Returns Policy.</li>
                      <li>Replacement is subject to availability of stock with the Supplier. If the product is out of stock, you will receive a full refund, no questions asked.</li>
                      <li>Please note that the Cash on Delivery convenience charge and the shipping charge would not be included in the refund value of your order as these are non-refundable charges.</li>
                      <li>If the item came with the free promotional items (including but not limited to gifts/ points/wallet money) the free item must also be returned/refunded.</li>
                    </ul> 
                    
                    <span style={{color: "gray"}}>                    Reasons for returns & replacement:</span>
                    <ul>
                      <li>If your product is defective/damaged or incorrect/incomplete at the time of delivery, please contact us within the applicable return window. Your product may be eligible for refund or replacement depending on the product category and condition. Please see the detailed terms in the relevant category below.</li>
                      <li>Please note that some products are not eligible for a return if the product is "No longer needed".</li>
                      <li>You have to claim the return of the product within 3days. Sorry, a return isn't possible after the 3 days limit. You can reach our team for further questions 24/7under admin@cashconnectbd.com</li>
                      <li>Please note that cashconnectbd.com is not obligated to refund the user's money what he/she paid until the product status changed to "Returned".</li>

                    </ul>
                      How to return: <br/>

                      Contact CashConnect Customer Care team by calling 16297 or by emailing care@cashconnectb.com within 03 days after receiving your order.<br/>

                      There are two ways to return/replacement the product to us. In Dhaka City, we offer a free pick up service for your return/replacement. Other than Dhaka City, you have to send the product on your own to our office address.<br/>

                      Once we pick up or receive your return, we will do a quality check of the product at our end and if a return is invalid, we will replace the product with a new one or we will proceed with the refund.


                   

                  </H6>

                  <H3  p="0 1rem" style={{textAlign:"center"}} color="primary.main"  fontWeight="800" >Refund Policy</H3>

                  <Divider width="200px" mx="auto" /> 
                  <H6 p="2rem 2.75rem"  color="#0f3460" fontWeight="500" style={{textAlign:'justify'}}>
                        <ul>
                          <li>The refund will be processed after we have completed evaluating your return.</li>
                          <li>Replacement is subject to availability of stock with the Supplier. If the product is out of stock, you will receive a full refund, no questions asked.</li>
                          <li>Please note that the Cash on Delivery convenience charge and the shipping charge would not be included in the refund value of your order as these are non-refundable charges.</li>
                          <li>If you have selected Cash on Delivery (COD), there is no amount to refund because you haven't paid for your order.</li>
                          <li>For payments made using a Credit Card, Debit Card, Mobile Banking or Bank Transfer, you will receive a refund in your respective.</li>
                          <li>If online payment is made once more due to technical error, payment refund will be made.</li>
                          <li>You will receive a refund anytime between 7-10 working days. If you donât receive refund within this time, please write to us at care@cashconnectb.com and we shall investigate.</li>
                          
                        </ul>
                        <br/>
                      
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
