import React from 'react';

import {
  Link
} from "react-router-dom";

export default function FloorListItem({ floorId, floorName }) {
  return(
    <Link to={`/floor/${floorId}`} className='btn btn-secondary btn-lg'>Floor {floorName}</Link>
  );
}