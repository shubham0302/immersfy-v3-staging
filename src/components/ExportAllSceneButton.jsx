import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import { Button, CircularProgress } from "@mui/material";
import ExportPdfIcon from "../Assets/Images/pdf.png";
import DownloadCircleIcon from "../Assets/Images/download-circle.png";
import { useState } from "react";
import jsPDF from "jspdf";
import { useProject } from "../hooks/useProject";
import { useParams, useSearchParams } from "react-router-dom";
import { useScene } from "../hooks/useScene";
const ExportAllSceneButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [pdfLoading, setPdfLoading] = useState(false);
  const { getAllScenes } = useProject();

  const { getSceneDetails } = useScene();

  const [searchParams] = useSearchParams();

  const { projectId } = useParams();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
      const frameData = await getAllScenes(projectId);
      const title = searchParams.get("title");

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

          const data = await getSceneDetails(scene?.scene);

          sceneTitle = data.title;

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
      handleClose();
    } catch (error) {
      setPdfLoading(false);
      console.log(error, "error generating pdf");
    }
  };

  return (
    <>
      <Button
        onClick={handleMenuClick}
        sx={{
          borderRadius: 24,
          height: 38,
          bgcolor: "#f1f1f1",
          fontSize: "14px",
          color: "greys.darkest",
          marginRight: 3,
        }}
      >
        <img
          src={DownloadCircleIcon}
          alt="New Project Icon"
          style={{ marginRight: "10px", width: 20, height: 20 }}
        />
        Export All
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            width: "176px",
            borderRadius: "20px",
          },
        }}
      >
        <MenuItem
          onClick={downloadPDF}
          sx={{
            mt: 1,
            display: "flex",
            fontSize: "14px",
            color: "greys.darkest",
            my: 1,
            gap: "14px",
          }}
        >
          {pdfLoading ? (
            <CircularProgress
              sx={{ height: "20px !important", width: "20px !important" }}
            />
          ) : (
            <img
              src={ExportPdfIcon}
              alt="Edit Icon"
              style={{ width: "20px", height: "20px" }}
            />
          )}
          {pdfLoading ? "Exporting..." : "Export as PDF"}
        </MenuItem>

        {/* <MenuItem onClick={handleClose} sx={{ 'mt':1,display: 'flex',fontSize: '14px', color: 'greys.darkest' ,borderBottom: '2px solid #f2f2f2'}}>
            <img src={ExportVideoIcon} alt="Edit Icon" style={{width: "20px", height: "20px",marginRight:"15px" }} />
            Export Video
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ 'mt':1, display: 'flex', fontSize: '14px', color: 'greys.darkest',borderBottom: '2px solid #f2f2f2' }}>
            <img src={ExportZipIcon} alt="Edit Icon" style={{width: "20px", height: "20px",marginRight:"15px" }} />
            Export as ZIP
        </MenuItem> */}
      </Popover>
    </>
  );
};

export default ExportAllSceneButton;
