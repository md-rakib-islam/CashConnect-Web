import GroceryHeader from "@component/header/GroceryHeader";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Navbar2 from "@component/navbar/Navbar2";
import Sticky from "@component/sticky/Sticky";
import { Site_Setting_All } from "@data/constants";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import StyledAppLayout from "./AppLayoutStyle";

type Props = {
  title?: string;
  navbar?: React.ReactChild;
};

const GroceryLayout: React.FC<Props> = ({
  children,
}) => {

  const [title, setTitle] = useState("Cash Connect")

  useEffect(() => {
    fetch(`${Site_Setting_All}`).then(res => res.json()).then(res => {
      const data = res?.general_settings[0]
      setTitle(data.title)
    }
    ).catch(() => { })
  }, [])

  return (
    <StyledAppLayout>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Sticky fixedOn={0}>
        <GroceryHeader />
      </Sticky>

      <div className="section-after-sticky">
        <Navbar2 />
      </div>

      {children}

      <MobileNavigationBar />
    </StyledAppLayout>
  )
};

export default GroceryLayout;
