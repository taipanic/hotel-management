const express = require('express');
const cors = require('cors');
var mongoose = require("mongoose");
// require('dotenv').config();

var floorsRoutes = require('./routes/floors')
var roomsRoutes = require('./routes/rooms')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/floors', floorsRoutes);
app.use('/rooms', roomsRoutes);

mongoose.connect(
  'mongodb+srv://minhtaile2712:imissyou@cluster0-wyhfl.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log('Connected to Database!'))
.catch(error => console.log(error.message));

///////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
