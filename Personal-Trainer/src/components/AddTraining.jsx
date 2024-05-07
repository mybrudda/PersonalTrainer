import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";

export default function AddTraining({ customerId }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: null,
    duration: "",
    activity: "",
    customer: `https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${customerId}`,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const addTraining = () => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(training),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Training added successfully");
          handleClose();
        } else {
          alert("Failed to add training. Please try again.");
        }
      })
      .catch((error) => {
        alert("Error adding training. Please try again.");
      });
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Training Information</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              autoFocus
              label="Date and Time"
              margin="dense"
              name="date"
              value={training.date}
              onChange={(value) =>
                handleChange({ target: { name: "date", value } })
              }
              fullWidth
            />
          </LocalizationProvider>
          <TextField
            required
            margin="dense"
            fullWidth
            variant="standard"
            type="number"
            name="duration"
            label="Duration (minutes)"
            value={training.duration}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            fullWidth
            variant="standard"
            name="activity"
            label="Activity"
            value={training.activity}
            onChange={handleChange}
          />
          {/* This field is pre-filled with the dynamic customer reference link */}
          <TextField
            required
            margin="dense"
            fullWidth
            variant="standard"
            name="customer"
            label="Customer"
            value={training.customer}
            onChange={handleChange}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining} type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
