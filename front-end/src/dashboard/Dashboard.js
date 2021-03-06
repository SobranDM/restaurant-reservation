import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { TableOfTables } from "../tables/TableOfTables";
import { ReservationsTable } from "../reservations/ReservationsTable";
import { today, previous, next } from "../utils/date-time";

import "./Dashboard.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [tableChange, triggerTableChange] = useState(0);
  const search = useLocation().search;
  const dateParam = new URLSearchParams(search).get("date");

  let date;
  if (dateParam) {
    date = dateParam;
  } else {
    date = today();
  }

  let previousDay = previous(date);
  let nextDay = next(date);

  useEffect(() => loadDashboard(date), [date, tableChange]);

  function loadDashboard(date) {
    const abortController = new AbortController();
    setError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1 className="mt-3 text-light">Dashboard</h1>
      <div className="d-md-flex mb-3 flex-column">
        <h4 className="text-light">Reservations for {date}</h4>
        <div
          className="btn-group my-4 justify-content-start"
          role="group"
          aria-label="navigate dates">
          <Link to={"/dashboard?date=" + previousDay}>
            <button type="button" className="btn btn-info">
              Prev
            </button>
          </Link>
          <Link to={"/dashboard"}>
            <button type="button" className="btn btn-primary mx-3">
              Today
            </button>
          </Link>
          <Link to={"/dashboard?date=" + nextDay}>
            <button type="button" className="btn btn-info">
              Next
            </button>
          </Link>
        </div>
        <div className="container-fluid">
          <div className="row align-items-start">
            <ReservationsTable reservations={reservations} table={tableChange} triggerTableChange={triggerTableChange} />
            <TableOfTables tables={tables} tableChange={tableChange} triggerTableChange={triggerTableChange} />
          </div>
        </div>
      </div>
      <ErrorAlert error={error} />
    </main>
  );
}

export default Dashboard;