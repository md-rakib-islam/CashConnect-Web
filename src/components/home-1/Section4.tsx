// import ProductCard1 from "@component/product-cards/ProductCard1";
// import _ from "lodash";
// import Link from "next/link";
// import React from "react";
// import Box from "../Box";
// import CategorySectionHeader from "../CategorySectionHeader";
// import Container from "../Container";
// import Grid from "../grid/Grid";

// const Section4 = ({ topRatedList }) => {
//   return (
//     // <Box mb="3rem">
//     //   <Container>
//     //     <Box>
//     //       <Grid container spacing={6}>
//     //         <Grid item lg={12} xs={12}>
//     //           <CategorySectionHeader
//     //             iconName="ranking-1"
//     //             title="Top Ratings"
//     //             seeMoreLink="product/search/top_ratings_all"
//     //           />
//     //           {/* <Card p="1rem"> */}
//     //           <Grid container spacing={6}>
//     //             {topRatedList?.slice(0, 5)?.map((item, key) => (
//     //               <Grid
//     //                 item
//     //                 lg={2.4}
//     //                 md={2.4}
//     //                 sm={6}
//     //                 xs={6}
//     //                 key={item?.id || key}
//     //               >
//     //                 <Link href={item.productUrl}>
//     //                   <a>
//     //                     <ProductCard1 hoverEffect {...item} />
//     //                   </a>
//     //                 </Link>
//     //               </Grid>
//     //             ))}
//     //           </Grid>
//     //           {/* </Card> */}
//     //         </Grid>
//     //       </Grid>
//     //     </Box>
//     //   </Container>
//     // </Box>
//   );
// };

// export default Section4;

import _ from "lodash";
import React from "react";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import ProductCard1 from "../product-cards/ProductCard1";

const Section4 = ({ topRatedList }) => {
  const moreForYouLists = (
    <Container mb="2rem">
      <CategorySectionHeader
        iconName="ranking-1"
        title="Top Ratings"
        seeMoreLink="product/search/top_ratings_all"
      />
      <Grid container spacing={6}>
        {topRatedList.slice(0, 20).map((item, ind) => (
          <Grid item lg={2.4} md={4} sm={6} xs={6} key={item?.id || ind}>
            <ProductCard1 off={0} hoverEffect {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  const returnableData = _.isEmpty(topRatedList) ? null : moreForYouLists;

  return returnableData;
};

export default Section4;
