const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  // Not sure why we are not checking !ticket like we did for getTicket under ticketController.js

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // Current mongoose method includes:
  // XXX.find({<fieldname>: <fieldValue>})
  // XXX.findOne({<fieldname>: <fieldValue>})
  // XXX.findById(<fieldValue>)
  // XXX.findByIdAndUpdate(
  //     req.params.id,
  //     req.body,
  //     { new: true }
  //   )
  // XXX.create({
  //     <fieldname>: <fieldValue>,
  //     <fieldname>: <fieldValue>,
  //     <fieldname>: <fieldValue>,
  //   })

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  // Not sure why we are not checking !ticket like we did for getTicket under ticketController.js

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

module.exports = {
  getNotes,
};
