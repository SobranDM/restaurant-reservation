import React from 'react';

export const ReservationForm = () => {
  return (
    <form>
      <div className="form-group">
        <label for="first_name">First Name:</label>
        <input type="string" className="form-control" id="first_name" />
        <label for="last_name">Last Name:</label>
        <input type="string" className="form-control" id="last_name" />
      </div>
      <div className="form-group">
        <label for="mobile_number">Mobile Number:</label>
        <input type="string" className="form-control" id="mobile_number" />
        <label for="people">Number in Party:</label>
        <input type="integer" className="form-control" id="people" />
      </div>
      <div className="form-group">
        <label for="reservation_date">Reservation Date:</label>
        <input type="date" className="form-control" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" />
        <label for="reservation_time">Reservation Time:</label>
        <input type="time" className="form-control" placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}" />
      </div>
    </form>
  )
}
