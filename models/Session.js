const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  sessionDate: {
    type: Date,
    required: true,
  },
  bookings: [
    {
      booking: {
        type: Schema.Types.ObjectId,
        ref: "booking",
      },
      member: {
        type: Schema.Types.ObjectId,
        ref: "member",
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Session = mongoose.model("session", SessionSchema);
