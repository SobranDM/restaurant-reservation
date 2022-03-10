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
  const dateParam = new URLSearchParams(search).get('date');

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
      <div className="d-md-flex mb-3 flex-column align-items-center">
        <h1>Dashboard</h1>
        <div className="d-flex flex-row mb-3 mt-4">
          <h4 className="mr-3">Reservations for {date}</h4>
          <div className="btn-group" role="group" aria-label="navigate dates">
            <Link to={"/dashboard?date=" + previousDay}><button type="button" className="btn btn-secondary">Prev</button></Link>
            <Link to={"/dashboard"}><button type="button" className="btn btn-secondary">Today</button></Link>
            <Link to={"/dashboard?date=" + nextDay}><button type="button" className="btn btn-secondary">Next</button></Link>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Name</th>
              <th scope="col">People</th>
              <th scope="col">Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => {
              return (
                <tr key={reservation.reservation_id}>
                  <td>{reservation.reservation_time}</td>
                  <td>{reservation.first_name} {reservation.last_name}</td>
                  <td>{reservation.people}</td>
                  <td>{reservation.mobile_number}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
