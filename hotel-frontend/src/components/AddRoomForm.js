import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import {fetchPost} from './fetch';

export default function AddRoomForm({ match }) {
  const [roomNumber, setRoomNumber] = useState('0');
  const history = useHistory();

  const floorId = match.params.floorId;

  function handleChange(e) {
    setRoomNumber(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const postURL ='http://localhost:3000/rooms/';
    const postData = {name: roomNumber, parent: floorId};
    fetchPost(postURL, postData)
      .then((data) => {
        console.log(data);
        history.push('/floor/'+ floorId);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return(
    <div className='RoomList row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5'>
      <div className='RoomListItem card col bg-light m-1'>
        <div className="card-body">
          <h4 className="card-title">Add Room</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Room number:
                <input
                  type="number"
                  required
                  className="form-control"
                  value={roomNumber}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-group">
              <input type="submit" value="Create Room" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}