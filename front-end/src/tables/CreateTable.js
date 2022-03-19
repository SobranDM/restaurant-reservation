import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { TableForm } from './TableForm';
import { createTable } from "../utils/api.js";

export const CreateTable = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ table_name: "", capacity: 0 });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let parsedForm = { ...formData, capacity: Number(formData.capacity) }
      await createTable(parsedForm).then(() => {
        history.push("/dashboard");
      })
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h1 className="my-3">Create Table</h1>
      {errorMessage && (
        <h5 className="alert alert-danger mx-1">{errorMessage}</h5>
      )}
      <TableForm formData={formData} setFormData={setFormData} />
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
  )
}
