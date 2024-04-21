import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

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

  const columnDefs = [
    {
      headerName: "Date",
      field: "date",
      width: 300,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return format(date, "dd.MM.yyyy HH:mm");
      },
       sortable: true, filter: true 
    },
    { headerName: "Duration", field: "duration", width: 200, sortable: true, filter: true  },
    { headerName: "Activity", field: "activity", width: 300, sortable: true, filter: true  },

    {
      headerName: "Customer",
      field: "customerName",
      sortable: true, filter: true ,
      valueGetter: (params) =>
        `${params.data.customer.firstname} ${params.data.customer.lastname}`,
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  return (
    <div>
      <div
        className="ag-theme-material"
        style={{ height: "500px", width: "1100px" }}
      >
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
