import React from 'react'

export const TableOfTables = ({ tables }) => {
  return (
    <div className="col pr-0">
      <table className="table table-striped table-bordered">
        <caption><h3>Tables</h3></caption>
        <thead className="table-secondary">
          <tr>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Availability</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => {
            return (
              <tr key={table.table_id}>
                <td>{table.table_name}</td>
                <td>{table.capacity}</td>
                {table.reservation_id &&
                  <td data-table-id-status={table.table_id}>Occupied</td>}
                {!table.reservation_id &&
                  <td data-table-id-status={table.table_id}>Free</td>}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
