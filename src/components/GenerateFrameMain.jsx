import {
  Box,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import EnterScriptIcon from "../Assets/Images/enterscripticon.png";
import {
  CenterFocusStrong,
  KeyboardArrowDown,
  PhotoCamera,
  Save,
} from "@mui/icons-material";
import { useState } from "react";
import {
  cameraAngleData,
  colorTypeData,
  shotTypeData,
  stylesData,
} from "../Data/dropdownData";
import { LoadingButton } from "@mui/lab";
import { postData } from "../utils/serverHelper";

const GenerateFrameMain = () => {
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState({
    description: "",
    cameraAngle: cameraAngleData[0].value,
    style: stylesData[0].value,
    colorType: colorTypeData[0].value,
    shotType: shotTypeData[0].value,
  });

  const handleGenerateClick = async () => {
    setLoading(true);
    try {
      await postData("/frame/regenerate_scene", {
        data: requestData.description,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const dropdownData = [
    {
      title: "Camera Angle",
      name: "cameraAngle",
      icon: <PhotoCamera />,
      options: cameraAngleData,
    },
    // {
    //   title: "Style",
    //   name: "style",
    //   icon: <PhotoFilter />,
    //   options: stylesData,
    // },
    // {
    //   title: "Color Type",
    //   name: "colorType",
    //   icon: <ColorLens />,
    //   options: colorTypeData,
    // },
    {
      title: "Shot Type",
      name: "shotType",
      icon: <CenterFocusStrong />,
      options: shotTypeData,
    },
  ];

  return (
    <Box>
      {/* <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 2,
            gap: 1,
          }}
        >
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <PhotoCamera />
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: "secondary.dark",
              }}
              display="flex"
              alignItems="center"
            >
              Inpainting Type
            </Typography>
          </Box>
          <Select
            value={requestData.inpaintingType}
            onChange={(e) =>
              setRequestData((prev) => ({
                ...prev,
                inpaintingType: e.target.value,
              }))
            }
            displayEmpty
            renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select</em>;
            }

            return selected;
          }}
            placeholder="select"
            InputProps={{
              style: {
                padding: "0px",
              },
            }}
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              boxShadow: "none",
              border: "none",
              "& .MuiOutlinedInput-input": {
                padding: 0,
              },
              ".MuiOutlinedInput-notchedOutline": {
                border: 0,
              },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
              "& .MuiSelect-icon": {
                transform: "rotate(0deg)",
              },
            }}
            IconComponent={KeyboardArrowDown}
          >
            {inpaintingTypeData.map((item, idx) => (
              <MenuItem key={idx} value={item.value}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Divider sx={{ backgroundColor: "#F1F1F1", width: "100%" }} />
        </Box>
      </Box> */}

      <Box>
        <Box sx={{ py: 1 }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: "secondary.dark",
            }}
            variant="subtitle1"
            display="flex"
            alignItems="center"
          >
            <img
              src={EnterScriptIcon}
              alt="Icon1"
              style={{ marginRight: "8px", width: "16px" }}
            />
            Frame Description
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter the description"
            multiline
            variant="outlined"
            rows={14}
            value={requestData.description}
            onChange={(e) =>
              setRequestData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            sx={{
              bgcolor: "greys.lighter",
              borderRadius: "12px",
              marginTop: 1,
              fontSize: "14px",
              color: "greys.darkest",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
        </Box>
      </Box>

      {dropdownData.map((dropdown, index) => (
        <Box key={index}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 2,
              gap: 1,
            }}
          >
            <Box display={"flex"} alignItems={"center"} gap={1}>
              {dropdown.icon}
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "secondary.dark",
                }}
                display="flex"
                alignItems="center"
              >
                {dropdown.title}
              </Typography>
            </Box>
            <Select
              value={requestData[dropdown.name]}
              onChange={(e) =>
                setRequestData((prev) => ({
                  ...prev,
                  [dropdown.name]: e.target.value,
                }))
              }
              InputProps={{
                style: {
                  padding: "0px",
                },
              }}
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                boxShadow: "none",
                border: "none",
                "& .MuiOutlinedInput-input": {
                  padding: 0,
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: 0,
                },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
                "& .MuiSelect-icon": {
                  transform: "rotate(0deg)",
                },
              }}
              IconComponent={KeyboardArrowDown}
            >
              {dropdown.options.map((item, idx) => (
                <MenuItem key={idx} value={item.value}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Divider sx={{ backgroundColor: "#F1F1F1", width: "100%" }} />
          </Box>
        </Box>
      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          marginTop: 3,
        }}
      >
        <LoadingButton
          disabled={requestData.description === ""}
          onClick={handleGenerateClick}
          variant="contained"
          color="primary"
          fullWidth
          loading={loading}
          loadingPosition="end"
          endIcon={<Save sx={{ display: "none" }} />}
          sx={{ borderRadius: 6 }}
        >
          {loading ? "Generating" : "Generate"}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default GenerateFrameMain;
