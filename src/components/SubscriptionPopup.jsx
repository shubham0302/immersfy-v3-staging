import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slider,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { usePlan } from "../hooks/usePlan";
import { Check, Close } from "@mui/icons-material";
import { useStripe } from "../hooks/useStripe";
import { LoadingButton } from "@mui/lab";

// eslint-disable-next-line react/prop-types
const SubscriptionPopup = ({ open, type, closeFunction }) => {
  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-paper": { maxWidth: "max-content", minWidth: "600px" },
      }}
    >
      <DialogTitle>
        {" "}
        {type === "trialEnded"
          ? "Trial Ended"
          : type === "creditsOver"
          ? "Credits Over"
          : type === "subscriptionEnded"
          ? "Subscription Ended"
          : ""}
      </DialogTitle>

      <IconButton
        sx={{ position: "absolute", right: 8, top: 8 }}
        onClick={closeFunction}
      >
        <Close />
      </IconButton>

      {type === "creditsOver" ? (
        <TopupComponent />
      ) : type === "trialEnded" || type === "subscriptionEnded" ? (
        <SubscriptionComponent />
      ) : null}
    </Dialog>
  );
};

const SubscriptionComponent = () => {
  const [subscriptionType, setSubscriptionType] = useState("monthly");

  const { createSubscriptionSession, subscriptionLoading } = useStripe();
  const { getPlans, data } = usePlan();

  useEffect(() => {
    getPlans(subscriptionType);
  }, [getPlans, subscriptionType]);
  const theme = useTheme();
  return (
    <DialogContent>
      <Box
        sx={{
          bgcolor: "greys.lightest",
          padding: 0.5,
          borderRadius: 8,
          display: "flex",
          gap: 1,
          border: "1px solid",
          borderColor: alpha(theme.palette.greys.light, 0.1),
          maxWidth: "fit-content",
          margin: "auto",
        }}
      >
        <Box
          onClick={() => setSubscriptionType("monthly")}
          component={"span"}
          sx={{
            paddingY: 0.5,
            paddingX: 1,
            borderRadius: 8,
            bgcolor: subscriptionType === "monthly" ? "white" : "transparent",
            color: subscriptionType === "monthly" ? "black" : "greys.light",
            cursor: "pointer",
            border: "1px solid",
            borderColor:
              subscriptionType === "monthly"
                ? alpha(theme.palette.greys.light, 0.2)
                : "transparent",
          }}
        >
          Monthly
        </Box>
        <Box
          onClick={() => setSubscriptionType("yearly")}
          component={"span"}
          sx={{
            paddingY: 0.5,
            paddingX: 1,
            borderRadius: 8,
            bgcolor: subscriptionType === "yearly" ? "white" : "transparent",
            color: subscriptionType === "yearly" ? "black" : "greys.light",
            cursor: "pointer",
            border: "1px solid",
            borderColor:
              subscriptionType === "yearly"
                ? alpha(theme.palette.greys.light, 0.2)
                : "transparent",
          }}
        >
          Yearly
        </Box>
      </Box>

      <Box
        sx={{ mt: 2 }}
        display="flex"
        justifyContent={"center"}
        alignItems="flex-start"
        gap={2}
      >
        {data.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              border: "1px solid",
              borderColor: alpha(theme.palette.greys.light, 0.3),
              borderRadius: 4,
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              width: "280px",
            }}
          >
            <Typography
              variant="body1"
              textTransform="uppercase"
              fontWeight={600}
            >
              {item.name}
            </Typography>
            <Box display={"flex"} alignItems={"baseline"}>
              <Typography variant="h4" fontWeight={500}>
                $
                {(
                  item.price / (subscriptionType === "yearly" ? 12 : 1)
                ).toFixed(2)}
              </Typography>
              <Typography color={"greys.light"}>/month</Typography>
            </Box>
            <LoadingButton
              loading={subscriptionLoading}
              onClick={async () => await createSubscriptionSession(item._id)}
              variant="contained"
              fullWidth
              sx={{
                borderRadius: 8,
                bgcolor: "greys.darkest",
                "&:hover": { bgcolor: "greys.main" },
              }}
            >
              Buy Plan
            </LoadingButton>
            <Divider sx={{ borderStyle: "dashed" }} />
            <Box>
              <Typography variant="body2" color={"greys.main"}>
                The Pro Plan includes
              </Typography>

              <Box>
                <List sx={{ py: 0 }}>
                  {item.details.map((detail, index) => (
                    <ListItem key={index} sx={{ p: 0 }}>
                      <ListItemIcon sx={{ minWidth: "auto" }}>
                        <Check sx={{ height: "16px" }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ span: { fontSize: "14px" } }}
                        primary={detail}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </DialogContent>
  );
};

const TopupComponent = () => {
  const [creditAmount, setCreditAmount] = useState(200);

  const { createTopupSession, topupLoading } = useStripe();

  const theme = useTheme();
  return (
    <>
      <DialogContent>
        <Box bgcolor={"greys.lightest"} padding={2}>
          <Typography variant="body1" fontWeight={500}>
            Slide to buy credits
          </Typography>

          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Slider
              defaultValue={200}
              max={500}
              value={creditAmount}
              onChange={(event, value) => setCreditAmount(value)}
              aria-label="Small"
              valueLabelDisplay="auto"
            />
            <Box display={"flex"} alignItems={"center"} gap={0.5}>
              <Box
                component={"span"}
                bgcolor={"white"}
                px={1}
                py={0.5}
                borderRadius={1}
                sx={{
                  minWidth: "36px",
                  textAlign: "center",
                  border: "1px solid",
                  borderColor: alpha(theme.palette.greys.main, 0.2),
                }}
              >
                {creditAmount}
              </Box>
              <Typography>credits</Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ mb: 1, px: 4 }}>
        <LoadingButton
          loading={topupLoading}
          onClick={async () => await createTopupSession(creditAmount)}
          variant="contained"
          fullWidth
          sx={{ borderRadius: 8 }}
        >
          Buy Credits
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default SubscriptionPopup;
