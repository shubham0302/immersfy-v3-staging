import { ChevronLeft } from "@mui/icons-material";
import { Box, Button, alpha, useTheme } from "@mui/material";
import React from "react";
import ProfileButton from "./ProfileButton";

const HeaderEditFrame = ({ handleClose, title }) => {
  const theme = useTheme();

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      mt={0.5}
    >
      <Button
        onClick={handleClose}
        startIcon={<ChevronLeft />}
        variant="contained"
        sx={{
          bgcolor: "white",
          color: "greys.darkest",
          borderRadius: "20px",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: alpha(theme.palette.greys.lightest, 0.5),
          },
        }}
      >
        Back
      </Button>

      <Box
        bgcolor={"greys.lighter"}
        display={"flex"}
        alignItems={"stretch"}
        width={"40%"}
        borderRadius={8}
      >
        <Box color={"greys.light"} whiteSpace={"nowrap"} py={1} px={2}>
          Scene Title
        </Box>

        <Box
          px={2}
          bgcolor={"white"}
          display={"flex"}
          alignItems={"center"}
          borderRadius={8}
          width={"100%"}
        >
          {title}
        </Box>
      </Box>

      <ProfileButton />
    </Box>
  );
};

export default HeaderEditFrame;
