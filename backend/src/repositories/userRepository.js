const User = require('../models/User');

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ email }).select('+password');
  }

  async findByUsername(username) {
    return await User.findOne({ username });
  }

  async findById(id) {
    return await User.findById(id).select('-password');
  }

  async create(userData) {
    return await User.create(userData);
  }

  async updateById(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
  }

  async updatePassword(id, newPassword) {
    return await User.findByIdAndUpdate(id, { password: newPassword }, { new: true, runValidators: true }).select('-password');
  }
}

module.exports = new UserRepository();
