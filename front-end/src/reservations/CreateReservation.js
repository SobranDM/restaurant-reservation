import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ReservationForm } from "./ReservationForm";
import { createReservation } from "../utils/api.js";
import { today } from "../utils/date-time";

export const CreateReservation = () => {
  const history = useHistory();
  const todaysDate = new Date(today());
  const [errorMessage, setErrorMessage] = useState("");
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
    const submitDate = new Date(formData.reservation_date);
    const submitDay = submitDate.getDay();
    if (submitDate < todaysDate) {
      setErrorMessage('Cannot set reservation for past date.')
    } else if (submitDay === 1) {
      setErrorMessage('We apologize. The restaurant is not open on Tuesdays.')
    } else {
      try {
        await createReservation(formData).then(() => {
          const destination = `/dashboard?date=${formData.reservation_date}`
          history.push(destination);
        })
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h1 className="my-3">Create Reservation</h1>
      {errorMessage && (
        <h5 className="alert alert-danger mx-1">{errorMessage}</h5>
      )}
      <ReservationForm formData={formData} setFormData={setFormData} />
      <div className="btn-group ml-1 mt-1">
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
  );
};
