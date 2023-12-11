import React from "react";

const Table = (props) => {
  return (
    <table>
      <thead>
        <tr>
          {props.columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((r, i)=><td key={i}>{r}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
