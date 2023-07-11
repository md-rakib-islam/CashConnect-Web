import Button from "@component/buttons/Button";
import DashboardLayout from "@component/layout/FooterLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import { H1, H3, H6 } from "@component/Typography";

import Link from "next/link";
import React from "react";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Divider from "@component/Divider";

const Profile = () => {
  return (
    <div>
      <DashboardPageHeader
        iconName="terms"
        title="Terms & Conditions"
        button={
          <Link href="/">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to home
            </Button>
          </Link>
        }
      />
      <TableRow mb={"10px"}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <H6
              p="2rem 2.75rem"
              color="#0f3460"
              fontWeight="500"
              style={{ textAlign: "justify" }}
            >
              Welcome to <strong> CashConnect.com, </strong> <br /> CashConnect
              provides website features and other products and services to you
              when you visit or shop at CashConnect.com <br />
              <strong>
                {" "}
                By using CashConnect Services, you agree to these conditions.
                Please read them carefully.
              </strong>
              <br />
              By subscribing to or using any of our services you agree that you
              have read, understood and are bound by the Terms, regardless of
              how you subscribe to or use the services. In these Terms,
              references to "you", "User" shall mean the user end, "Service
              Providers" mean independent third party service providers, and
              "we", "us" and "our" shall mean Onnorokom Web Services Limited,
              its franchisor, affiliates and partners.
            </H6>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Image
              src="/assets/images/aboutUs/terms/terms.jpg"
              width="100%"
              p="2rem 2.75rem"
            ></Image>
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <div>
              <H1
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                CashConnect Terms of Use
              </H1>

              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                By subscribing to or using any of our services you agree that
                you have read, understood and are bound by the Terms, regardless
                of how you subscribe to or use the services. In these Terms,
                references to "you", "User" shall mean the user end, "Service
                Providers" mean independent third party service providers, and
                "we", "us" and "our" shall mean Onnorokom Web Services Limited,
                its franchisor, affiliates and partners.
              </H6>
              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Indtroduction
              </H3>

              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                The domain name www.cashconnectbd.com (referred to as "Website")
                is owned by Onnorokom Web Services Limited a company
                incorporated under the Companies Act, 1994(Act XVIII of 1994).{" "}
                <br />
                By accessing this Site, you confirm your understanding of the
                Terms of Use. If you do not agree to these Terms, you shall not
                use this website. The Site reserves the right to change, modify,
                add, or remove portions of these Terms at any time. Changes will
                be effective when posted on the Site with no other notice
                provided. Please check these Terms of Use regularly for updates.
                Your continued use of the Site following the posting of changes
                to these Terms of Use constitutes your acceptance of those
                changes.{" "}
              </H6>
              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                User Account, Password, and Security
              </H3>

              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                You will receive a password and account designation upon
                completing the Website's registration process. You shall be
                responsible for maintaining the confidentiality of your account
                & its password as well as all the transactions/requests
                done/received under your password or account. You agree to (a)
                immediately notify CashConnect of any unauthorized use of your
                password or account or any other breach of security, and (b)
                ensure that you exit from your account at the end of each
                session. CashConnect shall not be liable for any loss or damage
                arising from your failure to comply with the T&C.{" "}
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Services
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                CashConnect provides a number of Internet-based services through
                the Web Site (all such services, collectively, the "Service").
                One such service enables users to purchase books from various
                publishers.(Collectively, "Products"). The Products can be
                purchased through the Website through various methods of
                payments offered. Upon placing an order, CashConnect shall ship
                the product to you and you shall be responsible for its payment.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Privacy
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                The User hereby consents, expresses and agrees that he has read
                and fully understands the Privacy Policy of CashConnect. The
                user further consents that the terms and contents of such
                Privacy Policy are acceptable to him.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Limited User
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                The User agrees and undertakes not to reverse engineer, modify,
                copy, distribute, transmit, display, perform, reproduce,
                publish, license, create derivative works from, transfer, or
                sell any information or software obtained from the Website.
                Limited reproduction and copying of the content of the Website
                is permitted provided that CashConnect's name is stated as the
                source and prior written permission of CashConnect is sought.
                For the removal of doubt, it is clarified that unlimited or
                wholesale reproduction, copying of the content for commercial or
                non-commercial purposes and unwarranted modification of data and
                information within the content of the Website is not permitted.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                User Conduct and Rules
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                You agree and undertake to use the Website and the Service only
                to post and upload messages and material that are proper. By way
                of example, and not as a limitation, you agree and undertake
                that when using a Service, you will not:
                <ul>
                  <li>
                    Defame, abuse, harass, stalk, threaten or otherwise violate
                    the legal rights of others
                  </li>
                  <li>
                    Publish, post, upload, distribute or disseminate any
                    inappropriate, profane, defamatory, infringing, obscene,
                    indecent or unlawful topic, name, material or information
                  </li>
                  <li>
                    Upload files that contain software or other material
                    protected by intellectual property laws unless you own or
                    control the rights thereto or have received all necessary
                    consents; you own or control the rights thereto or have
                    received all necessary consents
                  </li>
                  <li>
                    Upload or distribute files that contain viruses, corrupted
                    files, or any other similar software or programs that may
                    damage the operation of the Website or another's computer
                  </li>
                  <li>
                    Conduct or forward surveys, contests, pyramid schemes or
                    chain letters
                  </li>
                  <li>
                    Download any file posted by another user of a Service that
                    you know, or reasonably should know, cannot be legally
                    distributed in such manner
                  </li>
                  <li>
                    Falsify or delete any author attributions, legal or other
                    proper notices or proprietary designations or labels of the
                    origin or source of software or other material contained in
                    a file that is uploaded
                  </li>
                  <li>
                    Violate any code of conduct or other guidelines, which may
                    be applicable for or to any particular Service
                  </li>
                  <li>
                    Violate any applicable laws or regulations for the time
                    being in force in or outside Bangladesh; and
                  </li>
                  <li>
                    Violate abuse, unethically manipulate or exploit any of the
                    terms and conditions of this Agreement or any other terms
                    and conditions for the use of the Website contained
                    elsewhere.
                  </li>
                </ul>
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Product Description
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                CashConnect attempts to be as accurate as possible. However,
                CashConnect does not warrant that product descriptions or other
                content of the site is accurate, complete, reliable, current, or
                error-free. If a product offered by CashConnect itself is not as
                described, your sole remedy is to return it in unused condition.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Links to Third Party Site
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                The Website may contain links to other websites ("Linked
                Sites"). The Linked Sites are not under the control of
                CashConnect or the Website and CashConnect is not responsible
                for the contents of any Linked Site, including without
                limitation any link contained in a Linked Site, or any changes
                or updates to a Linked Site. CashConnect is not responsible for
                any form of transmission, whatsoever, received by you from any
                Linked Site. CashConnect is providing these links to you only as
                a convenience, and the inclusion of any link does not imply
                endorsement by CashConnect or the Website of the Linked Sites or
                any association with its operators or owners including the legal
                heirs or assigns thereof. The users are requested to verify the
                accuracy of all information on their own before undertaking any
                reliance on such information.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Abusing CashConnect
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                As per these Terms, users are solely responsible for every
                material or content uploaded on to the Website. Users can be
                held legally liable for their contents and may be held legally
                accountable if their contents or material include, for example,
                defamatory comments or material protected by copyright,
                trademark, etc. Please report problems, offensive content and
                policy breaches to us. We work to ensure that listed items do
                not infringe upon the copyright, trademark or other intellectual
                property rights of third parties. If you believe that your
                intellectual property rights have been infringed, please notify
                our team and we will investigate.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Order Acceptance and Pricing
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                Please note that there are cases when an order cannot be
                processed for various reasons. The Site reserves the right to
                refuse or cancel any order for any reason at any given time. You
                may be asked to provide additional verifications or information,
                including but not limited to phone number and address, before we
                accept the order. We are determined to provide the most accurate
                pricing information on the Site to our users; however, errors
                may still occur, such as cases when the price of an item is not
                displayed correctly on the website. As such, we reserve the
                right to refuse or cancel any order. In the event that an item
                is mispriced, we may, at our own discretion, either contact you
                for instructions or cancel your order and notify you of such
                cancellation. We shall have the right to refuse or cancel any
                such orders whether or not the order has been confirmed and your
                debit/credit card charged. <br />
                All prices posted on this website are subject to change without
                notice. Prices prevailing at commencement of placing the order
                will apply. Posted prices do includes all taxes and charges. In
                case there are any additional charges or taxes the same will be
                mentioned on the website.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Trademarks and Copyrights
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                Unless otherwise indicated or anything contained to the contrary
                or any proprietary material owned by a third party and so
                expressly mentioned, CashConnect owns all Intellectual Property
                Rights to and into the Website, including, without limitation,
                any and all rights, title and interest in and to copyright,
                related rights, patents, utility models, trademarks, trade
                names, service marks, designs, know-how, trade secrets and
                inventions (whether patentable or not), goodwill, source code,
                meta tags, databases, text, content, graphics, icons, and
                hyperlinks. You acknowledge and agree that you shall not use,
                reproduce or distribute any content from the Website belonging
                to CashConnect without obtaining authorization from CashConnect.{" "}
                <br />
                Notwithstanding the foregoing, it is expressly clarified that
                you will retain ownership and shall solely be responsible for
                any content that you provide or upload when using any Service,
                including any text, data, information, images, photographs,
                music, sound, video or any other material which you may upload,
                transmit or store when making use of our various Service.
                However, with regard to the product customization Service (as
                against other Services like blogs and forums) you expressly
                agree that by uploading and posting content on to the Website
                for public viewing and reproduction/use of your content by third
                party users, you accept the User whereby you grant a
                non-exclusive license for the use of the same.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Happy Return & Replacement Policy
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                It's a rare case for cashConnect where customers didn't get
                their products unharmed. But sometimes we may fail to fulfill
                your expectations, sometimes situations aren't by our side. But
                there is now a "Bond of Trust" between customers and
                cashConnect, So, for further ensuring and encouraging this "Bond
                of Trust" cashconnectbd.com brings you The "Happy Return"
                policy. Where customers can return their books or products only
                if there's something wrong (Torn, Pages missing, Wrong
                book/Product, etc) with it. In that case cashConnect will give
                you fresh products in return. Because we believe that happiness
                should be returned if that happiness can't give you a smile. So,
                We returned it with proper happiness. We always want to bring a
                smile in your face and make you happier. We call this policy of
                ours "Happy Return". <br />
                If for any reason you are unsatisfied with your order, you may
                return it as long as your item meets the following criteria:{" "}
                <br />
                <ul>
                  <li>It is within 03 Days from the delivery date.</li>
                  <li>
                    All items to be returned or exchanged must be unused and in
                    their original condition with all original tags and
                    packaging intact and should not be broken or tampered with.
                  </li>
                  <li>
                    Refund/ replacement for products are subject to inspection
                    and checking by CashConnect team.
                  </li>
                  <li>
                    Damages due to neglect, improper usage or Digital content
                    such as e-books will not be covered under our Returns
                    Policy.
                  </li>
                  <li>
                    Replacement is subject to availability of stock with the
                    Supplier. If the product is Out of Stock, you will receive a
                    full refund, no questions asked.
                  </li>
                  <li>
                    Please note that the Cash on Delivery convenience charge and
                    the shipping charge would not be included in the refund
                    value of your order as these are non-refundable charges.
                  </li>
                  <li>
                    If the item came with the free promotional items (including
                    but not limited to gifts/ points/wallet money) the free item
                    must also be returned/refunded.
                  </li>
                </ul>{" "}
                <br />
                <span style={{ color: "gray" }}>
                  Reasons for returns & replacement:
                </span>
                <ul>
                  <li>
                    If your product is defective/damaged or incorrect/incomplete
                    at the time of delivery, please contact us within the
                    applicable return window. Your product may be eligible for
                    refund or replacement depending on the product category and
                    condition. Please see the detailed terms in the relevant
                    category below.
                  </li>
                  <li>
                    Please note that some products are not eligible for a return
                    if the product is "No longer needed".
                  </li>
                  <li>
                    You have to claim the return of the product within 3days.
                    Sorry, a return isn't possible after the 3 days limit. You
                    can reach our team for further questions 24/7under
                    admin@cashconnectbd.com
                  </li>
                  <li>
                    Please note that CashConnect is not obligated to refund the
                    user's money what he/she paid until the product status
                    changed to "Returned".
                  </li>
                </ul>
                How to return: <br />
                Contact CashConnect Customer Care team by calling 16297 or by
                emailing care@cashconnectbd.com within 03 days after receiving
                your order. <br />
                There are two ways to return/replacement the product to us. In
                Dhaka City, we offer a free pick up service for your
                return/replacement. Other than Dhaka City, you have to send the
                product on your own to our office address.
                <br />
                Once we pick up or receive your return, we will do a quality
                check of the product at our end and if a return is invalid, we
                will replace the product with a new one or we will proceed with
                the refund.
                <br />
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Refund Policy
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                <ul>
                  <li>
                    The refund will be processed after we have completed
                    evaluating your return.
                  </li>
                  <li>
                    Replacement is subject to availability of stock with the
                    Supplier. If the product is Out of Stock, you will receive a
                    full refund, no questions asked.
                  </li>
                  <li>
                    Please note that the Cash on Delivery convenience charge and
                    the shipping charge would not be included in the refund
                    value of your order as these are non-refundable charges.
                  </li>
                  <li>
                    If you have selected Cash on Delivery (COD), there is no
                    amount to refund because you haven't paid for your order.
                  </li>
                  <li>
                    For payments made using a Credit Card, Debit Card, Mobile
                    Banking or Bank Transfer, you will receive a refund in your
                    respective.
                  </li>
                  <li>
                    If online payment is made once more due to technical error,
                    payment refund will be made.
                  </li>
                  <li>
                    You will receive a refund anytime between 7-10 working days.
                    If you donât receive refund within this time, please write
                    to us at care@cashconnectbd.com and we shall investigate.
                  </li>
                </ul>
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Our Policy for Gift orders
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                CashConnect always wants to ensure customer's happiness. So,
                every single time we get a order we start processing it and try
                to make the delivery as soon as possible. But, sometimes in the
                delivery process some glitches happen. There can be some
                political issues, country environment or natural calamities that
                will slow us down but we ensure that the delivery is being made
                perfectly. So, if there any delay in the delivery process please
                don't be impatient, know that we are trying our best to deliver
                your happiness as early as possible. <br />
                If you want your ordered products on a fixed date then you have
                to notify us while ordering. We will try our best to make the
                delivery as soon as possible and give your products on that
                fixed date. But, after trying so hard if we can't make the
                delivery at the fixed time for country environment or any other
                reasons then cashConnect will not take any liability for this.
                Be sure that, We will try our best to make you feel special but
                sometimes we canât do things we want to do so if there is some
                delay then we sincerely hope that you will understand the
                situation. Thank You.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Our Policy for Express orders
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                CashConnect has introduced it's new service- Express Delivery.
                Now customers can get their desired books within 24 hours using
                this service. Initially , this service is restricted for Dhaka
                city only. Gradually we will increase the service area.Now you
                can get a premium service for not so high price than usual. The
                service charge for Express Delivery is only Tk 100. And yes,
                It's for any quantity of books. Means, you buy 2/3 books or 100,
                you just pay Tk. 100 for Express Delivery.
                <ul>
                  <li>
                    CashConnect will decide either the order is eligible for
                    Express Delivery or not.
                  </li>
                  <li>
                    CashConnect has the right to convert Express Delivery order
                    to Regular Delivery at any time for some reasons.
                  </li>
                  <li>
                    Initially the service is restricted to only Dhaka city.
                  </li>
                </ul>
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Order Cancellation
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                You can cancel an order before the product has been shipped, by
                contacting our customer care team at 16297. <br />
                If you have selected Cash on Delivery (COD), there is no amount
                to refund because you haven't paid for your order. <br />
                For payments made using a Credit Card, Debit Card, Mobile
                Banking or Bank Transfer, you will receive a refund in your
                respective account after your order has been cancelled. Your
                entire order amount will be refunded.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Governing Law
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                These terms shall be governed by and constructed in accordance
                with the laws of Bangladesh without reference to conflict of
                laws principles and disputes arising in relation hereto shall be
                subject to the exclusive jurisdiction of the courts at Dhaka.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Legal Disputes
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                If a dispute arises between you and CashConnect, our goal is to
                provide you with a neutral and cost effective means of resolving
                the dispute quickly. Accordingly, you and 'CashConnect' agree
                that we will resolve any claim or controversy at law or equity
                that arises out of this Agreement or our services in accordance
                with one of the subsections below or as we and you otherwise
                agree in writing. Before resorting to these alternatives, we
                strongly encourage you to first contact us directly to seek a
                resolution. We will consider reasonable requests to resolve the
                dispute through alternative dispute resolution procedures, such
                as arbitration, as alternatives to litigation.
                <ul>
                  <li>
                    APPLICABLE LAW AND JURISDICTION: These Terms and Conditions
                    shall be interpreted and governed by the laws in force in
                    Bangladesh. Subject to the Arbitration section below, each
                    party hereby agrees to submit to the jurisdiction of the
                    courts of Dhaka.
                  </li>
                  <li>
                    ARBITRATION: Any controversy, claim or dispute arising out
                    of or relating to these Terms and Conditions will be
                    referred to and finally settled by private and confidential
                    binding arbitration before a single arbitrator held in
                    Dhaka, Bangladesh. The arbitrator shall be a person who is
                    legally trained and who has experience in the information
                    technology field in Dhaka and is independent of either
                    party. Notwithstanding the foregoing, the Site reserves the
                    right to pursue the protection of intellectual property
                    rights and confidential information through injunctive or
                    other equitable relief through the courts.
                  </li>
                </ul>
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Discount Conditions
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                CashConnect always wants to give you your desired books in the
                best possible market price. We always have different offers and
                discounts running on to make our customers happy and make them
                able to buy more and more books from cashConnect But sometimes
                in some cases we can not afford to give you proper discounts.
                Though we try our best to keep the price lesser for our beloved
                customers but sometimes we just can't. We can not give discounts
                for the foreign books because their publishers don't allow us to
                give any discounts at all. <br />
                We also can not give discounts in those books which are
                published by Bangla Academy and Islami Foundation Bangladesh.
                Text books are another category where we can offer very little
                discount. But we can offer discounts in most of our categories
                and customers can buy wide range of books from there. Lastly,
                Buying and reading books is a passion, it has nothing to do with
                the money. Keep buying and keep reading. CashConnect is always
                there for you.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Unauthorized Charges on your card
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                If you see charges on your credit/debit card for purchases made
                on CashConnect, but you never created an account or signed up,
                please check with your family members or business colleagues
                authorized to make purchases on your behalf, to confirm that
                they haven't placed the order. If you're still unable to
                recognize the charge, please report the unauthorized purchase
                within 60 days of the transaction to enable CashConnect to begin
                an investigation.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Risk of Loss
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                All items purchased from CashConnect are made pursuant to a
                shipment contract. This means that the Risk of Loss shall remain
                with CashConnect until the item is transferred to you. In the
                event that the items are damaged after receipt, the risk falls
                on the customer.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Fraud Protection Policy
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                CashConnect realizes the importance of a strong fraud detection
                and resolution capability. We and our online payments partners
                monitor transactions continuously for suspicious activity and
                flag potentially fraudulent transactions for manual verification
                by our team. <br />
                In the rarest of rare cases, when our team is unable to rule out
                the possibility of fraud categorically, the transaction is kept
                on hold, and the customer is requested to provide identity
                documents. The ID documents help us ensure that the purchases
                were indeed made by a genuine card holder. We apologize for any
                inconvenience that may be caused to customers and request them
                to bear with us in the larger interest of ensuring a safe and
                secure environment for online transactions.
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Termination
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                <ul>
                  <li>
                    CashConnect may suspend or terminate your use of the Website
                    or any Service if it believes, in its sole and absolute
                    discretion that you have breached, violated, abused, or
                    unethically manipulated or exploited any term of these Terms
                    or anyway otherwise acted unethically.
                  </li>
                  <li>
                    These Terms will survive indefinitely unless and until
                    CashConnect chooses to terminate them.
                  </li>
                  <li>
                    If you or CashConnect terminates your use of the Website or
                    any Service, CashConnect may delete any content or other
                    materials relating to your use of the Service and
                    CashConnect will have no liability to you or any third party
                    for doing so.
                  </li>
                  <li>
                    You shall be liable to pay for any Service or product that
                    you have already ordered till the time of Termination by
                    either party whatsoever. Further, you shall be entitled to
                    your royalty payments as per the User License Agreement that
                    has or is legally deemed accrued to you.
                  </li>
                </ul>
              </H6>

              <H3
                p="0 1rem"
                style={{ textAlign: "center" }}
                color="primary.main"
                fontWeight="800"
              >
                Term and Policy updates
              </H3>
              <Divider width="300px" mx="auto" />
              <H6
                p="2rem 2.75rem"
                color="#0f3460"
                fontWeight="500"
                style={{ textAlign: "justify" }}
              >
                We reserve the right to change or update these terms and
                policies at any time by placing a prominent notice on our site.
                Such changes shall be effective immediately upon posting to this
                site.
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
