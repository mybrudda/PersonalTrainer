import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

export default function AddCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const addCustomer = () => {
    props.saveCustomer(customer);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            fullWidth
            variant="standard"
            name="firstname"
            label="First Name"
            value={customer.firstname}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            fullWidth
            variant="standard"
            name="lastname"
            label="Last Name"
            value={customer.lastname}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            fullWidth
            variant="standard"
            name="streetaddress"
            label="Street Address"
            value={customer.streetaddress}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            fullWidth
            variant="standard"
            name="postcode"
            label="Postcode"
            value={customer.postcode}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            fullWidth
            variant="standard"
            name="city"
            label="City"
            value={customer.city}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            fullWidth
            variant="standard"
            name="email"
            label="Email"
            value={customer.email}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            fullWidth
            variant="standard"
            name="phone"
            label="Phone"
            value={customer.phone}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCustomer} type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
