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
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings"
    )
      .then((response) => response.json())
      .then((data) => {
        const promises = data._embedded.trainings.map((training) =>
          fetch(training._links.customer.href).then((response) =>
            response.json()
          )
        );

        Promise.all(promises).then((customers) => {
          const trainingData = data._embedded.trainings.map(
            (training, index) => ({
              ...training,
              customer: customers[index],
            })
          );
          setTrainings(trainingData);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const extractIdFromHref = (href) => {
    const parts = href.split("/");
    return parts[parts.length - 1];
  };

  const handleDelete = (data) => {
    const trainingId = extractIdFromHref(data._links.self.href);
    console.log("Delete training with ID:", trainingId);

    fetch(`https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${trainingId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTrainings((prevTrainings) =>
            prevTrainings.filter((training) => training.id !== trainingId)
          );
          fetchData();
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
    { headerName: "Duration", field: "duration", width: 100, sortable: true, filter: true },
    { headerName: "Activity", field: "activity", width: 200, sortable: true, filter: true },
    {
      headerName: "Customer",
      field: "customerName",
      sortable: true,
      filter: true,
      valueGetter: (params) =>
        `${params.data.customer.firstname} ${params.data.customer.lastname}`,
    },
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