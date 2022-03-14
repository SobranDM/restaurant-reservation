import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';
import { listTables, getReservation } from "../utils/api";

export const SeatReservation = () => {
  const [reservation, setReservation] = useState({});
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const reservation_id = useParams();

  useEffect(() => loadSeating(reservation_id), [reservation_id]);

  function loadSeating({ reservation_id }) {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setError);
    getReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setError);
    return () => abortController.abort();
  }

  function handleSubmit(event) {
    try {
      event.preventDefault();
      
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main>
      <h1 className="my-3">Seat Party</h1>
      {error &&
        ( <ErrorAlert error={error} /> )}
      <table className="table table-striped table-bordered">
        <thead className="table-secondary">
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Name</th>
            <th scope="col">People</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Table</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{reservation.reservation_time}</td>
            <td>
              {reservation.first_name}{" "}
              {reservation.last_name}
            </td>
            <td>{reservation.people}</td>
            <td>{reservation.mobile_number}</td>
            <td>
              <select className="form-select" aria-label="Select Table">
                <option value="">Select a table</option>
                {tables.map((table) => {
                  return <option key={table.table_id}>Table {table.table_name} - {table.capacity} person(s)</option>
                })}
              </select>
              <button type="submit" className="btn btn-primary ml-3" onSubmit={(event) => handleSubmit(event)}>Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}