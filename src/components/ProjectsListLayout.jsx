import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { timeHandler } from "../utils/time";
import ActionsIcon from "./ActionsIcon";
import { Box, Typography } from "@mui/material";
import { createProjectTitle, createUrlQuery } from "../utils/convertString";
import { useNavigate } from "react-router-dom";
import { aspectRatioData, stylesData } from "../Data/dropdownData";

const ProjectTable = ({ projectData }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "95%",
        margin: "10px",
        height: "83vh",
        overflowY: "scroll",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontSize: "14px",
                color: "greys.light",
                width: "25%",
                bgcolor: "text.light",
              }}
            >
              Project Name
            </TableCell>
            <TableCell
              sx={{
                fontSize: "14px",
                color: "greys.light",
                width: "15%",
                bgcolor: "text.light",
              }}
            >
              Art Style
            </TableCell>
            <TableCell
              sx={{
                fontSize: "14px",
                color: "greys.light",
                width: "15%",
                bgcolor: "text.light",
              }}
            >
              Aspect Ratio
            </TableCell>
            <TableCell
              sx={{
                fontSize: "14px",
                color: "greys.light",
                width: "15%",
                bgcolor: "text.light",
              }}
            >
              Updated
            </TableCell>
            <TableCell
              sx={{
                fontSize: "14px",
                color: "greys.light",
                width: "15%",
                bgcolor: "text.light",
              }}
            >
              Created
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontSize: "14px",
                color: "greys.light",
                width: "5%",
                bgcolor: "text.light",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectData?.map((project, index) => (
            <TableRow key={index}>
              <TableCell sx={{ fontSize: "14px", color: "greys.darkest" }}>
                <Box
                  display={"flex"}
                  gap={1}
                  alignItems={"center"}
                  onClick={() =>
                    navigate(
                      `/project/${project._id}?title=${createUrlQuery(
                        project?.name
                      )}`
                    )
                  }
                  sx={{ cursor: "pointer", width: "fit-content" }}
                >
                  {/* <Box
                    component={"span"}
                    bgcolor={"primary.lightest"}
                    py={1}
                    borderRadius={1}
                    color={"text.main"}
                    fontWeight={600}
                    px={2}
                  >
                    {createProjectTitle(project?.name)}
                  </Box> */}

                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    style={{
                      height: "48px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      filter: `grayscale(${
                        project.colorType === "black&White" ? "1" : "0"
                      })`,
                    }}
                  />
                  <Typography>{project?.name}</Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ fontSize: "14px", color: "greys.darkest" }}>
                {stylesData.find((item) => item.value === project?.style).title}
              </TableCell>
              <TableCell sx={{ fontSize: "14px", color: "greys.darkest" }}>
                {
                  aspectRatioData.find(
                    (item) => item.value === project?.aspectRatio
                  ).title
                }
              </TableCell>
              <TableCell sx={{ fontSize: "14px", color: "greys.darkest" }}>
                {timeHandler(project?.updatedDate)}
              </TableCell>
              <TableCell sx={{ fontSize: "14px", color: "greys.darkest" }}>
                {timeHandler(project?.createdDate)}
              </TableCell>
              <TableCell align="right">
                <ActionsIcon
                  ID={{ projectId: project._id }}
                  title={project.name}
                  type="project"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectTable;
