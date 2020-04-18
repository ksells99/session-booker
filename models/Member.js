const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  bookings: [
    {
      booking: {
        type: Schema.Types.ObjectId,
        ref: "booking",
      },
      session: {
        type: Schema.Types.ObjectId,
        ref: "session",
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Member = mongoose.model("member", MemberSchema);
