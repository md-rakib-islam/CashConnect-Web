import React from 'react'

interface CurrencyProps {
    children: number | string;
}

const Currency: React.FC<CurrencyProps> = ({ children }) => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
        }}>
            <b style={{
                fontWeight: 800,
                // fontSize: "20px",
            }}>৳</b>
            {children}
        </div>
    )
}

export default Currency
