var express = require('express');
var router = express.Router();

const Room = require('../models/room');
const Floor = require('../models/floor');

function compare(a, b) {
  if (a.name < b.name){
    return -1;
  }
  if (a.name > b.name){
    return 1;
  }
  return 0;
}

// Search by parent
router.get('/parent/:id', (req, res) => {
  const floorId = req.params.id;
  if (floorId == 'all') {
    Room.find({}, 'name state isOpen', (err, rooms) => {
      if (err) {
        console.log(err);
        return res.json(null);
      } else if (rooms.length) {
        const data = rooms.sort(compare);
        return res.json(data);
      } else {
        return res.json(null);
      }
    });
  } else {
    Room.find({'parent': floorId}, 'name state isOpen', (err, rooms) => {
      if (err) {
        console.log(err);
        return res.json(null);
      } else if (rooms.length) {
          const data = rooms.sort(compare);
          return res.json(data);
      } else {
        return res.json(null);
      }
    });
  }
});

// Read
// Fetch all rooms
router.get('/', (req, res) => {
  Room.find({}, 'name state', (err, rooms) => {
    if (err) {
      console.log(err);
      return res.json(null);
    } else if (rooms.length) {
      const data = rooms.sort(compare);
      return res.json(data);
    } else {
      return res.json(null);
    }
  });
});

// Get a room
router.get('/:id', (req, res) => {
  Room.findById(req.params.id, (err, room) => {
    if (err) {
      console.log(err);
      return res.json(null);
    } else {
      if (room)
        return res.json(room);
      return res.json(null);
    }
  });
});

// Create
// Add a room
router.post('/', (req, res) => {
  const floorId = req.body.parent;
  const roomName = req.body.name;
  if (!floorId || !roomName) {
    console.log('no floor id or room name');
    return res.sendStatus(500);
  }
  Floor.findById(floorId, (err, floor) => {
    if (err) {
      console.log('error here');
      console.log(err);
      return res.sendStatus(500);
    }
    if (!floor) {
      console.log('no floor found');
      return res.sendStatus(500);
    }
    Room.find({name: roomName}, (err, rooms) => {
      if (err) {
        console.log(err);
        console.log('error hersaase');
        return res.sendStatus(500);
      }
      if (rooms.length > 0) {
        console.log('room existed');
        return res.sendStatus(500);
      }
      const newRoom = new Room({
        name: roomName,
        state: false,
        isOpen: true,
        parent: floorId
      });
      newRoom.save((err) => {
        if (err) {
          console.log(err);
          console.log('error hxxxe');
          return res.sendStatus(500);
        }
        floor.children.push(newRoom);
        floor.save((err, data) => {
          if (err) {
            console.log(err);
            console.log('easase');
            return res.sendStatus(500);
          }
          console.log('everything ok');
          return res.status(200).json({'ok': true});
        });
      });
    });
  });
});

// Update
// Edit a room
router.put('/:id', (req, res) => {
  Room.findById(req.params.id, (err, room) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    room.state = req.body.state;
    room.save((err) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      console.log('update ok');
      return res.status(200).json({'ok': true});
    });
  });
});

// Delete
// Delete a room
router.delete('/:id', (req, res) => {
  Room.findByIdAndDelete(req.params.id, (err, deletedRoom) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    } else {
      Floor.findById(deletedRoom.parent, (err, floor) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        } else {
          const index = floor.children.indexOf(deletedRoom._id);
          if (index > -1) {
            floor.children.splice(index, 1);
          }
          floor.save((err, data) => {
            if (err) {
              console.log(err);
              return res.sendStatus(500);
            } else {
              console.log('delete ok');
              return res.status(200).json({'ok': true});
            }
          });
        }
      });
    }
  });
});

module.exports = router;
