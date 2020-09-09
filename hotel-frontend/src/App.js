import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import {fetchGet} from './components/fetch';

import FloorList from './components/FloorList';
import AddFloorForm from './components/AddFloorForm';
import FloorListFilter from './components/FloorListFilter';

import RoomList from './components/RoomList';
import AddRoomForm from './components/AddRoomForm';

function App() {
  const [floorList, setFloorList] = useState([]);
  const [floorName, setFloorName] = useState('');
  
  useEffect(() => {
    const getURL = 'http://localhost:3000/floors/';
    fetchGet(getURL)
      .then((data) => {
        setFloorList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const  getURL = 'http://localhost:3000/floors/number/' + floorName;
    fetchGet(getURL)
      .then((data) => {
        setFloorList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [floorName]);

  function updateFloorName(data) {
    setFloorName(data);
  }

  function updateFloorList(data) {
    setFloorList(data);
  }

  return (
    <Router>
      <div className="container-fluid">
        <nav className='navbar navbar-light bg-light'>
          <Link to="/floor/all">Homepage</Link>
        </nav>

        <div className='row vh-100'>
          <div className='col-6 col-sm-5	col-md-4	col-lg-3	col-xl-2 bg-light'>
            <FloorListFilter floorName={floorName} updateFloorName={ updateFloorName } />
            <FloorList floorList={floorList} updateFloorList={updateFloorList} />
          </div>

          <div className='col-6 col-sm-7	col-md-8	col-lg-9	col-xl-10 bg-secondary'>
          <Switch>
            <Route
              path="/addfloor"
              render = { (props) => <AddFloorForm {...props} floorList={floorList} updateFloorList={updateFloorList} /> } 
            />
            <Route exact path="/addroom/:floorId" component={AddRoomForm} />

            <Route
              exact path="/floor/:floorId"
              render = { (props) => <RoomList {...props} /> }
            />

            <Route exact path="/">
              <Redirect to="/floor/all" />
            </Route>
          </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
