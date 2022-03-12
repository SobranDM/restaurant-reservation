import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
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

  useEffect(() => loadDashboard(date), [date]);

  function loadDashboard(date) {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1 className="mt-3">Dashboard</h1>
      <div className="d-md-flex mb-3 flex-column">
        <h4>Reservations for {date}</h4>
        <div
          className="btn-group my-4 justify-content-between"
          role="group"
          aria-label="navigate dates">
          <Link to={"/dashboard?date=" + previousDay}>
            <button type="button" className="btn btn-info">
              Prev
            </button>
          </Link>
          <Link to={"/dashboard"}>
            <button type="button" className="btn btn-primary mx-1">
              Today
            </button>
          </Link>
          <Link to={"/dashboard?date=" + nextDay}>
            <button type="button" className="btn btn-info">
              Next
            </button>
          </Link>
        </div>
        <table className="table table-striped table-bordered">
          <thead className="table-secondary">
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Name</th>
              <th scope="col">People</th>
              <th scope="col">Mobile Number</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => {
              return (
                <tr key={reservation.reservation_id}>
                  <td>{reservation.reservation_time}</td>
                  <td>
                    {reservation.first_name}{" "}
                    {reservation.last_name}
                  </td>
                  <td>{reservation.people}</td>
                  <td>{reservation.mobile_number}</td>
                  <td>
                    <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                      <button type="button" className="btn btn-sm btn-secondary m-0">Seat</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;