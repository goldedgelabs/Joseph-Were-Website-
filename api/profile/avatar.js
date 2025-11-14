const cloudinary = require('../cloudinary');
const connect = require('../db');
const Profile = require('../models/Profile');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    await connect();
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: 'No image provided' });
    // Upload data-URL to Cloudinary
    const result = await cloudinary.uploader.upload(image, { folder: 'modern_profile' });
    const url = result.secure_url || result.url;
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({ avatarUrl: url });
    else { profile.avatarUrl = url; await profile.save(); }
    return res.json({ avatarUrl: url, profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
