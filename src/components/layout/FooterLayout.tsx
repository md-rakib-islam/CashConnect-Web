import React from "react";
import Container from "../Container";
import Grid from "../grid/Grid";
import AppLayout from "./AppLayout";

const CustomerDashboardLayout: React.FC = ({ children }) => (
  <AppLayout>
    <Container my="2rem">
      <Grid container>
        <Grid item lg={12} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </AppLayout>
);

export default CustomerDashboardLayout;
