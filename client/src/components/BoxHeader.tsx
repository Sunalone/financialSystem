import React from "react";
import FlexBetween from "./FlexBetween";
import { Box, Typography, useTheme } from "@mui/material";

type Props = {
    title: string;
    subTitle?: string;
    sideText?: string;
};

const BoxHeader: React.FC<Props> = ({ title, subTitle, sideText }) => {
    const { palette } = useTheme();

    return (
        <FlexBetween
            position="absolute"
            top="0"
            left="0"
            width="100%"
            padding="0.5rem 0.5rem 0rem 1rem"
        >
            <FlexBetween>
                <Box width="100%">
                    <Typography variant="h4" mb="-0.1rem">
                        {title}
                    </Typography>
                    <Typography variant="h6">{subTitle}</Typography>
                </Box>
            </FlexBetween>
            <Typography
                variant="h5"
                fontWeight="700"
                color={palette.secondary[500]}
            >
                {sideText}
            </Typography>
        </FlexBetween>
    );
};

export default BoxHeader;
