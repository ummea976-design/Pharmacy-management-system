const { BusinessSettings, LocalizationSettings, InvoiceSettings } = require('../models/Settings');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'logo-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 2097152 // 2MB default
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
}).single('logo');

// Business Settings
const getBusinessSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();

    if (!settings) {
      settings = await BusinessSettings.create({});
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

const updateBusinessSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();

    if (!settings) {
      settings = await BusinessSettings.create(req.body);
    } else {
      settings = await BusinessSettings.findOneAndUpdate(
        {},
        req.body,
        { new: true, runValidators: true, upsert: true }
      );
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// Localization Settings
const getLocalizationSettings = async (req, res, next) => {
  try {
    let settings = await LocalizationSettings.findOne();

    if (!settings) {
      settings = await LocalizationSettings.create({});
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

const updateLocalizationSettings = async (req, res, next) => {
  try {
    let settings = await LocalizationSettings.findOne();

    if (!settings) {
      settings = await LocalizationSettings.create(req.body);
    } else {
      settings = await LocalizationSettings.findOneAndUpdate(
        {},
        req.body,
        { new: true, runValidators: true, upsert: true }
      );
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// Invoice Settings
const getInvoiceSettings = async (req, res, next) => {
  try {
    let settings = await InvoiceSettings.findOne();

    if (!settings) {
      settings = await InvoiceSettings.create({});
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

const updateInvoiceSettings = async (req, res, next) => {
  try {
    let settings = await InvoiceSettings.findOne();

    if (!settings) {
      settings = await InvoiceSettings.create(req.body);
    } else {
      settings = await InvoiceSettings.findOneAndUpdate(
        {},
        req.body,
        { new: true, runValidators: true, upsert: true }
      );
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// Upload logo
const uploadLogo = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'UPLOAD_ERROR',
          message: err.message
        }
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'No file uploaded'
        }
      });
    }

    try {
      const logoUrl = `/uploads/${req.file.filename}`;
      let settings = await InvoiceSettings.findOne();

      if (!settings) {
        settings = await InvoiceSettings.create({ logoUrl });
      } else {
        // Delete old logo if exists
        if (settings.logoUrl) {
          const oldLogoPath = path.join(process.env.UPLOAD_DIR || './uploads', path.basename(settings.logoUrl));
          if (fs.existsSync(oldLogoPath)) {
            fs.unlinkSync(oldLogoPath);
          }
        }
        settings.logoUrl = logoUrl;
        await settings.save();
      }

      res.json({
        success: true,
        data: {
          logoUrl: settings.logoUrl
        }
      });
    } catch (error) {
      // Delete uploaded file on error
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      next(error);
    }
  });
};

module.exports = {
  getBusinessSettings,
  updateBusinessSettings,
  getLocalizationSettings,
  updateLocalizationSettings,
  getInvoiceSettings,
  updateInvoiceSettings,
  uploadLogo
};

