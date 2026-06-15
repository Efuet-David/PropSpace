const propertyRepository = require('../repositories/propertyRepository');

class PropertyService {
  async getAllProperties(filters = {}) {
    return await propertyRepository.findAll(filters);
  }

  async getPropertyById(id) {
    const property = await propertyRepository.findById(id);
    if (!property) {
      throw new Error('Property not found');
    }
    return property;
  }

  async getUserProperties(userId) {
    return await propertyRepository.findByAuthor(userId);
  }

  async createProperty(propertyData, userId) {
    const propertyWithAuthor = {
      ...propertyData,
      author: userId
    };
    return await propertyRepository.create(propertyWithAuthor);
  }

  async updateProperty(id, updateData, userId) {
    const property = await propertyRepository.updateById(id, updateData, userId);
    if (!property) {
      throw new Error('Property not found or not authorized');
    }
    return property;
  }

  async deleteProperty(id, userId) {
    const property = await propertyRepository.deleteById(id, userId);
    if (!property) {
      throw new Error('Property not found or not authorized');
    }
    return property;
  }
}

module.exports = new PropertyService();
