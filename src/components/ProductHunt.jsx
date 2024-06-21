import { AppBar, Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ProductHunt = () => {
  return (
    <Link
      to={"https://www.producthunt.com/posts/immersfy"}
      target="_blank"
      style={{ cursor: "pointer", textDecoration: "none" }}
    >
      <AppBar
        position="static"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 1,
          bgcolor: "primary.lightest",
          color: "black",
          py: 0.5,
          background: "linear-gradient(to right, #ffe338,#ff8e6b, #FF5D2B)",
        }}
      >
        <Typography fontWeight={600}>Immersfy</Typography>
        <Box component={"span"}>&#x2022;</Box>
        <Typography>Is live on product</Typography>
        <Box component={"span"}>&#x2022;</Box>
        <Typography>Join the discussion</Typography>
      </AppBar>
    </Link>
  );
};

export default ProductHunt;
