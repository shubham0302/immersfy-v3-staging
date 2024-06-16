import { useCallback } from "react";
import { postData } from "../utils/serverHelper";
import { useAppDispatch } from "../store";
import { setDeletePopup } from "../store/slice/popup.reducer";
import { useProject } from "./useProject";
import { useScene } from "./useScene";
import { useFrame } from "./useFrame";

export const usePopup = () => {
  const dispatch = useAppDispatch();
  const { getProjects } = useProject();
  const { getScene } = useScene();
  const { generateFrames } = useFrame();
  const deletePopup = useCallback(
    async (type, id) => {
      try {
        if (type === "project") {
          await postData("/project/delete", { projectId: id });
          getProjects();
        } else if (type === "scene") {
          await postData("/scene/delete", { sceneId: id });
          getScene();
        } else {
          await postData("/frame/delete", { frameId: id });
          generateFrames();
        }
        dispatch(setDeletePopup({ popup: false, id: "", type: "" }));
      } catch (error) {
        console.log(error, "delete popup error");
      }
    },
    [dispatch, generateFrames, getProjects, getScene]
  );

  return {
    deletePopup,
  };
};
