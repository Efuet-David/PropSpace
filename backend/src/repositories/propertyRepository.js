const Property = require('../models/Property');

class PropertyRepository {
  async findAll(filters = {}) {
    const query = {};
    
    if (filters.city) {
      query['location.city'] = { $regex: filters.city, $options: 'i' };
    }
    
    if (filters.minPrice !== undefined) {
      query.price = { $gte: filters.minPrice };
    }
    
    if (filters.maxPrice !== undefined) {
      if (query.price) {
        query.price.$lte = filters.maxPrice;
      } else {
        query.price = { $lte: filters.maxPrice };
      }
    }
    
    if (filters.propertyType) {
      query.propertyType = filters.propertyType;
    }
    
    return await Property.find(query).populate('author', 'username email').sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Property.findById(id).populate('author', 'username email');
  }

  async findByAuthor(authorId) {
    return await Property.find({ author: authorId }).sort({ createdAt: -1 });
  }

  async create(propertyData) {
    return await Property.create(propertyData);
  }

  async updateById(id, updateData, authorId) {
    const property = await Property.findById(id);
    
    if (!property) {
      return null;
    }
    
    if (property.author.toString() !== authorId.toString()) {
      throw new Error('Not authorized to update this property');
    }
    
    return await Property.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async deleteById(id, authorId) {
    const property = await Property.findById(id);
    
    if (!property) {
      return null;
    }
    
    if (property.author.toString() !== authorId.toString()) {
      throw new Error('Not authorized to delete this property');
    }
    
    await Property.findByIdAndDelete(id);
    return property;
  }
}

module.exports = new PropertyRepository();
