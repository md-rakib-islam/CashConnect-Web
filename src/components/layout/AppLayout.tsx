import Footer from "@component/footer/Footer";
import Header from "@component/header/Header";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Sticky from "@component/sticky/Sticky";
// import Topbar from "@component/topbar/Topbar";
import { Site_Setting_All } from "@data/constants";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import StyledAppLayout from "./AppLayoutStyle";

type Props = {
  title?: string;
  navbar?: React.ReactChild;
};

const AppLayout: React.FC<Props> = ({ children, navbar }) => {
  const [title, setTitle] = useState("Cash Connect");

  // useEffect(() => {
  //    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
  //     (function () {
  //       var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  //       s1.async = true;
  //       s1.src = 'https://embed.tawk.to/628b0c2db0d10b6f3e738588/1g3nif59d';
  //       s1.charset = 'UTF-8';
  //       s1.setAttribute('crossorigin', '*');
  //       s0.parentNode.insertBefore(s1, s0);
  //     })();
  // }, [])

  useEffect(() => {
    fetch(`${Site_Setting_All}`)
      .then((res) => res.json())
      .then((res) => {
        const data = res?.general_settings[0];
        setTitle(data.title);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <StyledAppLayout>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* <Topbar /> */}

      <Sticky fixedOn={0}>
        <Header />
      </Sticky>

      {navbar && (
        <div style={{ position: "fixed" }} className="section-after-sticky">
          {navbar}
        </div>
      )}
      {!navbar ? (
        <div className="section-after-sticky">{children}</div>
      ) : (
        children
      )}

      <MobileNavigationBar />

      {/* <Chat/> */}
      <Footer />
    </StyledAppLayout>
  );
};

export default AppLayout;
