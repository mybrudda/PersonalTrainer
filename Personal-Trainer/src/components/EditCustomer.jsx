import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

export default function EditCustomer(props) {
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
    console.log(props.customer);
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city,
      email: props.customer.email,
      phone: props.customer.phone,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const updateCustomer = () => {
    props.updateCustomer(customer, props.customer._links.customer.href);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Information</DialogTitle>
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
          <Button onClick={updateCustomer} type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
