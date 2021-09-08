import mongoose from 'mongoose';
const { Schema } = mongoose;

const teamSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Team = mongoose.model('team', teamSchema);
export default Team;
