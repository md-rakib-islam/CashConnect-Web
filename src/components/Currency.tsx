import React from 'react'

interface CurrencyProps {
    children: number | string;
    style?: any;
}

const Currency: React.FC<CurrencyProps> = ({ children, style = {} }) => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            ...style
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
