import React from "react";
import Container from "../Container";
import Grid from "../grid/Grid";
import Navbar from "../navbar/Navbar";
import AppLayout from "./AppLayout";

const CustomerDashboardLayout: React.FC = ({ children }) => (
  <AppLayout navbar={<Navbar />}>
    <Container my="2rem">
      <Grid container >
       
        <Grid item lg={12} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </AppLayout>
);

export default CustomerDashboardLayout;
