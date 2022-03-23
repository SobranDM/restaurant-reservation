import React from "react";

export const ReservationForm = ({ formData, setFormData }) => {
  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  return (
    <form className="d-flex flex-column">
      <div className="d-flex">
        <input
          type="string"
          className="form-control m-1"
          name="first_name"
          onChange={handleChange}
          placeholder="First Name"
          value={formData.first_name}
        />
        <input
          type="string"
          className="form-control m-1"
          name="last_name"
          onChange={handleChange}
          placeholder="Last Name"
          value={formData.last_name}
        />
      </div>
      <div className="d-flex">
        <input
          type="number"
          className="form-control m-1"
          name="people"
          onChange={handleChange}
          placeholder="People"
          value={formData.people}
        />
        <input
          type="string"
          className="form-control m-1"
          name="mobile_number"
          onChange={handleChange}
          placeholder="Mobile Number"
          value={formData.mobile_number}
        />
      </div>
      <div className="d-flex">
        <input
          type="date"
          name="reservation_date"
          className="form-control m-1"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          onChange={handleChange}
          value={formData.reservation_date}
        />
        <input
          type="time"
          name="reservation_time"
          className="form-control m-1"
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
          onChange={handleChange}
          value={formData.reservation_time}
        />
      </div>
    </form>
  );
};
