import React from "react";
import Container from "../Container";
import AppLayout from "./AppLayout";

const NavbarLayout: React.FC = ({ children }) => {
  return (
    <AppLayout>
      <Container my="2rem">{children}</Container>
    </AppLayout>
  );
};

export default NavbarLayout;
