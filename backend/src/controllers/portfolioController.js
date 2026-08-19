// backend/src/controllers/portfolioController.js
import { db } from '../models/db.js';

export const getPortfolio = (req, res) => {
  try {
    const items = db.portfolioItems.filter(p => p.userId === req.user.id);
    const certificate = db.certificates.find(c => c.userId === req.user.id);

    return res.status(200).json({
      success: true,
      portfolio: {
        items,
        totalDrafts: items.length,
        certificate: certificate || null
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCertificates = (req, res) => {
  try {
    const certs = db.certificates.filter(c => c.userId === req.user.id);
    return res.status(200).json({ success: true, certificates: certs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyCertificate = (req, res) => {
  try {
    const { code } = req.params;
    const cert = db.certificates.find(c => c.verificationCode === code.toUpperCase());

    if (!cert) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: 'Invalid certificate verification code.'
      });
    }

    return res.status(200).json({
      success: true,
      valid: true,
      certificate: cert
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getGamificationStats = (req, res) => {
  try {
    const user = req.user;
    const userBadges = (user.badges || []).map(bId => {
      const bObj = db.badges.find(b => b.id === bId);
      return bObj || { id: bId, name: bId, icon: '🏆', description: 'Achievement Unlocked' };
    });

    const lockedBadges = db.badges.filter(b => !(user.badges || []).includes(b.id));

    const notifications = db.notifications.filter(n => n.userId === user.id);

    return res.status(200).json({
      success: true,
      stats: {
        xp: user.xp || 0,
        streakDays: user.streakDays || 1,
        currentLevelId: user.currentLevelId,
        unlockedBadges: userBadges,
        lockedBadges,
        notifications
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
