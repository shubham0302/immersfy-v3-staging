import { Box } from "@mui/material";
import Header from "../components/Header.jsx";
import HomeComponent from "../components/HomeComponent.jsx";
import { useState } from "react";
import DeletePopup from "../components/DeletePopup.jsx";
import { useAppSelector } from "../store/index.js";
import EditTitlePopup from "../components/EditTitlePopup.jsx";
import ProductHunt from "../components/ProductHunt.jsx";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [navData, setNavData] = useState({ id: "", name: "" });

  const popupState = useAppSelector((state) => state.popup);
  return (
    <Box>
      {/* <ProductHunt /> */}
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
      <Box height={"100vh"} bgcolor={"text.light"}>
        <Header
          navData={navData}
          setNavData={setNavData}
          loading={loading}
          setLoading={setLoading}
        />
        <HomeComponent
          navData={navData}
          setNavData={setNavData}
          loading={loading}
          setLoading={setLoading}
        />
      </Box>
      {/* <Box component={"span"} position={"absolute"} right={10} top={10}>
        <SwitchTheme />
      </Box> */}
    </Box>
  );
};

export default Home;
