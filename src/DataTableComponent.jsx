import React, { useEffect, useRef } from "react";
import $ from 'jquery';
require('datatables.net');

function DataTableComponent(props) {
  const tableRef = useRef();

  useEffect(() => {
    $(tableRef.current).DataTable({
      data: props.data,
      columns: [
        { title: "Name", data: "name" },
        { title: "Position", data: "position" },
        { title: "Office", data: "office" },
        { title: "Age", data: "age" },
        { title: "Start date", data: "start_date" },
        { title: "Salary", data: "salary" }
      ]
    });
  }, [props.data]);

  return (
    <table ref={tableRef}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Age</th>
          <th>Start date</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {/* Render table rows here */}
      </tbody>
    </table>
  );
}

export default DataTableComponent;