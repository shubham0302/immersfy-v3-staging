import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../store";
import { setEditTitlePopup } from "../store/slice/popup.reducer";
import { usePopup } from "../hooks/usePopup";

const EditTitlePopup = ({ open, id, type, title }) => {
  const [titleValue, setTitleValue] = useState(title);

  const { editTitlePopup } = usePopup();

  const dispatch = useAppDispatch();
  return (
    <Dialog open={open}>
      <DialogTitle>Change {type} title</DialogTitle>
      <DialogContent sx={{ minWidth: "420px" }}>
        <TextField
          fullWidth
          defaultValue={title}
          onChange={(e) => setTitleValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() =>
            dispatch(
              setEditTitlePopup({ id: "", type: "", popup: false, title: "" })
            )
          }
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => editTitlePopup(type, id, titleValue)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTitlePopup;
