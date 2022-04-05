import Box from '@component/Box';
import CustomerDashboardLayout from '@component/layout/CustomerDashboardLayout';
import React from 'react';

function success() {
    return (
        <Box
            boxShadow="1px 1px 5px 2px #ababab"
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
        >
            <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "80px", textShadow: "1px 1px 0.5px black", }}>
                <h2 style={{ fontWeight: 600 }}><b style={{ color: "green", fontSize: "28px", textShadow: "1px 1px 0.5px green" }}>Thanks,</b> <br /> your request has been submitted, <br /> our expert will contact with you</h2>
            </div>
        </Box>
    )
}

success.layout = CustomerDashboardLayout;
export default success
