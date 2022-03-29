import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { searchReservations } from "../utils/api";
import { ReservationsTable } from "../reservations/ReservationsTable";

export const SearchReservations = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [update, triggerUpdate] = useState(-1);
  const history = useHistory();

  function handleCancel() {
    history.goBack();
  }

  function handleChange({ target }) {
    setMobileNumber(target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      searchReservations(mobileNumber).then((response) => {
        setReservations(response);
        triggerUpdate(response.length);
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div>
      <h1 className="my-3 text-light">Find Reservation</h1>
      {errorMessage && (
        <h5 className="alert alert-danger mx-1">{errorMessage}</h5>
      )}
      <div className="d-flex">
        <input
          type="string"
          className="form-control"
          name="mobile_number"
          placeholder="Enter a customer's phone number"
          onChange={handleChange}
        />
        <div className="btn-group ml-2 mr-3 mb-2">
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
            Find
          </button>
        </div>
      </div>
      {update === 0 && <h4 className="mt-4 text-light">No reservations found</h4>}
      {update > 0 && <ReservationsTable reservations={reservations} /> }
    </div>
  );
};
