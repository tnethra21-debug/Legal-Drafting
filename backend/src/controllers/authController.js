// backend/src/controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../models/db.js';
import { config } from '../config/index.js';

export const register = (req, res) => {
  try {
    const { name, email, password, institution, languageId = 'en' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.'
      });
    }

    if (db.findUserByEmail(email)) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const user = db.createUser({
      name,
      email,
      passwordHash,
      institution: institution || 'Law School / University',
      languageId
    });

    const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn
    });

    const { passwordHash: _, ...safeUser } = user;

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: safeUser
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const user = db.findUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn
    });

    const { passwordHash: _, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: safeUser
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = (req, res) => {
  try {
    const { passwordHash: _, ...safeUser } = req.user;
    return res.status(200).json({ success: true, user: safeUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLanguage = (req, res) => {
  try {
    const { languageId } = req.body;
    if (!languageId) {
      return res.status(400).json({ success: false, message: 'languageId is required.' });
    }

    const updated = db.updateUser(req.user.id, { languageId });
    const { passwordHash: _, ...safeUser } = updated;

    return res.status(200).json({
      success: true,
      message: 'Language preference updated.',
      user: safeUser
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getLanguages = (req, res) => {
  return res.status(200).json({ success: true, languages: db.languages });
};
