const Shift = require('../models/Shift');

// @desc    Get all shifts
// @route   GET /api/pos/shifts
// @access  Private
const getShifts = async (req, res, next) => {
  try {
    const { user, status, registerId, page = 1, limit = 20 } = req.query;

    const query = {};

    if (user) {
      query.user = user;
    }

    if (status) {
      query.status = status;
    }

    if (registerId) {
      query.registerId = registerId;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const shifts = await Shift.find(query)
      .populate('user', 'name email')
      .sort('-openedAt')
      .skip(skip)
      .limit(limitNum);

    const total = await Shift.countDocuments(query);

    res.json({
      success: true,
      data: shifts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Open shift
// @route   POST /api/pos/shifts/open
// @access  Private
const openShift = async (req, res, next) => {
  try {
    const { registerId, openingCash, notes } = req.body;

    // Check if there's an open shift for this register
    const existingShift = await Shift.findOne({
      registerId: registerId || '1',
      status: 'open'
    });

    if (existingShift) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'SHIFT_ALREADY_OPEN',
          message: 'A shift is already open for this register'
        }
      });
    }

    const shift = await Shift.create({
      registerId: registerId || '1',
      user: req.user._id,
      openingCash: openingCash || 0,
      notes,
      status: 'open',
      openedAt: new Date()
    });

    await shift.populate('user', 'name email');

    res.status(201).json({
      success: true,
      data: shift
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Close shift
// @route   POST /api/pos/shifts/:id/close
// @access  Private
const closeShift = async (req, res, next) => {
  try {
    const { closingCash, notes } = req.body;

    const shift = await Shift.findById(req.params.id);

    if (!shift) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Shift not found'
        }
      });
    }

    if (shift.status === 'closed') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'SHIFT_ALREADY_CLOSED',
          message: 'Shift is already closed'
        }
      });
    }

    // Only the user who opened the shift or an admin can close it
    if (shift.user.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Not authorized to close this shift'
        }
      });
    }

    shift.closingCash = closingCash || shift.openingCash;
    shift.closedAt = new Date();
    shift.status = 'closed';
    if (notes) {
      shift.notes = notes;
    }

    await shift.save();
    await shift.populate('user', 'name email');

    res.json({
      success: true,
      data: shift
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getShifts,
  openShift,
  closeShift
};

