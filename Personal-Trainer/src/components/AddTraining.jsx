import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customerId: "",
  });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched customer data:", data); 
        if (data && data._embedded && data._embedded.customers) {
          const customerIds = data._embedded.customers.map((customer) => {
            const customerId = parseInt(customer._links.customer.href.split("/").pop());
            return customerId;
          });
          //Checking if it finds the all existing customer IDs
          console.log("Fetched customer IDs:", customerIds);
          setCustomers(customerIds);
        } else {
          console.error("Error: Customers data not found in the response");
        }
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    // Format the date value to match the expected format of datetime-local input
    const formattedDate = event.target.value.replace(" ", "T");
    setTraining({ ...training, [event.target.name]: formattedDate });
  };

  const addTraining = () => {
    // Check if the entered customer ID exists
    if (customers.includes(parseInt(training.customerId))) {
      props.saveTraining(training);
      handleClose();
    } else {
      alert("Customer with the provided ID does not exist.");
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Training Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            fullWidth
            variant="standard"
            type="datetime-local"
            name="date"
            value={training.date}
            onChange={handleChange}
          />
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
          <TextField
            required
            margin="dense"
            fullWidth
            variant="standard"
            type="number"
            name="customerId"
            label="Customer ID"
            value={training.customerId}
            onChange={handleChange}
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
