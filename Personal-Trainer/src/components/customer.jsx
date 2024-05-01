import DeleteIcon from '@mui/icons-material/Delete';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import EditCustomer from "./EditCustomer";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers")
      .then((response) => response.json())
      .then((data) => {
        const customersWithId = data._embedded.customers.map((customer) => ({
          ...customer,
          id: extractIdFromHref(customer._links.self.href),
        }));
        setCustomers(customersWithId);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const columnDefs = [
    { headerName: "Firstname", field: "firstname", width: 150, sortable: true, filter: true },
    { headerName: "Lastname", field: "lastname", width: 150, sortable: true, filter: true },
    { headerName: "Address", field: "streetaddress", width: 200, sortable: true, filter: true },
    { headerName: "Postcode", field: "postcode", width: 100, sortable: true, filter: true },
    { headerName: "City", field: "city", width: 150, sortable: true, filter: true },
    { headerName: "Email", field: "email", width: 200, sortable: true, filter: true },
    { headerName: "Phone", field: "phone", width: 150, sortable: true, filter: true },
    {
      headerName: "Actions",
      width: 100,
      cellRenderer: (params) => (
        <DeleteIcon className="deleteButton" onClick={() => confirmDelete(params.data)}/>
      ),
    },
    {
      width: 100,
      headerName: "Edit",
      cellRenderer: (props) => (
        <EditCustomer updateCustomer={updateCustomer} customer={props.data} />
      ),
    },
    {
      headerName: "Add Training",
      width: 200,
      cellRenderer: (params) => (
        <div>
          <AddTraining customerId={params.data.id} /> 
        </div>
      ),
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const confirmDelete = (data) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (confirmDelete) {
      handleDelete(data);
    }
  };

  const saveCustomer = (customer) => {
    fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData()) 
      .catch((err) => console.error(err));
  };

  const handleDelete = (data) => {
    const id = extractIdFromHref(data._links.self.href); 
    fetch(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Delete the customer from the local state
          setCustomers((prevCustomers) =>
            prevCustomers.filter((customer) => customer.id !== id)
          );
          // Fetch the updated list of customers
          fetchData();
        } else {
          throw new Error("Failed to delete customer");
        }
      })
      .catch((error) => console.error("Error deleting customer:", error));
  };

  const extractIdFromHref = (href) => {
    const parts = href.split("/");
    return parts[parts.length - 1];
  };

  
  return (
    <div>
       <div style={{ margin: "20px" }}>
        <AddCustomer saveCustomer={saveCustomer} />
      </div>
      <div
        className="ag-theme-material"
        style={{ height: "500px", width: "1520px" }}
      >
        <AgGridReact
          rowSelection="single"
          animateRows={true}
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}
