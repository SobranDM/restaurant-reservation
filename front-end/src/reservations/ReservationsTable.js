import React from 'react';
import { Link } from "react-router-dom";

export const ReservationsTable = ({ reservations }) => {
  return (
    <div className="col pl-0">
              <table className="table table-striped table-bordered">
                <caption><h3>Reservations</h3></caption>
                <thead className="table-secondary">
                  <tr>
                    <th scope="col">Time</th>
                    <th scope="col">Name</th>
                    <th scope="col">People</th>
                    <th scope="col">Mobile Number</th>
                    <th scope="col">Status</th>
                    <th scope="col-1" />
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
                        <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                        <td className="button-data">
                          {reservation.status === 'booked' && <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                            <button type="button" className="btn btn-sm btn-secondary table-button">Seat</button>
                          </Link>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
  )
}
