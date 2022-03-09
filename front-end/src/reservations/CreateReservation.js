import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ReservationForm } from "./ReservationForm";
import { createReservation } from "../utils/api.js"

export const CreateReservation = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    people: 1,
    reservation_date: "",
    reservation_time: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    await createReservation(formData).then(() => {
      const destination = `/dashboard?date=${formData.reservation_date}`
      history.push(destination);
    })
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h2>Create Reservation</h2>
      <ReservationForm formData={formData} setFormData={setFormData} />
      <button
        type="button"
        className="btn btn-secondary mr-2"
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
  );
};
