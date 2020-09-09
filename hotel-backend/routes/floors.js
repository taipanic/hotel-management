var express = require('express');
var router = express.Router();

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

// Create
router.post('/', (req, res) => {
  Floor.find({name: req.body.name}, (err, floors) => {
    if (err) {
      console.log(err);
      return res.json({status: 'failed'});
    } else {
      if (floors.length > 0) {
        return res.json({status: 'failed'});
      } else {
        const newFloor = new Floor({
          name: req.body.name
        });
        newFloor.save((err) => {
          if (err) {
            console.log(err);
            return res.json({status: 'failed'});
          }
          return res.json({status: 'succeeded'});
        });
      }
    }
  });
});

// Read
// Search by name
router.get('/number/:name', (req, res) => {
  Floor.find({name: req.params.name}, 'name', (err, floors) => {
    if (err) {
      console.log(err);
      return res.json(null);
    } else if (floors.length) {
      const data = floors.sort(compare);
      return res.json(data);
    } else {
      return res.json(null);
    }
  });
});

router.get('/number', (req, res) => {
  Floor.find({}, 'name', (err, floors) => {
    if (err) {
      console.log(err);
      return res.json(null);
    } else if (floors.length) {
      const data = floors.sort(compare);
      return res.json(data);
    } else {
      return res.json(null);
    }
  });
});

router.get('/:id', (req, res) => {
  Floor.findById(req.params.id).populate('children').exec((err, floor) => {
    if (err) {
      console.log(err);
      return res.json({status: 'failed'});
    }
    return res.json({status: 'succeeded', floor});
  });
});

router.get('/', (req, res) => {
  Floor.find({}, 'name', (err, floors) => {
    if (err) {
      console.log(err);
      return res.json({status: 'failed'});
    }
    const data = floors.sort(compare);
    return res.json(data);
  });
});

// Update

// Delete
router.delete('/:id', (req, res) => {
  Floor.findByIdAndDelete(req.params.id, (err, floor) => {
    if (err) {
      console.log(err);
      return res.json({status: 'failed'});
    }
    return res.json({status: 'succeeded'});
  });
});

module.exports = router;
