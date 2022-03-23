import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ReservationForm } from "./ReservationForm";
import { getReservation, updateReservation } from "../utils/api.js";
import ErrorAlert from "../layout/ErrorAlert";

export const EditReservation = () => {
  const history = useHistory();
  const reservation_id = useParams();
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

  useEffect(() => {
    async function loadReservation({ reservation_id }) {
      try {
        const abortController = new AbortController();
        setErrorMessage(null);
        const response = await getReservation(reservation_id, abortController.signal);
        setFormData(response);
        return () => abortController.abort();
      } catch (error) {
        setErrorMessage(error);
      }
    }

    loadReservation(reservation_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservation_id]);

  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    let parsedForm = { ...formData, people: Number(formData.people) }
    updateReservation(parsedForm, abortController.signal)
    .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
    .catch(setErrorMessage)
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
          onClick={(event) => handleSubmit(event)}>
          Submit
        </button>
      </div>
    </div>
  );
};
