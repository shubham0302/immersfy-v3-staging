import { ThemeProvider } from "@emotion/react";
import theme, { deviceTheme } from "./styles/theme";
import { CssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./styles/App.css";
import { router } from "./routes/routes";
import { useEffect } from "react";
import { setTheme } from "./store/slice/theme.reducer";
import { AuthProvider } from "@descope/react-sdk";
import { useAuth } from "./hooks/useAuth";
import { useFrame } from "./hooks/useFrame";
import { useSocket } from "./hooks/useSocket";
import SubscriptionPopup from "./components/SubscriptionPopup";
import { useEligibility } from "./hooks/useEligibility";
const App = () => {
  const themeState = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const { closeSubscriptionPopup } = useEligibility();

  const { setSocketCallData, setGenerationCompleted } = useFrame();

  useEffect(() => {
    // localStorage.setItem("theme", deviceTheme());
    // dispatch(setTheme(deviceTheme()));
    localStorage.setItem("theme", "light");
    dispatch(setTheme("light"));
  }, [dispatch]);
  const { isLoading, user } = useAuth(true);
  const { _id: userId } = user || {};

  useEffect(() => {
    window.plugSDK.init({
      app_id: "don:core:dvrv-us-1:devo/114w2OfdwY:plug_setting/1",
      widget_alignment: "left",
    });
  }, []);

  useSocket(setSocketCallData, userId, true, setGenerationCompleted);

  if (isLoading) {
    return <p>Loading application...</p>;
  }

  return (
    <AuthProvider
      projectId="P2hPY0Sva8oDEUBjJhxUIqEzEIaB"
      baseUrl="https://auth.staging.immersfy.com"
    >
      <ThemeProvider theme={theme(themeState.theme)}>
        <SubscriptionPopup
          open={themeState.isSubscriptionPopup}
          type={themeState.popupType}
          closeFunction={closeSubscriptionPopup}
        />

        <RouterProvider router={router} />
        <CssBaseline />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
