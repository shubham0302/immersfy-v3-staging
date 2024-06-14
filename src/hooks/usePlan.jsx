import { useCallback, useState } from "react";
import { getData } from "../utils/serverHelper";

export const usePlan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const getPlans = useCallback(async (type) => {
    setIsLoading(true);
    try {
      const data = await getData("/plan?type=" + type);
      setIsLoading(false);
      setData(data.data);
    } catch (error) {
      console.log(error, "get plans error");
      setIsLoading(false);
      setErrorMessage(error?.response?.error?.message);
    }
  }, []);

  return {
    getPlans,
    isLoading,
    data,
    errorMessage,
  };
};
