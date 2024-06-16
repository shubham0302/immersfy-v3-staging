import { Box } from "@mui/material";
import ProjectComponent from "../components/ProjectComponent.jsx";
import HeaderProject from "../components/HeaderProject.jsx";
import { useState } from "react";
import DeletePopup from "../components/DeletePopup.jsx";
import { useAppSelector } from "../store/index.js";
const MakeProjects = () => {
  const [asset, setAsset] = useState("scenes");
  const popupState = useAppSelector((state) => state.popup);

  return (
    <Box>
      <DeletePopup
        open={popupState.deletePopup}
        type={popupState.deleteType}
        id={popupState.deleteId}
      />
      <Box height={"100vh"} bgcolor={"text.light"}>
        <HeaderProject asset={asset} />
        <ProjectComponent asset={asset} setAsset={setAsset} />
      </Box>
    </Box>
  );
};

export default MakeProjects;
