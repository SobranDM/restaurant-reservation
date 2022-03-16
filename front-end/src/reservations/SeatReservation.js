import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, getReservation, seatTable } from "../utils/api";
import { TableOfTables } from "../tables/TableOfTables";

export const SeatReservation = () => {
  const [reservation, setReservation] = useState({});
  const [tables, setTables] = useState([]);
  const [selectValue, setSelectValue] = useState({})
  const [errorMessage, setErrorMessage] = useState(null);
  const reservation_id = useParams();
  const history = useHistory();

  useEffect(() => loadSeating(reservation_id), [reservation_id]);

  function loadSeating({ reservation_id }) {
    const abortController = new AbortController();
    setErrorMessage(null);
    listTables(abortController.signal).then(setTables).catch(setErrorMessage);
    getReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setErrorMessage);
    return () => abortController.abort();
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const abortController = new AbortController();
      await seatTable(reservation_id, selectValue, abortController.signal).then(() => {
        history.push("/dashboard");
      })
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleCancel(event) {
    history.goBack();
  }

  function handleChange({target}) {
    setSelectValue(target.value);
  }

  return (
    <main>
      <h1 className="my-3">Seat Party</h1>
      {errorMessage && (
        <h5 className="alert alert-danger mx-1">{errorMessage}</h5>
      )}
      <div className="d-md-flex flex-column">
        <div className="constainer-fluid">
          <div className="row align-items-start px-3">
            <div className="col pl-0">
              <table className="table table-striped table-bordered mb-2">
                <caption>
                  <h3>Reservation</h3>
                </caption>
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
                      <select
                        className="form-select"
                        aria-label="Select Table"
                        id="tableSelect"
                        name="tableSelect"
                        onChange={handleChange}
                        value={selectValue}>
                        <option value="">
                          Select a table
                        </option>
                        {tables.map((table) => {
                          return (
                            <option
                              key={table.table_id}
                              value={table.table_id}>
                              Table{" "}
                              {table.table_name} -{" "}
                              {table.capacity}{" "}
                              person(s)
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  name="cancel"
                  onClick={(event) => handleCancel()}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  name="submit"
                  onClick={(event) => handleSubmit(event)}>
                  Submit
                </button>
              </div>
            </div>
            <TableOfTables tables={tables} />
          </div>
        </div>
      </div>
    </main>
  );
};
