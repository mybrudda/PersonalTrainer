import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

export default function Training() {
  const [trainings, setTrainings] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings"
    )
      .then((response) => response.json())
      .then((data) => {
        setTrainings(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const confirmDelete = (data) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this training?");
    if (confirmDelete) {
      handleDelete(data);
    }
  };

  const handleDelete = (data) => {
    const trainingId = data.id;

    fetch(`https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${trainingId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTrainings((prevTrainings) =>
            prevTrainings.filter((training) => training.id !== trainingId)
          );
        } else {
          throw new Error("Failed to delete training");
        }
      })
      .catch((error) => console.error("Error deleting training:", error));
  };

  const columnDefs = [
    {
      headerName: "Date",
      field: "date",
      width: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return format(date, "dd.MM.yyyy HH:mm");
      },
      sortable: true,
      filter: true,
    },
    { headerName: "Duration", field: "duration", width: 150, sortable: true, filter: true },
    { headerName: "Activity", field: "activity", width: 200, sortable: true, filter: true },
    {
      headerName: "Customer",
      field: "customerName",
      sortable: true,
      filter: true,
      valueGetter: (params) => {
        const customer = params.data.customer;
        if (customer) {
          return `${customer.firstname} ${customer.lastname}`;
        } else {
          return '';
        }
      },
    },
    {
      headerName: "Actions",
      width: 100,
      cellRenderer: (params) => (
        <button className="deleteButton" onClick={() => confirmDelete(params.data)}>Delete</button>
      ),
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
  };



  return (
    <div>
      
      <div className="ag-theme-material" style={{ height: "500px", width: "1100px" }}>
        <AgGridReact
          rowSelection="single"
          animateRows={true}
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}
