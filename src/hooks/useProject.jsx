import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { projectActions } from "../store/slice/project.reducer";
import { getData, postData } from "../utils/serverHelper";
import { createUrlQuery } from "../utils/convertString";

export const useProject = (fetchProjects = false) => {
  const projectState = useAppSelector((state) => state.project);

  const { status, data, errorMessage } = projectState;

  const dispatch = useAppDispatch();

  const getProjects = useCallback(async () => {
    try {
      dispatch(projectActions.setProjectLoading());

      const data = await getData("/project");
      dispatch(projectActions.setProjectSuccess(data.data));
    } catch (error) {
      dispatch(
        projectActions.setProjectError(
          error?.response?.data?.error?.message ||
            error?.response?.data?.message ||
            "Error occured while getting projects"
        )
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (fetchProjects) {
      getProjects();
    }
  }, [fetchProjects, getProjects]);

  const createProject = useCallback(
    async (payload, closePopup, setLoading, setNavData) => {
      try {
        dispatch(projectActions.setProjectLoading());

        const data = await postData("/project/create", payload);
        getProjects();
        closePopup();
        setNavData({
          id: data?.data?._id,
          name: createUrlQuery(data?.data?.name),
        });
        setLoading(true);
      } catch (error) {
        console.log(error, "create project error");
        dispatch(
          projectActions.setProjectError(
            error?.response?.data?.error?.message ||
              error?.response?.data?.message ||
              "Error occured while creating project"
          )
        );
      }
    },
    [dispatch, getProjects]
  );

  const getAllScenes = useCallback(async (projectId) => {
    try {
      const data = await postData("/project/all-scenes", { projectId });
      return data?.data;
    } catch (error) {
      console.log(error, "error while getting scenes");
    }
  }, []);

  const isLoading = useMemo(
    () => status === "loading" || status === "initial",
    [status]
  );
  const isError = useMemo(() => status === "error", [status]);

  return {
    isError,
    isLoading,
    data,
    errorMessage,
    createProject,
    getAllScenes,
    getProjects,
  };
};
