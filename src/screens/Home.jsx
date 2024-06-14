import { Box } from "@mui/material";
import Header from "../components/Header.jsx";
import HomeComponent from "../components/HomeComponent.jsx";
import { useState } from "react";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [navData, setNavData] = useState({ id: "", name: "" });
  return (
    <Box>
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
