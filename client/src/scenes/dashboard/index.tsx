import React from "react";
import RowThree from "./RowThree";
import RowOne from "./RowOne";
import RowTwo from "./RowTwo";
import { Box, useMediaQuery } from "@mui/material";

const gridTemplateByBig = `
   "a b c"
   "a b c"
   "a b c"
   "a b f"
   "d e f" 
   "d e f" 
   "d h i"
   "g h i"
   "g h j"
   "g h j"
`;

const gridTemplateBySmall = `
   "a"
   "a"
   "a"
   "a"
   "b"
   "b"
   "b"
   "b"
   "c"
   "c"
   "c"
   "d"  
   "d" 
   "d"
   "e"
   "e"
   "f" 
   "f"
   "f"
   "g" 
   "g" 
   "g" 
   "h"
   "h"
   "h"
   "h"
   "i"
   "i"
   "j"
   "j"
`;

const Dashboard: React.FC = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1200px)");

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateAreas: gridTemplateByBig,
              gridTemplateColumns: "repeat(3,minmax(370px,1fr))",
              gridTemplateRows: "repeat(10,minmax(60px,1fr))",
            }
          : {
              gridTemplateAreas: gridTemplateBySmall,
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
            }
      }
    >
      <RowOne />
      <RowTwo />
      <RowThree />
    </Box>
  );
};

export default Dashboard;
