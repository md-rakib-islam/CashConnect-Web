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
              By accessing the services provided by CashConnect you agree to the collection
              and use of your data by CashConnect in the manner provided in this Privacy Policy.
              

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
                   <H3  p="0 1rem" style={{textAlign:"center"}} color="primary.main"  fontWeight="800" >We want you to</H3>

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

                  <H3  p="0 1rem" style={{textAlign:"center"}} color="primary.main"  fontWeight="800" >What information is, or may be, collected from you?</H3>

                  <Divider width="200px" mx="auto" /> 
                  <H6 p="2rem 2.75rem"  color="#0f3460" fontWeight="500" style={{textAlign:'justify'}}>
                        We will automatically receive and collect certain anonymous information in standard usage logs through our Web server, including computer-identification information obtained from "cookies," sent to your browser from a web server cookie stored on your hard drive an IP address, assigned to the computer which you use the domain server through which you access our service the type of computer you're using the type of web browser you're using. <br/>
                        We may collect the following personally identifiable information about you -
                        <ul>
                          <li>Name including first and last name.</li>
                          <li>Alternate email address.</li>
                          <li>Mobile phone number and contact details.</li>
                          <li>ZIP/Postal code.</li>
                          <li>Financial information (like account or credit card numbers) - Opinions of features on our websites.</li>
                          <li>Other information as per our registration process.</li>
                        </ul>
                        <br/>
                      <span style={{color: "gray"}}>We may also collect the following information -</span>
                      <ul>
                        <li>About the pages you visit/access.</li>
                        <li>The links you click on our site.</li>
                        <li>The number of times you access the page.</li>
                        <li>The number of times you have shopped on our web site.</li>
                      </ul>
                        You can terminate your account at any time. However, your information may remain stored in archive on our servers even after the deletion or the termination of your account.


                </H6>

                <H3  p="0 1rem" style={{textAlign:"center"}} color="primary.main"  fontWeight="800" >Who collects the information?</H3>

                <Divider width="200px" mx="auto" /> 
                <H6 p="2rem 2.75rem"  color="#0f3460" fontWeight="500" style={{textAlign:'justify'}}>
                    We will collect anonymous traffic information from you when you visit our site. We will collect personally identifiable information about you only as part of a voluntary registration process, on-line survey, or contest or any combination there of. Our advertisers may collect anonymous traffic information from their own assigned cookies to your browser. The Site contains links to other Web sites. We are not responsible for the privacy practices of such Web sites which we do not own, manage or control.


                </H6>

                <H3  p="0 1rem" style={{textAlign:"center"}} color="primary.main"  fontWeight="800" >How is the information used</H3>

                <Divider width="200px" mx="auto" /> 
                <H6 p="2rem 2.75rem"  color="#0f3460" fontWeight="500" style={{textAlign:'justify'}}>
                  <span style={{color: "gray"}}>We use your personal information to:</span>
                  <ul>
                    <li>Make our bond more stronger by knowing your interests and tailoring our site to that</li>
                    <li>To get in touch with you when necessary</li>
                    <li>To provide the services requested by you</li>
                    <li>To preserve social history as governed by existing law or policy</li>
                  </ul>
                  
                  <span style={{color: "gray"}}>We use contact information internally to:</span>
                  <ul>
                    <li>contact you as a survey respondent</li>
                    <li>To get in touch with you when necessary</li>
                    <li>notify you if you win any contest; and</li>
                    <li>send you promotional materials from our contest sponsors or advertisers</li>
                  </ul>


                   
                  <span style={{color: "gray"}}>Generally, we use anonymous traffic information to:</span>
                  <ul>
                    <li>remind us of who you are in order to deliver to you a better and more personalized service from both an advertising and an editorial perspective</li>
                    <li>recognize your access privileges to our Websites</li>
                    <li>track your entries in some of our promotions, sweepstakes and contests to indicate a player's progress through the promotion and to track entries, submissions, and status in prize drawings</li>
                    <li>make sure that you don't see the same ad repeatedly</li>
                    <li>help diagnose problems with our server</li>
                    <li>administer our websites, track your session so that we can understand better how people use our sites</li>
                  </ul>

                   


                </H6>
                <H3  p="0 1rem" style={{textAlign:"center"}} color="primary.main"  fontWeight="800" >With whom will your information be shared?</H3>

                <Divider width="200px" mx="auto" /> 
                <H6 p="2rem 2.75rem"  color="#0f3460" fontWeight="500" style={{textAlign:'justify'}}>
                  We will not use your financial information for any purpose other than to complete a transaction with you. We do not rent, sell or share your personal information and we will not disclose any of your personally identifiable information to third parties unless:
                  <ul>
                    <li>we have your permission</li>
                    <li>to provide products or services you've requested</li>
                    <li>to help investigate, prevent or take action regarding unlawful and illegal activities, suspected fraud, potential threat to the safety or security of any person, violations of CashConnect's terms of use or to defend against legal claims</li>
                    <li>Special circumstances such as compliance with subpoenas, court orders, requests/order, notices from legal authorities or law enforcement agencies requiring such disclosure.</li>
                  </ul>
                  <br/>
                  We share your information with advertisers on an aggregate basis only.

                </H6>
                <H3  p="0 1rem" style={{textAlign:"center"}} color="primary.main"  fontWeight="800" >Your rights</H3>

                <Divider width="200px" mx="auto" /> 
                <H6 p="2rem 2.75rem"  color="#0f3460" fontWeight="500" style={{textAlign:'justify'}}>
                  If you are concerned about your data you have the right to request access to the personal data which we may hold or process about you. You have the right to request us to correct any inaccuracies in your data free of charge. At any stage you also have the right to ask us to stop using your personal data for direct marketing purposes.


                </H6>
                <H3  p="0 1rem" style={{textAlign:"center"}} color="primary.main"  fontWeight="800" >Data Deletion Policy</H3>

                <Divider width="200px" mx="auto" /> 
                <H6 p="2rem 2.75rem"  color="#0f3460" fontWeight="500" style={{textAlign:'justify'}}>
                  A user of cashconnect.com can delete their account and delivery data whenever they wish. To do so they need to contact us by sending an email to us at: admin@cashconnect.com or they can directly call us on this number: 16297. On their behalf, we will remove their data. We will aim to complete their deletion request urgently. This data cannot be recovered by any users or employees after this point. Data that has been deleted or otherwise destroyed can not be recovered at any time. Data may still remain in the system backup files, which will be deleted periodically.



                </H6>
                <H3  p="0 1rem" style={{textAlign:"center"}} color="primary.main"  fontWeight="800" >Policy updates</H3>

                <Divider width="200px" mx="auto" /> 
                <H6 p="2rem 2.75rem"  color="#0f3460" fontWeight="500" style={{textAlign:'justify'}}>
                  We reserve the right to change or update this policy at any time by placing a prominent notice on our site. Such changes shall be effective immediately upon posting to this site.
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
