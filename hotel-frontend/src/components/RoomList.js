import React, { useState, useEffect } from 'react';
import './RoomListItem.css';

import { Link } from 'react-router-dom';

import {fetchGet} from './fetch';
import {useInterval} from '../hooks/useInterval';

import RoomListItem from './RoomListItem';

export default function RoomList({ match }) {
  const [roomList, setRoomList] = useState([]);
  
  const [isDisable, setIsDisable] = useState(false);
  function updateIsDisable(data) {
    setIsDisable(data);
  }

  useEffect(() => {
    console.log('doing it');
    const getURL = 'http://localhost:3000/rooms/parent/' + match.params.floorId;
    fetchGet(getURL)
      .then((data) => {
        setRoomList(data);
      })
      .catch((error) => {
        console.error();
      });
  }, [match.params.floorId]);

  useInterval(() => {
    const getURL = 'http://localhost:3000/rooms/parent/' + match.params.floorId;
    fetchGet(getURL)
      .then((data) => {
        setRoomList(data);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
      setIsDisable(false);
  }, 500);

  let abc =
  <div className='RoomListItem col bg-secondary m-0 p-1'>
    <div className='card h-100'>
      <div className="card-body">
        <h4 className="card-title">Room ...</h4>
        <Link to={`/addroom/${match.params.floorId}`} className="btn btn-lg h-50 btn-block btn-primary AddRoomLink ">Add room</Link>
      </div>
    </div>
  </div>

  return(
    <div className='RoomList row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5'>
      { roomList? roomList.map(room => <RoomListItem key={room._id} id={room._id} name={room.name} state={room.state} isDisable={isDisable} updateIsDisable={updateIsDisable}/>) : <></> }
      {(match.params.floorId === 'all')? <></>:abc}
    </div>
  );
}
