const express = require('express');
const { body } = require('express-validator');
const { getAllProperties, getPropertyById, getUserProperties, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const protect = require('../middleware/auth');

const router = express.Router();

// Validation rules
const createPropertyValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  body('price').isNumeric().withMessage('Price must be a number').isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('location.city').trim().notEmpty().withMessage('City is required'),
  body('location.country').trim().notEmpty().withMessage('Country is required'),
  body('propertyType').isIn(['Apartment', 'House', 'Studio']).withMessage('Property type must be Apartment, House, or Studio'),
  body('images').optional().isArray().withMessage('Images must be an array')
];

const updatePropertyValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty').isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty').isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  body('price').optional().isNumeric().withMessage('Price must be a number').isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('location.city').optional().trim().notEmpty().withMessage('City cannot be empty'),
  body('location.country').optional().trim().notEmpty().withMessage('Country cannot be empty'),
  body('propertyType').optional().isIn(['Apartment', 'House', 'Studio']).withMessage('Property type must be Apartment, House, or Studio'),
  body('images').optional().isArray().withMessage('Images must be an array')
];

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

// Protected routes
router.get('/user/my-listings', protect, getUserProperties);
router.post('/', protect, createPropertyValidation, createProperty);
router.put('/:id', protect, updatePropertyValidation, updateProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;
