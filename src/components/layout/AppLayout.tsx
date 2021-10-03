import Footer from "@component/footer/Footer";
import Header from "@component/header/Header";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Sticky from "@component/sticky/Sticky";
import Topbar from "@component/topbar/Topbar";
import { Site_Setting_All } from "@data/constants";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import StyledAppLayout from "./AppLayoutStyle";

type Props = {
  title?: string;
  navbar?: React.ReactChild;
};

const AppLayout: React.FC<Props> = ({
  children,
  navbar,
}) => {

  const [title, setTitle] = useState("Cash Connect")

  useEffect(() => {
    fetch(`${Site_Setting_All}`).then(res => res.json()).then(res => {
      const data = res?.general_settings[0]
      setTitle(data.title)
    }
    )
  }, [])


  return (
    <StyledAppLayout>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Topbar />

      <Sticky fixedOn={0}>
        <Header />
      </Sticky>

      {navbar && <div className="section-after-sticky">{navbar}</div>}
      {!navbar ? (
        <div className="section-after-sticky">{children}</div>
      ) : (
        children
      )}

      <MobileNavigationBar />
      <Footer />
    </StyledAppLayout>
  )
};

export default AppLayout;
