import React from 'react';

import { Link } from 'react-router-dom';

// import FloorListFilter from './FloorListFilter';
import FloorListItem from './FloorListItem';

export default function FloorList({ floorList, updateFloorList}) {
  return(
    <div className='FloorList btn-group-vertical w-100' role="group" aria-label="Floor list">
      {/* <FloorListFilter updateFloorList={ updateFloorList } /> */}
      {floorList? floorList.map(floor => <FloorListItem key={floor._id} floorId={floor._id} floorName={floor.name}/>) : <h1>No floor found</h1>}
      <Link to="/addfloor" className="btn btn-secondary btn-lg btn-block">Add New Floor</Link>
    </div>
  );
}
