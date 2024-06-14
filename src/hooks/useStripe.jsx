import { useCallback, useState } from "react";
import { postData } from "../utils/serverHelper";

export const useStripe = () => {
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [topupLoading, setTopupLoading] = useState(false);

  const createSubscriptionSession = useCallback(async (planId) => {
    setSubscriptionLoading(true);
    try {
      const data = await postData("/stripe/create-subscription-session", {
        planId,
      });
      setSubscriptionLoading(false);
      window.location.replace(data.data.url);
    } catch (error) {
      setSubscriptionLoading(false);
      console.log(error, "create subscription error");
    }
  }, []);

  const createTopupSession = useCallback(async (amount) => {
    setTopupLoading(true);
    try {
      const data = await postData("/stripe/create-topup-session", { amount });
      setTopupLoading(false);
      window.location.replace(data.data.url);
    } catch (error) {
      setTopupLoading(false);
      console.log(error, "create topup error");
    }
  }, []);

  return {
    subscriptionLoading,
    createSubscriptionSession,
    createTopupSession,
    topupLoading,
  };
};
