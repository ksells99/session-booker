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

// @route GET api/sessions
// @desc GET all of user's sessions
// @access PRIVATE
router.get("/", auth, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id });

    res.json(sessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/sessions/:id
// @desc GET specific session
// @access PRIVATE
router.get("/:id", auth, async (req, res) => {
  try {
    // Get session based on ID (from URL)
    const session = await Session.findById(req.params.id);

    // Ensure user owns the session
    if (session.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    // If not a session with that ID...
    if (!session) {
      return res.status(404).json({ msg: "Session not found" });
    }

    res.json(session);

    //
  } catch (err) {
    console.error(err.message);
    // If session ID entered is not a valid ID...
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Session not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route POST api/sessions
// @desc Add new session
// @access PRIVATE
router.post(
  "/",
  [auth, [check("sessionDate", "Session date is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    // Check for errors - return them if so
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Pull out fields from body
      const { sessionDate } = req.body;

      // Get user from JWT
      const user = req.user.id;

      // Build new session
      const session = new Session({
        sessionDate,
        user,
      });

      // Save to DB
      await session.save();

      // Return the new session
      res.json(session);

      //
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

// @route DELETE api/sessions/:id
// @desc Delete session and bookings
// @access PRIVATE

router.delete("/:id", auth, async (req, res) => {
  try {
    // Find session based on ID (from URL)
    const session = await Session.findById(req.params.id);

    if (!session) return res.status(404).json({ msg: "Session not found." });

    // Check the user owns the  session they are trying to delete - if it doesn't...
    if (session.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    //Find bookings linked to session and delete them
    await Booking.deleteMany({ session: req.params.id });

    // Remove session from DB
    await session.remove();

    res.json({ msg: "Session removed" });

    //
  } catch (err) {
    console.error(err.message);
    // If session ID entered is not a valid ID...
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Session not found" });
    }
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
