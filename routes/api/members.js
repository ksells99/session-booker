const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Member = require("../../models/Member");
const Booking = require("../../models/Booking");
const Session = require("../../models/Session");

// @route GET api/members
// @desc GET user's members
// @access PRIVATE

router.get("/", auth, async (req, res) => {
  try {
    // Find members & populate with their bookings
    const members = await Member.find({
      user: req.user.id,
    }).select("-bookings");

    // Throw error if no members for the user
    if (members.length === 0) {
      return res
        .status(400)
        .json({ msg: "There are no members for this user" });
    }

    res.json(members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/members/:id
// @desc GET specific member
// @access PRIVATE
router.get("/:id", auth, async (req, res) => {
  try {
    // Get member based on ID (from URL) and populate with bookings
    const member = await Member.findById(req.params.id).select("-bookings");

    // Ensure user owns the member
    if (member.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    // If not a member with that ID...
    if (!member) {
      return res.status(404).json({ msg: "Member not found" });
    }

    res.json(member);

    //
  } catch (err) {
    console.error(err.message);
    // If session ID entered is not a valid ID...
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Member not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route POST api/members
// @desc Add new member
// @access PRIVATE

router.post(
  "/",
  [
    auth,
    [
      check("firstName", "First Name is required.").not().isEmpty(),
      check("lastName", "Last Name is required.").not().isEmpty(),
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
      const { firstName, lastName } = req.body;

      // Get user ID (based on JWT)
      const user = req.user.id;

      // Build new member
      const member = new Member({
        firstName,
        lastName,
        user,
      });

      await member.save();

      res.json(member);

      //
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

// @route DELETE api/members/:id
// @desc Delete member and their bookings
// @access PRIVATE

router.delete("/:id", auth, async (req, res) => {
  try {
    let member = await Member.findById(req.params.id);

    if (!member) return res.status(404).json({ msg: "member not found." });

    // Check the user owns the member they are trying to delete - if it doesn't...
    if (member.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    //Find bookings linked to member and delete them
    await Booking.deleteMany({ member: req.params.id });

    // Remove member from DB
    await member.remove();

    res.json({ msg: "member Removed." });

    //
  } catch (err) {
    console.error(err.message);
    // If member ID entered is not a valid ID...
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Member not found" });
    }
    res.status(500).send("Server Error.");
  }
});

// @route PUT api/members/:id
// @desc Edit member
// @access PRIVATE

router.put("/:id", auth, async (req, res) => {
  const { firstName, lastName } = req.body;
  const user = req.user.id;

  //Build member object
  const memberFields = {};
  memberFields.firstName = firstName;
  memberFields.lastName = lastName;
  memberFields.user = user;

  try {
    // Find member based on URL
    let member = await Member.findById(req.params.id);

    if (!member) return res.status(404).json({ msg: "Member not found." });

    // Check user owns member they are updating - if not...
    if (member.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    member = await Member.findByIdAndUpdate(
      req.params.id,
      { $set: memberFields },
      { new: true }
    ); //if new is set to true it returns the updated document, and if is set to false (default) it returns the old one.

    res.json(member);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
