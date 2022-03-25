import React, { useState } from 'react';
import { Link } from "react-router-dom";

export const ReservationsTable = ({ reservations, tableChange, triggerTableChange }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { updateStatus } = require("../utils/api");

  function cancelHandler(reservation_id) {
    try {
      if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
        const abortController = new AbortController();
        updateStatus("cancelled", reservation_id, abortController.signal).then(() => triggerTableChange(tableChange + 1))
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="col pl-0">
      {errorMessage && (
        <h5 className="alert alert-danger mx-1">{errorMessage}</h5>
      )}
      <table className="table table-striped table-bordered">
        <caption><h3>Reservations</h3></caption>
        <thead className="table-secondary">
          <tr>
            <th scope="col">Time</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">People</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Status</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => {
            return (
              <tr key={reservation.reservation_id}>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.last_name}</td>
                <td>{reservation.people}</td>
                <td>{reservation.mobile_number}</td>
                <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                <td className="button-data">
                  <div className="btn-group-sm" role="group">
                    <button type="button" className="btn btn-sm btn-danger mr-1" name="cancel" data-reservation-id-cancel={reservation.reservation_id} onClick={() => cancelHandler(reservation.reservation_id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </button>
                    <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                      <button type="button" className="btn btn-sm btn-secondary">Edit</button>
                    </Link>
                    {reservation.status === 'booked' && <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                      <button type="button" className="btn btn-sm btn-primary ml-1">Seat</button>
                    </Link>}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}
