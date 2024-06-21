import { Box } from "@mui/material";
import ProjectComponent from "../components/ProjectComponent.jsx";
import HeaderProject from "../components/HeaderProject.jsx";
import { useState } from "react";
import DeletePopup from "../components/DeletePopup.jsx";
import { useAppSelector } from "../store/index.js";
import EditTitlePopup from "../components/EditTitlePopup.jsx";
import ProductHunt from "../components/ProductHunt.jsx";
const MakeProjects = () => {
  const [asset, setAsset] = useState("scenes");
  const popupState = useAppSelector((state) => state.popup);

  return (
    <Box>
      <ProductHunt />
      <DeletePopup
        open={popupState.deletePopup}
        type={popupState.deleteType}
        id={popupState.deleteId}
      />
      <EditTitlePopup
        open={popupState.editTitlePopup}
        type={popupState.editTitleType}
        id={popupState.editTitleId}
        title={popupState.editTitleValue}
      />
      <Box height={"96vh"} bgcolor={"text.light"}>
        <HeaderProject asset={asset} />
        <ProjectComponent asset={asset} setAsset={setAsset} />
      </Box>
    </Box>
  );
};

export default MakeProjects;
