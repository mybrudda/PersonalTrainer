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
    fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data._embedded.customers))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const columnDefs = [
    { headerName: "Firstname", field: "firstname", width: 150},
    { headerName: "Lastname", field: "lastname" , width: 150},
    { headerName: "Address", field: "streetaddress", width: 150 },
    { headerName: "Postcode", field: "postcode" , width: 150},
    { headerName: "City", field: "city" , width: 150},
    { headerName: "Email", field: "email" , width: 150},
    { headerName: "Phone", field: "phone" , width: 150},
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  return (
    <div>
      <div className="ag-theme-material" style={{ height: '500px', width: '1100px' }}>
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


