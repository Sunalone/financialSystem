import React from "react";
import { Card as MuiCard } from "@mui/material";
import CardContent from "@mui/material/CardContent";

type TCardProps = {
    children?: React.ReactNode;
    cardStyle: Record<string, unknown>;
};

const Card: React.FC<TCardProps> = ({ children, cardStyle }) => {
    return (
        <MuiCard sx={{ maxWidth: 400, ...cardStyle }}>
            <CardContent>{children}</CardContent>
        </MuiCard>
    );
};

export default Card;
