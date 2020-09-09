import React from 'react';

export default function FloorListFilter({ floorName, updateFloorName }) {
  function handleChange(e) {
    updateFloorName(e.target.value);
  }

  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text" id="addon-wrapping">@</span>
      </div>
      <input
        type="text"
        className="form-control"
        onChange={handleChange}
        value ={floorName}
      />

    </div>
  );
}