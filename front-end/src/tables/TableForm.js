import React from 'react'

export const TableForm = ({ formData, setFormData }) => {
  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  return (
    <form className="d-flex flex-column">
      <div className="d-flex">
        <input type="string" className="form-control m-1" name="table_name"
          onChange={handleChange} placeholder="Table Name" />
        <input type="number" className="form-control m-1" name="capacity"
          onChange={handleChange} placeholder="Capacity" />
      </div>
    </form>
  )
}
