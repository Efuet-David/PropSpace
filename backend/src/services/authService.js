const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

class AuthService {
  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  }

  async register(userData) {
    const { username, email, password } = userData;

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
      throw new Error('Username already taken');
    }

    const user = await userRepository.create(userData);
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar
      },
      token
    };
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar
      },
      token
    };
  }

  async updateProfile(userId, updateData) {
    const user = await userRepository.updateById(userId, updateData);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await userRepository.findByEmail(user.email);
    
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await user.comparePassword(oldPassword);
    
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    await userRepository.updatePassword(userId, newPassword);
    return { message: 'Password updated successfully' };
  }
}

module.exports = new AuthService();
