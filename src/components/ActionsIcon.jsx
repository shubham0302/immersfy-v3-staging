import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import EditViewIcon from "../Assets/Images/Edit.png";
import DeleteIcon from "../Assets/Images/delete.png";
import jsPDF from "jspdf";
import { useProject } from "../hooks/useProject";
import { useFrame } from "../hooks/useFrame";
import ExportPdfIcon from "../Assets/Images/pdf.png";
import { useAppDispatch } from "../store";
import {
  setDeletePopup,
  setEditTitlePopup,
} from "../store/slice/popup.reducer";
import { useScene } from "../hooks/useScene";
import { CircularProgress } from "@mui/material";

const ActionsIcon = ({ ID, title, type }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { getFrames } = useFrame();
  const { getAllScenes } = useProject();
  const { getSceneDetails } = useScene();
  const [pdfLoading, setPdfLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const editTitlePopup = (event) => {
    event.stopPropagation();

    dispatch(
      setEditTitlePopup({
        id: ID.projectId || ID.sceneId,
        type,
        popup: true,
        title,
      })
    );
    setAnchorEl(null);
  };

  const deletePdfPopup = (event) => {
    event.stopPropagation();
    dispatch(
      setDeletePopup({ id: ID.projectId || ID.sceneId, type, popup: true })
    );
    handleClose();
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const downloadPDF = async (event) => {
    event.stopPropagation();
    setPdfLoading(true);
    try {
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const spaceBeforeImage = 20; // Adjust this value to add space before the image
      const imageWidth = (pageWidth - 3 * margin) / 2; // Space for two images per page
      const frameData = ID.sceneId
        ? await getFrames(ID.sceneId)
        : await getAllScenes(ID.projectId);

      let currentScene = null;
      let frameNumber = 1;
      let xPos = margin;
      let yPos = spaceBeforeImage + margin;
      let sceneTitle = title || "";

      const resetPositions = () => {
        xPos = margin;
        yPos = spaceBeforeImage + margin;
      };

      resetPositions();

      for (let index = 0; index < frameData?.length; index++) {
        const scene = frameData[index];
        if (index % 2 === 0 && index !== 0) {
          // Add a new page for every two images
          pdf.addPage();
          // Reset positions for new page
          resetPositions();
        }
        // Check if the scene has changed
        if (scene.scene !== currentScene) {
          currentScene = scene.scene;
          frameNumber = 1;

          // if (index !== 0) {
          //   pdf.addPage();
          // }

          if (ID?.projectId) {
            const data = await getSceneDetails(scene?.scene);

            sceneTitle = data.title;
          }

          // Add the title for the new scene
          pdf.setFontSize(16);
          pdf.text(sceneTitle, pageWidth / 2, margin + 5, { align: "center" });

          // Reset positions for new scene
          resetPositions();
        }

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = scene.framesUrl[scene.activeUrl] + "?not-from-cache-please";

        await new Promise((resolve) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the original image on the canvas
            ctx.filter =
              scene.colorType === "black&White"
                ? "grayscale(1)"
                : "grayscale(0)";
            ctx.drawImage(img, 0, 0);

            const imageAspectRatio = img.width / img.height;
            const availableHeight =
              pageHeight - 2 * margin - spaceBeforeImage - 20; // Adjust for prompt text space
            let width = imageWidth;
            let height = width / imageAspectRatio;

            // If the calculated height exceeds the available height, adjust the width and height
            if (height > availableHeight) {
              height = availableHeight;
              width = height * imageAspectRatio;
            }

            const spaceAvailable = imageWidth - width;
            const horizontalMargin = spaceAvailable / 2;
            xPos =
              margin +
              horizontalMargin +
              (index % 2 === 1 ? imageWidth + margin : 0);

            // Add frame number above the image
            pdf.setFontSize(12);
            pdf.text(`Frame ${frameNumber}`, xPos + 8, yPos - 3, {
              align: "center",
            });

            // Add the canvas image to the PDF
            pdf.addImage(canvas.toDataURL(), "JPEG", xPos, yPos, width, height);

            // Add prompt text below the image
            const promptTextY = yPos + height + 10; // Adjust the distance below the image
            pdf.setFontSize(10);
            const promptText = scene?.prompt || "";

            // Split the text into lines that fit within the image width
            const lines = pdf.splitTextToSize(promptText, width);

            if (promptTextY + lines.length * 5 > pageHeight - margin) {
              // Add a new page if the prompt text goes out of the page
              pdf.addPage();
              pdf.setFontSize(16);
              pdf.text(sceneTitle, pageWidth / 2, margin + 5, {
                align: "center",
              });
              resetPositions();
              pdf.setFontSize(10);
              pdf.text(lines, xPos, yPos, { align: "left" });
            } else {
              pdf.text(lines, xPos, promptTextY, { align: "left" });
            }

            // Add page number
            const pageNumberText = `${Math.ceil((index + 1) / 2)}/${Math.ceil(
              frameData.length / 2
            )}`;
            const pageNumberX = pageWidth - margin;
            const pageNumberY = pageHeight - margin;
            pdf.setFontSize(14);
            pdf.text(pageNumberText, pageNumberX, pageNumberY, {
              align: "right",
            });

            frameNumber++;
            resolve();
          };
        });
      }

      // Save the PDF after all scenes are added
      setPdfLoading(false);
      pdf.save(title);
      setAnchorEl(null);
    } catch (error) {
      console.log(error, "error generating pdf");
      setPdfLoading(false);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton edge="end" aria-label="options" onClick={handleMenuClick}>
        <MoreHorizIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            width: "144px",
            borderRadius: "8px",
          },
        }}
      >
        <MenuItem
          onClick={downloadPDF}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            color: "greys.darkest",
          }}
        >
          {pdfLoading ? "Exporting..." : "Export PDF"}
          {pdfLoading ? (
            <CircularProgress
              sx={{ height: "16px !important", width: "16px !important" }}
            />
          ) : (
            <img
              src={ExportPdfIcon}
              alt="Edit Icon"
              style={{ width: "18px", height: "18px" }}
            />
          )}
        </MenuItem>
        <MenuItem
          onClick={editTitlePopup}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            color: "greys.darkest",
          }}
        >
          Rename
          <img
            src={EditViewIcon}
            alt="Edit Icon"
            style={{ width: "15px", height: "15px" }}
          />
        </MenuItem>
        <MenuItem
          onClick={deletePdfPopup}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            color: "greys.darkest",
          }}
        >
          Delete
          <img
            src={DeleteIcon}
            alt="Delete Icon"
            style={{ width: "15px", height: "15px" }}
          />
        </MenuItem>
      </Popover>
    </>
  );
};

export default ActionsIcon;
