import React, { useState } from "react";

export const TableOfTables = ({ tables, tableChange, triggerTableChange }) => {
  const { freeTable } = require("../utils/api");
  const [errorMessage, setErrorMessage] = useState(null);

  async function finishHandler(table_id) {
    try {
      if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
        const abortController = new AbortController();
        await freeTable(table_id, abortController.signal).then(() => triggerTableChange(tableChange + 1));
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="col pl-sm-0 pl-md-3">
      {errorMessage && (
        <h5 className="alert alert-danger mx-1">{errorMessage}</h5>
      )}
      <table className="table table-dark table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Availability</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => {
            return (
              <tr key={table.table_id}>
                <td>{table.table_name}</td>
                <td>{table.capacity}</td>
                {table.reservation_id && (
                  <td data-table-id-status={table.table_id}>
                    Occupied
                  </td>
                )}
                {!table.reservation_id && (
                  <td data-table-id-status={table.table_id}>
                    Free
                  </td>
                )}
                <td className="button-data">
                  {table.reservation_id && <button
                    type="button"
                    className="btn btn-sm btn-secondary table-button"
                    data-table-id-finish={table.table_id}
                    onClick={() => finishHandler(table.table_id)}>
                    Finish
                  </button>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
