import Button from "@component/buttons/Button";
import DashboardLayout from "@component/layout/FooterLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import  { H1,  } from "@component/Typography";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Branch_All } from "@data/constants";
import Grid from "@component/grid/Grid";
import Image from "@component/Image";
import BranchRow from "@component/BranchRow";


const Branches = () => {

  const [getBranch, setGetBranch] = useState([]);
  console.log('getBranch',getBranch)


  useEffect(() => {
    
      axios.get(`${Branch_All}`).then((branch) => {
        console.log('branchDetailssss', branch.data)
        setGetBranch(branch.data.branches)
      }).catch((err) => { console.log("error", err) });
    
  }, []);
  return (
    <div>
      <DashboardPageHeader
        
        button={
          <Link href="/">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to home
            </Button>
          </Link>
        }
      />
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>

              
                <H1 p="2rem 2.75rem"  color="#0f3460"  fontWeight="800" style={{textAlign:'justify'}} > 
              
                  FIND OUR <br/>  NEAREST <span style={{color:"rgb(232 66 98)"}}> BRANCH </span>
                </H1>       
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>

                  <Image  src="/assets/images/customerCare/return.png"
                width="100%"
                p="2rem 2.75rem"
                ></Image>
              </Grid>
        </Grid>
      
      {getBranch?.map((item) => (
        <Grid container spacing={2} >
          <BranchRow  item={item} key={item?.id} />
        </Grid>
        
      ))}
      
      

          

      
     
    </div>
  );
};



Branches.layout = DashboardLayout;

export default Branches;
