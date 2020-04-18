const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: "member",
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: "session",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Booking = mongoose.model("booking", BookingSchema);
