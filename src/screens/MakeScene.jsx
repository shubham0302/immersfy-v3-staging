import { Box, Typography } from "@mui/material";
import ProjectComponent from "../components/ProjectComponent.jsx";
import HeaderProject from "../components/HeaderProject.jsx";
import { useState } from "react";
import HeaderScene from "../components/HeaderScene.jsx";
import FrameComponent from "../components/FrameComponent.jsx";
import { useAppSelector } from "../store/index.js";
import DeletePopup from "../components/DeletePopup.jsx";
const MakeScene = () => {
  const popupState = useAppSelector((state) => state.popup);

  return (
    <Box>
      <DeletePopup
        open={popupState.deletePopup}
        type={popupState.deleteType}
        id={popupState.deleteId}
      />
      <Box height={"100vh"} bgcolor={"text.light"}>
        <HeaderScene />
        <FrameComponent />
      </Box>
    </Box>
  );
};

export default MakeScene;
