import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";


export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/customers"
    )
      .then((response) => response.json())
      .then((data) => setCustomers(data._embedded.customers))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const columnDefs = [
    { headerName: "Firstname", field: "firstname", width: 150, sortable: true, filter: true },
    { headerName: "Lastname", field: "lastname", width: 150, sortable: true, filter: true },
    { headerName: "Address", field: "streetaddress", width: 200, sortable: true, filter: true },
    { headerName: "Postcode", field: "postcode", width: 100, sortable: true, filter: true },
    { headerName: "City", field: "city", width: 150, sortable: true, filter: true },
    { headerName: "Email", field: "email", width: 150, sortable: true, filter: true },
    { headerName: "Phone", field: "phone", width: 150, sortable: true, filter: true },
    {
      headerName: "Actions",
      width: 100,
      cellRenderer: (params) => (
        <button className="deleteButton" onClick={() => handleDelete(params.data)}>Delete</button>
      ),
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
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
      <div
        className="ag-theme-material"
        style={{ height: "500px", width: "1200px" }}
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
