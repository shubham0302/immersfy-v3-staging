import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ActivateGroupViewIcon from "../Assets/Images/ActivateGroupView.png";
import ActivateListViewIcon from "../Assets/Images/ActivateListView.png";
import GroupViewIcon from "../Assets/Images/GroupView.png";
import ListViewIcon from "../Assets/Images/ListView.png";
import { useState } from "react";
import ProjectGrid from "./ProjectsGridLayout";
import ProjectListView from "./ProjectsListLayout";
import { useProject } from "../hooks/useProject";
import NewProjectButton from "./NewProjectButton";
import { MovieFilter } from "@mui/icons-material";
import Loader from "./Loader";
import { useEligibility } from "../hooks/useEligibility";
import { useAuth } from "../hooks/useAuth";

const HomeComponent = ({ loading, setLoading, navData, setNavData }) => {
  const { data, isLoading } = useProject(true);

  const [currView, setCurrView] = useState("Group");
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState("Last modified");
  // eslint-disable-next-line no-unused-vars
  const [isOpen, setIsOpen] = useState(false);

  const handleGridViewClick = () => {
    setCurrView("Group");
  };

  const handleListViewClick = () => {
    setCurrView("List");
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={{ marginBottom: 2, marginLeft: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
          marginLeft: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          {/* Heading */}

          <Box>
            <Typography variant="body1" color={"primary.main"}>
              Hi {user.name},
            </Typography>
            <Typography variant="h5" style={{ fontSize: "32px" }}>
              Projects
            </Typography>
          </Box>

          <Button
            sx={{
              borderRadius: 24,
              width: 122,
              height: 40,
              bgcolor: currView == "Group" ? "greys.lightest" : "none",
              marginRight: 1,
              marginLeft: 3,
              color: currView == "Group" ? "greys.darkest" : "greys.light",
            }}
            onClick={handleGridViewClick}
          >
            <img
              src={currView == "Group" ? ActivateGroupViewIcon : GroupViewIcon}
              alt="Group View Icon"
              style={{ marginRight: 5, width: 20, height: 20 }}
            />
            Tile View
          </Button>
          <Button
            sx={{
              borderRadius: 24,
              width: 122,
              height: 40,
              bgcolor: currView == "List" ? "greys.lightest" : "none",
              marginRight: 3,
              color: currView == "List" ? "greys.darkest" : "greys.light",
            }}
            onClick={handleListViewClick}
          >
            <img
              src={currView == "List" ? ActivateListViewIcon : ListViewIcon}
              alt="List View Icon"
              style={{ marginRight: 5, width: 20, height: 20 }}
            />
            List View
          </Button>
        </Box>

        {/* <Box sx={{ display: "flex", alignItems: "center", marginRight: 5 }}>
          <Typography
            variant="subtitle1"
            sx={{
              marginRight: 1,
              fontSize: "14px",
              color: "greys.light",
              fontWeight: "500",
            }}
          >
            Sort By:
          </Typography>
          <Select
            value={sortBy}
            onChange={handleSortByChange}
            sx={{
              width: 160,
              fontSize: "14px",
              fontWeight: "500",
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
            }}
            onOpen={handleOpen}
            onClose={handleClose}
          >
            <MenuItem value="Last modified" sx={{ fontSize: "14px" }}>
              Last modified
    
            </MenuItem>
            <MenuItem value="Alphabetical" sx={{ fontSize: "14px" }}>
              Alphabetical
       
            </MenuItem>
            <MenuItem value="Date created" sx={{ fontSize: "14px" }}>
              Date created
           
            </MenuItem>
          </Select>
        </Box> */}
      </Box>

      {isLoading && !loading ? (
        <Loader loadigText="Loading projects..." />
      ) : loading ? (
        <Box />
      ) : data?.length > 0 ? (
        currView === "Group" ? (
          <ProjectGrid projectData={data} />
        ) : (
          <ProjectListView projectData={data} />
        )
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <MovieFilter
            sx={{ height: 100, width: 100, color: "primary.lightest" }}
          />

          <Typography color={"greys.darkest"} fontWeight={500}>
            No Projects created
          </Typography>
          <Typography
            variant="body2"
            color={"text.main"}
            sx={{ maxWidth: "400px", textAlign: "center" }}
          >
            Welcome aboard! Let&apos;s kick things off together. Click on the
            button to create the first one
          </Typography>

          <NewProjectButton
            navData={navData}
            setNavData={setNavData}
            loading={loading}
            setLoading={setLoading}
          />
        </Box>
      )}
    </Box>
  );
};

export default HomeComponent;
