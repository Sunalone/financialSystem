import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import PixIcon from "@mui/icons-material/Pix";

const DASHBOARD = "dashboard";
const overview = "overview";

const NavBar: React.FC = () => {
    const { palette } = useTheme();
    const [selected, setSelected] = useState(true);

    return (
        <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
            <FlexBetween gap="0.75rem">
                <PixIcon sx={{ fontSize: "28px" }} />
                <Typography variant="h4" fontSize="16px">
                    Finanseer
                </Typography>
            </FlexBetween>

            <FlexBetween gap="2rem">
                <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
                    <Link
                        to="/"
                        onClick={() => setSelected(true)}
                        style={{
                            color: selected ? "inherit" : palette.grey[700],
                            textDecoration: "inherit",
                        }}
                    >
                        {DASHBOARD}
                    </Link>
                </Box>
                <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
                    <Link
                        to={`/${overview}`}
                        onClick={() => setSelected(false)}
                        style={{
                            color: selected ? palette.grey[700] : "inherit",
                            textDecoration: "inherit",
                        }}
                    >
                        {overview}
                    </Link>
                </Box>
            </FlexBetween>
        </FlexBetween>
    );
};

export default NavBar;
