import { useCallback } from "react";
import { postData } from "../utils/serverHelper";
import { useAppDispatch } from "../store";
import {
  setDeletePopup,
  setEditTitlePopup,
} from "../store/slice/popup.reducer";
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

  const editTitlePopup = useCallback(async (type, id, title) => {
    try {
      if (type === "project") {
        await postData("/project/change-title", { projectId: id, title });
        getProjects();
      } else {
        await postData("/scene/change-title", { sceneId: id, title });
        getScene();
      }
      dispatch(
        setEditTitlePopup({ popup: false, id: "", type: "", title: "" })
      );
    } catch (error) {
      console.log(error, "edit title error");
    }
  }, []);

  return {
    deletePopup,
    editTitlePopup,
  };
};
