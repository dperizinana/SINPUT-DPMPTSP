import React from "react";
import { useTable } from "react-table";
export default function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table className="table-home" {...getTableProps()} id="table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, columnIndex) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "0.5px solid grey",
                  borderTopLeftRadius: columnIndex === 0 ? "10px" : "0", // Border radius sudut kiri atas
                  borderTopRightRadius:
                    columnIndex === headerGroup.headers.length - 1
                      ? "10px"
                      : "0", // Border radius sudut kanan atas
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              style={{ background: rowIndex % 2 === 0 ? "white" : "#F1F6F9" }}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "none",
                      borderBottom: "0.5px solid #EEEEEE",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
