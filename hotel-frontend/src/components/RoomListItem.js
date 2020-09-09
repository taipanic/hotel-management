import React from 'react';
import './RoomListItem.css';

import { fetchPut, fetchDelete } from './fetch';

export default function RoomListItem({id, name, state, isDisable, updateIsDisable}) {
  
  function handleClick() {
    updateIsDisable(true);
    const putURL = 'http://localhost:3000/rooms/' + id;
    const putData = {state: !state};
    fetchPut(putURL, putData)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  function handleDelete() {
    const deleteURL = 'http://localhost:3000/rooms/' + id;
    fetchDelete(deleteURL)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='RoomListItem col bg-secondary m-0 p-1'>
      <div className="card h-100">
      <div className="card-body ">
        <h4 className="card-title">Room {name}</h4>
        <button
          type="button"
          onClick={handleDelete}
          className="CloseButton btn btn-danger px-2 pt-0 pb-1"
        >
          &times;
        </button>

        <button
          type="button"
          onClick={handleClick} 
          className={`btn btn-lg h-50 btn-block ${state? "btn-warning" : "btn-dark"}`} 
          disabled={isDisable}
        >
          {(state)? 'On' : 'Off'}
        </button>
      </div>
      </div>
      
    </div>
  );
}
