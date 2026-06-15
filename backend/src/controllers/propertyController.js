const { validationResult } = require('express-validator');
const propertyService = require('../services/propertyService');

const getAllProperties = async (req, res) => {
  try {
    const filters = {
      city: req.query.city,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
      propertyType: req.query.propertyType
    };

    const properties = await propertyService.getAllProperties(filters);
    res.status(200).json({ properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id);
    res.status(200).json({ property });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserProperties = async (req, res) => {
  try {
    const properties = await propertyService.getUserProperties(req.user._id);
    res.status(200).json({ properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProperty = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const propertyData = req.body;
    const property = await propertyService.createProperty(propertyData, req.user._id);

    res.status(201).json({ property });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updateData = req.body;
    const property = await propertyService.updateProperty(req.params.id, updateData, req.user._id);

    res.status(200).json({ property });
  } catch (error) {
    if (error.message === 'Property not found or not authorized') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(403).json({ message: error.message });
    }
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await propertyService.deleteProperty(req.params.id, req.user._id);

    res.status(200).json({ message: 'Property deleted successfully', property });
  } catch (error) {
    if (error.message === 'Property not found or not authorized') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(403).json({ message: error.message });
    }
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  getUserProperties,
  createProperty,
  updateProperty,
  deleteProperty
};
