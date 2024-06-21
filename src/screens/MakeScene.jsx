import { Box, Typography } from "@mui/material";
import ProjectComponent from "../components/ProjectComponent.jsx";
import HeaderProject from "../components/HeaderProject.jsx";
import { useState } from "react";
import HeaderScene from "../components/HeaderScene.jsx";
import FrameComponent from "../components/FrameComponent.jsx";
import { useAppSelector } from "../store/index.js";
import DeletePopup from "../components/DeletePopup.jsx";
import { useSceneDetails } from "../hooks/useScene.jsx";
import ProductHunt from "../components/ProductHunt.jsx";
const MakeScene = () => {
  const popupState = useAppSelector((state) => state.popup);

  const { sceneDetails } = useSceneDetails();

  return (
    <Box>
      <ProductHunt />
      <DeletePopup
        open={popupState.deletePopup}
        type={popupState.deleteType}
        id={popupState.deleteId}
      />
      <Box height={"96vh"} bgcolor={"text.light"}>
        <HeaderScene title={sceneDetails?.title} />
        <FrameComponent sceneDetails={sceneDetails} />
      </Box>
    </Box>
  );
};

export default MakeScene;
