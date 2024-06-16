import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../store";
import { setDeletePopup } from "../store/slice/popup.reducer";
import { usePopup } from "../hooks/usePopup";

const DeletePopup = ({ open, type, id }) => {
  const dispatch = useAppDispatch();

  const { deletePopup } = usePopup();

  return (
    <Dialog open={open}>
      <DialogTitle>Delete {type}</DialogTitle>
      <DialogContent>
        <Typography color={"greys.darker"}>
          Are you sure you want to delete the {type}? This action cannot be
          undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 2, mb: 1 }}>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(setDeletePopup({ popup: false, id: "", type: "" }));
          }}
          fullWidth
          sx={{ borderRadius: 8 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => deletePopup(type, id)}
          fullWidth
          sx={{ borderRadius: 8 }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePopup;
