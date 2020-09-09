import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

import {fetchPost} from './fetch';

export default function AddFloorForm(props) {
  const history = useHistory();

  const [floorNumber, setFloorNumber] = useState('');
  const handleChange = (e) => {
    setFloorNumber(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const postURL ='http://localhost:3000/floors/';
    const postData = {name: floorNumber};
    fetchPost(postURL, postData)
      .then((data) => {
        if (data.status === 'succeeded') {
          console.log('Floor created successfully');
          history.push('/');
        } else {
          console.log('Failed. Try again!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return(
    <div className='RoomList row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5'>
      <div className='RoomListItem card col bg-light m-1'>
        <div className="card-body">
          <h4 className="card-title">Add Floor</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group"> 
              <label>Floor number:
                <input
                  type="number"
                  required
                  className="form-control"
                  value={floorNumber}
                  onChange={handleChange}
                />
              </label>
            </div>
            
            <div className="form-group">
              <input type="submit" value="Create Floor" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
