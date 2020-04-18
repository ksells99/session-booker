const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Session = require("../../models/Session");
const User = require("../../models/User");
const Member = require("../../models/Member");
const Booking = require("../../models/Booking");

// @route GET api/bookings
// @desc GET user's bookings
// @access PRIVATE

router.get("/", auth, async (req, res) => {
  try {
    // Find bookings & populate with the member names and session dates
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("member", ["firstName", "lastName"])
      .populate("session", ["sessionDate"]);

    res.json(bookings);

    //
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/bookings/:id
// @desc GET specific booking
// @access PRIVATE
router.get("/:id", auth, async (req, res) => {
  try {
    // Get booking based on ID (from URL), and also populate with member name and session date
    const booking = await Booking.findById(req.params.id)
      .populate("member", ["firstName", "lastName"])
      .populate("session", ["sessionDate"]);

    // If not a booking with that ID...
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res.json(booking);

    //
  } catch (err) {
    console.error(err.message);
    // If booking ID entered is not a valid ID...
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route GET api/bookings/sessionbookings/:session_id
// @desc GET bookings for session
// @access PRIVATE
router.get("/sessionbookings/:session_id", auth, async (req, res) => {
  try {
    // Get bookings based on ID (from URL), and also populate with member name and session date
    const bookings = await Booking.find({
      session: req.params.session_id,
    })
      .populate("member", ["firstName", "lastName"])
      .populate("session", ["sessionDate"]);

    // Ensure user owns the bookings
    if (bookings.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    // If not a booking with that ID...
    if (!bookings) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res.json(bookings);

    //
  } catch (err) {
    console.error(err.message);
    // If booking ID entered is not a valid ID...
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Session not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route GET api/bookings/memberbookings/:member_id
// @desc GET specific booking
// @access PRIVATE
router.get("/memberbookings/:member_id", auth, async (req, res) => {
  try {
    // Get bookings based on ID (from URL), and also populate with member name and session date
    const bookings = await Booking.find({
      member: req.params.member_id,
    })
      .populate("member", ["firstName", "lastName"])
      .populate("session", ["sessionDate"]);

    // If not a booking with that ID...
    if (!bookings) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res.json(bookings);

    //
  } catch (err) {
    console.error(err.message);
    // If booking ID entered is not a valid ID...
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route POST api/bookings
// @desc Add new booking
// @access PRIVATE
router.post(
  "/",
  [
    auth,
    [
      check("sessionID", "Session is required.").not().isEmpty(),
      check("memberID", "Please select a member").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check for errors - return them if so
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Pull out fields from body
      const { sessionID, memberID } = req.body;

      // Find session and member based on IDs (passed in from body)
      const sessionID2 = await Session.findById(sessionID);
      const memberID2 = await Member.findById(memberID);

      // Get user from JWT
      const user = req.user.id;

      // Build new booking - set session as sessionID above, member as memberID above etc.
      const booking = new Booking({
        session: sessionID2,
        member: memberID2,
        user,
      });

      // Save to DB
      await booking.save();

      // Return the new booking
      res.json(booking);

      //
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

// @route DELETE api/bookings/:id
// @desc Delete booking
// @access PRIVATE

router.delete("/:id", auth, async (req, res) => {
  try {
    // Find booking based on ID (from URL)
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ msg: "Booking not found." });

    // Check the user owns the  booking they are trying to delete - if it doesn't...
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    // Remove booking from DB
    await booking.remove();

    res.json({ msg: "Booking removed" });
  } catch (err) {
    console.error(err.message);
    // If session ID entered is not a valid ID...
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
