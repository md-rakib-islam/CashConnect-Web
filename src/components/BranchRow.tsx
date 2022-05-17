import React from "react";
import FlexBox from "./FlexBox";
import Grid from "./grid/Grid";
import TableRow from "./TableRow";
import  Small, { H3, H5 }  from "./Typography";


export interface BranchRowProps {
  item: {
    country?: {name: string};
    city?: {name: string};
    thana?: {name: string};
    name?:  string;
    street_address_one?:  string;
    street_address_two?:  string;
  
  };
}

const BranchRow: React.FC<BranchRowProps> = ({ item }) => {


  return (

             <Grid  item lg={6} md={6} sm={12} xs={12}>
                <TableRow p="0.75rem 1.5rem" mb={"50px"}>

                    <FlexBox flexDirection="column" p="0.5rem">
                      <H3>Livewire ({ item?.name})</H3>
                      <Small color="text.muted" mb="4px" textAlign="left">
                      {item?.street_address_one} {item.street_address_two}
                    </Small>
                    <H5 mt="10px"> Shop Hours</H5>
                      <Small color="text.muted" mb="4px" textAlign="left">
                      9:00 AM - 10:00 PM, Saturday - Friday

                    </Small>
                 </FlexBox>
                </TableRow>
            </Grid>
   
  );
};

export default BranchRow;
