import express, { response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

import User from './models/userModel.js';
import Team from './models/teamModel.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middle wares
app.use(cors());
app.use(express.json());

// Connecting DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((response) => {
    console.log(`Connected to MongoDB`.rainbow);
    // Starting server
    app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}...`.cyan)
    );
  });

// Routes
app.get('/', (req, res) => res.send('API is running...'));

// GET: all teams
app.get('/api/teams', async (req, res) => {
  
  let teams = await Team.find({});

  res.json(teams);
});

// GET: get single user based on id
app.get('/api/users/:id', async (req, res) => {
  let userId = req.params.id;

  let user = await User.findById(userId);
  let teams = await Team.find({ user_id: userId });

  res.json({ ...user.toObject(), teams: [...teams] });
});

// POST: register new user
app.post('/api/users/signup', (req, res) => {
  let user = req.body;

  User.find().then((result) => {
    const userExists = result.some(
      (userFromDB) => userFromDB.email === user.email
    );

    if (userExists) {
      res.json({
        registrationStatus: 'failed',
        message: 'User with given email already exists',
      });
    } else {
      user.teams = [];

      const newUser = new User(user);

      newUser.save().then((result) => {
        let { _id } = result;
        res.json({
          registrationStatus: 'success',
          userId: _id,
        });
      });
    }
  });
});

// POST: Log in existing user
app.post('/api/users/login', (req, res) => {
  let user = req.body;

  User.find().then((result) => {
    let userFounded = result.find(
      (userFromDB) =>
        userFromDB.email === user.email && userFromDB.password === user.password
    );

    if (userFounded) {
      let { _id } = userFounded;

      res.json({
        loginStatus: 'success',
        userId: _id,
      });
    } else {
      res.status(401).json({
        loginStatus: 'failed',
        message: 'Given email or password is incorrect',
      });
    }
  });
});

// PUT: Delete single team based on it's id (use this route for embeded DB with single collection)
app.put('/api/teams/delete/:id', async (req, res) => {
  let { userId, teamId } = req.body;

  let userFromDB = await UserAndTeams.findById(userId);

  let teamToDeleteIndex = userFromDB.teams.findIndex(
    (team) => '' + team._id === '' + teamId
  );

  // updating user data from DB  by removing
  userFromDB.teams.splice(teamToDeleteIndex, 1);

  UserAndTeams.findByIdAndUpdate(userId, userFromDB).then((result) =>
    res.json(userFromDB)
  );
});



// POST: Add single team to user based on his id
app.post('/api/teams/add/:id', async (req, res) => {
  let userId = req.params.id;
  let teamInfo = req.body;

  Team.insertMany({ ...teamInfo, user_id: userId })
    .then(response => res.json(response))
});



// DELETE: Delete single team based on it's id (for listed DB with multiple collections)
app.delete('/api/teams/delete/:id', async (req, res) => {
  const teamId = req.params.id;

  const deletedTeam = await Team.findByIdAndDelete(teamId);

  const user = await User.findById(deletedTeam.user_id);
  const teams = await Team.find({ user_id: deletedTeam.user_id });

  res.json({ ...user.toObject(), teams: [...teams] });
});



