import { useCallback, useState } from "react";
import { getData } from "../utils/serverHelper";
import { useAppDispatch } from "../store";
import { setSubscriptionPopup } from "../store/slice/theme.reducer";

export const useEligibility = () => {
  const [popup, setPopup] = useState({ open: false, type: "" });
  const dispatch = useAppDispatch();

  const closeSubscriptionPopup = useCallback(() => {
    dispatch(
      setSubscriptionPopup({
        popup: false,
        type: "",
      })
    );
  }, [dispatch]);

  const checkEligibility = useCallback(
    async (type, successFunction) => {
      try {
        await getData(`/user/check-eligibility?type=${type}`);
        successFunction();
      } catch (error) {
        dispatch(
          setSubscriptionPopup({
            popup: true,
            type: Object.keys(error?.response?.data?.error?.message)[0],
          })
        );

        setPopup({
          open: true,
          type: Object.keys(error?.response?.data?.error?.message)[0],
        });
      }
    },
    [dispatch]
  );

  return {
    popup,
    checkEligibility,
    closeSubscriptionPopup,
  };
};
