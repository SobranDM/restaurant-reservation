import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ReservationForm } from "./ReservationForm";
import { getReservation, updateReservation } from "../utils/api.js";
import ErrorAlert from "../layout/ErrorAlert";

export const EditReservation = () => {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    people: 1,
    reservation_date: "",
    reservation_time: "",
    status: "booked"
  });

  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    const abortController = new AbortController();
    setErrorMessage(null);
    console.log(reservation_id)
    getReservation(reservation_id, abortController.signal)
      .then(setFormData)
      .catch(setErrorMessage);
    return () => abortController.abort();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function sendUpdate() {
      try {
        let parsedForm = { ...formData, people: Number(formData.people) }
        console.error(`FormDate: ${formData.reservation_date}`);
        await updateReservation(parsedForm, abortController.signal);
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        console.error(error);
        setErrorMessage(error);
      }
    }
    sendUpdate();
    return () => abortController.abort();
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h1 className="my-3">Edit Reservation</h1>
      <ErrorAlert error={errorMessage} />
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
          onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
